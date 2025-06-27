import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { GraphNode, GraphLink, Subject } from '../types';

interface InteractiveGraphProps {
  data: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
  onNodeClick: (node: GraphNode) => void;
  selectedNodeId: string | null;
}

const getNodeColor = (node: GraphNode): string => {
  if (node.type === 'topic') {
    return 'rgb(251 113 133)'; // rose-400
  }
  const subject = node.data as Subject;
  switch (subject.commission_type) {
    case 'Commissario Interno':
      return 'rgb(34 211 238)'; // cyan-400
    case 'Commissario Esterno':
      return 'rgb(167 139 250)'; // violet-400
    case 'Commissario Interno e Esterno':
      return 'rgb(52 211 153)'; // emerald-400
    default:
      return 'rgb(156 163 175)'; // slate-400
  }
};

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({ data, onNodeClick, selectedNodeId }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const createDragBehavior = (simulation: d3.Simulation<GraphNode, undefined>) => {
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    return d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended);
  };

  useEffect(() => {
    if (!svgRef.current || data.nodes.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g');

    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id)
        .distance((d: any) => d.type === 'subject-subject' ? 70 : 120)
        .strength((d: any) => d.type === 'subject-subject' ? 0.2 : 0.6)
      )
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide().radius((d: any) => d.radius + 15).strength(0.8));

    const link = g
      .append('g')
      .selectAll('line')
      .data(data.links)
      .join('line')
      .attr('stroke', '#475569') // slate-600
      .attr('stroke-opacity', (d: any) => d.type === 'subject-subject' ? 0.15 : 0.3)
      .attr('stroke-dasharray', (d: any) => d.type === 'subject-subject' ? '3,3' : 'none');

    const node = g
      .append('g')
      .selectAll('g')
      .data(data.nodes)
      .join('g')
      .attr('class', 'cursor-pointer')
      .call(createDragBehavior(simulation) as any);

    node
      .append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => d3.color(getNodeColor(d))?.darker(1.5).toString() || 'black')
      .attr('stroke', getNodeColor)
      .attr('stroke-width', 2);
    
    node.append('circle')
      .attr('r', d => d.radius)
      .attr('class', 'glow-circle')
      .attr('fill', getNodeColor)
      .style('filter', 'blur(8px)')
      .attr('opacity', 0.5);

    node
      .append('text')
      .text(d => (d.data as any).name || (d.data as any).title.split('.')[0])
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', 'white')
      .attr('font-size', d => (d.type === 'topic' ? '14px' : '12px'))
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none');
    
    node.on('click', (event, d) => {
        onNodeClick(d);
    });

    node.on('mouseover', (event, d) => {
        setHoveredNodeId(d.id);
    });

    node.on('mouseout', () => {
        setHoveredNodeId(null);
    });

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

    const zoomHandler = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString());
      });

    svg.call(zoomHandler as any);

    return () => {
      simulation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  
   useEffect(() => {
    if (!svgRef.current) return;
    
    const activeId = selectedNodeId || hoveredNodeId;

    const svg = d3.select(svgRef.current);
    const node = svg.selectAll<SVGGElement, GraphNode>('.cursor-pointer');
    const link = svg.selectAll<SVGLineElement, GraphLink>('line');

    node.transition().duration(300).attr('opacity', d => {
        if (!activeId) return 1;
        if (d.id === activeId) return 1;

        const isConnected = data.links.some(l => {
            const sourceId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
            const targetId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
            return (sourceId === d.id && targetId === activeId) || (targetId === d.id && sourceId === activeId);
        });
        
        return isConnected ? 0.8 : 0.2;
    });

    link.transition().duration(300)
      .attr('stroke-opacity', l => {
        const sourceId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;

        if (activeId && (sourceId === activeId || targetId === activeId)) {
          return 0.8;
        }
        return l.type === 'subject-subject' ? 0.1 : 0.2;
    })
      .attr('stroke', l => {
        const sourceId = typeof l.source === 'object' ? (l.source as GraphNode).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as GraphNode).id : l.target;
        const sourceNode = data.nodes.find(n => n.id === sourceId);
        const targetNode = data.nodes.find(n => n.id === targetId);
        if (!sourceNode || !targetNode) return '#475569';

        if (activeId && (sourceId === activeId || targetId === activeId)) {
          if (l.type === 'topic-subject') {
            const subjectNode = sourceNode.type === 'subject' ? sourceNode : targetNode;
            return getNodeColor(subjectNode);
          } else { // subject-subject
            return 'rgb(103 232 249)'; // cyan-300
          }
        }
        return '#475569'; // slate-600
    });


   }, [selectedNodeId, hoveredNodeId, data.links, data.nodes]);

  return <svg ref={svgRef} className="w-full h-full" />;
};

export default InteractiveGraph;

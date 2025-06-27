import React, { useState, useEffect, useMemo } from 'react';
import { studyData } from './data';
import type { GraphNode, GraphLink, Topic, Subject } from './types';
import InteractiveGraph from './components/InteractiveGraph';
import TopicDetail from './components/TopicDetail';
import { LogoIcon } from './components/Icons';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    const newNodes: GraphNode[] = [];
    const newLinks: GraphLink[] = [];
    const interSubjectLinks = new Set<string>();

    studyData.forEach((topic: Topic, index) => {
      const topicId = `topic-${index}`;
      newNodes.push({
        id: topicId,
        type: 'topic',
        data: topic,
        radius: 45,
      });

      const subjectNameToIdMap = new Map<string, string>();
      // First pass: create subject nodes and map their names to IDs
      topic.subjects.forEach((subject: Subject, subIndex) => {
        const subjectId = `subject-${index}-${subIndex}`;
        newNodes.push({
          id: subjectId,
          type: 'subject',
          data: subject,
          radius: 25,
        });
        subjectNameToIdMap.set(subject.name, subjectId);
        
        // Link to parent topic
        newLinks.push({
          source: subjectId,
          target: topicId,
          type: 'topic-subject',
        });
      });
      
      // Second pass: create inter-subject links
      topic.subjects.forEach((subject: Subject) => {
        if (subject.connection_to_others) {
          const sourceId = subjectNameToIdMap.get(subject.name);
          if (!sourceId) return;

          subject.connection_to_others.forEach(targetName => {
            const targetId = subjectNameToIdMap.get(targetName);
            if (targetId) {
              // Avoid duplicate links (A->B and B->A) by creating a sorted key
              const linkKey = [sourceId, targetId].sort().join('-');
              if (!interSubjectLinks.has(linkKey)) {
                newLinks.push({
                  source: sourceId,
                  target: targetId,
                  type: 'subject-subject',
                });
                interSubjectLinks.add(linkKey);
              }
            }
          });
        }
      });
    });

    setNodes(newNodes);
    setLinks(newLinks);
  }, []);

  const graphData = useMemo(() => ({ nodes, links }), [nodes, links]);

  return (
    <div className="relative w-screen h-screen bg-slate-900 text-slate-100 overflow-hidden">
      <header className="absolute top-0 left-0 w-full p-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-sm p-3 rounded-lg pointer-events-auto">
          <LogoIcon />
          <h1 className="text-xl font-bold text-slate-200 tracking-tight">Grafo Interattivo di Studio</h1>
        </div>
         <div className="bg-slate-900/50 backdrop-blur-sm p-3 rounded-lg pointer-events-auto hidden md:block">
            <p className="text-sm text-slate-400">Trascina, zooma e clicca sui nodi.</p>
        </div>
      </header>

      <InteractiveGraph
        data={graphData}
        onNodeClick={setSelectedNode}
        selectedNodeId={selectedNode?.id || null}
      />
      
      <TopicDetail
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};

export default App;
import type { SimulationNodeDatum } from 'd3-force';

export interface Subject {
  name: string;
  commission_type: 'Commissario Interno' | 'Commissario Esterno' | 'Commissario Interno e Esterno' | null;
  content: string;
  connection_to_prompt: string;
  connection_to_others?: string[];
}

export interface Topic {
  title: string;
  prompt_text: string;
  introduction: string;
  conclusion: string;
  subjects: Subject[];
}

export type NodeData = Topic | Subject;

export interface GraphNode extends SimulationNodeDatum {
  id: string;
  type: 'topic' | 'subject';
  data: NodeData;
  radius: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: 'topic-subject' | 'subject-subject';
}
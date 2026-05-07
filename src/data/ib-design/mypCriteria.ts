import type { SourceMetadata } from '../types';
import { sourceById } from '../sources/officialReferences';

const sourceMetadata = sourceById('prepared-ib-y6-y12-summary');

export type MypDesignCriterion = {
  id: string;
  criterion: 'A' | 'B' | 'C' | 'D';
  title: string;
  studentSummary: string;
  keyLearningElements: string[];
  websiteActivities: string[];
  portfolioEvidence: string[];
  teacherNotes: string;
  sourceMetadata: SourceMetadata;
};

export const ibMypDesignCriteria: MypDesignCriterion[] = [
  {
    id: 'myp-criterion-a',
    criterion: 'A',
    title: 'Inquiring and Analysing',
    studentSummary: 'Designers do not start by making. They first understand the problem, users, context and existing solutions, then explain why the design opportunity matters.',
    keyLearningElements: ['problem/opportunity identification', 'user and context research', 'existing product analysis', 'research planning', 'design brief writing', 'evidence-based justification'],
    websiteActivities: ['choose a real user and write a needs statement', 'analyse an existing product using function, aesthetics, ergonomics and sustainability', 'create a research plan with primary and secondary sources', 'convert findings into a design brief'],
    portfolioEvidence: ['problem statement', 'target user profile', 'product analysis notes', 'research summary', 'design brief'],
    teacherNotes: 'Criterion A should train students to connect research evidence to the design brief rather than collecting disconnected facts.',
    sourceMetadata,
  },
  {
    id: 'myp-criterion-b',
    criterion: 'B',
    title: 'Developing Ideas',
    studentSummary: 'Students use research to create possible solutions, communicate ideas clearly and select the strongest concept using criteria.',
    keyLearningElements: ['design specification', 'idea generation', 'SCAMPER', 'low/medium/high fidelity drawings', 'annotation', 'concept selection', 'planning drawings'],
    websiteActivities: ['use SCAMPER to modify an existing product', 'produce three annotated concept sketches', 'compare sketches against specification criteria', 'create a final design drawing with dimensions and material notes'],
    portfolioEvidence: ['specification table', 'idea sketches', 'annotated development drawings', 'selection matrix', 'final proposal'],
    teacherNotes: 'Emphasise drawing quality, annotation, measurable specifications and evidence-based concept selection.',
    sourceMetadata,
  },
  {
    id: 'myp-criterion-c',
    criterion: 'C',
    title: 'Creating the Solution',
    studentSummary: 'Students turn ideas into prototypes, products, systems or models. They plan the making process, use appropriate tools and techniques, and record changes.',
    keyLearningElements: ['production planning', 'technical skills', 'material/tool selection', 'safety and risk awareness', 'process documentation', 'change justification', 'prototype quality'],
    websiteActivities: ['create a production plan with time, tools and materials', 'document making stages with photos and notes', 'justify changes when the design is modified', 'complete a safe tool-use checklist'],
    portfolioEvidence: ['production plan', 'making process photos', 'prototype/model', 'change log', 'material/tool list'],
    teacherNotes: 'Assess planning, safe practice and documented change, not just whether the artefact looks finished.',
    sourceMetadata,
  },
  {
    id: 'myp-criterion-d',
    criterion: 'D',
    title: 'Evaluating',
    studentSummary: 'Students test whether the solution works for the user and explain how it could be improved. Evaluation should be evidence-based, not only personal opinion.',
    keyLearningElements: ['testing methods', 'evaluation against specification', 'user feedback', 'data collection', 'reflection', 'improvement proposal'],
    websiteActivities: ['create a test plan for function, usability, safety and aesthetics', 'collect peer/user feedback', 'compare results against success criteria', 'write a next-iteration plan'],
    portfolioEvidence: ['test plan', 'user feedback', 'evaluation table', 'final reflection', 'improvement sketches'],
    teacherNotes: 'Students should compare evidence against criteria and propose specific next iterations.',
    sourceMetadata,
  },
];

export const mypScamperPrompts = [
  { prompt: 'Substitute', designQuestion: 'What material, part, user, shape or process could be replaced?' },
  { prompt: 'Combine', designQuestion: 'What ideas, functions or user experiences could be joined?' },
  { prompt: 'Adapt', designQuestion: 'What can be borrowed from another product or context?' },
  { prompt: 'Modify', designQuestion: 'What can be enlarged, reduced, reshaped or improved?' },
  { prompt: 'Put to another use', designQuestion: 'Can the product serve a new group or purpose?' },
  { prompt: 'Eliminate', designQuestion: 'What can be simplified or removed?' },
  { prompt: 'Reverse/Rearrange', designQuestion: 'What happens if the order, layout or interaction is changed?' },
];

export const mypDrawingFidelity = [
  { level: 'Low fidelity', explanation: 'Quick, rough sketches that explore many possibilities.', suitableUse: 'early ideation' },
  { level: 'Medium fidelity', explanation: 'Clearer drawings with labels, rough dimensions and user notes.', suitableUse: 'concept development' },
  { level: 'High fidelity', explanation: 'Polished drawings, CAD, renders or technical layouts.', suitableUse: 'final proposal and communication' },
];

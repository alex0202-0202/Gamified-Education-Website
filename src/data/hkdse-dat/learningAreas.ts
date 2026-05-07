import type { DesignTechnologyTopic } from '../types';
import { sourceById } from '../sources/officialReferences';

const edbSummary = sourceById('prepared-ib-hkdse-summary');

export const hkdseDatLearningAreas: DesignTechnologyTopic[] = [
  {
    id: 'dat-la-design-innovation',
    curriculum: 'HKDSE DAT',
    version: 'HKDSE',
    category: 'Learning Area',
    titleZh: '學習範疇一：設計與創新',
    titleEn: 'Design and Innovation',
    studentSummary:
      'This area helps students understand how designers identify problems, investigate user needs, generate ideas, develop concepts, communicate proposals and evaluate solutions. It is the foundation of DAT project work.',
    teacherSummary:
      'Use this strand to anchor design-process routines, product analysis, specification writing, visual communication and evidence-based iteration.',
    designFocus: ['design process', 'product analysis', 'innovation', 'visual communication'],
    keyConcepts: ['design process', 'user needs', 'design opportunities', 'creative thinking', 'specification', 'prototype testing', 'iteration'],
    classroomActivities: ['mini design challenge', 'product analysis worksheet', 'sketch-to-prototype workflow', 'peer critique', 'design justification writing'],
    projectOutcome: 'Design brief, concept sketches, prototype plan and evaluation notes.',
    assessmentFocus: ['problem identification', 'target users', 'creativity', 'feasibility', 'design communication', 'reflection'],
    portfolioEvidence: ['user/context notes', 'specification', 'idea sketches', 'prototype photos', 'test feedback'],
    iaOrSbaConnection: 'DAT SBA connection: supports problem identification, design development, testing and portfolio reflection.',
    sourceMetadata: edbSummary,
  },
  {
    id: 'dat-la-technological-principles',
    curriculum: 'HKDSE DAT',
    version: 'HKDSE',
    category: 'Learning Area',
    titleZh: '學習範疇二：科技原理',
    titleEn: 'Technological Principles',
    studentSummary:
      'This area connects design decisions with technical understanding. Students apply principles related to mechanisms, materials, structures, electronics, systems, control, modelling and production when developing feasible solutions.',
    teacherSummary:
      'Use this strand to make technical reasoning visible in students’ product decisions, not as isolated theory.',
    designFocus: ['technical feasibility', 'materials and mechanisms', 'systems design', 'manufacturing'],
    keyConcepts: ['mechanisms', 'systems thinking', 'input-process-output', 'materials', 'structures', 'manufacturing', 'testing', 'CAD/visualisation where relevant'],
    classroomActivities: ['mechanism analysis', 'material selection comparison', 'control-system flowchart', 'prototype testing log', 'failure-analysis task'],
    projectOutcome: 'Technical decision log showing materials, mechanisms, systems and testing decisions.',
    assessmentFocus: ['technical accuracy', 'material-property match', 'function', 'testing', 'manufacturing feasibility'],
    portfolioEvidence: ['material matrix', 'system diagram', 'CAD/drawing evidence', 'testing log', 'failure analysis'],
    iaOrSbaConnection: 'DAT SBA connection: supports technical justification, prototype development and testing evidence.',
    sourceMetadata: edbSummary,
  },
  {
    id: 'dat-la-value-impact',
    curriculum: 'HKDSE DAT',
    version: 'HKDSE',
    category: 'Learning Area',
    titleZh: '學習範疇三：價值與影響',
    titleEn: 'Value and Impact',
    studentSummary:
      'This area trains students to evaluate design beyond function. Students consider environmental responsibility, user lifestyle, social change, ethics, cultural meaning, economic feasibility and long-term impact.',
    teacherSummary:
      'Use this strand to move evaluation beyond “it works” into evidence about people, society, sustainability and responsible innovation.',
    designFocus: ['impact evaluation', 'sustainability', 'responsible innovation', 'inclusive design'],
    keyConcepts: ['sustainable design', 'ethical design', 'social impact', 'environmental impact', 'technology and lifestyle', 'inclusive design', 'responsible innovation'],
    classroomActivities: ['life-cycle reflection', 'stakeholder map', 'sustainability redesign', 'impact debate', 'design evaluation essay'],
    projectOutcome: 'Impact evaluation section for a DAT design project or redesign proposal.',
    assessmentFocus: ['sustainability reasoning', 'stakeholder impact', 'ethical judgement', 'inclusive design', 'evaluation quality'],
    portfolioEvidence: ['stakeholder map', 'life-cycle notes', 'ethical trade-off table', 'reflection paragraph'],
    iaOrSbaConnection: 'DAT SBA connection: supports evaluation, sustainability justification and reflection.',
    sourceMetadata: edbSummary,
  },
];

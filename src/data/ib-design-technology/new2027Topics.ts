import type { DesignTechnologyTopic } from '../types';
import { sourceById } from '../sources/officialReferences';

const ibSummary = sourceById('prepared-ib-summary');

export const ibDtNew2027Strands: DesignTechnologyTopic[] = [
  {
    id: 'ib-2027-design-in-theory',
    curriculum: 'IB DP Design Technology',
    version: 'IB first assessment 2027',
    category: '2027 Strand',
    titleEn: 'A. Design in Theory',
    studentSummary:
      'Theory strand: explain why products work for users, how design knowledge is generated, how prototypes support inquiry, and how material properties guide decision-making.',
    teacherSummary: 'Use as the conceptual foundation for the new first-assessment 2027 pathway.',
    designFocus: ['ergonomics', 'user-centred research', 'prototyping', 'material properties'],
    keyConcepts: ['A1.1 Ergonomics', 'A2.1 User-centred research methods', 'A2.2 Prototyping', 'A3.1 Material classification and properties'],
    classroomActivities: ['ergonomic product audit', 'research-method selection', 'prototype purpose check', 'material classification exercise'],
    studentChallenge: 'Explain how user evidence, prototyping and material properties justify a design decision.',
    projectOutcome: 'Theory-linked design rationale and checklist.',
    assessmentFocus: ['conceptual accuracy', 'user evidence', 'prototype reasoning', 'material-property match'],
    portfolioEvidence: ['concept card', 'worked design example', 'student checklist', 'short reflection prompt'],
    iaOrSbaConnection: 'IA link: supports project rationale, research justification and prototype purpose.',
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-2027-design-in-practice',
    curriculum: 'IB DP Design Technology',
    version: 'IB first assessment 2027',
    category: '2027 Strand',
    titleEn: 'B. Design in Practice',
    studentSummary:
      'Practice strand: apply user research, iterative design process, modelling, prototyping and material selection to real product development.',
    teacherSummary: 'Use as the practical project-development strand for the new first-assessment 2027 pathway.',
    designFocus: ['design process', 'modelling', 'prototyping', 'material selection'],
    keyConcepts: ['B1.1 User Centred Design', 'B2.1 Design Process', 'B2.2 Modelling and Prototyping', 'B3.1 Material Selection'],
    classroomActivities: ['user-centred design sprint', 'iteration log', 'prototype testing', 'material selection matrix'],
    studentChallenge: 'Develop and test a product concept through user research, modelling and material-selection evidence.',
    projectOutcome: 'Iterative product-development evidence pack.',
    assessmentFocus: ['process quality', 'model/prototype evidence', 'material justification', 'iteration'],
    portfolioEvidence: ['concept card', 'worked design example', 'student checklist', 'short reflection prompt'],
    iaOrSbaConnection: 'IA link: supports design development, modelling and material decisions.',
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-2027-design-in-context',
    curriculum: 'IB DP Design Technology',
    version: 'IB first assessment 2027',
    category: '2027 Strand',
    titleEn: 'C. Design in Context',
    studentSummary:
      'Context strand: judge design decisions ethically, inclusively, sustainably and analytically within broader social, environmental and economic systems.',
    teacherSummary: 'Use as the critical judgement strand for new-course ethical, inclusive and sustainability analysis.',
    designFocus: ['designer responsibility', 'inclusive design', 'sustainability', 'circular economy', 'product analysis'],
    keyConcepts: ['C1.1 Responsibility of the designer', 'C1.2 Inclusive design', 'C2.1 Design for sustainability', 'C2.2 Design for a circular economy', 'C3.1 Product analysis and evaluation'],
    classroomActivities: ['responsible design debate', 'inclusive redesign', 'circular economy map', 'product evaluation task'],
    studentChallenge: 'Evaluate a product decision through ethical, inclusive, sustainable and economic lenses.',
    projectOutcome: 'Context evaluation and redesign proposal.',
    assessmentFocus: ['ethical judgement', 'inclusive reasoning', 'sustainability strategy', 'evaluation quality'],
    portfolioEvidence: ['concept card', 'worked design example', 'student checklist', 'short reflection prompt'],
    iaOrSbaConnection: 'IA link: supports impact evaluation, circular strategy and final reflection.',
    sourceMetadata: ibSummary,
  },
];

export const ibDt2027QuizPrompts = [
  'Which evidence best supports an ergonomic design decision?',
  'What prototype fidelity is appropriate for testing early user interaction?',
  'Which material property most directly affects long-term product performance?',
  'How does inclusive design change the design brief?',
  'What makes a circular economy strategy stronger than simple recycling?',
];

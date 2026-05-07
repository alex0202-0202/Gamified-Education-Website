import type { SourceMetadata } from '../types';
import { sourceById } from '../sources/officialReferences';

const sourceMetadata = sourceById('prepared-ib-y6-y12-summary');

export type MypDesignYear = {
  id: string;
  yearGroup: string;
  ibStage: string;
  websiteFocus: string;
  studentOutcome: string;
  projectExamples: string[];
  portfolioEvidence: string[];
  teacherNotes: string;
  sourceMetadata: SourceMetadata;
};

export const ibMypDesignYears: MypDesignYear[] = [
  {
    id: 'y6-myp1',
    yearGroup: 'Y6',
    ibStage: 'MYP Year 1 foundation',
    websiteFocus: 'Understanding the design cycle, identifying problems, simple research, basic sketching and low-risk prototyping.',
    studentOutcome: 'Short design challenge with evidence of inquiry, ideas, making and reflection.',
    projectExamples: ['desk organiser for a student user', 'recycled-material packaging', 'classroom signage or wayfinding object', 'small toy or game improvement'],
    portfolioEvidence: ['simple problem statement', 'basic user feedback', 'idea sketches', 'prototype photo', 'short reflection'],
    teacherNotes: 'Use concrete, familiar contexts and assess the full design cycle rather than the final object alone.',
    sourceMetadata,
  },
  {
    id: 'y7-myp2',
    yearGroup: 'Y7',
    ibStage: 'MYP Year 2 development',
    websiteFocus: 'More structured research, design specifications, idea generation and testing.',
    studentOutcome: 'Design folder with user research, annotated concepts and prototype testing.',
    projectExamples: ['packaging redesign', 'personal storage product', 'simple assistive product', 'learning game prototype'],
    portfolioEvidence: ['research notes', 'specification table', 'annotated concepts', 'test notes', 'improvement plan'],
    teacherNotes: 'Introduce design specifications as measurable evidence, not as decorative portfolio text.',
    sourceMetadata,
  },
  {
    id: 'y8-myp3',
    yearGroup: 'Y8',
    ibStage: 'MYP Year 3 consolidation',
    websiteFocus: 'Deeper user/context analysis, iteration, technical skill development and evaluation.',
    studentOutcome: 'Product, system or service proposal supported by design evidence.',
    projectExamples: ['ergonomic product redesign', 'simple mechanism product', 'school-service touchpoint', 'sustainable product improvement'],
    portfolioEvidence: ['context analysis', 'comparison of existing products', 'iteration record', 'prototype test data', 'evaluation table'],
    teacherNotes: 'Students should show how research changes design decisions through iteration.',
    sourceMetadata,
  },
  {
    id: 'y9-myp4',
    yearGroup: 'Y9',
    ibStage: 'MYP Year 4 advanced',
    websiteFocus: 'Independent inquiry, stronger technical execution, CAD/modelling, and testing against criteria.',
    studentOutcome: 'Developed project with iterative prototyping and evaluation data.',
    projectExamples: ['CAD-supported product redesign', 'inclusive-design challenge', 'controlled system prototype', 'material testing project'],
    portfolioEvidence: ['research plan', 'CAD/model evidence', 'prototype iterations', 'criteria-based tests', 'user feedback'],
    teacherNotes: 'Use this year to build DP-ready habits: source tracking, justified decisions and precise evaluation language.',
    sourceMetadata,
  },
  {
    id: 'y10-myp5',
    yearGroup: 'Y10',
    ibStage: 'MYP Year 5 pre-DP bridge',
    websiteFocus: 'Portfolio quality, command terms, design justification, research quality and evaluation.',
    studentOutcome: 'MYP Design portfolio preparing students for DP Design Technology.',
    projectExamples: ['independent design inquiry', 'redesign project with user testing', 'sustainable product-system proposal', 'technical prototype with evaluation'],
    portfolioEvidence: ['design brief', 'research synthesis', 'final proposal', 'testing evidence', 'next-iteration recommendation'],
    teacherNotes: 'Make command terms explicit and require evidence-backed justification to bridge into DP Design Technology.',
    sourceMetadata,
  },
];

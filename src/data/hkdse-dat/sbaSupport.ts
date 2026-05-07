import type { SupportModule } from '../types';
import { sourceById } from '../sources/officialReferences';

const edbSummary = sourceById('prepared-ib-hkdse-summary');

export const hkdseDatSbaSupport: SupportModule[] = [
  {
    id: 'dat-sba-launch',
    title: 'DAT SBA Project Launch',
    goal: 'Help students define a design opportunity that is appropriate for DAT, feasible in school, and connected to user/context evidence.',
    modules: ['problem identification', 'target user and context', 'design brief', 'feasibility filter'],
    sourceMetadata: edbSummary,
  },
  {
    id: 'dat-sba-research',
    title: 'DAT SBA Research and Specification',
    goal: 'Support useful primary/secondary research, product analysis, specification writing and source tracking.',
    modules: ['user interview', 'product analysis', 'source log', 'design specification'],
    sourceMetadata: edbSummary,
  },
  {
    id: 'dat-sba-development',
    title: 'DAT SBA Design Development',
    goal: 'Guide students from concept generation into materials, modelling, CAD, prototype planning and technical decision-making.',
    modules: ['idea generation', 'concept selection', 'material choice', 'CAD/model evidence', 'prototype plan'],
    sourceMetadata: edbSummary,
  },
  {
    id: 'dat-sba-testing-evaluation',
    title: 'DAT SBA Testing and Evaluation',
    goal: 'Help students test against requirements, record evidence, evaluate impact and propose realistic improvement.',
    modules: ['test plan', 'data table', 'user feedback', 'evaluation paragraph', 'next iteration'],
    sourceMetadata: edbSummary,
  },
];

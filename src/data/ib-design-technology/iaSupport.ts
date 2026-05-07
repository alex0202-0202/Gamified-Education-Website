import type { SupportModule } from '../types';
import { sourceById } from '../sources/officialReferences';

const ibSummary = sourceById('prepared-ib-summary');

export const ibDtIaSupport: SupportModule[] = [
  {
    id: 'ib-ia-project-launch',
    title: 'Project launch / Selecting an IA Topic',
    goal: 'Help students identify a genuine design opportunity with a clear user, context and problem.',
    modules: ['problem statement', 'user profile', 'opportunity checklist', 'feasibility filter'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-ia-research-phase',
    title: 'Research phase',
    goal: 'Guide primary/secondary research, ethical consent, survey/interview design, observation and source recording.',
    modules: ['research plan template', 'ethics checklist', 'survey questions', 'source log'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-ia-development-phase',
    title: 'Development phase',
    goal: 'Support conceptual design, detailed development, prototype planning and testing.',
    modules: ['concept selection matrix', 'prototype plan', 'iteration evidence', 'CAD/model evidence'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-ia-evaluation-phase',
    title: 'Evaluation phase',
    goal: 'Support testing against requirements, user feedback, evaluation, commercial development and production decisions for HL.',
    modules: ['test plan', 'data table', 'evaluation paragraph frame', 'next-iteration proposal'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-ia-presentation',
    title: 'Presentation',
    goal: 'Help students communicate project evidence clearly, concisely and visually.',
    modules: ['page layout guide', 'caption checklist', 'annotation guide', 'page-limit reminder'],
    sourceMetadata: ibSummary,
  },
];

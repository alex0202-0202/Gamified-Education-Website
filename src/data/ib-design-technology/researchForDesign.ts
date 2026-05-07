import type { SupportModule } from '../types';
import { sourceById } from '../sources/officialReferences';

const ibSummary = sourceById('prepared-ib-summary');

export const researchForDesignModules: SupportModule[] = [
  {
    id: 'research-ethics',
    title: 'Research ethics',
    goal: 'Help students collect user evidence responsibly, with consent, privacy awareness and respect for participants.',
    modules: ['consent script', 'participant risk check', 'privacy note', 'teacher approval checkpoint'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'research-tools',
    title: 'Research tools',
    goal: 'Choose suitable tools for design inquiry rather than collecting generic information.',
    modules: ['interview', 'observation', 'survey', 'product analysis', 'usability test'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'survey-design',
    title: 'Survey design',
    goal: 'Write survey questions that produce useful design evidence and avoid leading or vague wording.',
    modules: ['question types', 'bias check', 'sample planning', 'results summary'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'research-strategies',
    title: 'Research strategies',
    goal: 'Plan primary and secondary research so it answers specific design decisions.',
    modules: ['research question', 'method selection', 'triangulation', 'evidence-to-specification link'],
    sourceMetadata: ibSummary,
  },
  {
    id: 'source-management',
    title: 'Source management / citation workflow',
    goal: 'Support transparent source recording for IB IA and DAT SBA without reproducing protected materials.',
    modules: ['source log', 'image permission note', 'paraphrase check', 'bibliography workflow'],
    sourceMetadata: ibSummary,
  },
];

import type { DesignTechnologyTopic } from '../types';
import { sourceById } from '../sources/officialReferences';

const ibSummary = sourceById('prepared-ib-summary');

export const ibDtHlExtension2026: DesignTechnologyTopic[] = [
  {
    id: 'ib-2026-topic-7-user-centred-design',
    curriculum: 'IB DP Design Technology',
    version: 'IB last assessment 2026',
    category: 'HL Extension Topic',
    titleEn: 'Topic 7: User-Centred Design',
    studentSummary:
      'Students should learn to design with users, not only for users. User research should inform requirements, testing, iteration and final evaluation.',
    designFocus: ['user-centred design', 'usability', 'ethical user research'],
    keyConcepts: ['UCD process', 'usability', 'user research strategies', 'user groups', 'designing beyond basic usability'],
    classroomActivities: ['interview protocol', 'usability test', 'persona', 'journey map', 'accessibility redesign', 'observation study'],
    assessmentFocus: ['research quality', 'ethical methods', 'user evidence', 'usability metrics', 'iteration'],
    portfolioEvidence: ['research plan', 'persona', 'journey map', 'usability data', 'iteration notes'],
    iaOrSbaConnection: 'IB IA connection: supports primary research, testing and evaluation.',
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-2026-topic-8-sustainability',
    curriculum: 'IB DP Design Technology',
    version: 'IB last assessment 2026',
    category: 'HL Extension Topic',
    titleEn: 'Topic 8: Sustainability',
    studentSummary:
      'HL students should connect product decisions to systems: consumption patterns, circularity, material flows, behaviour change and sustainable innovation models.',
    designFocus: ['sustainability systems', 'circularity', 'behaviour change'],
    keyConcepts: ['sustainable development', 'sustainable consumption', 'sustainable design', 'sustainable innovation'],
    classroomActivities: ['circular redesign', 'repairability audit', 'sustainable business model analysis', 'carbon/material footprint comparison'],
    assessmentFocus: ['systems thinking', 'sustainability depth', 'stakeholder impact', 'circular economy reasoning'],
    portfolioEvidence: ['circular strategy', 'repairability audit', 'impact map', 'trade-off reflection'],
    iaOrSbaConnection: 'IB IA connection: supports HL-level sustainability evaluation and innovation reasoning.',
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-2026-topic-9-innovation-markets',
    curriculum: 'IB DP Design Technology',
    version: 'IB last assessment 2026',
    category: 'HL Extension Topic',
    titleEn: 'Topic 9: Innovation and Markets',
    studentSummary:
      'Design does not end with prototype development. HL students should understand how market research, branding and strategy shape whether innovations succeed.',
    designFocus: ['market research', 'branding', 'innovation strategy'],
    keyConcepts: ['corporate strategies', 'market sectors/segments', 'marketing mix', 'market research', 'branding'],
    classroomActivities: ['market segmentation profile', 'competitor analysis', 'branding board', 'marketing mix for a design solution'],
    assessmentFocus: ['market evidence', 'strategic fit', 'product positioning', 'design/marketing specification'],
    portfolioEvidence: ['market profile', 'competitor map', 'branding rationale', 'specification refinement'],
    iaOrSbaConnection: 'IB IA connection: supports HL commercial product development and market justification.',
    sourceMetadata: ibSummary,
  },
  {
    id: 'ib-2026-topic-10-commercial-production',
    curriculum: 'IB DP Design Technology',
    version: 'IB last assessment 2026',
    category: 'HL Extension Topic',
    titleEn: 'Topic 10: Commercial Production',
    studentSummary:
      'HL students should evaluate how products move from prototype to commercial production, balancing cost, quality, scale, automation and risk.',
    designFocus: ['commercial production', 'quality systems', 'production planning'],
    keyConcepts: ['JIT/JIC', 'lean production', 'computer-integrated manufacturing', 'quality management', 'economic viability'],
    classroomActivities: ['production plan', 'quality control checklist', 'JIT vs JIC comparison', 'lean waste audit', 'break-even discussion'],
    assessmentFocus: ['commercial feasibility', 'quality systems', 'production risk', 'cost', 'scale decisions'],
    portfolioEvidence: ['production plan', 'QC checklist', 'risk table', 'commercial feasibility notes'],
    iaOrSbaConnection: 'IB IA connection: supports HL commercial production criteria and final evaluation.',
    sourceMetadata: ibSummary,
  },
];

import type { SourceMetadata } from '../types';

export type EdbDtModule = {
  id: string;
  stage: 'S1' | 'S2' | 'S3';
  code: string;
  topicZh: string;
  topicEn: string;
  learningElements: string[];
  lessons: number;
  websiteSummary: string;
  projectSkills: string[];
  portfolioEvidence: string[];
  sourceMetadata: SourceMetadata;
};

export type EdbDtCaseStudy = {
  id: string;
  titleZh: string;
  titleEn: string;
  websiteUse: string;
  linkedSkills: string[];
  discussionPrompt: string;
  sourceMetadata: SourceMetadata;
};

export type EdbSharedResource = {
  id: string;
  titleZh: string;
  titleEn: string;
  websiteSummary: string;
  suitableStages: string[];
  linkedSkills: string[];
  sourceMetadata: SourceMetadata;
};

export type CurriculumName = 'HKDSE DAT' | 'IB DP Design Technology';

export type CurriculumVersion =
  | 'HKDSE'
  | 'IB last assessment 2026'
  | 'IB first assessment 2027';

export type SourceMetadata = {
  sourceName: string;
  sourceUrl: string;
  attributionNote: string;
  copyrightUse: 'summary-only';
};

export type DesignTechnologyTopic = {
  id: string;
  curriculum: CurriculumName;
  version?: CurriculumVersion;
  category: string;
  titleZh?: string;
  titleEn: string;
  studentSummary: string;
  teacherSummary?: string;
  designFocus: string[];
  keyConcepts: string[];
  relatedLearningAreas?: string[];
  relatedElectives?: string[];
  studentChallenge?: string;
  classroomActivities: string[];
  projectOutcome?: string;
  assessmentFocus: string[];
  portfolioEvidence?: string[];
  iaOrSbaConnection?: string;
  sourceMetadata: SourceMetadata;
};

export type SupportModule = {
  id: string;
  title: string;
  goal: string;
  modules: string[];
  sourceMetadata: SourceMetadata;
};

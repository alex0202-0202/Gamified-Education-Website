export type QuestionCurriculum =
  | 'IB MYP Design'
  | 'IB DP Design Technology'
  | 'EDB DT'
  | 'HKDSE DAT'
  | 'Shared Design Skills';

export type QuestionYearGroup =
  | 'Y6'
  | 'Y7'
  | 'Y8'
  | 'Y9'
  | 'Y10'
  | 'Y11'
  | 'Y12'
  | 'S1'
  | 'S2'
  | 'S3'
  | 'S4'
  | 'S5'
  | 'S6';

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionItem = {
  id: string;
  curriculum: QuestionCurriculum;
  yearGroup: QuestionYearGroup;
  topicId: string;
  topicTitle: string;
  difficulty: QuestionDifficulty;
  gameMode: string[];
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  relatedTerms: string[];
  sourceTopic: string;
};

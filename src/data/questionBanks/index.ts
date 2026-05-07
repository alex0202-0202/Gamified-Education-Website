import { edbDtQuestionBank } from './edb-dt/questions';
import { edbS1DesignTechnologyQuestionBank } from '../edb-dt/s1QuestionBank';
import { hkdseDatQuestionBank } from './hkdse-dat/questions';
import { ibDpQuestionBank } from './ib-dp/questions';
import { ibMypQuestionBank } from './ib-myp/questions';
import { fingerJointBoxQuestions } from './design-skills/fingerJointBoxQuestions';
import { joiningMethodsQuestions } from './design-skills/joiningMethodsQuestions';
import { orthographicProjectionQuestions } from './design-skills/orthographicProjectionQuestions';
import type { QuestionCurriculum, QuestionDifficulty, QuestionItem, QuestionYearGroup } from './types';

export type { QuestionCurriculum, QuestionDifficulty, QuestionItem, QuestionYearGroup } from './types';

export const questionBankIndex: QuestionItem[] = [
  ...ibMypQuestionBank,
  ...ibDpQuestionBank,
  ...edbS1DesignTechnologyQuestionBank,
  ...edbDtQuestionBank,
  ...hkdseDatQuestionBank,
  ...orthographicProjectionQuestions,
  ...joiningMethodsQuestions,
  ...fingerJointBoxQuestions,
];

export const getQuestionsForPractice = (filters: {
  curriculum?: QuestionCurriculum;
  yearGroup?: QuestionYearGroup;
  topicId?: string;
  difficulty?: QuestionDifficulty;
  gameMode?: string;
}): QuestionItem[] => questionBankIndex.filter((item) => {
  if (filters.curriculum && item.curriculum !== filters.curriculum) return false;
  if (filters.yearGroup && item.yearGroup !== filters.yearGroup) return false;
  if (filters.topicId && item.topicId !== filters.topicId) return false;
  if (filters.difficulty && item.difficulty !== filters.difficulty) return false;
  if (filters.gameMode && !item.gameMode.includes(filters.gameMode)) return false;
  return true;
});

export const getQuestionTopicsForPractice = (filters: {
  curriculum?: QuestionCurriculum;
  yearGroup?: QuestionYearGroup;
  gameMode?: string;
}): Array<{ id: string; title: string; count: number }> => {
  const topics = new Map<string, { id: string; title: string; count: number }>();
  getQuestionsForPractice(filters).forEach((item) => {
    const current = topics.get(item.topicId);
    if (current) {
      current.count += 1;
      return;
    }
    topics.set(item.topicId, { id: item.topicId, title: item.topicTitle, count: 1 });
  });
  return [...topics.values()];
};

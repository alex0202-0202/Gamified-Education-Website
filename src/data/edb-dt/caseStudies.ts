import { sourceById } from '../sources/officialReferences';
import type { EdbDtCaseStudy } from './types';

const sourceMetadata = sourceById('prepared-edb-s1-s6-summary');

export const edbJuniorDtCaseStudies: EdbDtCaseStudy[] = [
  {
    id: 'junior-ergonomic-design-process',
    titleZh: '人體工程學的設計過程',
    titleEn: 'Ergonomic Design Process',
    websiteUse: 'Use for user-centred design, anthropometrics, comfort, safety and iterative improvement.',
    linkedSkills: ['user-centred design', 'anthropometrics', 'comfort', 'safety', 'iteration'],
    discussionPrompt: 'How can body measurements and user behaviour change a product design?',
    sourceMetadata,
  },
  {
    id: 'junior-digital-music-impact',
    titleZh: '數碼音樂的發展和影響',
    titleEn: 'Development and Impact of Digital Music',
    websiteUse: 'Use for technology evolution, user behaviour, product/service systems and cultural impact.',
    linkedSkills: ['technology evolution', 'user behaviour', 'product-service systems', 'cultural impact'],
    discussionPrompt: 'How did changing technology change the way users access, share and value music?',
    sourceMetadata,
  },
  {
    id: 'junior-smart-phone-innovation',
    titleZh: '成功的創新——智能電話',
    titleEn: 'Successful Innovation - Smart Phone',
    websiteUse: 'Use for innovation, convergence, user experience, product ecosystem and social impact.',
    linkedSkills: ['innovation', 'convergence', 'user experience', 'product ecosystem', 'social impact'],
    discussionPrompt: 'Which design decisions made the smart phone more than a single-function product?',
    sourceMetadata,
  },
  {
    id: 'junior-three-greens',
    titleZh: '三綠——綠色設計、綠色科技和綠色企業',
    titleEn: 'Three Greens - Green Design, Technology and Enterprise',
    websiteUse: 'Use for sustainability, responsible production and business/design impact.',
    linkedSkills: ['green design', 'responsible production', 'enterprise', 'life-cycle thinking'],
    discussionPrompt: 'How can a design be environmentally responsible and still feasible for production?',
    sourceMetadata,
  },
];

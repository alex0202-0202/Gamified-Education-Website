import { sourceById } from '../sources/officialReferences';
import type { EdbSharedResource } from './types';

const sourceMetadata = sourceById('prepared-edb-s1-s6-summary');

export const edbSharedDtDatResources: EdbSharedResource[] = [
  {
    id: 'prototyping-product-design-resource',
    titleZh: '原型製作於產品設計過程中的應用 - 學習資源',
    titleEn: 'Prototyping in Product Design Process - Learning Resource',
    websiteSummary: 'Cross-year project skill: connect design brief, modelling, testing, iteration and portfolio evidence.',
    suitableStages: ['S1-S3 DT', 'S4-S6 DAT', 'IB MYP', 'IB DP'],
    linkedSkills: ['modelling', 'prototyping', 'testing', 'iteration', 'portfolio evidence'],
    sourceMetadata,
  },
  {
    id: 'prototyping-teaching-presentation',
    titleZh: '原型製作於產品設計過程中的應用 - 教學簡報',
    titleEn: 'Prototyping - Teaching Presentation',
    websiteSummary: 'Teacher resource for explaining prototype purpose, fidelity and testing.',
    suitableStages: ['S1-S6 DT/DAT teachers'],
    linkedSkills: ['prototype purpose', 'fidelity choice', 'testing strategy'],
    sourceMetadata,
  },
  {
    id: 'handheld-vacuum-prototype-video',
    titleZh: '手提吸塵機原型製作影片',
    titleEn: 'Handheld Vacuum Cleaner Prototyping Video',
    websiteSummary: 'Example video: use as demonstration of prototype development and product refinement.',
    suitableStages: ['S1-S3 DT', 'S4-S6 DAT'],
    linkedSkills: ['prototype development', 'product refinement', 'testing'],
    sourceMetadata,
  },
  {
    id: 'freehand-sketching-visual-thinking',
    titleZh: '運用徒手草圖作為視覺思維及傳意工具',
    titleEn: 'Freehand Sketching as Visual Thinking and Communication',
    websiteSummary: 'Cross-year communication skill: ideation, annotation, visual explanation and design discussion.',
    suitableStages: ['S1-S6 DT/DAT', 'IB MYP', 'IB DP'],
    linkedSkills: ['ideation', 'annotation', 'visual communication', 'design discussion'],
    sourceMetadata,
  },
  {
    id: 'mechanisms-components-resource',
    titleZh: '機械及機械元件 - 學習資源',
    titleEn: 'Mechanisms and Mechanical Components',
    websiteSummary: 'Use across structures, mechanisms, movement, automation, systems and DAT technological principles.',
    suitableStages: ['S1-S3 DT', 'S4-S6 DAT'],
    linkedSkills: ['mechanisms', 'movement', 'automation', 'systems'],
    sourceMetadata,
  },
  {
    id: 'flapping-bird-automata-video',
    titleZh: '拍翼小鳥自動機製作影片',
    titleEn: 'Flapping Bird Automata Making Video',
    websiteSummary: 'Example video: supports mechanisms, cams, linkages, biomimicry and project-based learning.',
    suitableStages: ['S1-S3 DT', 'S4-S6 DAT'],
    linkedSkills: ['cams', 'linkages', 'biomimicry', 'project-based learning'],
    sourceMetadata,
  },
];

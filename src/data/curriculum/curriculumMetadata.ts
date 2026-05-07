export type CurriculumPathwayId = 'ib-design-technology' | 'hkdse-dat';

export type CurriculumMetadata = {
  id: CurriculumPathwayId;
  title: string;
  audience: string[];
  currentScope: string[];
  assessmentSupport: string[];
  sourceNote: string;
  verificationTodo: string;
};

export const curriculumMetadata: CurriculumMetadata[] = [
  {
    id: 'ib-design-technology',
    title: 'IB Design Technology',
    audience: ['IB DP Design Technology students', 'IB MYP Design learners', 'Design Technology teachers'],
    currentScope: [
      'Design process',
      'Human factors and ergonomics',
      'Resource management and sustainable production',
      'Modelling',
      'Raw material to final product',
      'Innovation and design',
      'Classic design',
      'User-centred design',
      'Sustainability',
    ],
    assessmentSupport: ['Internal Assessment', 'design portfolio development', 'criteria-based feedback'],
    sourceNote: 'Uses IB Design Technology pathway labels for curriculum organisation.',
    verificationTodo: 'Verify every assessment percentage, command term, and syllabus version against current IBO publications before school launch.',
  },
  {
    id: 'hkdse-dat',
    title: 'HKDSE Design and Applied Technology / Design Technology',
    audience: ['HKDSE DAT students', 'junior Design and Technology learners', 'DAT teachers and panel heads'],
    currentScope: [
      'Compulsory part',
      'Elective part',
      'Design process',
      'Product design',
      'Technology application',
      'Materials and manufacturing',
      'Systems and control where relevant to DAT',
      'Design communication',
    ],
    assessmentSupport: ['Paper 1 preparation', 'Paper 2 preparation', 'SBA and portfolio support'],
    sourceNote: 'Uses HKDSE DAT and Hong Kong Design and Technology terminology for curriculum organisation.',
    verificationTodo: 'Verify module names, paper structure, SBA requirements, and official wording against EDB/HKEAA documents before school launch.',
  },
];

import type { SourceMetadata } from '../types';

export type OfficialReference = SourceMetadata & {
  id: string;
  publisher: string;
  notes: string;
};

const summaryAttribution =
  'Original website-ready summary based on prepared curriculum summary documents. Do not reproduce official worksheets, PDFs, slides, images, or assessment materials directly.';

export const officialReferences: OfficialReference[] = [
  {
    id: 'edb-tech-subjects-resources',
    publisher: 'Education Bureau, HKSAR',
    sourceName: 'EDB Technology Education - Technology Subjects Learning and Teaching Resources',
    sourceUrl: 'https://www.edb.gov.hk/en/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Reference index for S1-3 Design and Technology and S4-6 Design and Applied Technology learning and teaching resources.',
  },
  {
    id: 'edb-dat-user-guide',
    publisher: 'Education Bureau, HKSAR',
    sourceName: 'EDB S4-6 Design and Applied Technology Learning and Teaching Resources: User Guide',
    sourceUrl: 'https://www.edb.gov.hk/attachment/en/curriculum-development/kla/technology-edu/resources/tech-subjects/dat_lnt_user_guide_eng.pdf',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Use to verify official DAT resource scope, implementation notes, and cautions about updating teaching examples.',
  },
  {
    id: 'edb-dat-curriculum-guide-2015',
    publisher: 'Education Bureau, HKSAR',
    sourceName: 'DAT Curriculum and Assessment Guide (S4-6) (2015)',
    sourceUrl: 'https://www.edb.gov.hk/attachment/en/curriculum-development/kla/technology-edu/curriculum-doc/DAT_CAGuide_e_2015.pdf',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Use for official curriculum and assessment details before launch.',
  },
  {
    id: 'edb-s1-s3-dt-resources',
    publisher: 'Education Bureau, HKSAR',
    sourceName: 'EDB S1-S3 Design and Technology learning and teaching resources',
    sourceUrl: 'https://www.edb.gov.hk/en/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Reference for junior Design and Technology teaching plans, case studies, and shared project-skill resources.',
  },
  {
    id: 'edb-dat-thematic-resources',
    publisher: 'Education Bureau, HKSAR',
    sourceName: 'EDB S4-S6 DAT thematic learning and teaching resources',
    sourceUrl: 'https://www.edb.gov.hk/en/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Reference for the official DAT thematic resource titles. Website summaries should remain original and summary-only.',
  },
  {
    id: 'edb-dat-case-studies',
    publisher: 'Education Bureau, HKSAR',
    sourceName: 'EDB S4-S6 DAT case studies',
    sourceUrl: 'https://www.edb.gov.hk/en/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Reference for senior DAT case-study titles and classroom use. Do not reproduce official case-study documents directly.',
  },
  {
    id: 'ib-myp-design',
    publisher: 'International Baccalaureate',
    sourceName: 'IB MYP Design official page',
    sourceUrl: 'https://www.ibo.org/programmes/middle-years-programme/curriculum/design/',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Official public reference for MYP Design, the design cycle, inquiry, feasible solutions, testing, and evaluation.',
  },
  {
    id: 'ib-myp-curriculum',
    publisher: 'International Baccalaureate',
    sourceName: 'IB MYP curriculum official page',
    sourceUrl: 'https://www.ibo.org/programmes/middle-years-programme/curriculum/',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Reference for MYP framework notes such as subject groups, ATL skills, global contexts, service as action, and inclusion.',
  },
  {
    id: 'ib-dp-design-technology',
    publisher: 'International Baccalaureate',
    sourceName: 'IB DP Design Technology official page',
    sourceUrl: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/design-technology/',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Official public page for DP Design Technology, including current course and first-assessment 2027 subject brief links.',
  },
  {
    id: 'ib-dt-updates-2027',
    publisher: 'International Baccalaureate',
    sourceName: 'IB Design Technology updates / 2027 subject brief',
    sourceUrl: 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/design-technology/',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Use to verify first-assessment 2027 course version labels, assessment model changes, and IA/redesign direction.',
  },
  {
    id: 'design-and-inquiry',
    publisher: 'Design and Inquiry',
    sourceName: 'Design and Inquiry IB Design Technology educational resource site',
    sourceUrl: 'https://sites.google.com/h-is.com/ibdesigntechnology/',
    attributionNote: summaryAttribution,
    copyrightUse: 'summary-only',
    notes: 'Use only as structure/reference metadata; do not copy site pages, worksheets, PDFs, slides, or images.',
  },
  {
    id: 'cambridge-9705-official-page',
    publisher: 'Cambridge International Education',
    sourceName: 'Cambridge International AS & A Level Design & Technology 9705 official qualification page',
    sourceUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-design-and-technology-9705/',
    attributionNote: 'Original website-ready summary created for this platform from official Cambridge qualification information and supplied syllabus structures. Do not reproduce official syllabus pages directly.',
    copyrightUse: 'summary-only',
    notes: 'Official public reference for Cambridge International AS & A Level Design & Technology 9705, including syllabus-cycle links and qualification identity.',
  },
  {
    id: 'cambridge-9705-2025-2027',
    publisher: 'Cambridge International Education',
    sourceName: 'Cambridge International AS & A Level Design & Technology 9705 syllabus 2025-2027',
    sourceUrl: 'local:/Users/cmok/Downloads/675267-2025-2027-syllabus.pdf',
    attributionNote: 'Original website-ready summary created for this platform from the supplied syllabus structure. Do not reproduce official syllabus pages directly.',
    copyrightUse: 'summary-only',
    notes: 'Reference for Cambridge 9705 course aims, key concepts, assessment objectives, AS/A Level components, topic structure and coursework stages.',
  },
  {
    id: 'cambridge-9705-2028-2030',
    publisher: 'Cambridge International Education',
    sourceName: 'Cambridge International AS & A Level Design & Technology 9705 syllabus 2028-2030',
    sourceUrl: 'local:/Users/cmok/Downloads/744633-2028-2030-syllabus.pdf',
    attributionNote: 'Original website-ready summary created for this platform from the supplied syllabus structure. Do not reproduce official syllabus pages directly.',
    copyrightUse: 'summary-only',
    notes: 'Reference for the updated Cambridge 9705 syllabus cycle and continuity of the AS/A Level assessment route.',
  },
  {
    id: 'prepared-ib-summary',
    publisher: 'Project content summary',
    sourceName: 'Design and Inquiry IB DT Website Content Summary',
    sourceUrl: 'local:/Users/cmok/Downloads/Design_and_Inquiry_IB_DT_Website_Summary (1).docx',
    attributionNote: 'Original prepared summary supplied by the project owner and converted into website data.',
    copyrightUse: 'summary-only',
    notes: 'Primary source for IB Design Technology topic summaries, IA support, case-study prompts, and copyright-safe website wording.',
  },
  {
    id: 'prepared-ib-hkdse-summary',
    publisher: 'Project content summary',
    sourceName: 'IB Design Technology + HKDSE Design and Applied Technology Website Content Summary',
    sourceUrl: 'local:/Users/cmok/Downloads/IB_HKDSE_DAT_Website_Content_Summary.docx',
    attributionNote: 'Original prepared summary supplied by the project owner and converted into website data.',
    copyrightUse: 'summary-only',
    notes: 'Primary source for HKDSE DAT learning areas, electives, thematic resources, case studies, comparison, and teacher-resource structure.',
  },
  {
    id: 'prepared-edb-s1-s6-summary',
    publisher: 'Project content summary',
    sourceName: 'S1-S6 DT/DAT EDB Website Content Summary',
    sourceUrl: 'local:/Users/cmok/Downloads/S1-S6_DT_DAT_EDB_Website_Content_Summary (1).docx',
    attributionNote: 'Original summary created for this platform based on official curriculum/resource structures. Do not reproduce official PDF/DOCX/worksheet content directly without permission.',
    copyrightUse: 'summary-only',
    notes: 'Primary source for S1-S3 DT modules, junior case studies, shared DT/DAT resources, and updated senior DAT resource mapping.',
  },
  {
    id: 'prepared-ib-y6-y12-summary',
    publisher: 'Project content summary',
    sourceName: 'IB MYP & DP Design / Design Technology Y6-Y12 Website Content Summary',
    sourceUrl: 'local:/Users/cmok/Downloads/IB_MYP_DP_Design_Technology_Y6-Y12_Summary (1).docx',
    attributionNote: 'Original summary created for this platform based on official curriculum/resource structures. Do not reproduce official PDF/DOCX/worksheet content directly without permission.',
    copyrightUse: 'summary-only',
    notes: 'Primary source for IB MYP Y6-Y10 progression, MYP criteria A-D, command terms, DP 2026/2027 structure, IA support, research, and case-study mapping.',
  },
];

export const sourceById = (id: string): SourceMetadata => {
  const source = officialReferences.find((entry) => entry.id === id);
  if (!source) {
    throw new Error(`Unknown source metadata id: ${id}`);
  }
  return {
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl,
    attributionNote: source.attributionNote,
    copyrightUse: source.copyrightUse,
  };
};

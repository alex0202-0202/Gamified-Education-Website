import type { SourceMetadata } from '../types';

export type S1SourceMetadataRecord = SourceMetadata & {
  id: string;
  sourceFile: string;
  supports: string;
};

const attributionNote =
  'Original summary and student teaching examples created for this platform based on EDB S1 Design and Technology learning resources. Do not reproduce official PDF/DOCX/worksheet content directly without permission.';

export const s1SourceMetadata: S1SourceMetadataRecord[] = [
  {
    id: 'edb-s1-teaching-plan',
    sourceFile: 'EDB S1 Teaching Plan page',
    supports: 'Official S1 module map, lesson allocation and material sequence.',
    sourceName: 'EDB S1 Design and Technology Teaching Plan',
    sourceUrl: 'https://www.edb.gov.hk/en/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-1',
    sourceFile: 'Material 1 - 基本設計元素及傳意',
    supports: 'Basic design elements, aesthetics/function, composition, colour and communication.',
    sourceName: 'EDB S1 DT Material 1 - Basic Design Elements and Communication',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-2',
    sourceFile: 'Material 2 - 物料的基本認識',
    supports: 'Materials classification, natural/man-made materials, common materials and applications.',
    sourceName: 'EDB S1 DT Material 2 - Basic Knowledge of Materials',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-3a',
    sourceFile: 'Material 3a - 安全及手工具 1',
    supports: 'Workshop safety, PPE, safe behaviour and tool-use rules.',
    sourceName: 'EDB S1 DT Material 3a - Workshop Safety and Hand Tools 1',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-3b',
    sourceFile: 'Material 3b - 安全及手工具 2',
    supports: 'Common hand tools for smoothing/cutting/shaping and safe tool selection.',
    sourceName: 'EDB S1 DT Material 3b - Workshop Safety and Hand Tools 2',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-4',
    sourceFile: 'Material 4 - 設計過程及人的因素',
    supports: 'Design concept, design process, design brief/specification, testing and human factors.',
    sourceName: 'EDB S1 DT Material 4 - Design Process and Human Factors',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-5',
    sourceFile: 'Material 5 - 結構與機械結構',
    supports: 'Structures, loads, compression/tension/bending/torsion/shear, stability and mechanisms.',
    sourceName: 'EDB S1 DT Material 5 - Structures and Mechanical Structures',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-6',
    sourceFile: 'Material 6 - 系統和控制',
    supports: 'Input-process-output, mechanical/electrical/electronic systems and control.',
    sourceName: 'EDB S1 DT Material 6 - Systems and Control',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
  {
    id: 's1-material-7',
    sourceFile: 'Material 7 - 科技與環境及製造過程',
    supports: 'Technology and lifestyle, environmental/ethical impact, eco-design and making process.',
    sourceName: 'EDB S1 DT Material 7 - Technology, Environment and Manufacturing Process',
    sourceUrl: 'local:/Users/cmok/Downloads/S1_DSE_DT_EDB_Teaching_Examples_Addon_Codex_Prompt.docx',
    attributionNote,
    copyrightUse: 'summary-only',
  },
];

export const getS1SourceMetadata = (id: string): SourceMetadata => {
  const source = s1SourceMetadata.find((entry) => entry.id === id);
  if (!source) {
    throw new Error(`Unknown S1 source metadata id: ${id}`);
  }
  return {
    sourceName: source.sourceName,
    sourceUrl: source.sourceUrl,
    attributionNote: source.attributionNote,
    copyrightUse: source.copyrightUse,
  };
};

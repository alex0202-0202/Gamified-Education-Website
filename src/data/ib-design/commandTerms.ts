import type { SourceMetadata } from '../types';
import { sourceById } from '../sources/officialReferences';

const sourceMetadata = sourceById('prepared-ib-y6-y12-summary');

export type DesignCommandTerm = {
  term: string;
  studentAction: string;
  designEvidence: string;
  exampleSentence: string;
  sourceMetadata: SourceMetadata;
};

export const ibDesignCommandTerms: DesignCommandTerm[] = [
  {
    term: 'Identify',
    studentAction: 'Point out a feature, user need or problem.',
    designEvidence: 'Labelled example or short statement.',
    exampleSentence: 'Identify two usability problems observed during user testing.',
    sourceMetadata,
  },
  {
    term: 'Describe',
    studentAction: 'Give relevant details about a feature, user or context.',
    designEvidence: 'Paragraph with specific details and observations.',
    exampleSentence: 'Describe how the current product is used by the target user.',
    sourceMetadata,
  },
  {
    term: 'Explain',
    studentAction: 'Give reasons and make connections between evidence and design decisions.',
    designEvidence: 'Reasoned explanation linked to research, user feedback or testing.',
    exampleSentence: 'Explain why the chosen material is suitable for the user and context.',
    sourceMetadata,
  },
  {
    term: 'Analyse',
    studentAction: 'Break down information and examine relationships.',
    designEvidence: 'Comparison table, product analysis or cause-effect notes.',
    exampleSentence: 'Analyse how the existing product balances comfort, cost and durability.',
    sourceMetadata,
  },
  {
    term: 'Justify',
    studentAction: 'Support a decision using evidence.',
    designEvidence: 'Design decision linked to research, user needs or testing results.',
    exampleSentence: 'Justify the final concept using the design specification and test evidence.',
    sourceMetadata,
  },
  {
    term: 'Evaluate',
    studentAction: 'Judge strengths and weaknesses against criteria.',
    designEvidence: 'Testing data, reflection and improvement proposal.',
    exampleSentence: 'Evaluate the prototype against the specification and recommend improvements.',
    sourceMetadata,
  },
];

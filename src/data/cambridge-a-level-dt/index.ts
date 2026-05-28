import type { SourceMetadata } from '../types';
import { sourceById } from '../sources/officialReferences';

const sourceMetadata: SourceMetadata = sourceById('cambridge-9705-2028-2030');

export type ALevelDTTopic = {
  id: string;
  level: 'AS' | 'A2' | 'AS_AND_A2';
  topicNumber: number;
  title: string;
  studentSummary: string;
  keyKnowledge: string[];
  keySkills: string[];
  vocabulary: { term: string; definition: string }[];
  examples: string[];
  miniActivities: string[];
  examPracticePrompts: string[];
  courseworkLinks: string[];
  relatedTools: { label: string; screen: string; topic?: string }[];
  sourceMetadata: SourceMetadata;
};

export type ALevelDTCourseworkStage = {
  component: 'Component 2' | 'Component 4';
  stageNumber: number;
  title: string;
  marks: number;
  assessmentObjectiveFocus: ('AO1' | 'AO2' | 'AO3' | 'AO4')[];
  studentTask: string;
  evidenceRequired: string[];
  highMarkFeatures: string[];
  commonMistakes: string[];
  websiteTools: string[];
};

export type ALevelDTAssessmentObjective = {
  id: 'AO1' | 'AO2' | 'AO3' | 'AO4';
  title: string;
  studentSummary: string;
  evidenceExamples: string[];
  weighting: { asLevel: string; aLevel: string };
};

export type ALevelDTKeyConcept = {
  id: string;
  title: string;
  meaning: string;
  studentShouldLearn: string[];
  activities: string[];
};

export const cambridgeALevelDTOverview = {
  qualification: 'Cambridge International AS & A Level Design & Technology 9705',
  shortTitle: 'A Level Design & Technology 9705',
  studentSummary:
    'A Level Design & Technology is about solving real product problems. Students research users, analyse existing products, communicate ideas, choose materials, make and test prototypes, and understand how products can be manufactured responsibly in the real world.',
  identityTags: [
    'product design',
    'design communication',
    'materials and processes',
    'manufacturing',
    'coursework portfolio',
    'exam preparation',
  ],
  sourceMetadata,
};

export const cambridgeKeyConcepts: ALevelDTKeyConcept[] = [
  {
    id: 'society',
    title: 'Designing and Making in Society',
    meaning: 'Design changes how people live, work, travel, communicate and use products.',
    studentShouldLearn: ['user needs and values', 'product change over time', 'usability and safety', 'accessibility and quality of life'],
    activities: ['Analyse one everyday product', 'Map who uses the product', 'Explain how the product changed over time', 'Identify the problem it solves'],
  },
  {
    id: 'industrial-commercial',
    title: 'Industrial and Commercial Practices',
    meaning: 'Designers need to understand how products are planned, manufactured, checked, costed and sold.',
    studentShouldLearn: ['one-off, batch and mass production', 'quality assurance and quality control', 'production planning', 'cost, time, labour and marketability'],
    activities: ['Compare one-off, batch and mass production', 'Build a quality-control checklist', 'Plan a small production route'],
  },
  {
    id: 'communication',
    title: 'Design Communication',
    meaning: 'Designers use drawings, models and technical language so other people can understand, test and manufacture ideas.',
    studentShouldLearn: ['freehand sketches', 'orthographic projection', 'isometric and exploded views', 'CAD, flowcharts and Gantt charts'],
    activities: ['Use the orthographic tool', 'Create an exploded view annotation', 'Make a technical drawing vocabulary quiz'],
  },
  {
    id: 'creative-thinking',
    title: 'Creative Thinking',
    meaning: 'Creative thinking helps students move beyond the first idea and develop original, useful and better solutions.',
    studentShouldLearn: ['SCAMPER', 'iteration', 'design fixation avoidance', 'concept selection and development'],
    activities: ['Use SCAMPER on an existing product', 'Create three improvement concepts', 'Justify the best concept against a specification'],
  },
  {
    id: 'sustainable-design',
    title: 'Sustainable Design',
    meaning: 'Products affect the environment through material extraction, manufacture, transport, use, repair and disposal.',
    studentShouldLearn: ['life cycle thinking', 'repair and maintenance', 'waste reduction', 'local, recycled and sustainable material choices'],
    activities: ['Life-cycle audit', 'Design for disassembly challenge', 'Material waste reduction plan'],
  },
  {
    id: 'emerging-technologies',
    title: 'Emerging Technologies',
    meaning: 'Digital and modern technologies change how products are modelled, tested, manufactured and improved.',
    studentShouldLearn: ['CAD/CAM', 'laser cutting', '3D printing', 'CNC, simulation and smart materials'],
    activities: ['CAD/CAM matching game', '3D printing settings check', 'Laser kerf test planning'],
  },
];

export const cambridgeAssessmentObjectives: ALevelDTAssessmentObjective[] = [
  {
    id: 'AO1',
    title: 'Knowledge and Understanding',
    studentSummary: 'Know materials, tools, equipment, components, processes, practices and the impact of design and technology on society.',
    evidenceExamples: ['correct technical vocabulary', 'material and process knowledge', 'social and environmental impact explanations'],
    weighting: { asLevel: '25% AS', aLevel: '20% A Level' },
  },
  {
    id: 'AO2',
    title: 'Application and Communication',
    studentSummary: 'Apply knowledge in design contexts and communicate using sketches, notes, conventions and specialist vocabulary.',
    evidenceExamples: ['annotated sketches', 'orthographic drawings', 'CAD screenshots', 'clear design communication'],
    weighting: { asLevel: '15% AS', aLevel: '15% A Level' },
  },
  {
    id: 'AO3',
    title: 'Development of Design Ideas and Practical Skills',
    studentSummary: 'Prepare briefs, analyse needs, write specifications, generate ideas, develop proposals, plan and realise safe practical outcomes.',
    evidenceExamples: ['brief and specification', 'iterative idea development', 'making plan', 'prototype evidence'],
    weighting: { asLevel: '30% AS', aLevel: '40% A Level' },
  },
  {
    id: 'AO4',
    title: 'Analysis and Evaluation',
    studentSummary: 'Analyse and compare products, propose improvements, test outcomes and evaluate manufacturing, cultural, economic, environmental and social issues.',
    evidenceExamples: ['product analysis', 'test tables', 'evaluation against specification', 'quantity-production evaluation'],
    weighting: { asLevel: '30% AS', aLevel: '25% A Level' },
  },
];

export const cambridgeAssessmentComponents = [
  { component: 'Paper 1', name: 'AS Level Written Paper', timeMarks: '2 hr 15 min, 100 marks', asWeighting: '50% AS', aLevelWeighting: '25% A Level' },
  { component: 'Component 2', name: 'Product Analysis and Improvement Project', timeMarks: '50 marks', asWeighting: '50% AS', aLevelWeighting: '25% A Level' },
  { component: 'Paper 3', name: 'A Level Written Paper', timeMarks: '2 hr 30 min, 100 marks', asWeighting: '-', aLevelWeighting: '25% A Level' },
  { component: 'Component 4', name: 'Design, Realisation and Manufacturing Project', timeMarks: '50 marks', asWeighting: '-', aLevelWeighting: '25% A Level' },
];

const topic = (
  topicNumber: number,
  level: ALevelDTTopic['level'],
  title: string,
  studentSummary: string,
  keyKnowledge: string[],
  keySkills: string[],
  examples: string[],
  relatedTools: ALevelDTTopic['relatedTools'] = [],
): ALevelDTTopic => ({
  id: `cambridge-9705-topic-${topicNumber}`,
  level,
  topicNumber,
  title,
  studentSummary,
  keyKnowledge,
  keySkills,
  vocabulary: keyKnowledge.slice(0, 5).map((term) => ({ term, definition: `Explain how ${term.toLowerCase()} affects product design decisions.` })),
  examples,
  miniActivities: ['Create a one-page revision card', 'Apply the topic to an everyday product', 'Write one evidence-based design justification'],
  examPracticePrompts: ['Explain one design decision using this topic.', 'Compare two product options and justify the better choice.', 'Evaluate a product improvement using evidence.'],
  courseworkLinks: ['Component 2 product improvement', 'Component 4 design and manufacturing project'],
  relatedTools,
  sourceMetadata,
});

export const cambridgeASLevelTopics: ALevelDTTopic[] = [
  topic(1, 'AS_AND_A2', 'The Design Process', 'Use iterative and intuitive approaches to move from user need to tested solution.', ['iterative design', 'intuitive design', 'empathise', 'define', 'ideate', 'refine', 'realise', 'test', 'product analysis factors'], ['write design briefs', 'generate specifications', 'analyse products', 'build improvement timelines'], ['redesigning a school bottle', 'improving a desk organiser'], [{ label: 'Project Hub', screen: 'project_hub' }]),
  topic(2, 'AS_AND_A2', 'Design Principles', 'Understand what makes designs useful, innovative, simple, safe, understandable and long lasting.', ['good design principles', 'Art Deco', 'Arts and Crafts', 'Bauhaus', 'Scandinavian design', 'Minimalism', 'Modernism', 'Postmodernism', 'product design influences'], ['compare design movements', 'justify design style', 'link form and function'], ['Bauhaus chair analysis', 'minimal phone stand redesign']),
  topic(3, 'AS_AND_A2', 'Communication', 'Communicate ideas through sketches, models, technical drawings, CAD, charts and planning documents.', ['freehand sketching', 'exploded views', 'sectional drawings', 'isometric drawing', 'orthographic projection', 'scale', 'dimensioning', 'flowcharts', 'Gantt charts'], ['draw technical views', 'annotate clearly', 'prepare cutting lists', 'use CAD/CAM language'], ['orthographic drawing of a bracket', 'exploded view of a storage box'], [{ label: 'Orthographic/CAD', screen: 'orthographic_projection' }]),
  topic(4, 'AS_AND_A2', 'Design and Technology in Society', 'Judge how products affect individuals, groups, culture and access.', ['social impact', 'culture', 'inclusive design', 'accessibility', 'visually impaired users', 'hearing impaired users', 'children', 'elderly users'], ['build user personas', 'audit accessibility', 'identify excluded users'], ['inclusive kettle handle', 'public seating audit'], [{ label: 'Project Hub', screen: 'project_hub' }]),
  topic(5, 'AS_AND_A2', 'Sustainable Design', 'Design with full product life cycle, material use, repair, disposal and waste reduction in mind.', ['sustainable materials', 'packaging responsibility', 'raw material extraction', 'energy consumption', 'repair', 'maintenance', 'disposal', 'design for disassembly'], ['life-cycle analysis', 'waste reduction planning', 'justify sustainable choices'], ['repairable lamp', 'flat-pack packaging redesign'], [{ label: 'Materials Database', screen: 'materials_db' }]),
  topic(6, 'AS_AND_A2', 'Health and Safety', 'Use risk assessment and safe workshop practice when designing and making.', ['hazards', 'risk assessment', 'PPE', 'machine guards', 'manual handling', 'supervision', 'emergency action'], ['write risk assessments', 'choose PPE', 'plan safer manufacturing'], ['pillar drill safety plan', 'laser-cutting safety checklist']),
  topic(7, 'AS_AND_A2', 'Aesthetics and Ergonomics', 'Balance visual qualities with human body data, comfort, safety and usability.', ['line', 'colour', 'shape', 'proportion', 'form', 'texture', 'ergonomics', 'anthropometrics', 'BMI'], ['analyse appearance', 'apply anthropometric data', 'justify comfort and usability'], ['chair height selection', 'handle redesign'], [{ label: 'IB DP Ergonomics', screen: 'ib_current_2026', topic: 'ib-dp-2026-topic-1' }]),
  topic(8, 'AS_AND_A2', 'Materials and Components', 'Choose materials and components based on properties, processing, joining, safety and sustainability.', ['papers and boards', 'woods', 'metals', 'polymers', 'composites', 'smart materials', 'biodegradable materials', 'components'], ['select materials', 'compare properties', 'match joining methods'], ['plywood phone stand', 'acrylic display case'], [{ label: 'Materials Database', screen: 'materials_db' }, { label: 'Joining Methods', screen: 'joining_methods' }]),
  topic(9, 'AS_AND_A2', 'Stages in Materials Processing', 'Understand how raw materials move through preparation, forming, shaping, joining, finishing and quality checking.', ['raw material source', 'preparation', 'conversion', 'forming', 'shaping', 'joining', 'finishing', 'quality checking', 'assembly'], ['sequence processes', 'explain manufacturing stages', 'identify checking points'], ['timber-to-stool process', 'card package process']),
  topic(10, 'AS_AND_A2', 'Materials Processing', 'Select appropriate cutting, shaping, forming, joining, finishing and CAD/CAM methods.', ['cutting', 'shaping', 'forming', 'joining', 'finishing', 'laser cutting', '3D printing', 'CNC'], ['choose processes', 'compare speed/cost/quality', 'plan making'], ['laser-cut box', 'vacuum-formed tray'], [{ label: 'Finger Box Maker', screen: 'finger_joint_box_maker' }, { label: 'Joining Methods', screen: 'joining_methods' }]),
  topic(11, 'AS_AND_A2', 'Energy and Control Systems', 'Explain how systems use energy, inputs, processing, outputs, sensors and feedback.', ['energy sources', 'energy transfer', 'mechanical systems', 'electronic systems', 'sensors', 'input-process-output', 'feedback'], ['draw block diagrams', 'match sensors to functions', 'explain control loops'], ['automatic door', 'temperature-controlled fan'], [{ label: 'Systems Game', screen: 'systems' }]),
  topic(12, 'AS_AND_A2', 'Technology', 'Understand CAD, CAM, modelling, simulation, digital collaboration, automation and smart products.', ['CAD', 'CAM', 'digital communication', 'modelling', 'simulation', 'emerging technology', 'automation', 'smart products'], ['explain CAD-to-CAM workflows', 'compare digital manufacturing methods', 'evaluate technology choices'], ['3D printed prototype', 'laser-cut packaging net'], [{ label: 'Orthographic/CAD', screen: 'orthographic_projection' }, { label: 'Finger Box Maker', screen: 'finger_joint_box_maker' }]),
];

export const cambridgeA2LevelTopics: ALevelDTTopic[] = [
  topic(13, 'A2', 'Industrial Practices', 'Plan and evaluate production systems, workflow, tooling, jigs, fixtures and industrial constraints.', ['industrial production systems', 'workflow planning', 'tooling', 'jigs and fixtures', 'standardised components', 'workforce', 'machinery'], ['plan production lines', 'identify bottlenecks', 'choose jigs and fixtures'], ['assembly line for 10 lamps', 'jig for drilling repeated holes']),
  topic(14, 'A2', 'Business and Commercial Practices', 'Connect product design with market research, target users, costing, branding, intellectual property and viability.', ['market research', 'target market', 'branding', 'pricing', 'production cost', 'profitability', 'product lifecycle', 'intellectual property'], ['build pitch arguments', 'estimate costs', 'write market research questions'], ['student desk product pitch', 'costed storage product']),
  topic(15, 'A2', 'Quantity Production', 'Plan one-off, batch, mass or continuous production with repeatability, standardisation and quality checks.', ['one-off production', 'batch production', 'mass production', 'continuous production', 'economies of scale', 'repeatability', 'standardisation'], ['manufacture 10 units planning', 'sequence operations', 'plan inspection'], ['batch of ten desk organisers', 'standardised school badge holder']),
  topic(16, 'A2', 'Materials Processing in Industry', 'Understand industrial cutting, forming, casting, moulding, fabrication, CNC, automation and finishing.', ['industrial cutting', 'forming', 'casting', 'moulding', 'fabrication', 'CNC machining', 'automated assembly', 'heat treatment'], ['select industrial processes', 'compare cost/quality/speed', 'explain automated manufacturing'], ['injection-moulded casing', 'CNC-machined aluminium bracket']),
  topic(17, 'A2', 'Quality Systems', 'Use assurance, control, tolerance, standardisation, testing and inspection to prevent and identify faults.', ['quality assurance', 'quality control', 'tolerance', 'standardisation', 'testing', 'inspection'], ['build QC checklists', 'calculate tolerances', 'spot defects in a batch'], ['checking ten identical boxes', 'go/no-go gauge for holes']),
  topic(18, 'A2', 'Digital Technology', 'Use digital tools and smart technologies for modelling, production, testing, collaboration and data-led decisions.', ['CAD', 'CAM', 'CNC', '3D printing', 'laser cutting', 'simulation', 'collaborative design', 'data-led design', 'smart products'], ['choose digital tools', 'explain workflow', 'evaluate digital manufacturing impact'], ['cloud CAD collaboration', 'laser-cut and 3D printed hybrid product'], [{ label: 'Orthographic/CAD', screen: 'orthographic_projection' }, { label: 'Finger Box Maker', screen: 'finger_joint_box_maker' }]),
];

export const cambridgeCourseworkStages: ALevelDTCourseworkStage[] = [
  { component: 'Component 2', stageNumber: 1, title: 'Identifying and analysing a product for improvement', marks: 8, assessmentObjectiveFocus: ['AO4'], studentTask: 'Choose a familiar existing product and analyse why it has realistic scope for improvement.', evidenceRequired: ['product photos', 'function analysis', 'user analysis', 'materials/processes analysis', 'safety and sustainability notes'], highMarkFeatures: ['clear product choice justification', 'analysis supported by evidence', 'more than two wider issues considered'], commonMistakes: ['describing only appearance', 'choosing a product with no real weakness'], websiteTools: ['Product analysis worksheet', 'User observation notes'] },
  { component: 'Component 2', stageNumber: 2, title: 'Identifying one area for improvement', marks: 4, assessmentObjectiveFocus: ['AO4'], studentTask: 'Select one meaningful improvement linked to user need, product weakness, performance, safety or sustainability.', evidenceRequired: ['improvement statement', 'reasoned justification', 'link to evidence'], highMarkFeatures: ['specific and realistic improvement', 'clear link to analysis'], commonMistakes: ['only changing colour', 'adding random features'], websiteTools: ['Improvement decision tool'] },
  { component: 'Component 2', stageNumber: 3, title: 'Clarifying the need and generating ideas', marks: 10, assessmentObjectiveFocus: ['AO3'], studentTask: 'Write the need, brief and specification, then generate several improvement ideas.', evidenceRequired: ['design situation', 'brief', 'specification', 'annotated sketches', 'idea comparison'], highMarkFeatures: ['ideas clearly respond to analysis', 'annotations explain function and user value'], commonMistakes: ['one idea only', 'vague specification'], websiteTools: ['SCAMPER idea generator', 'Specification generator'] },
  { component: 'Component 2', stageNumber: 4, title: 'Developing the design and planning', marks: 10, assessmentObjectiveFocus: ['AO3'], studentTask: 'Develop the selected improvement and plan how it will be made safely and accurately.', evidenceRequired: ['dimensions', 'material choice', 'construction details', 'making sequence', 'risk assessment'], highMarkFeatures: ['iterative development', 'clear technical planning'], commonMistakes: ['missing dimensions', 'no safety planning'], websiteTools: ['Development board', 'Making plan'] },
  { component: 'Component 2', stageNumber: 5, title: 'Producing a prototype', marks: 10, assessmentObjectiveFocus: ['AO3'], studentTask: 'Make a prototype that demonstrates the product improvement.', evidenceRequired: ['making photos', 'process notes', 'tool/process evidence', 'changes during making'], highMarkFeatures: ['accurate making', 'clear evidence of problem solving'], commonMistakes: ['only showing final photo', 'no explanation of changes'], websiteTools: ['Prototype diary'] },
  { component: 'Component 2', stageNumber: 6, title: 'Testing and evaluating the improvement', marks: 8, assessmentObjectiveFocus: ['AO4'], studentTask: 'Test the improved product, compare with specification and propose further improvements.', evidenceRequired: ['test plan', 'user feedback', 'results table', 'evaluation against specification'], highMarkFeatures: ['measurable tests', 'evidence-based judgement'], commonMistakes: ['saying good/bad without evidence'], websiteTools: ['Evaluation table builder'] },
  { component: 'Component 4', stageNumber: 1, title: 'Design situation, brief and specification', marks: 6, assessmentObjectiveFocus: ['AO3'], studentTask: 'Identify a real situation or need and write a clear brief and measurable specification.', evidenceRequired: ['problem statement', 'target user', 'context evidence', 'brief', 'specification table'], highMarkFeatures: ['research-led situation', 'measurable criteria'], commonMistakes: ['generic problem', 'non-measurable requirements'], websiteTools: ['Design brief builder', 'Specification builder'] },
  { component: 'Component 4', stageNumber: 2, title: 'Generating and appraising design ideas', marks: 8, assessmentObjectiveFocus: ['AO3'], studentTask: 'Generate and compare a range of ideas leading to a justified design proposal.', evidenceRequired: ['sketches', 'annotations', 'comparison matrix', 'chosen proposal'], highMarkFeatures: ['creative range', 'clear appraisal against specification'], commonMistakes: ['choosing without evidence'], websiteTools: ['SCAMPER prompt generator', 'Idea comparison matrix'] },
  { component: 'Component 4', stageNumber: 3, title: 'Develop product and plan for making', marks: 8, assessmentObjectiveFocus: ['AO3'], studentTask: 'Develop the chosen product with CAD/modelling, material choices and a practical making plan.', evidenceRequired: ['CAD/model evidence', 'materials list', 'cutting list', 'Gantt chart', 'risk assessment'], highMarkFeatures: ['technical development', 'planned sequence and resources'], commonMistakes: ['unclear construction details'], websiteTools: ['CAD upload', 'Gantt chart builder', 'Risk assessment table'] },
  { component: 'Component 4', stageNumber: 4, title: 'Realise the product', marks: 12, assessmentObjectiveFocus: ['AO3'], studentTask: 'Make the final product safely, accurately and with attention to finish and detail.', evidenceRequired: ['making diary', 'photo timeline', 'tools used', 'issue and solution log', 'final gallery'], highMarkFeatures: ['competent practical work', 'accurate finish', 'problem solving'], commonMistakes: ['little process evidence'], websiteTools: ['Making diary', 'Final product gallery'] },
  { component: 'Component 4', stageNumber: 5, title: 'Test and evaluate the product', marks: 8, assessmentObjectiveFocus: ['AO4'], studentTask: 'Test the product with users and against the specification, then evaluate strengths and weaknesses.', evidenceRequired: ['test plan', 'data collection', 'user feedback', 'specification checker'], highMarkFeatures: ['specific evidence', 'balanced judgement'], commonMistakes: ['unclear tests', 'unsupported conclusions'], websiteTools: ['Testing and evaluation tool'] },
  { component: 'Component 4', stageNumber: 6, title: 'Plan for manufacturing in quantity', marks: 8, assessmentObjectiveFocus: ['AO4'], studentTask: 'Plan how the product could be manufactured as a batch of at least ten products, including QA/QC and wider impact.', evidenceRequired: ['production flowchart', 'QA checklist', 'QC inspection sheet', 'cost estimate', 'environmental impact evaluation'], highMarkFeatures: ['realistic batch plan', 'quality systems included', 'cultural/social, economic and environmental impact evaluated'], commonMistakes: ['copying one-off process only', 'no quality plan'], websiteTools: ['Batch production planner', 'Quality control simulator'] },
];

export const cambridgeHighMarkAdvice = [
  'Use evidence, not opinions.',
  'Justify every decision by linking it to users, specifications, tests or manufacturing limits.',
  'Analyse and evaluate instead of only describing.',
  'Show iteration, modelling, testing and improvement.',
  'Use accurate drawings, dimensions and specialist vocabulary.',
  'Compare results against measurable specifications.',
  'Explain sustainability, safety, cost and wider impact.',
  'For Component 4, show how the product could be manufactured in quantity, not only as a one-off.',
];

export const cambridgeCommonMistakes = [
  'Only describing an existing product.',
  'Choosing a product with no real scope for improvement.',
  'Only changing colour, decoration or material without functional justification.',
  'Weak user research or vague specifications.',
  'No measurable testing evidence.',
  'Little evidence of iteration or development.',
  'No manufacturing plan or quality-control thinking.',
  'Ignoring cost, safety, sustainability or user needs.',
];

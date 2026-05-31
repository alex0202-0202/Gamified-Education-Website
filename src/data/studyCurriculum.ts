export type StudyCurriculumId = 'HKDSE_DNT' | 'IB_DESIGN' | 'A_LEVEL_DT';

export type StudyCurriculum = {
  id: StudyCurriculumId;
  shortName: string;
  fullName: string;
  description: string;
  subtitle: string;
  icon: string;
  levels: CurriculumLevel[];
};

export type CurriculumLevel = {
  id: string;
  label: string;
  yearGroup: string;
  summary: string;
  keyFocus: string[];
  topicIds: string[];
  projectSupport: string[];
  revisionChecklist: string[];
};

export type CurriculumTopic = {
  id: string;
  curriculum: StudyCurriculumId;
  levelId: string;
  title: string;
  studentSummary: string;
  keyKnowledge: string[];
  keySkills: string[];
  examples: string[];
  miniActivity: string;
  relatedTools: string[];
};

export type QuizQuestion = {
  id: string;
  curriculum: StudyCurriculumId;
  levelId: string;
  yearGroup: string;
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skillTags: string[];
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  examLink?: string;
};

export type TerminologyFlashcard = {
  id: string;
  curriculum: StudyCurriculumId;
  levelId: string;
  yearGroup: string;
  topicId: string;
  term: string;
  shortDefinition: string;
  detailedExplanation: string;
  example: string;
  relatedSkills: string[];
};

type LevelBlueprint = Omit<CurriculumLevel, 'topicIds'> & {
  topics: Omit<CurriculumTopic, 'curriculum' | 'levelId'>[];
};

const commonTools = [
  'Knowledge Quiz Challenge',
  'Terminology Flashcards',
  'Poster Library',
  'Orthographic Projection Tool',
  'Materials Selector',
  'Joining Method Selector',
];

const hkdseLevelBlueprints: LevelBlueprint[] = [
  {
    id: 's1',
    label: 'S1 Foundation D&T',
    yearGroup: 'S1',
    summary: 'Build safe workshop habits, basic sketching, measuring, material awareness and simple product design.',
    keyFocus: ['hand tools', 'workshop safety', 'basic sketching', 'measuring and marking out', 'simple materials', 'simple product design', 'design communication'],
    projectSupport: ['simple product brief', 'safe tool checklist', 'materials comparison table', 'sketch annotation frame'],
    revisionChecklist: ['I can name common hand tools.', 'I can measure and mark accurately.', 'I can explain basic safety rules.', 'I can sketch and annotate a simple product.'],
    topics: [
      topic('workshop-safety', 'Workshop Safety', 'Use tools and equipment safely before making.', ['hazards', 'PPE', 'machine guards', 'safe behaviour'], ['spot hazards', 'choose PPE', 'follow safety routines'], ['using goggles when cutting acrylic', 'tying back long hair']),
      topic('hand-tools-measuring', 'Hand Tools and Measuring', 'Select basic tools and measure parts accurately.', ['rulers', 'try squares', 'marking gauges', 'accuracy'], ['measure', 'mark out', 'check dimensions'], ['marking a 100 mm line before cutting']),
      topic('basic-sketching', 'Basic Sketching', 'Communicate simple ideas using clear lines and labels.', ['freehand sketching', 'annotation', 'proportion'], ['sketch', 'label', 'explain choices'], ['annotating a pencil holder design']),
      topic('simple-materials', 'Simple Materials', 'Compare common card, wood, plastic and metal materials.', ['properties', 'strength', 'weight', 'finish'], ['compare materials', 'match material to purpose'], ['choosing card for a quick model']),
      topic('simple-product-design', 'Simple Product Design', 'Turn a need into a small designed solution.', ['user need', 'brief', 'specification', 'prototype'], ['write a brief', 'make a prototype', 'test a simple product'], ['designing a desk organiser']),
      topic('design-communication', 'Design Communication', 'Use words, drawings and simple diagrams to explain a design.', ['labels', 'dimensions', 'notes', 'presentation'], ['draw clearly', 'add dimensions', 'justify choices'], ['showing front and top views of a small box']),
    ],
  },
  {
    id: 's2',
    label: 'S2 Mechanisms & Motion',
    yearGroup: 'S2',
    summary: 'Learn motion, mechanisms, structures and simple systems through practical design challenges.',
    keyFocus: ['levers', 'cams', 'gears', 'pulleys', 'linkages', 'motion types', 'simple mechanical systems', 'systems concept'],
    projectSupport: ['mechanism test rig', 'motion diagram', 'systems block diagram', 'mechanism evaluation table'],
    revisionChecklist: ['I can identify rotary, linear, reciprocating and oscillating motion.', 'I can explain lever classes.', 'I can compare gears and pulleys.', 'I can draw input-process-output diagrams.'],
    topics: [
      topic('motion-types', 'Motion Types', 'Identify and use different movement types in products.', ['linear motion', 'rotary motion', 'reciprocating motion', 'oscillating motion'], ['classify motion', 'draw arrows', 'explain movement'], ['a cam changing rotary motion to reciprocating motion']),
      topic('levers-linkages', 'Levers and Linkages', 'Use bars and pivots to change force or movement.', ['effort', 'load', 'pivot', 'mechanical advantage'], ['identify lever parts', 'predict movement', 'build a linkage'], ['a scissors linkage lifting platform']),
      topic('cams-gears-pulleys', 'Cams, Gears and Pulleys', 'Transmit and control movement using mechanical parts.', ['cam profile', 'gear ratio', 'driver gear', 'belt drive'], ['choose mechanisms', 'compare speed and torque', 'test movement'], ['a small gear driving a larger gear']),
      topic('structures', 'Structures', 'Make products stable, strong and suitable for loads.', ['frame', 'shell', 'triangulation', 'load'], ['improve stability', 'test strength', 'add bracing'], ['triangulating a bridge model']),
      topic('simple-systems', 'Simple Systems', 'Understand input, process, output and feedback.', ['input', 'process', 'output', 'feedback'], ['build block diagrams', 'trace a system', 'identify control'], ['a button controlling a lamp']),
      topic('mechanism-evaluation', 'Mechanism Evaluation', 'Test whether a mechanism works reliably and safely.', ['criteria', 'testing', 'reliability', 'improvement'], ['record results', 'find faults', 'suggest improvements'], ['testing a pulley lift three times']),
    ],
  },
  {
    id: 's3',
    label: 'S3 Smart Integration',
    yearGroup: 'S3',
    summary: 'Connect CAD, electronics, sensors, automation and systems thinking to make smarter product ideas.',
    keyFocus: ['automation', 'sensors', 'input-process-output', 'coding', 'STEAM integration', 'simple electronics', 'systems thinking', 'smart product design'],
    projectSupport: ['smart product proposal', 'sensor selection table', 'Arduino planning sheet', 'CAD model evidence'],
    revisionChecklist: ['I can explain sensor input.', 'I can describe a control process.', 'I can link CAD/CAM to making.', 'I can improve a smart product using feedback.'],
    topics: [
      topic('smart-systems', 'Smart Systems', 'Design products that sense, decide and respond.', ['sensor', 'controller', 'output', 'automation'], ['select sensors', 'draw system flow', 'explain feedback'], ['a bin that opens using a distance sensor']),
      topic('simple-electronics', 'Simple Electronics', 'Use electronic components safely and correctly.', ['LED', 'switch', 'resistor', 'motor'], ['read simple circuits', 'choose outputs', 'test safely'], ['LED indicator for a model']),
      topic('coding-control', 'Coding and Control', 'Use logical steps to control outputs.', ['sequence', 'condition', 'loop', 'debugging'], ['plan code logic', 'test conditions', 'debug behaviour'], ['if light level is low, turn on LED']),
      topic('cad-cam-intro', 'CAD/CAM Introduction', 'Use digital design and manufacturing tools.', ['CAD', 'CAM', 'laser cutting', '3D printing'], ['model parts', 'export files', 'check scale'], ['laser-cutting a phone stand']),
      topic('systems-thinking', 'Systems Thinking', 'Break a design into connected subsystems.', ['subsystem', 'interface', 'feedback loop', 'integration'], ['map subsystems', 'find dependencies', 'improve reliability'], ['linking a sensor, motor and casing']),
      topic('smart-product-design', 'Smart Product Design', 'Create useful products that respond to users.', ['user need', 'function', 'prototype', 'evaluation'], ['research users', 'prototype smart functions', 'evaluate usability'], ['smart desk lamp with brightness control']),
    ],
  },
  {
    id: 's4',
    label: 'S4 HKDSE DAT Foundation',
    yearGroup: 'S4',
    summary: 'Start senior DAT with design situations, user research, specifications, product analysis and CAD.',
    keyFocus: ['design situation', 'user research', 'design brief', 'specification', 'product analysis', 'material selection', 'basic manufacturing', 'CAD and technical drawing'],
    projectSupport: ['design brief builder', 'specification generator', 'product analysis worksheet', 'CAD evidence checklist'],
    revisionChecklist: ['I can define a design problem.', 'I can collect useful user research.', 'I can write measurable specifications.', 'I can analyse an existing product.'],
    topics: [
      topic('design-situation', 'Design Situation and User Need', 'Identify a real problem and who is affected.', ['context', 'target user', 'need', 'constraint'], ['interview users', 'summarise context', 'justify need'], ['school storage problem for art students']),
      topic('design-brief-specification', 'Brief and Specification', 'Convert needs into measurable design requirements.', ['brief', 'specification', 'criteria', 'constraint'], ['write criteria', 'make requirements measurable', 'justify targets'], ['minimum load of 2 kg']),
      topic('product-analysis', 'Product Analysis', 'Study existing products to learn strengths and weaknesses.', ['function', 'aesthetics', 'ergonomics', 'materials'], ['analyse products', 'compare solutions', 'record evidence'], ['comparing two phone stands']),
      topic('material-selection', 'Material Selection', 'Choose materials for function, cost, safety and sustainability.', ['property', 'durability', 'cost', 'finish'], ['compare materials', 'justify selection', 'consider environment'], ['choosing plywood or acrylic for a box']),
      topic('cad-technical-drawing', 'CAD and Technical Drawing', 'Communicate accurate parts for making.', ['orthographic projection', 'dimensions', 'CAD', 'scale'], ['draw views', 'dimension parts', 'check geometry'], ['drawing a laser-cut enclosure']),
      topic('basic-manufacturing', 'Basic Manufacturing', 'Plan safe and suitable making processes.', ['cutting', 'forming', 'joining', 'finishing'], ['select process', 'plan sequence', 'record safety'], ['laser cutting a test piece before final cutting']),
    ],
  },
  {
    id: 's5',
    label: 'S5 HKDSE DAT Development',
    yearGroup: 'S5',
    summary: 'Develop ideas through modelling, testing, joining methods, mechanisms, electronics and manufacturing choices.',
    keyFocus: ['design development', 'modelling', 'prototyping', 'material testing', 'joining methods', 'mechanisms', 'electronics and control', 'manufacturing process selection', 'project evidence'],
    projectSupport: ['prototype diary', 'test result table', 'joining method selector', 'evidence timeline'],
    revisionChecklist: ['I can show design iteration.', 'I can test materials or joints.', 'I can select joining methods.', 'I can connect evidence to decisions.'],
    topics: [
      topic('design-development', 'Design Development', 'Improve ideas using evidence and testing.', ['iteration', 'refinement', 'decision', 'evidence'], ['annotate changes', 'compare options', 'justify development'], ['changing a handle after user feedback']),
      topic('modelling-prototyping', 'Modelling and Prototyping', 'Use models to test form, size and function.', ['scale model', 'prototype', 'mock-up', 'test piece'], ['build models', 'test quickly', 'record changes'], ['cardboard prototype before acrylic']),
      topic('material-testing', 'Material Testing', 'Collect evidence about material performance.', ['strength', 'flexibility', 'hardness', 'durability'], ['choose tests', 'measure results', 'compare data'], ['bend test for living hinge card']),
      topic('joining-methods', 'Joining Methods', 'Choose joints and adhesives for materials and loads.', ['finger joint', 'tab and slot', 'screws', 'adhesive'], ['match joints', 'test strength', 'consider repair'], ['press-fit finger joint corner']),
      topic('mechanisms-control', 'Mechanisms and Control', 'Integrate mechanical or electronic functions.', ['input', 'mechanism', 'sensor', 'output'], ['combine subsystems', 'test motion', 'debug control'], ['cam-driven display model']),
      topic('manufacturing-evidence', 'Manufacturing Evidence', 'Document processes clearly for assessment.', ['photo evidence', 'process plan', 'risk assessment', 'quality check'], ['record making', 'explain changes', 'evaluate quality'], ['annotated photo diary of laser cutting']),
    ],
  },
  {
    id: 's6',
    label: 'S6 HKDSE DAT Exam + Portfolio',
    yearGroup: 'S6',
    summary: 'Prepare for final portfolio and exam by strengthening evaluation, justification and technical vocabulary.',
    keyFocus: ['exam revision', 'design evaluation', 'product analysis', 'manufacturing systems', 'sustainability', 'user-centred design', 'final portfolio improvement', 'presentation and justification'],
    projectSupport: ['portfolio audit checklist', 'exam command word practice', 'evaluation table builder', 'final presentation planner'],
    revisionChecklist: ['I can justify decisions using evidence.', 'I can evaluate against specifications.', 'I can discuss manufacturing systems.', 'I can explain sustainability impact.'],
    topics: [
      topic('exam-technique', 'Exam Technique', 'Answer with clear reasons, evidence and correct DT vocabulary.', ['command words', 'justify', 'evaluate', 'compare'], ['structure answers', 'use evidence', 'avoid vague claims'], ['explain why a material is suitable']),
      topic('design-evaluation', 'Design Evaluation', 'Judge whether a design meets user needs and specifications.', ['criteria', 'test result', 'user feedback', 'improvement'], ['compare evidence', 'rank success', 'suggest next steps'], ['checking fit, strength and usability']),
      topic('advanced-product-analysis', 'Advanced Product Analysis', 'Analyse products through function, manufacturing and wider impact.', ['function', 'cost', 'safety', 'quality', 'sustainability'], ['identify strengths', 'explain weaknesses', 'propose improvements'], ['analysis of a folding chair']),
      topic('manufacturing-systems', 'Manufacturing Systems', 'Understand one-off, batch, mass and automated production.', ['batch production', 'QC', 'jig', 'workflow'], ['compare production scales', 'plan quality checks', 'identify constraints'], ['making ten identical phone stands']),
      topic('sustainability-user-centred', 'Sustainability and User-Centred Design', 'Link responsible design choices to real users.', ['life cycle', 'repairability', 'accessibility', 'inclusive design'], ['audit impact', 'improve access', 'design for repair'], ['replace glue with screws for repair']),
      topic('portfolio-justification', 'Portfolio Justification', 'Make portfolio evidence clear, relevant and persuasive.', ['annotation', 'evidence', 'reflection', 'decision'], ['select evidence', 'write reasons', 'show improvement'], ['before-and-after prototype comparison']),
    ],
  },
];

const ibLevelBlueprints: LevelBlueprint[] = [
  {
    id: 'myp-1',
    label: 'MYP 1 / Year 7',
    yearGroup: 'MYP 1',
    summary: 'Introduce the design cycle through simple problems, users, sketching, materials and reflection.',
    keyFocus: ['design cycle introduction', 'simple problems', 'user needs', 'sketching', 'basic materials', 'simple making', 'reflection'],
    projectSupport: ['simple design cycle worksheet', 'user needs prompt', 'reflection sentence starters'],
    revisionChecklist: ['I can name the four MYP criteria.', 'I can describe a simple user need.', 'I can sketch and explain an idea.', 'I can reflect on what improved.'],
    topics: [
      topic('design-cycle-intro', 'Design Cycle Introduction', 'Use inquiry, ideas, making and evaluation as a repeatable process.', ['inquire', 'develop', 'create', 'evaluate'], ['follow process', 'reflect', 'improve'], ['making a simple desk tidy']),
      topic('simple-user-needs', 'Simple Problems and Users', 'Find who needs the design and why.', ['user', 'problem', 'context', 'need'], ['ask questions', 'state need', 'describe user'], ['student needs a safer pencil holder']),
      topic('sketching-ideas', 'Sketching Ideas', 'Draw and label possible solutions.', ['sketch', 'annotation', 'idea', 'feature'], ['generate ideas', 'label parts', 'compare choices'], ['three ideas for a name badge']),
      topic('basic-materials-making', 'Basic Materials and Making', 'Use simple materials safely to make a model.', ['card', 'wood', 'plastic', 'safe making'], ['choose material', 'cut safely', 'assemble model'], ['cardboard model of a bridge']),
      topic('reflection-basics', 'Reflection Basics', 'Explain what worked and what should change.', ['feedback', 'success', 'improvement', 'evidence'], ['collect feedback', 'write reflection', 'plan improvement'], ['asking classmates to test a model']),
    ],
  },
  {
    id: 'myp-2',
    label: 'MYP 2 / Year 8',
    yearGroup: 'MYP 2',
    summary: 'Strengthen MYP Criterion A-D, product analysis, specifications, CAD/modeling and testing.',
    keyFocus: ['Criterion A-D foundation', 'product analysis', 'design specification', 'idea generation', 'basic CAD and modelling', 'testing and evaluation'],
    projectSupport: ['criterion checklist', 'PDS template', 'idea comparison table'],
    revisionChecklist: ['I can connect evidence to Criterion A.', 'I can write specification points.', 'I can compare idea options.', 'I can test against criteria.'],
    topics: [
      topic('myp-criteria-foundation', 'MYP Criteria A-D Foundation', 'Understand what each criterion expects in a design project.', ['Criterion A', 'Criterion B', 'Criterion C', 'Criterion D'], ['classify evidence', 'plan portfolio', 'reflect by criterion'], ['matching a test table to Criterion D']),
      topic('product-analysis-myp', 'Product Analysis', 'Study existing products to learn from strengths and weaknesses.', ['function', 'user', 'materials', 'aesthetics'], ['analyse examples', 'record evidence', 'link to needs'], ['analysing a lunchbox']),
      topic('specification-myp', 'Design Specification', 'Turn user needs into clear criteria.', ['PDS', 'constraint', 'success criteria', 'measurable'], ['write criteria', 'check measurability', 'justify choices'], ['must hold 500 g without bending']),
      topic('idea-generation-myp', 'Idea Generation', 'Create and select ideas using reasons.', ['brainstorm', 'SCAMPER', 'concept', 'selection'], ['generate alternatives', 'annotate', 'justify selection'], ['improving a phone stand']),
      topic('cad-modelling-myp', 'Basic CAD and Modelling', 'Use physical or digital models to test ideas.', ['CAD', 'prototype', 'scale', 'model'], ['model parts', 'check size', 'record screenshots'], ['simple 3D model of an enclosure']),
      topic('testing-evaluation-myp', 'Testing and Evaluation', 'Use results to judge success and improve.', ['test method', 'result', 'feedback', 'improvement'], ['design tests', 'record results', 'evaluate'], ['checking if a box lid stays closed']),
    ],
  },
  {
    id: 'myp-3',
    label: 'MYP 3 / Year 9',
    yearGroup: 'MYP 3',
    summary: 'Develop stronger research, client needs, mechanisms, technical drawing, prototyping and specification testing.',
    keyFocus: ['stronger design research', 'client and user needs', 'mechanisms', 'dispenser product design', 'technical drawing', 'prototyping', 'testing against specification'],
    projectSupport: ['client interview sheet', 'technical drawing checklist', 'prototype testing table'],
    revisionChecklist: ['I can gather useful primary research.', 'I can explain mechanism choices.', 'I can draw technical views.', 'I can test against a specification.'],
    topics: [
      topic('research-client-needs', 'Research and Client Needs', 'Use client/user evidence to define the problem.', ['primary research', 'client', 'interview', 'need'], ['ask better questions', 'summarise findings', 'justify direction'], ['interviewing users of a dispenser']),
      topic('mechanisms-myp', 'Mechanisms in Products', 'Use mechanisms to control movement and function.', ['lever', 'cam', 'gear', 'linkage'], ['select mechanism', 'test movement', 'explain function'], ['spring-loaded dispenser']),
      topic('dispenser-design', 'Dispenser Product Design', 'Apply design thinking to a product with controlled output.', ['capacity', 'dispensing', 'refill', 'user comfort'], ['define requirements', 'prototype mechanism', 'test release'], ['tablet or tape dispenser']),
      topic('technical-drawing-myp', 'Technical Drawing', 'Communicate dimensions and views accurately.', ['orthographic', 'isometric', 'dimension', 'section'], ['draw views', 'add dimensions', 'use line types'], ['front, side and plan of a dispenser']),
      topic('prototype-testing-myp', 'Prototype Testing', 'Test function against measurable targets.', ['criteria', 'fair test', 'data', 'iteration'], ['run tests', 'record data', 'make improvements'], ['counting successful dispenser releases']),
    ],
  },
  {
    id: 'myp-4',
    label: 'MYP 4 / Year 10',
    yearGroup: 'MYP 4',
    summary: 'Move toward independent inquiry with deeper research, CAD/CAM, sustainability, user testing and detailed evaluation.',
    keyFocus: ['independent design inquiry', 'deeper research', 'CAD/CAM', 'sustainability', 'user testing', 'detailed evaluation'],
    projectSupport: ['independent inquiry planner', 'CAD/CAM evidence log', 'sustainability audit'],
    revisionChecklist: ['I can plan independent research.', 'I can use CAD/CAM evidence.', 'I can evaluate sustainability.', 'I can connect user testing to improvements.'],
    topics: [
      topic('independent-inquiry', 'Independent Design Inquiry', 'Plan research and decisions with less teacher direction.', ['inquiry', 'context', 'research plan', 'decision'], ['plan investigation', 'select evidence', 'justify direction'], ['researching storage problems at home']),
      topic('deep-research', 'Deeper Research', 'Use a range of research methods and sources.', ['primary data', 'secondary data', 'analysis', 'bias'], ['compare sources', 'summarise findings', 'identify opportunity'], ['survey and product comparison']),
      topic('cad-cam-myp', 'CAD/CAM', 'Prepare digital files for accurate manufacture.', ['vector file', 'kerf', 'scale', 'CAM'], ['draw accurately', 'export correctly', 'test cut'], ['laser-cut prototype panel']),
      topic('sustainability-myp', 'Sustainability', 'Reduce impact across material, making, use and disposal.', ['life cycle', 'waste', 'repair', 'recycling'], ['audit impact', 'reduce waste', 'choose better materials'], ['designing for disassembly']),
      topic('user-testing-myp', 'User Testing and Evaluation', 'Use user evidence to improve the design.', ['user feedback', 'test method', 'data', 'evaluation'], ['observe users', 'record data', 'make changes'], ['comfort test for a handle']),
    ],
  },
  {
    id: 'myp-5',
    label: 'MYP 5 / Year 11',
    yearGroup: 'MYP 5',
    summary: 'Prepare advanced MYP design folders with independence, manufacturing planning, product testing and high-quality evaluation.',
    keyFocus: ['advanced MYP criteria', 'personal project style independence', 'design folder quality', 'manufacturing planning', 'product testing', 'high-quality evaluation'],
    projectSupport: ['design folder audit', 'manufacturing planner', 'high-mark evaluation guide'],
    revisionChecklist: ['I can show strong criterion evidence.', 'I can plan manufacturing steps.', 'I can test product performance.', 'I can evaluate with clear evidence.'],
    topics: [
      topic('advanced-criteria', 'Advanced MYP Criteria', 'Use A-D criteria with clear evidence and reflection.', ['Criterion A', 'Criterion B', 'Criterion C', 'Criterion D'], ['audit evidence', 'write clearly', 'show decisions'], ['linking research to final specification']),
      topic('independent-folder', 'Independent Design Folder', 'Build a coherent record of design thinking.', ['portfolio', 'annotation', 'evidence', 'reflection'], ['organise work', 'select evidence', 'explain changes'], ['before-and-after idea development']),
      topic('manufacturing-planning-myp', 'Manufacturing Planning', 'Plan tools, materials, sequence and safety.', ['process plan', 'risk assessment', 'materials list', 'time plan'], ['sequence steps', 'identify hazards', 'prepare resources'], ['cutting and assembly schedule']),
      topic('product-testing-myp', 'Product Testing', 'Use fair tests and user feedback to judge performance.', ['function test', 'user test', 'accuracy', 'quality'], ['collect data', 'compare criteria', 'make conclusions'], ['load test for a shelf']),
      topic('high-quality-evaluation', 'High-quality Evaluation', 'Write balanced judgements with evidence and improvement.', ['evaluation', 'success criteria', 'limitations', 'next step'], ['use evidence', 'avoid vague claims', 'propose realistic improvements'], ['explaining why a joint failed']),
    ],
  },
  {
    id: 'dp-sl',
    label: 'DP Design Technology SL',
    yearGroup: 'DP SL',
    summary: 'Study core DP concepts: human factors, sustainability, modelling, materials, innovation and classic design.',
    keyFocus: ['human factors and ergonomics', 'resource management and sustainable production', 'modelling', 'raw material to final product', 'innovation and design', 'classic design'],
    projectSupport: ['SL topic revision map', 'IA investigation prompts', 'product analysis frame'],
    revisionChecklist: ['I can explain ergonomics using data.', 'I can discuss sustainability using life cycle thinking.', 'I can compare models.', 'I can analyse innovation and classic design.'],
    topics: [
      topic('human-factors-ergonomics', 'Human Factors and Ergonomics', 'Design products that fit real users safely and comfortably.', ['ergonomics', 'anthropometrics', 'usability', 'accessibility'], ['apply user data', 'analyse comfort', 'improve usability'], ['handle grip designed for 5th-95th percentile']),
      topic('resource-sustainability', 'Resource Management and Sustainable Production', 'Consider resources, waste, life cycle and responsible production.', ['life cycle', '6R', 'carbon footprint', 'repair'], ['evaluate impact', 'reduce waste', 'justify materials'], ['repairable product casing']),
      topic('modelling-dp', 'Modelling', 'Use models to represent, test and communicate ideas.', ['physical model', 'CAD model', 'prototype', 'simulation'], ['choose model type', 'test assumptions', 'communicate design'], ['CAD model for fit checking']),
      topic('materials-manufacturing-dp', 'Raw Material to Final Product', 'Understand material sources, processing and manufacturing routes.', ['raw material', 'processing', 'manufacturing', 'finish'], ['trace material journey', 'select process', 'evaluate production'], ['timber to finished chair']),
      topic('innovation-classic', 'Innovation and Classic Design', 'Compare new ideas and enduring design quality.', ['innovation', 'classic design', 'market', 'function'], ['analyse products', 'compare value', 'explain longevity'], ['Anglepoise lamp as classic design']),
    ],
  },
  {
    id: 'dp-hl',
    label: 'DP Design Technology HL',
    yearGroup: 'DP HL',
    summary: 'Extend SL with user-centred design, sustainability, innovation markets, commercial production and IA support.',
    keyFocus: ['user-centred design', 'sustainability', 'innovation and markets', 'commercial production', 'advanced product analysis', 'IA support'],
    projectSupport: ['HL extension revision map', 'IA criterion support', 'commercial production analysis'],
    revisionChecklist: ['I can connect UCD to research evidence.', 'I can analyse innovation and market factors.', 'I can explain commercial production.', 'I can improve IA evidence quality.'],
    topics: [
      topic('user-centred-design-hl', 'User-Centred Design', 'Design with continuous user involvement and evidence.', ['persona', 'user trial', 'feedback', 'inclusive design'], ['plan user tests', 'interpret feedback', 'improve product'], ['wheelchair user testing a desk accessory']),
      topic('advanced-sustainability-hl', 'Advanced Sustainability', 'Evaluate long-term social, environmental and economic impact.', ['triple bottom line', 'life cycle', 'disassembly', 'responsible choice'], ['balance impacts', 'justify trade-offs', 'reduce harm'], ['modular product for repair']),
      topic('innovation-markets-hl', 'Innovation and Markets', 'Understand how products reach and affect markets.', ['market pull', 'technology push', 'diffusion', 'patent'], ['analyse adoption', 'identify opportunity', 'evaluate risk'], ['smart bottle entering a market']),
      topic('commercial-production-hl', 'Commercial Production', 'Explain how products are made consistently at scale.', ['batch production', 'quality assurance', 'jig', 'standardisation'], ['plan production', 'control quality', 'reduce variation'], ['batch of 50 laser-cut kits']),
      topic('ia-support-hl', 'IA Support', 'Use evidence and evaluation to strengthen internal assessment.', ['research question', 'testing evidence', 'development', 'evaluation'], ['collect evidence', 'link decisions', 'reflect critically'], ['IA test table linked to specification']),
    ],
  },
];

const aLevelBlueprints: LevelBlueprint[] = [
  {
    id: 'as-level',
    label: 'AS Level',
    yearGroup: 'AS',
    summary: 'Cambridge 9705 AS topics 1-12: design process, communication, materials, processing, systems and technology.',
    keyFocus: ['The Design Process', 'Design Principles', 'Communication', 'Design and Technology in Society', 'Sustainable Design', 'Health and Safety', 'Aesthetics and Ergonomics', 'Materials and Components', 'Stages in Materials Processing', 'Materials Processing', 'Energy and Control Systems', 'Technology'],
    projectSupport: ['Component 2 product analysis', 'AS Paper 1 revision planner', 'design brief builder', 'materials/process selector'],
    revisionChecklist: ['I can analyse products by function and user.', 'I can explain AS material and process choices.', 'I can communicate ideas with drawings.', 'I can evaluate sustainability and safety.'],
    topics: [
      topic('topic-1-design-process', '1. The Design Process', 'Use iterative and intuitive design to move from need to tested solution.', ['empathise', 'define', 'ideate', 'refine', 'realise', 'test'], ['analyse needs', 'generate ideas', 'evaluate product'], ['improving a water bottle grip']),
      topic('topic-2-design-principles', '2. Design Principles', 'Recognise good design and influences on product development.', ['usefulness', 'innovation', 'simplicity', 'design movements'], ['compare movements', 'justify design quality', 'analyse influences'], ['Bauhaus chair analysis']),
      topic('topic-3-communication', '3. Communication', 'Use sketches, CAD, orthographic, isometric and planning drawings.', ['sketching', 'orthographic', 'isometric', 'flowchart', 'Gantt chart'], ['draw views', 'annotate', 'plan making'], ['working drawing with dimensions']),
      topic('topic-4-society', '4. Design and Technology in Society', 'Consider individuals, groups, culture, inclusion and accessibility.', ['inclusive design', 'accessibility', 'culture', 'society'], ['audit users', 'identify exclusion', 'redesign inclusively'], ['kettle handle for elderly users']),
      topic('topic-5-sustainable-design', '5. Sustainable Design', 'Reduce environmental impact through lifecycle decisions.', ['life cycle', 'repair', 'recycling', 'local materials'], ['evaluate impact', 'reduce waste', 'design for disassembly'], ['flat-pack recyclable packaging']),
      topic('topic-6-health-safety', '6. Health and Safety', 'Assess risk and use safe workshop practice.', ['hazard', 'risk assessment', 'PPE', 'machine guard'], ['identify hazards', 'choose controls', 'work safely'], ['risk assessment for drilling']),
      topic('topic-7-aesthetics-ergonomics', '7. Aesthetics and Ergonomics', 'Balance appearance, comfort and human data.', ['line', 'colour', 'anthropometrics', 'usability'], ['apply body data', 'analyse appearance', 'test comfort'], ['desk height adjusted for user']),
      topic('topic-8-materials-components', '8. Materials and Components', 'Compare material groups, properties, uses and components.', ['woods', 'metals', 'polymers', 'composites', 'components'], ['select material', 'justify component', 'consider sustainability'], ['choosing acrylic for transparent case']),
      topic('topic-9-material-stages', '9. Stages in Materials Processing', 'Trace how raw materials become finished products.', ['source', 'conversion', 'forming', 'joining', 'finishing'], ['map process stages', 'sequence production', 'check quality'], ['tree to timber chair']),
      topic('topic-10-material-processing', '10. Materials Processing', 'Select cutting, shaping, forming, joining and finishing methods.', ['cutting', 'forming', 'joining', 'finishing', 'CAD/CAM'], ['match process', 'compare limitations', 'plan manufacture'], ['vacuum forming a tray']),
      topic('topic-11-energy-control', '11. Energy and Control Systems', 'Use input-process-output, mechanisms and electronic control.', ['input', 'process', 'output', 'sensor', 'feedback'], ['draw systems', 'identify components', 'explain control'], ['temperature-controlled fan']),
      topic('topic-12-technology', '12. Technology', 'Use digital technology, CAD/CAM, simulation and emerging tools.', ['CAD', 'CAM', '3D printing', 'laser cutting', 'simulation'], ['choose technology', 'prepare files', 'evaluate benefits'], ['laser-cutting a net from CAD']),
    ],
  },
  {
    id: 'a2-level',
    label: 'A2 Level',
    yearGroup: 'A2',
    summary: 'Cambridge 9705 A Level topics 13-18: industry, business, quantity production, quality and digital technology.',
    keyFocus: ['Industrial Practices', 'Business and Commercial Practices', 'Quantity Production', 'Materials Processing in Industry', 'Quality Systems', 'Digital Technology'],
    projectSupport: ['Paper 3 revision planner', 'quantity production planner', 'quality checklist', 'industrial process comparison'],
    revisionChecklist: ['I can compare production methods.', 'I can explain QA and QC.', 'I can plan batch production.', 'I can discuss digital manufacturing.'],
    topics: [
      topic('topic-13-industrial-practices', '13. Industrial Practices', 'Plan production systems, workflow, tooling, jigs and fixtures.', ['workflow', 'jig', 'fixture', 'standardised component'], ['plan production', 'identify constraints', 'improve efficiency'], ['drilling jig for repeated parts']),
      topic('topic-14-commercial-practices', '14. Business and Commercial Practices', 'Connect design to market, cost, branding and viability.', ['market research', 'target market', 'cost', 'profit', 'IP'], ['analyse market', 'estimate cost', 'pitch product'], ['pricing a batch of desk lamps']),
      topic('topic-15-quantity-production', '15. Quantity Production', 'Compare one-off, batch, mass and continuous production.', ['one-off', 'batch', 'mass', 'continuous', 'economies of scale'], ['select production method', 'plan repeatability', 'control quality'], ['batch of ten school trophies']),
      topic('topic-16-industrial-processing', '16. Materials Processing in Industry', 'Understand industrial cutting, moulding, forming, fabrication and finishing.', ['injection moulding', 'extrusion', 'CNC', 'industrial joining'], ['choose industrial process', 'compare cost and speed', 'explain limitations'], ['injection-moulded bottle cap']),
      topic('topic-17-quality-systems', '17. Quality Systems', 'Use QA, QC, tolerance and inspection to maintain consistency.', ['quality assurance', 'quality control', 'tolerance', 'sampling'], ['inspect batch', 'calculate tolerance', 'spot defects'], ['go/no-go gauge for a hole']),
      topic('topic-18-digital-technology', '18. Digital Technology', 'Use digital tools for modelling, manufacture, testing and collaboration.', ['CAD', 'CAM', 'CNC', 'automation', 'data-led design'], ['select digital tools', 'simulate design', 'evaluate workflow'], ['cloud CAD collaboration']),
    ],
  },
  {
    id: 'full-a-level',
    label: 'Full A Level',
    yearGroup: 'AS + A2',
    summary: 'Complete Cambridge 9705 pathway combining AS topics 1-12, A2 topics 13-18, Paper 1, Paper 3 and coursework.',
    keyFocus: ['AS Topics 1-12', 'A2 Topics 13-18', 'Paper 1', 'Paper 3', 'Component 2', 'Component 4', 'AO1-AO4'],
    projectSupport: ['full course revision map', 'AO tracker', 'paper comparison guide', 'coursework evidence planner'],
    revisionChecklist: ['I can link AS and A2 knowledge.', 'I can answer Paper 1 and Paper 3 styles.', 'I can connect coursework to AO3/AO4.', 'I can plan manufacturing in quantity.'],
    topics: [
      topic('full-course-map', 'Full Course Map', 'Connect design theory, practical work and industrial knowledge.', ['AS content', 'A2 content', 'assessment route', 'coursework'], ['plan revision', 'track AO evidence', 'link topics'], ['using quality systems in Component 4']),
      topic('ao1-ao4', 'AO1-AO4 Assessment Objectives', 'Understand how knowledge, communication, development and evaluation are assessed.', ['AO1', 'AO2', 'AO3', 'AO4'], ['classify tasks', 'target evidence', 'improve answers'], ['identifying AO4 in evaluation']),
      topic('paper-1-paper-3', 'Paper 1 and Paper 3', 'Prepare for AS and A Level written papers.', ['command words', 'short answer', 'drawing question', 'case study'], ['structure answers', 'use vocabulary', 'draw accurately'], ['explaining production method choice']),
      topic('coursework-connection', 'Coursework Connection', 'Use coursework evidence to strengthen design decisions.', ['portfolio', 'evidence', 'testing', 'manufacturing plan'], ['document process', 'justify decisions', 'evaluate product'], ['Component 4 batch production plan']),
    ],
  },
  {
    id: 'component-2',
    label: 'Component 2 Coursework',
    yearGroup: 'Component 2',
    summary: 'Product Analysis and Improvement Project: analyse one existing product, improve it, prototype and evaluate.',
    keyFocus: ['identify and analyse an existing product', 'identify one area for improvement', 'clarify need and generate ideas', 'develop design and plan', 'produce prototype', 'test and evaluate improvement'],
    projectSupport: ['product analysis builder', 'improvement decision tool', 'prototype diary', 'evaluation table builder'],
    revisionChecklist: ['I chose a product with real improvement potential.', 'I analysed function, user, material and process.', 'I made a substantive improvement.', 'I tested the improvement with evidence.'],
    topics: [
      topic('c2-stage-1', '1. Identify and Analyse an Existing Product', 'Select a familiar product and analyse it with evidence.', ['product choice', 'function', 'user', 'wider issues'], ['justify selection', 'analyse strengths', 'identify weaknesses'], ['analysing a desk lamp']),
      topic('c2-stage-2', '2. Identify One Area for Improvement', 'Choose one meaningful improvement linked to evidence.', ['improvement opportunity', 'user need', 'weakness', 'justification'], ['prioritise problem', 'justify importance', 'avoid decoration-only changes'], ['improving grip comfort']),
      topic('c2-stage-3', '3. Clarify Need and Generate Ideas', 'Create brief, specification and possible improvement ideas.', ['design need', 'brief', 'specification', 'idea generation'], ['write brief', 'use SCAMPER', 'compare ideas'], ['three handle redesign ideas']),
      topic('c2-stage-4', '4. Develop Design and Plan', 'Develop selected idea and plan safe making.', ['development', 'material choice', 'process plan', 'safety'], ['model options', 'plan steps', 'select tools'], ['CAD model and cutting list']),
      topic('c2-stage-5', '5. Produce Prototype', 'Make a prototype that demonstrates the improvement.', ['prototype evidence', 'making diary', 'accuracy', 'problem solving'], ['record making', 'solve issues', 'show final prototype'], ['photo diary of modified lamp base']),
      topic('c2-stage-6', '6. Test and Evaluate Improvement', 'Test against specification and propose further improvement.', ['test method', 'user feedback', 'result', 'evaluation'], ['collect data', 'judge success', 'suggest next steps'], ['comfort rating before and after']),
    ],
  },
  {
    id: 'component-4',
    label: 'Component 4 Coursework',
    yearGroup: 'Component 4',
    summary: 'Design, Realisation and Manufacturing Project: solve a real need, make a product, test it and plan quantity manufacture.',
    keyFocus: ['design situation, brief and specification', 'generate and appraise ideas', 'develop product and plan making', 'realise product', 'test and evaluate product', 'plan manufacturing in quantity'],
    projectSupport: ['design situation builder', 'idea appraisal matrix', 'making evidence timeline', 'batch production planner'],
    revisionChecklist: ['I can define a real design situation.', 'I can develop and realise a product safely.', 'I can test with evidence.', 'I can plan production of at least ten products.'],
    topics: [
      topic('c4-stage-1', '1. Design Situation, Brief and Specification', 'Define a real design situation and measurable specification.', ['situation', 'brief', 'specification', 'research'], ['analyse context', 'write requirements', 'justify criteria'], ['storage need in a classroom']),
      topic('c4-stage-2', '2. Generate and Appraise Ideas', 'Generate, compare and select design proposals.', ['idea generation', 'appraisal', 'selection', 'annotation'], ['create range', 'score ideas', 'justify selected concept'], ['concept matrix for chair ideas']),
      topic('c4-stage-3', '3. Develop Product and Plan Making', 'Develop materials, construction, CAD and process plans.', ['development', 'CAD', 'risk assessment', 'time plan'], ['refine design', 'plan tools', 'prepare resources'], ['exploded view and Gantt chart']),
      topic('c4-stage-4', '4. Realise Product', 'Make a high-quality product safely and accurately.', ['realisation', 'finish', 'accuracy', 'quality'], ['use tools safely', 'solve making problems', 'document quality'], ['finished product photo set']),
      topic('c4-stage-5', '5. Test and Evaluate Product', 'Use function, user, safety and quality tests.', ['testing', 'feedback', 'specification', 'evaluation'], ['run fair tests', 'compare criteria', 'recommend improvements'], ['load, fit and usability tests']),
      topic('c4-stage-6', '6. Plan Manufacturing in Quantity', 'Plan how to produce at least ten consistent products.', ['batch production', 'QA', 'QC', 'cost', 'environmental impact'], ['plan workflow', 'use jigs', 'inspect quality'], ['batch plan for ten lamps']),
    ],
  },
];

function topic(
  id: string,
  title: string,
  studentSummary: string,
  keyKnowledge: string[],
  keySkills: string[],
  examples: string[],
): Omit<CurriculumTopic, 'curriculum' | 'levelId'> {
  return {
    id,
    title,
    studentSummary,
    keyKnowledge,
    keySkills,
    examples,
    miniActivity: `Create a quick evidence note showing how ${title.toLowerCase()} affects one product you use at school.`,
    relatedTools: commonTools,
  };
}

const makeCurriculum = (
  id: StudyCurriculumId,
  shortName: string,
  fullName: string,
  subtitle: string,
  description: string,
  icon: string,
  blueprints: LevelBlueprint[],
): StudyCurriculum => ({
  id,
  shortName,
  fullName,
  subtitle,
  description,
  icon,
  levels: blueprints.map((level) => ({
    ...level,
    topicIds: level.topics.map((topicItem) => topicItem.id),
  })),
});

export const studyCurricula: StudyCurriculum[] = [
  makeCurriculum(
    'HKDSE_DNT',
    'HKDSE D&T',
    'Hong Kong Design and Technology / DAT',
    'S1-S6 · Design, Technology, DAT and STEAM pathway',
    'A clear pathway from junior design technology foundations to senior HKDSE DAT project evidence, manufacturing and exam preparation.',
    'HK',
    hkdseLevelBlueprints,
  ),
  makeCurriculum(
    'IB_DESIGN',
    'IB Design',
    'IB MYP and DP Design Technology',
    'MYP + DP · Design cycle, criteria, product design and technology',
    'A design-cycle pathway for MYP and DP learners, with criteria, user research, modelling, sustainability, IA and product analysis support.',
    'IB',
    ibLevelBlueprints,
  ),
  makeCurriculum(
    'A_LEVEL_DT',
    'A Level D&T',
    'Cambridge International AS & A Level Design & Technology 9705',
    'AS + A2 · Cambridge 9705 product design and manufacturing',
    'A Cambridge 9705 pathway covering AS topics 1-12, A2 topics 13-18, written papers, Component 2 and Component 4 coursework.',
    'AL',
    aLevelBlueprints,
  ),
];

const allBlueprints: Record<StudyCurriculumId, LevelBlueprint[]> = {
  HKDSE_DNT: hkdseLevelBlueprints,
  IB_DESIGN: ibLevelBlueprints,
  A_LEVEL_DT: aLevelBlueprints,
};

export const curriculumTopics: CurriculumTopic[] = Object.entries(allBlueprints).flatMap(([curriculum, levels]) =>
  levels.flatMap((level) =>
    level.topics.map((topicItem) => ({
      ...topicItem,
      curriculum: curriculum as StudyCurriculumId,
      levelId: level.id,
    })),
  ),
);

const sharedTerms: Array<{ term: string; definition: string; explanation: string; example: string; skills: string[] }> = [
  { term: 'Design brief', definition: 'A short statement of the design problem and direction.', explanation: 'A design brief explains what needs to be designed, for whom and why.', example: 'Design a portable desk organiser for S1 students.', skills: ['design process', 'communication'] },
  { term: 'Specification', definition: 'A measurable list of design requirements.', explanation: 'Specifications convert needs into criteria that can be tested.', example: 'The box must hold 2 kg without breaking.', skills: ['criteria', 'testing'] },
  { term: 'Prototype', definition: 'A test version of a design idea.', explanation: 'Prototypes help check size, function, material choice and user response before final making.', example: 'A cardboard model of an acrylic display stand.', skills: ['modelling', 'testing'] },
  { term: 'Iteration', definition: 'Repeating and improving a design after feedback or testing.', explanation: 'Iteration shows that the designer used evidence to improve the solution.', example: 'Changing a handle angle after user testing.', skills: ['development', 'evaluation'] },
  { term: 'Ergonomics', definition: 'Designing products to fit people safely and comfortably.', explanation: 'Ergonomics considers posture, reach, comfort, force and ease of use.', example: 'A handle shaped for a comfortable grip.', skills: ['human factors', 'user testing'] },
  { term: 'Anthropometrics', definition: 'Human body measurement data used in design.', explanation: 'Anthropometric data helps designers choose suitable sizes for a target user group.', example: 'Using sitting height data to design a desk.', skills: ['human factors', 'data use'] },
  { term: 'Sustainability', definition: 'Designing to reduce negative long-term impact.', explanation: 'Sustainable design considers materials, manufacture, transport, use, repair and disposal.', example: 'Designing a product that can be repaired.', skills: ['life cycle', 'material selection'] },
  { term: 'Kerf', definition: 'The width of material removed by a laser cut.', explanation: 'Kerf affects the final size of laser-cut parts and must be considered for press-fit joints.', example: 'A 0.15 mm kerf changes slot accuracy.', skills: ['laser cutting', 'tolerance'] },
  { term: 'Tolerance', definition: 'The acceptable variation from a target dimension.', explanation: 'Tolerance allows real manufactured parts to vary slightly while still fitting and working.', example: 'A 10 mm hole may allow +/-0.2 mm.', skills: ['quality control', 'manufacturing'] },
  { term: 'Press fit', definition: 'A joint held by friction because the slot is slightly smaller than the tab.', explanation: 'Press-fit joints avoid glue when tab and slot sizes are correctly tested.', example: 'A 3.0 mm tab fitting into a 2.8 mm slot.', skills: ['joining', 'laser cutting'] },
  { term: 'CAD', definition: 'Computer-aided design.', explanation: 'CAD is used to draw, model and refine designs digitally.', example: 'Creating a 3D model of a phone stand.', skills: ['digital design', 'communication'] },
  { term: 'CAM', definition: 'Computer-aided manufacturing.', explanation: 'CAM uses digital files to control machines such as laser cutters, CNC routers or 3D printers.', example: 'Exporting SVG for laser cutting.', skills: ['manufacturing', 'digital technology'] },
  { term: 'Orthographic projection', definition: 'Accurate 2D views of a 3D object.', explanation: 'Orthographic drawings show plan, front and side views for manufacture.', example: 'Drawing a box from front, top and side.', skills: ['technical drawing', 'communication'] },
  { term: 'Isometric drawing', definition: 'A 3D-looking drawing using equal 30-degree axes.', explanation: 'Isometric drawings help communicate form and proportion.', example: 'Sketching a cube-shaped product.', skills: ['drawing', 'visualisation'] },
  { term: 'Exploded view', definition: 'A drawing showing parts separated to explain assembly.', explanation: 'Exploded views help users understand how parts fit together.', example: 'Showing screws and panels of a small box.', skills: ['assembly', 'communication'] },
  { term: 'Quality assurance', definition: 'Systems that prevent faults before or during production.', explanation: 'QA includes planning, training, standards and process control.', example: 'Checking machine setup before a batch run.', skills: ['quality systems', 'industry'] },
  { term: 'Quality control', definition: 'Checks used to find faults in finished or partly finished products.', explanation: 'QC includes inspection, measurement and testing.', example: 'Measuring every fifth laser-cut panel.', skills: ['inspection', 'testing'] },
  { term: 'Batch production', definition: 'Making a limited number of identical products.', explanation: 'Batch production balances repeatability with flexibility.', example: 'Making 20 school trophies.', skills: ['quantity production', 'planning'] },
  { term: 'Mass production', definition: 'Making large quantities of identical products.', explanation: 'Mass production uses specialised tooling and high repeatability.', example: 'Manufacturing phone cases.', skills: ['industry', 'production'] },
  { term: 'Smart material', definition: 'A material that changes properties in response to a stimulus.', explanation: 'Smart materials respond to heat, light, electricity or force.', example: 'Thermochromic pigment changing colour with heat.', skills: ['materials', 'technology'] },
  { term: 'Input-process-output', definition: 'A systems model showing what enters, what happens and what is produced.', explanation: 'IPO diagrams help explain mechanisms, electronics and control systems.', example: 'Button input, controller process, LED output.', skills: ['systems', 'electronics'] },
  { term: 'Sensor', definition: 'A device that detects a change in the environment.', explanation: 'Sensors provide input data for control systems.', example: 'A light sensor controlling a lamp.', skills: ['electronics', 'control'] },
  { term: 'Feedback', definition: 'Information returned to a system or designer to improve performance.', explanation: 'Feedback can be electronic data or user comments.', example: 'A thermostat measuring room temperature.', skills: ['systems', 'evaluation'] },
  { term: 'Mechanism', definition: 'A device that changes force or motion.', explanation: 'Mechanisms allow products to move or transfer energy.', example: 'A gear train changing speed.', skills: ['mechanisms', 'motion'] },
  { term: 'Lever', definition: 'A rigid bar that turns around a pivot.', explanation: 'Levers can change force, distance or direction of movement.', example: 'Scissors use levers.', skills: ['mechanisms', 'force'] },
  { term: 'Cam', definition: 'A shaped rotating part that creates repeated motion.', explanation: 'Cams often convert rotary motion into reciprocating motion.', example: 'A cam lifting a follower.', skills: ['mechanisms', 'motion'] },
  { term: 'Gear', definition: 'A toothed wheel used to transmit rotation.', explanation: 'Gears change speed, torque or direction.', example: 'Small gear driving a larger gear.', skills: ['mechanisms', 'systems'] },
  { term: 'Linkage', definition: 'Connected bars that transfer or control movement.', explanation: 'Linkages guide motion through pivots and bars.', example: 'A folding grabber mechanism.', skills: ['mechanisms', 'prototyping'] },
  { term: 'Life cycle', definition: 'The full journey of a product from raw material to end of life.', explanation: 'Life cycle thinking helps reduce environmental impact.', example: 'Raw material, manufacture, transport, use, disposal.', skills: ['sustainability', 'evaluation'] },
  { term: 'User-centred design', definition: 'Design that starts from user needs and feedback.', explanation: 'UCD keeps real users involved through research, testing and evaluation.', example: 'Testing a handle with elderly users.', skills: ['research', 'usability'] },
  { term: 'Inclusive design', definition: 'Designing so more people can use a product effectively.', explanation: 'Inclusive design considers age, ability, culture and context.', example: 'Large high-contrast controls.', skills: ['accessibility', 'human factors'] },
  { term: 'Risk assessment', definition: 'A process for identifying hazards and reducing risk.', explanation: 'Risk assessment records what could cause harm and what controls are needed.', example: 'Wear goggles and clamp material before drilling.', skills: ['safety', 'planning'] },
  { term: 'Jig', definition: 'A device that guides a tool or holds work for repeat accuracy.', explanation: 'Jigs improve consistency in batch production.', example: 'A drilling jig for repeated holes.', skills: ['manufacturing', 'quality'] },
  { term: 'Fixture', definition: 'A device that holds a workpiece securely during manufacture.', explanation: 'Fixtures improve safety, accuracy and repeatability.', example: 'A CNC fixture holding acrylic sheet.', skills: ['industrial practice', 'quality'] },
  { term: 'One-off production', definition: 'Making one unique product.', explanation: 'One-off production suits custom designs but is often slower and more expensive per item.', example: 'A custom chair for one client.', skills: ['production', 'business'] },
  { term: 'Continuous production', definition: 'Non-stop manufacture of products or materials.', explanation: 'Continuous production suits very high volumes and consistent products.', example: 'Paper or plastic bottle production.', skills: ['industry', 'quantity production'] },
  { term: 'Design fixation', definition: 'Getting stuck on the first idea or existing solution.', explanation: 'Designers avoid fixation by generating alternatives and testing assumptions.', example: 'Using SCAMPER to rethink a phone stand.', skills: ['creativity', 'ideation'] },
  { term: 'SCAMPER', definition: 'An idea-generation method using seven prompts.', explanation: 'SCAMPER prompts are Substitute, Combine, Adapt, Modify, Put to another use, Eliminate and Reverse.', example: 'Reverse a phone stand so the angle adjusts differently.', skills: ['creative thinking', 'ideation'] },
  { term: 'Design movement', definition: 'A style or philosophy that influences product design.', explanation: 'Movements such as Bauhaus or Minimalism affect form, materials and function.', example: 'Bauhaus focuses on function and simple geometry.', skills: ['design principles', 'analysis'] },
  { term: 'Aesthetics', definition: 'The visual and sensory qualities of a product.', explanation: 'Aesthetics includes shape, colour, proportion, texture and finish.', example: 'Matte black finish making a product look professional.', skills: ['design analysis', 'communication'] },
  { term: 'Manufacturing process', definition: 'A method used to make or shape a product.', explanation: 'Processes include cutting, forming, joining, finishing and assembly.', example: 'Vacuum forming a plastic tray.', skills: ['process selection', 'making'] },
  { term: 'Injection moulding', definition: 'Forcing molten polymer into a mould.', explanation: 'Injection moulding is suitable for high-volume plastic products with consistent detail.', example: 'Bottle caps and toy parts.', skills: ['industrial processing', 'materials'] },
  { term: '3D printing', definition: 'Additive manufacturing that builds parts layer by layer.', explanation: '3D printing is useful for prototypes, complex forms and low-volume parts.', example: 'Printing a custom clip.', skills: ['digital manufacturing', 'prototyping'] },
  { term: 'Laser cutting', definition: 'Using a laser beam to cut or engrave sheet material.', explanation: 'Laser cutting needs clean vector files, correct settings and kerf testing.', example: 'Cutting a finger-joint box from plywood.', skills: ['CAM', 'file preparation'] },
  { term: 'Living hinge', definition: 'A pattern of cuts that lets sheet material bend.', explanation: 'Living hinges are affected by spacing, cut length, thickness and material direction.', example: 'Curving cardboard with straight dashed cuts.', skills: ['laser cutting', 'materials'] },
  { term: 'Evaluation', definition: 'Judging how well a design meets criteria using evidence.', explanation: 'Evaluation should compare results against specifications and user needs.', example: 'Test table showing pass/fail results.', skills: ['testing', 'reflection'] },
  { term: 'Function', definition: 'What a product is designed to do.', explanation: 'Function should be tested rather than only described.', example: 'A lamp must provide enough light for reading.', skills: ['analysis', 'testing'] },
  { term: 'Constraint', definition: 'A limit or condition that affects a design.', explanation: 'Constraints can involve cost, size, time, safety, tools or materials.', example: 'The product must fit inside a 300 mm laser bed.', skills: ['specification', 'planning'] },
  { term: 'Target market', definition: 'The group of people most likely to buy or use a product.', explanation: 'Target market affects style, cost, features and promotion.', example: 'Teen students needing portable desk storage.', skills: ['commercial practice', 'research'] },
  { term: 'Commercial viability', definition: 'Whether a product can realistically succeed in the market.', explanation: 'Viability considers cost, demand, production and competition.', example: 'A product too expensive for its target users may not be viable.', skills: ['business', 'evaluation'] },
  { term: 'AO1', definition: 'Knowledge and understanding.', explanation: 'AO1 rewards accurate subject knowledge about materials, tools, processes and design impact.', example: 'Explaining why acrylic can be laser cut.', skills: ['assessment', 'knowledge'] },
  { term: 'AO2', definition: 'Application and communication.', explanation: 'AO2 rewards applying knowledge and communicating through drawings, notes and vocabulary.', example: 'Using dimensions correctly in an orthographic drawing.', skills: ['assessment', 'communication'] },
  { term: 'AO3', definition: 'Development of design ideas and practical skills.', explanation: 'AO3 rewards design development, planning and safe realisation.', example: 'Developing a prototype through test pieces.', skills: ['assessment', 'making'] },
  { term: 'AO4', definition: 'Analysis and evaluation.', explanation: 'AO4 rewards analysing products, testing designs and judging evidence.', example: 'Evaluating a prototype against specifications.', skills: ['assessment', 'evaluation'] },
];

const difficultyFor = (index: number): QuizQuestion['difficulty'] => {
  if (index < 18) return 'easy';
  if (index < 38) return 'medium';
  return 'hard';
};

const makeQuestionsForLevel = (curriculum: StudyCurriculumId, level: CurriculumLevel, topics: CurriculumTopic[]): QuizQuestion[] => {
  const templates = [
    (topicItem: CurriculumTopic) => ({
      question: `Which action best supports ${topicItem.title}?`,
      correct: topicItem.keySkills[0] ?? 'use evidence',
      distractors: ['choose a colour only', 'ignore user feedback', 'skip testing'],
      explanation: `${topicItem.title} needs practical evidence. ${topicItem.keySkills[0] ?? 'Using evidence'} helps the design decision match the curriculum focus.`,
    }),
    (topicItem: CurriculumTopic) => ({
      question: `A student is working on ${topicItem.examples[0] ?? topicItem.title}. What should they record first?`,
      correct: topicItem.keyKnowledge[0] ?? 'the design need',
      distractors: ['a random decoration', 'only the final mark', 'nothing until the end'],
      explanation: `Recording ${topicItem.keyKnowledge[0] ?? 'the key design need'} makes the work traceable to the topic and assessment evidence.`,
    }),
    (topicItem: CurriculumTopic) => ({
      question: `Which skill is most directly linked to ${topicItem.title}?`,
      correct: topicItem.keySkills[1] ?? topicItem.keySkills[0] ?? 'evaluate evidence',
      distractors: ['guess without data', 'copy an existing product exactly', 'avoid measuring'],
      explanation: `The correct skill is part of this topic's core skill set and supports reliable design decisions.`,
    }),
    (topicItem: CurriculumTopic) => ({
      question: `What evidence would make work on ${topicItem.title} stronger?`,
      correct: 'clear notes, test results or annotated sketches',
      distractors: ['only a title page', 'unlabelled screenshots', 'a final photo with no explanation'],
      explanation: `Strong D&T work needs visible evidence such as notes, test data, sketches, photos or measured results.`,
    }),
    (topicItem: CurriculumTopic) => ({
      question: `Why is ${topicItem.keyKnowledge[1] ?? topicItem.keyKnowledge[0] ?? 'testing'} important in ${level.label}?`,
      correct: 'it helps justify and improve the design',
      distractors: ['it removes the need for research', 'it only makes the page look full', 'it replaces user feedback'],
      explanation: `Testing and evidence support justified improvements, which is central to ${level.label}.`,
    }),
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const topicItem = topics[index % topics.length];
    const template = templates[index % templates.length](topicItem);
    const options = [template.correct, ...template.distractors];
    return {
      id: `${curriculum}-${level.id}-q-${String(index + 1).padStart(2, '0')}`,
      curriculum,
      levelId: level.id,
      yearGroup: level.yearGroup,
      topicId: topicItem.id,
      difficulty: difficultyFor(index),
      skillTags: [topicItem.keySkills[index % topicItem.keySkills.length] ?? 'design thinking', topicItem.keyKnowledge[index % topicItem.keyKnowledge.length] ?? 'evidence'],
      question: template.question,
      options,
      correctAnswer: template.correct,
      explanation: template.explanation,
      examLink: curriculum === 'A_LEVEL_DT' ? 'Cambridge 9705 AO1-AO4' : curriculum === 'IB_DESIGN' ? 'IB Design criteria' : 'HKDSE D&T/DAT learning outcome',
    };
  });
};

const makeFlashcardsForLevel = (curriculum: StudyCurriculumId, level: CurriculumLevel, topics: CurriculumTopic[]): TerminologyFlashcard[] => {
  const levelTerms = [
    ...level.keyFocus.map((focus) => ({
      term: focus.replace(/\b\w/g, (letter) => letter.toUpperCase()),
      definition: `A key focus area in ${level.label}.`,
      explanation: `This term matters because ${level.label} expects students to use it when explaining design decisions and evidence.`,
      example: `Use ${focus} when improving a product for a real user.`,
      skills: ['curriculum knowledge', 'explanation'],
    })),
    ...topics.map((topicItem) => ({
      term: topicItem.title,
      definition: topicItem.studentSummary,
      explanation: topicItem.keyKnowledge.join(', '),
      example: topicItem.examples[0] ?? topicItem.miniActivity,
      skills: topicItem.keySkills,
    })),
    ...sharedTerms,
  ];

  return Array.from({ length: 50 }, (_, index) => {
    const source = levelTerms[index % levelTerms.length];
    const topicItem = topics[index % topics.length];
    return {
      id: `${curriculum}-${level.id}-term-${String(index + 1).padStart(2, '0')}`,
      curriculum,
      levelId: level.id,
      yearGroup: level.yearGroup,
      topicId: topicItem.id,
      term: source.term,
      shortDefinition: source.definition,
      detailedExplanation: source.explanation,
      example: source.example,
      relatedSkills: source.skills,
    };
  });
};

export const studyQuizQuestions: QuizQuestion[] = studyCurricula.flatMap((curriculum) =>
  curriculum.levels.flatMap((level) => makeQuestionsForLevel(curriculum.id, level, curriculumTopics.filter((topicItem) => topicItem.curriculum === curriculum.id && topicItem.levelId === level.id))),
);

export const studyFlashcards: TerminologyFlashcard[] = studyCurricula.flatMap((curriculum) =>
  curriculum.levels.flatMap((level) => makeFlashcardsForLevel(curriculum.id, level, curriculumTopics.filter((topicItem) => topicItem.curriculum === curriculum.id && topicItem.levelId === level.id))),
);

export const parseStudySelection = (selection?: string): { curriculumId: StudyCurriculumId; levelId: string; mode?: string } | null => {
  if (!selection) return null;
  const [curriculumId, levelId, mode] = selection.split(':');
  if (curriculumId !== 'HKDSE_DNT' && curriculumId !== 'IB_DESIGN' && curriculumId !== 'A_LEVEL_DT') return null;
  if (!getStudyLevel(curriculumId, levelId)) return null;
  return { curriculumId, levelId, mode };
};

export const makeStudySelection = (curriculumId: StudyCurriculumId, levelId: string, mode?: string) =>
  [curriculumId, levelId, mode].filter(Boolean).join(':');

export const getStudyCurriculum = (id: StudyCurriculumId) => studyCurricula.find((curriculum) => curriculum.id === id);

export const getStudyLevel = (curriculumId: StudyCurriculumId, levelId: string) =>
  getStudyCurriculum(curriculumId)?.levels.find((level) => level.id === levelId);

export const getTopicsForLevel = (curriculumId: StudyCurriculumId, levelId: string) =>
  curriculumTopics.filter((topicItem) => topicItem.curriculum === curriculumId && topicItem.levelId === levelId);

export const getQuizQuestionsForLevel = (curriculumId: StudyCurriculumId, levelId: string) =>
  studyQuizQuestions.filter((question) => question.curriculum === curriculumId && question.levelId === levelId);

export const getFlashcardsForLevel = (curriculumId: StudyCurriculumId, levelId: string) =>
  studyFlashcards.filter((card) => card.curriculum === curriculumId && card.levelId === levelId);

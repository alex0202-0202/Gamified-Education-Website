export type PosterRouteTarget = {
  label: string;
  screen: string;
  topic?: string;
};

export type PosterResource = {
  id: string;
  title: string;
  titleZh: string;
  src: string;
  alt: string;
  curriculum: string[];
  knowledgeAreas: string[];
  studentUse: string;
  teacherUse: string;
  routeTargets: PosterRouteTarget[];
};

export const posterResources: PosterResource[] = [
  {
    id: 'design-process-cycle',
    title: 'Design Cycle',
    titleZh: '設計循環',
    src: '/posters/design_process_cycle_infographic.png',
    alt: 'Infographic explaining investigate, design, make and evaluate stages of the design cycle.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['design-process', 'project-portfolio', 'ib-myp', 'junior-dt'],
    studentUse: 'Use this as a quick checklist for moving from problem, user and context to tested solution.',
    teacherUse: 'Useful as a starter or wall reference for project lessons, portfolio evidence and reflection prompts.',
    routeTargets: [
      { label: 'Project Hub', screen: 'project_hub' },
      { label: 'IB MYP Design', screen: 'ib_myp_design' },
      { label: 'S1-S3 DT', screen: 'edb_junior_dt' },
    ],
  },
  {
    id: 'hkdse-dat-sba-project',
    title: 'HKDSE DAT SBA Project',
    titleZh: '香港中學文憑設計與應用科技 SBA 專題',
    src: '/posters/colorful_hkdse_design_project_infographic.png',
    alt: 'Infographic summarising the HKDSE DAT SBA project stages from problem and user to testing and evaluation.',
    curriculum: ['HKDSE DAT'],
    knowledgeAreas: ['hkdse-dat', 'hkdse-sba', 'project-portfolio', 'testing-evaluation'],
    studentUse: 'Use this to check whether SBA work includes problem definition, research, ideas, making and evaluation.',
    teacherUse: 'Helpful for introducing DAT project workflow and evidence expectations without replacing official documents.',
    routeTargets: [
      { label: 'DAT SBA Support', screen: 'hkdse_sba_support' },
      { label: 'Project Hub', screen: 'project_hub' },
    ],
  },
  {
    id: 'joining-methods-adhesives',
    title: 'Joining Methods & Adhesives',
    titleZh: '接合方法與黏合技術',
    src: '/posters/woodworking_joining_methods_and_adhesives_guide.png',
    alt: 'Infographic about finger joints, tab and slot, mechanical fixings, adhesives and matching materials to adhesives.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['joining-methods', 'materials', 'making', 'junior-dt'],
    studentUse: 'Use this to choose a joint or adhesive based on material, strength, accuracy and repairability.',
    teacherUse: 'Supports practical making lessons, material testing and comparison of mechanical fixing versus adhesives.',
    routeTargets: [
      { label: 'Joining Methods', screen: 'joining_methods' },
      { label: 'Box Maker', screen: 'finger_joint_box_maker' },
    ],
  },
  {
    id: 'ib-myp-design-criteria',
    title: 'IB MYP Design Criteria',
    titleZh: 'IB MYP Design 評分準則',
    src: '/posters/ib_myp_design_criteria_infographic.png',
    alt: 'Infographic explaining IB MYP Design criteria A inquiring and analysing, B developing ideas, C creating the solution and D evaluating.',
    curriculum: ['IB MYP Design'],
    knowledgeAreas: ['ib-myp', 'assessment', 'project-portfolio'],
    studentUse: 'Use this to understand what evidence belongs in each MYP Design portfolio section.',
    teacherUse: 'Useful for explaining criteria A-D evidence expectations in student-friendly language.',
    routeTargets: [{ label: 'IB MYP Design', screen: 'ib_myp_design' }],
  },
  {
    id: 'laser-cutting-cam',
    title: 'Laser Cutting & CAM',
    titleZh: '雷射切割與 CAM',
    src: '/posters/laser_cutting_and_cam_guide.png',
    alt: 'Infographic explaining vector file preparation, material settings, kerf, nesting, safety and laser cutting workflow.',
    curriculum: ['HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['cad-cam', 'laser-cutting', 'finger-joint-box', 'making'],
    studentUse: 'Use this before exporting SVG files or preparing laser-cut project parts.',
    teacherUse: 'Supports laser safety, CAM setup, kerf awareness and portfolio evidence for settings and test cuts.',
    routeTargets: [
      { label: 'Box Maker', screen: 'finger_joint_box_maker' },
      { label: 'Orthographic/CAD', screen: 'orthographic_projection' },
    ],
  },
  {
    id: '3d-printing-additive-manufacturing',
    title: '3D Printing & Additive Manufacturing',
    titleZh: '3D 打印與增材製造',
    src: '/posters/3d_printing_a_complete_process_guide.png',
    alt: 'Infographic explaining 3D printing workflow, settings, supports, advantages and limitations.',
    curriculum: ['HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['cad-cam', '3d-printing', 'modelling', 'prototyping'],
    studentUse: 'Use this to understand slicing, layer height, infill, supports, orientation and testing.',
    teacherUse: 'Useful for comparing additive manufacturing with laser cutting and other prototyping methods.',
    routeTargets: [
      { label: 'Orthographic/CAD', screen: 'orthographic_projection' },
      { label: 'Project Hub', screen: 'project_hub' },
    ],
  },
  {
    id: 'testing-evaluation',
    title: 'Testing & Evaluation',
    titleZh: '測試與評鑑',
    src: '/posters/testing_and_evaluation_guide.png',
    alt: 'Infographic explaining functional testing, user testing, accuracy, evidence, evaluation against specification and improvements.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['testing-evaluation', 'project-portfolio', 'assessment'],
    studentUse: 'Use this to plan fair tests, collect evidence and justify improvements.',
    teacherUse: 'Supports portfolio lessons on evaluation quality, user feedback and evidence-based judgement.',
    routeTargets: [
      { label: 'Project Hub', screen: 'project_hub' },
      { label: 'DAT SBA Support', screen: 'hkdse_sba_support' },
      { label: 'IB IA Support', screen: 'ib_ia_support' },
    ],
  },
  {
    id: 'orthographic-projection',
    title: 'Orthographic Projection',
    titleZh: '正投影圖',
    src: '/posters/orthographic_projection_guide_infographic.png',
    alt: 'Infographic explaining plan view, front elevation, side view, section view, projection lines and dimensions.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['orthographic-projection', 'cad-cam', 'design-communication', 'junior-dt'],
    studentUse: 'Use this while drawing plan, elevation, side and section views for a product.',
    teacherUse: 'Useful as a visual guide for technical drawing, CAD and design communication lessons.',
    routeTargets: [{ label: 'Orthographic/CAD', screen: 'orthographic_projection' }],
  },
  {
    id: 'sustainability-life-cycle',
    title: 'Sustainability & Life Cycle',
    titleZh: '可持續發展與產品生命周期',
    src: '/posters/sustainability_life_cycle_infographic_for_students.png',
    alt: 'Infographic explaining product life cycle, reduce waste, material choices, repair, reuse and recycle.',
    curriculum: ['HKDSE DAT', 'IB DP Design Technology', 'IB MYP Design'],
    knowledgeAreas: ['sustainability', 'materials', 'ib-dp', 'hkdse-dat', 'project-portfolio'],
    studentUse: 'Use this to make sustainable decisions about materials, repair, waste and end of life.',
    teacherUse: 'Supports discussions about life cycle thinking, circular design and responsible innovation.',
    routeTargets: [
      { label: 'IB DP 2026', screen: 'ib_current_2026', topic: 'ib-dp-2026-topic-8' },
      { label: 'DAT Pathway', screen: 'hkdse_dat' },
      { label: 'Materials', screen: 'materials_db' },
    ],
  },
  {
    id: 'ib-dp-design-technology',
    title: 'IB DP Design Technology',
    titleZh: 'IB DP Design Technology',
    src: '/posters/ib_design_technology_infographic_poster.png',
    alt: 'Infographic summarising IB DP Design Technology core ideas including ergonomics, sustainability, modelling, materials and user-centred design.',
    curriculum: ['IB DP Design Technology'],
    knowledgeAreas: ['ib-dp', 'design-process', 'materials', 'ergonomics', 'sustainability'],
    studentUse: 'Use this as a broad revision overview for product design and innovation thinking.',
    teacherUse: 'Useful as an entry poster for the IB DP Design Technology pathway.',
    routeTargets: [
      { label: 'IB DT Pathway', screen: 'ib_design_technology' },
      { label: 'IB DP 2026', screen: 'ib_current_2026' },
    ],
  },
  {
    id: 'finger-joint-box-maker',
    title: 'Finger Joint Box Maker',
    titleZh: '榫接盒產生器',
    src: '/posters/woodworking_laser_cutting_finger_joint_guide.png',
    alt: 'Infographic explaining material thickness, tab and slot connection, finger size, kerf, press fit and SVG laser layout.',
    curriculum: ['HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['finger-joint-box', 'joining-methods', 'laser-cutting', 'making'],
    studentUse: 'Use this before generating a box so tab, slot, kerf and press-fit settings make sense.',
    teacherUse: 'Supports laser-cut box lessons, test-corner workflows and press-fit tolerance discussions.',
    routeTargets: [
      { label: 'Box Maker', screen: 'finger_joint_box_maker' },
      { label: 'Joining Methods', screen: 'joining_methods' },
    ],
  },
  {
    id: 'ergonomics-human-factors',
    title: 'Ergonomics & Human Factors',
    titleZh: '人體工學與人的因素',
    src: '/posters/ergonomics_and_design_for_everyone.png',
    alt: 'Infographic explaining anthropometrics, comfort, safety, usability, inclusive design, user testing and product examples.',
    curriculum: ['HKDSE DAT', 'IB DP Design Technology', 'IB MYP Design'],
    knowledgeAreas: ['ergonomics', 'human-factors', 'user-centred-design', 'ib-dp'],
    studentUse: 'Use this when justifying product dimensions, comfort, safety, usability and inclusive design choices.',
    teacherUse: 'Supports user-centred design, human factors and product evaluation lessons.',
    routeTargets: [
      { label: 'IB DP 2026', screen: 'ib_current_2026', topic: 'ib-dp-2026-topic-1' },
      { label: 'Project Hub', screen: 'project_hub' },
    ],
  },
  {
    id: 'materials-selection',
    title: 'Materials Selection',
    titleZh: '材料選擇',
    src: '/posters/educational_poster_on_materials_selection.png',
    alt: 'Infographic comparing wood, manufactured boards, plastics, acrylic, metals, card and foam board for design projects.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB DP Design Technology', 'IB MYP Design'],
    knowledgeAreas: ['materials', 'material-selection', 'making', 'junior-dt'],
    studentUse: 'Use this to match material choice to user, function, manufacturing process and sustainability.',
    teacherUse: 'Useful for material selection lessons, comparison tasks and project justification writing.',
    routeTargets: [
      { label: 'Materials Database', screen: 'materials_db' },
      { label: 'Joining Methods', screen: 'joining_methods' },
    ],
  },
  {
    id: 'mechanisms-systems',
    title: 'Mechanisms & Systems',
    titleZh: '機械結構與系統',
    src: '/posters/mechanisms_and_systems_study_guide.png',
    alt: 'Infographic explaining input-process-output, gears, levers, linkages, cams, electronic systems, feedback and safety.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB DP Design Technology'],
    knowledgeAreas: ['mechanisms', 'systems', 'technology-principles', 'junior-dt'],
    studentUse: 'Use this to explain how forces, motion or signals become useful product actions.',
    teacherUse: 'Supports systems thinking, mechanisms, control and safety lessons.',
    routeTargets: [
      { label: 'Systems', screen: 'systems' },
      { label: 'S1-S3 DT', screen: 'edb_junior_dt' },
    ],
  },
  {
    id: 'scamper-ideation',
    title: 'SCAMPER Ideation',
    titleZh: 'SCAMPER 構思方法',
    src: '/posters/scamper_ideation_guide_for_product_innovation.png',
    alt: 'Infographic explaining SCAMPER prompts for product innovation using a phone stand example.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['ideation', 'design-process', 'innovation', 'ib-myp'],
    studentUse: 'Use this to generate and improve product ideas before selecting a final concept.',
    teacherUse: 'Useful for brainstorming, concept development and design justification activities.',
    routeTargets: [
      { label: 'IB MYP Design', screen: 'ib_myp_design' },
      { label: 'Project Hub', screen: 'project_hub' },
    ],
  },
  {
    id: 'curved-cardboard-living-hinge',
    title: 'Curved Cardboard Living Hinge',
    titleZh: '曲面紙板與 Living Hinge',
    src: '/posters/curved_cardboard_and_living_hinge_guide.png',
    alt: 'Infographic explaining straight dashed grid, wave grid, cross grid, rounded grid and honeycomb grid for curved cardboard living hinges.',
    curriculum: ['EDB DT', 'HKDSE DAT', 'IB MYP Design', 'IB DP Design Technology'],
    knowledgeAreas: ['curved-cardboard', 'living-hinge', 'laser-cutting', 'materials', 'making'],
    studentUse: 'Use this when designing curved sheet-material structures and comparing bending patterns.',
    teacherUse: 'Supports test-strip experiments, curved packaging, architecture models and laser-cut bending lessons.',
    routeTargets: [
      { label: 'Box Maker', screen: 'finger_joint_box_maker' },
      { label: 'Joining Methods', screen: 'joining_methods' },
    ],
  },
];

export const getPosterResources = (ids: string[]) => {
  const wanted = new Set(ids);
  return posterResources.filter((poster) => wanted.has(poster.id));
};

export const getPostersByKnowledgeArea = (...areas: string[]) => {
  const wanted = new Set(areas);
  return posterResources.filter((poster) => poster.knowledgeAreas.some((area) => wanted.has(area)));
};

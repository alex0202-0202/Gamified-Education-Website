export type StrengthLevel = 'Light' | 'Medium' | 'Strong' | 'Very strong';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type JoiningMethod = {
  id: string;
  name: string;
  nameZh: string;
  category: 'wood' | 'cardboard' | 'acrylic-plastic' | 'metal' | 'fabric';
  explanation: string;
  suitableMaterial: string;
  strength: StrengthLevel;
  difficulty: DifficultyLevel;
  toolsNeeded: string[];
  commonUse: string;
  studentProjectExample: string;
  safetyNote: string;
  commonMistake: string;
};

export type AdhesiveGuideItem = {
  material: string;
  suitableGlue: string[];
  joiningMethods: string[];
  unsuitableWarning: string;
  dryingNote: string;
  safetyNote: string;
  exampleProject: string;
};

export type MaterialPairRecommendation = {
  key: string;
  materialA: string;
  materialB: string;
  recommendedMethod: string;
  recommendedAdhesive: string;
  strength: StrengthLevel;
  toolsRequired: string[];
  safetyWarning: string;
  exampleUse: string;
};

export const joiningMethods: JoiningMethod[] = [
  {
    id: 'finger-joint',
    name: 'Finger joint',
    nameZh: '指接',
    category: 'wood',
    explanation: 'Interlocking fingers increase glue area and alignment, useful for boxes and laser-cut components.',
    suitableMaterial: 'timber, plywood, MDF, laser-cut acrylic',
    strength: 'Strong',
    difficulty: 'Intermediate',
    toolsNeeded: ['saw or laser cutter', 'file/sandpaper', 'PVA or solvent cement depending on material'],
    commonUse: 'boxes, trays, small enclosures',
    studentProjectExample: 'Laser-cut acrylic box or plywood storage tray',
    safetyNote: 'Check fit before forcing parts together; sand sharp edges.',
    commonMistake: 'Making the fingers too loose or too tight for the material thickness.',
  },
  {
    id: 'tab-slot',
    name: 'Tab-and-slot joint',
    nameZh: '插片與插槽',
    category: 'cardboard',
    explanation: 'Tabs fit into matching slots to locate parts without relying only on glue.',
    suitableMaterial: 'cardboard, foam board, thin plywood, acrylic sheet',
    strength: 'Medium',
    difficulty: 'Beginner',
    toolsNeeded: ['craft knife', 'cutting mat', 'ruler', 'PVA or hot glue if needed'],
    commonUse: 'card models, phone stands, packaging prototypes',
    studentProjectExample: 'Cardboard phone stand',
    safetyNote: 'Cut away from hands and use a cutting mat.',
    commonMistake: 'Slots are too wide, so the joint becomes loose.',
  },
  {
    id: 'lap-joint',
    name: 'Lap joint',
    nameZh: '搭接',
    category: 'wood',
    explanation: 'Two parts overlap and are glued, screwed or fixed together.',
    suitableMaterial: 'timber, cardboard, metal strip',
    strength: 'Medium',
    difficulty: 'Beginner',
    toolsNeeded: ['saw/cutter', 'clamps', 'glue or screws'],
    commonUse: 'frames, simple supports, card structures',
    studentProjectExample: 'Small wooden frame comparison test',
    safetyNote: 'Clamp parts before drilling or cutting.',
    commonMistake: 'Too little overlap, making the joint weak.',
  },
  {
    id: 'dowel-joint',
    name: 'Dowel joint',
    nameZh: '木榫接合',
    category: 'wood',
    explanation: 'Round dowels align and strengthen two wooden parts.',
    suitableMaterial: 'timber, plywood, MDF',
    strength: 'Strong',
    difficulty: 'Intermediate',
    toolsNeeded: ['drill', 'dowel pins', 'PVA wood glue', 'clamps'],
    commonUse: 'furniture, frames, boxes',
    studentProjectExample: 'Wooden desk organiser frame',
    safetyNote: 'Drill accurately and secure the workpiece.',
    commonMistake: 'Misaligned holes that stop the parts fitting flush.',
  },
  {
    id: 'acrylic-solvent-joint',
    name: 'Acrylic solvent joint',
    nameZh: '亞加力溶劑接合',
    category: 'acrylic-plastic',
    explanation: 'Solvent cement softens acrylic surfaces so they bond together.',
    suitableMaterial: 'acrylic to acrylic',
    strength: 'Strong',
    difficulty: 'Intermediate',
    toolsNeeded: ['acrylic solvent cement', 'applicator', 'clamps or jig'],
    commonUse: 'display stands, acrylic boxes, covers',
    studentProjectExample: 'Acrylic display stand',
    safetyNote: 'Use ventilation and teacher supervision; avoid skin and eye contact.',
    commonMistake: 'Using PVA wood glue on acrylic, which gives a weak joint.',
  },
  {
    id: 'screw-bolt-joint',
    name: 'Screw or bolt joint',
    nameZh: '螺絲或螺栓接合',
    category: 'metal',
    explanation: 'Mechanical fasteners hold parts together and can often be removed for repair.',
    suitableMaterial: 'wood, metal, acrylic, mixed materials',
    strength: 'Strong',
    difficulty: 'Beginner',
    toolsNeeded: ['drill', 'screwdriver or spanner', 'screws/bolts/washers'],
    commonUse: 'brackets, frames, mixed-material products',
    studentProjectExample: 'Wood-to-acrylic product body',
    safetyNote: 'Pilot drill where needed and avoid cracking acrylic.',
    commonMistake: 'Overtightening and cracking brittle materials.',
  },
  {
    id: 'rivet-joint',
    name: 'Rivet joint',
    nameZh: '鉚釘接合',
    category: 'metal',
    explanation: 'A rivet permanently fixes sheet materials through aligned holes.',
    suitableMaterial: 'sheet metal, plastic sheet, fabric reinforcement',
    strength: 'Medium',
    difficulty: 'Intermediate',
    toolsNeeded: ['drill', 'rivet gun', 'rivets'],
    commonUse: 'sheet products, brackets, light-duty metalwork',
    studentProjectExample: 'Sheet-metal bracket sample',
    safetyNote: 'Deburr drilled holes and wear eye protection.',
    commonMistake: 'Poor hole alignment before riveting.',
  },
  {
    id: 'hinge-joint',
    name: 'Hinge connection',
    nameZh: '鉸鏈連接',
    category: 'wood',
    explanation: 'A hinge allows controlled rotation between two parts.',
    suitableMaterial: 'wood, acrylic, metal, card prototypes',
    strength: 'Medium',
    difficulty: 'Intermediate',
    toolsNeeded: ['hinge', 'screws or bolts', 'drill/screwdriver'],
    commonUse: 'lids, doors, folding products',
    studentProjectExample: 'Small box with opening lid',
    safetyNote: 'Check finger pinch points.',
    commonMistake: 'Placing hinges out of alignment, causing binding.',
  },
];

export const adhesiveGuide: AdhesiveGuideItem[] = [
  {
    material: 'Wood',
    suitableGlue: ['PVA wood glue', 'epoxy for special cases'],
    joiningMethods: ['finger joint', 'dowel joint', 'lap joint', 'screws'],
    unsuitableWarning: 'Superglue may be brittle and is not ideal for large wood joints.',
    dryingNote: 'Clamp while drying; full strength may take longer than initial set time.',
    safetyNote: 'Wipe excess glue and keep clamps stable.',
    exampleProject: 'Wooden frame or small storage tray',
  },
  {
    material: 'Cardboard',
    suitableGlue: ['PVA glue', 'hot glue', 'double-sided tape'],
    joiningMethods: ['tab-and-slot', 'glue flap', 'folded tab', 'layering/lamination'],
    unsuitableWarning: 'Too much liquid glue can deform thin card.',
    dryingNote: 'Use light pressure while drying to keep surfaces flat.',
    safetyNote: 'Use craft knives with a cutting mat and teacher guidance.',
    exampleProject: 'Cardboard phone stand or package prototype',
  },
  {
    material: 'Acrylic',
    suitableGlue: ['acrylic solvent cement', 'epoxy for some mixed-material tasks'],
    joiningMethods: ['slot joint', 'laser-cut finger joint', 'screws/bolts', 'heat bending'],
    unsuitableWarning: 'PVA wood glue is not suitable for acrylic.',
    dryingNote: 'Solvent joints need accurate contact and curing time.',
    safetyNote: 'Use solvent cement with ventilation and teacher supervision.',
    exampleProject: 'Acrylic display stand or small box',
  },
  {
    material: 'Metal',
    suitableGlue: ['epoxy for light-duty joining'],
    joiningMethods: ['screws/bolts', 'rivets', 'brackets', 'welding', 'soldering', 'folding/bending'],
    unsuitableWarning: 'Many general glues are weak on smooth metal unless surfaces are prepared.',
    dryingNote: 'Adhesive metal joints need clean, roughened surfaces and full curing.',
    safetyNote: 'Metal cutting, drilling, welding and soldering need strict supervision.',
    exampleProject: 'Sheet-metal bracket or mixed-material stand',
  },
  {
    material: 'Fabric',
    suitableGlue: ['fabric glue', 'heat bonding where appropriate'],
    joiningMethods: ['sewing', 'stitching', 'Velcro', 'snap button'],
    unsuitableWarning: 'Rigid glues can make fabric uncomfortable or brittle.',
    dryingNote: 'Allow flexible adhesives to cure before stress testing.',
    safetyNote: 'Use needles, heat tools and cutters carefully.',
    exampleProject: 'Wearable pocket or soft product prototype',
  },
  {
    material: 'Foam board',
    suitableGlue: ['PVA glue', 'hot glue', 'double-sided tape'],
    joiningMethods: ['tab-and-slot', 'glue flap', 'layering'],
    unsuitableWarning: 'Some solvent glues can melt foam.',
    dryingNote: 'Support edges while glue sets.',
    safetyNote: 'Cut with a sharp blade on a cutting mat to avoid tearing.',
    exampleProject: 'Architectural model or display mock-up',
  },
];

export const materialPairRecommendations: MaterialPairRecommendation[] = [
  {
    key: 'wood|wood',
    materialA: 'Wood',
    materialB: 'Wood',
    recommendedMethod: 'PVA wood glue with dowels, finger joints or screws',
    recommendedAdhesive: 'PVA wood glue',
    strength: 'Strong',
    toolsRequired: ['clamps', 'saw', 'drill if using dowels or screws'],
    safetyWarning: 'Clamp parts before drilling or cutting.',
    exampleUse: 'Wooden frame, small box or tray',
  },
  {
    key: 'acrylic|acrylic',
    materialA: 'Acrylic',
    materialB: 'Acrylic',
    recommendedMethod: 'Acrylic solvent cement, slot joint or laser-cut finger joint',
    recommendedAdhesive: 'Acrylic solvent cement',
    strength: 'Strong',
    toolsRequired: ['solvent applicator', 'jig or clamps', 'ventilated workspace'],
    safetyWarning: 'Use solvent cement only with teacher supervision and ventilation.',
    exampleUse: 'Acrylic box or display stand',
  },
  {
    key: 'cardboard|cardboard',
    materialA: 'Cardboard',
    materialB: 'Cardboard',
    recommendedMethod: 'Tab-and-slot, glue flap, PVA glue, hot glue or double-sided tape',
    recommendedAdhesive: 'PVA glue or hot glue',
    strength: 'Medium',
    toolsRequired: ['craft knife', 'ruler', 'cutting mat'],
    safetyWarning: 'Avoid too much liquid glue on thin card.',
    exampleUse: 'Cardboard phone stand or packaging prototype',
  },
  {
    key: 'wood|acrylic',
    materialA: 'Wood',
    materialB: 'Acrylic',
    recommendedMethod: 'Mechanical fixing with screws/bolts, brackets, or suitable epoxy for light-duty tasks',
    recommendedAdhesive: 'Epoxy only where appropriate',
    strength: 'Medium',
    toolsRequired: ['drill', 'screws/bolts', 'washers', 'brackets'],
    safetyWarning: 'Do not overtighten acrylic because it may crack.',
    exampleUse: 'Mixed-material product body or display base',
  },
  {
    key: 'metal|metal',
    materialA: 'Metal',
    materialB: 'Metal',
    recommendedMethod: 'Bolts, rivets, brackets, welding or soldering depending on task',
    recommendedAdhesive: 'Epoxy for light-duty joining only',
    strength: 'Very strong',
    toolsRequired: ['drill', 'rivet gun or spanner', 'PPE'],
    safetyWarning: 'Metalwork processes need teacher supervision and eye protection.',
    exampleUse: 'Bracket, frame or metal support sample',
  },
  {
    key: 'fabric|fabric',
    materialA: 'Fabric',
    materialB: 'Fabric',
    recommendedMethod: 'Sewing, stitching, Velcro, snap buttons or fabric glue',
    recommendedAdhesive: 'Fabric glue for non-structural joining',
    strength: 'Medium',
    toolsRequired: ['needle/thread or sewing machine', 'fabric scissors'],
    safetyWarning: 'Check needle and heat-bonding safety.',
    exampleUse: 'Wearable pouch or soft product prototype',
  },
];

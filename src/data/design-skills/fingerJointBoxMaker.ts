export type BoxType = 'open' | 'closed' | 'tray' | 'case';
export type DimensionMode = 'outside' | 'inside';
export type JointType = 'finger' | 'flat' | 't-slot';
export type UnitType = 'mm' | 'inch';
export type JointFitMode = 'loose' | 'normal' | 'snug' | 'tight' | 'custom';
export type BoxGeneratorType =
  | 'cloneFromFile'
  | 'basicBox'
  | 'laserHingeBox'
  | 'gridDividerBox'
  | 'customDividerBox'
  | 'slidingLidBox'
  | 'polygonBox'
  | 'curvedBox'
  | 'basic3DPrintedBox'
  | 'printedGridDividerBox'
  | 'printedCustomDividerBox';

export type CurvedCardboardPatternType =
  | 'straightDashedGrid'
  | 'waveGrid'
  | 'crossGrid'
  | 'roundedGrid'
  | 'honeycombGrid';

export type CardboardCurvePreset =
  | 'beginnerSmoothCurve'
  | 'strongRoundedCurve'
  | 'decorativeWaveCurve'
  | 'flexibleCrossCurve'
  | 'visualHoneycombPanel';

export type MaterialPreset = {
  id: string;
  name: string;
  materialType: string;
  thickness: number;
  kerf: number;
  note: string;
};

export type FingerJointFitSettings = {
  materialThickness: number;
  fingerWidth: number;
  pressFitTolerance: number;
  kerf: number;
  useKerfCompensation: boolean;
  jointFitMode: JointFitMode;
};

export type BoxMethodCard = {
  id: string;
  title: string;
  titleZh: string;
  summary: string;
  bestFor: string[];
  teacherNote: string;
};

export type BoxGeneratorOption = {
  id: BoxGeneratorType;
  label: string;
  labelZh: string;
  category: 'laser' | 'curved' | 'print' | 'import';
  summary: string;
  exportStatus: string;
};

export type CardboardCurvePresetValue = {
  preset: CardboardCurvePreset;
  label: string;
  patternType: CurvedCardboardPatternType;
  spacing: number;
  cutLength: number;
  margin: number;
  waveAmplitude: number;
  waveLength: number;
  slotWidth: number;
  slotRadius: number;
  honeycombRadius: number;
  honeycombGap: number;
};

export const boxGeneratorOptions: BoxGeneratorOption[] = [
  {
    id: 'cloneFromFile',
    label: 'Clone from File',
    labelZh: '從檔案複製',
    category: 'import',
    summary: 'Future import mode for reading this app metadata from SVG/DXF and rebuilding parameters.',
    exportStatus: 'Planned import workflow',
  },
  {
    id: 'basicBox',
    label: 'Basic Box',
    labelZh: '基本盒',
    category: 'laser',
    summary: 'Standard 榫接 or flat-panel box for trays, storage and project cases.',
    exportStatus: 'SVG available',
  },
  {
    id: 'laserHingeBox',
    label: 'Laser Hinge Box',
    labelZh: '雷射鉸鏈盒',
    category: 'laser',
    summary: 'Box with extra hinge reference pieces for a hinged-lid teaching prototype.',
    exportStatus: 'Teaching SVG layout',
  },
  {
    id: 'gridDividerBox',
    label: 'Grid Divider Box',
    labelZh: '格仔分隔盒',
    category: 'laser',
    summary: 'Adds internal divider strips for rows and columns, useful for organisers.',
    exportStatus: 'SVG available',
  },
  {
    id: 'customDividerBox',
    label: 'Custom Divider Box',
    labelZh: '自訂分隔盒',
    category: 'laser',
    summary: 'Demonstrates custom divider lines without replacing the core box workflow.',
    exportStatus: 'Teaching SVG layout',
  },
  {
    id: 'slidingLidBox',
    label: 'Sliding Lid Box',
    labelZh: '滑蓋盒',
    category: 'laser',
    summary: 'Adds a lid panel and rail strips to explain sliding-lid construction.',
    exportStatus: 'Teaching SVG layout',
  },
  {
    id: 'polygonBox',
    label: 'Polygon Box',
    labelZh: '多邊形盒',
    category: 'laser',
    summary: 'Reference mode for polygon containers; full polygon geometry is planned.',
    exportStatus: 'Concept preview',
  },
  {
    id: 'curvedBox',
    label: 'Curved Box',
    labelZh: '曲面盒',
    category: 'curved',
    summary: 'Uses living-hinge / kerf-bend panels for curved cardboard or thin wood forms.',
    exportStatus: 'Curve SVG available',
  },
  {
    id: 'basic3DPrintedBox',
    label: 'Basic 3D Printed Box',
    labelZh: '基本 3D 打印盒',
    category: 'print',
    summary: 'Web concept mode for wall thickness, tolerance and printed-case discussion.',
    exportStatus: 'Native mesh export planned',
  },
  {
    id: 'printedGridDividerBox',
    label: '3D Printed Grid Divider Box',
    labelZh: '3D 打印格仔分隔盒',
    category: 'print',
    summary: 'Concept mode for printed organisers with repeated internal divider cells.',
    exportStatus: 'Native mesh export planned',
  },
  {
    id: 'printedCustomDividerBox',
    label: '3D Printed Custom Divider Box',
    labelZh: '3D 打印自訂分隔盒',
    category: 'print',
    summary: 'Concept mode for custom internal printed dividers and tolerance planning.',
    exportStatus: 'Native mesh export planned',
  },
];

export const curvedPatternLabels: Record<CurvedCardboardPatternType, string> = {
  straightDashedGrid: '虛線直格子 / Straight Dashed Grid',
  waveGrid: '波浪格子 / Wave Grid',
  crossGrid: '交叉格子 / Cross Grid',
  roundedGrid: '圓角格子 / Rounded Grid',
  honeycombGrid: '蜂巢格子 / Honeycomb Grid',
};

export const cardboardCurvePresets: CardboardCurvePresetValue[] = [
  {
    preset: 'beginnerSmoothCurve',
    label: 'Beginner Smooth Curve',
    patternType: 'straightDashedGrid',
    spacing: 3,
    cutLength: 28,
    margin: 4,
    waveAmplitude: 0,
    waveLength: 0,
    slotWidth: 0,
    slotRadius: 0,
    honeycombRadius: 0,
    honeycombGap: 0,
  },
  {
    preset: 'strongRoundedCurve',
    label: 'Strong Rounded Curve',
    patternType: 'roundedGrid',
    spacing: 4,
    cutLength: 20,
    margin: 5,
    waveAmplitude: 0,
    waveLength: 0,
    slotWidth: 2,
    slotRadius: 1,
    honeycombRadius: 0,
    honeycombGap: 0,
  },
  {
    preset: 'decorativeWaveCurve',
    label: 'Decorative Wave Curve',
    patternType: 'waveGrid',
    spacing: 4,
    cutLength: 30,
    margin: 4,
    waveAmplitude: 1.5,
    waveLength: 10,
    slotWidth: 0,
    slotRadius: 0,
    honeycombRadius: 0,
    honeycombGap: 0,
  },
  {
    preset: 'flexibleCrossCurve',
    label: 'Flexible Cross Curve',
    patternType: 'crossGrid',
    spacing: 6,
    cutLength: 12,
    margin: 5,
    waveAmplitude: 0,
    waveLength: 0,
    slotWidth: 0,
    slotRadius: 0,
    honeycombRadius: 0,
    honeycombGap: 0,
  },
  {
    preset: 'visualHoneycombPanel',
    label: 'Visual Honeycomb Panel',
    patternType: 'honeycombGrid',
    spacing: 0,
    cutLength: 0,
    margin: 5,
    waveAmplitude: 0,
    waveLength: 0,
    slotWidth: 0,
    slotRadius: 0,
    honeycombRadius: 6,
    honeycombGap: 2,
  },
];

export const curvedPatternNotes: Record<CurvedCardboardPatternType, { purpose: string; bestFor: string; caution: string }> = {
  straightDashedGrid: {
    purpose: 'Beginner-friendly one-direction bending using repeated straight cut gaps.',
    bestFor: 'Curved walls, packaging corners, simple architectural models.',
    caution: 'Too-close spacing can tear or burn thin card.',
  },
  waveGrid: {
    purpose: 'Decorative smooth bending with wave-shaped cuts.',
    bestFor: 'Product display forms, lampshades and presentation prototypes.',
    caution: 'Fine waves increase cutting time and may weaken thin material.',
  },
  crossGrid: {
    purpose: 'Diagonal flexibility for twisting and organic surfaces.',
    bestFor: 'Thin card, curved roofs, pavilions and freeform models.',
    caution: 'Weaker than straight patterns and not suitable for load-bearing sides.',
  },
  roundedGrid: {
    purpose: 'Rounded slots reduce stress concentration and improve durability.',
    bestFor: 'Packaging hinges and curved boxes requiring repeated bending.',
    caution: 'Requires clean path generation and may take longer to cut.',
  },
  honeycombGrid: {
    purpose: 'Decorative cellular openings with strong visual identity.',
    bestFor: 'Facade panels, display shells and light-bend surfaces.',
    caution: 'Not ideal for tight bending; dense patterns weaken the panel.',
  },
};

export const materialPresets: MaterialPreset[] = [
  {
    id: 'plywood-3',
    name: '3 mm plywood',
    materialType: 'Plywood',
    thickness: 3,
    kerf: 0.2,
    note: 'Good starting point for school laser-cut finger-joint boxes. Test kerf on the actual machine.',
  },
  {
    id: 'mdf-3',
    name: '3 mm MDF',
    materialType: 'MDF',
    thickness: 3,
    kerf: 0.25,
    note: 'Stable and common for prototypes; check smoke extraction and workshop rules.',
  },
  {
    id: 'acrylic-3',
    name: '3 mm acrylic',
    materialType: 'Acrylic',
    thickness: 3,
    kerf: 0.15,
    note: 'Use appropriate acrylic solvent cement for assembly; do not use ordinary PVA.',
  },
  {
    id: 'acrylic-5',
    name: '5 mm acrylic',
    materialType: 'Acrylic',
    thickness: 5,
    kerf: 0.2,
    note: 'Stronger but slower to cut. Increase finger size for durability.',
  },
  {
    id: 'cardboard-2',
    name: '2 mm cardboard',
    materialType: 'Cardboard',
    thickness: 2,
    kerf: 0.1,
    note: 'Useful for quick form testing. Avoid very small fingers that crush during assembly.',
  },
];

export const jointFitModeLabels: Record<JointFitMode, string> = {
  loose: 'Loose fit',
  normal: 'Normal fit',
  snug: 'Snug fit',
  tight: 'Tight press fit',
  custom: 'Custom',
};

export const defaultPressFitTolerance = (mode: JointFitMode): number => {
  if (mode === 'loose') return -0.05;
  if (mode === 'normal') return 0;
  if (mode === 'snug') return 0.1;
  if (mode === 'tight') return 0.2;
  return 0.2;
};

export const boxMethodCards: BoxMethodCard[] = [
  {
    id: 'basic-finger-box',
    title: 'Basic Finger Joint Box',
    titleZh: '基本榫接盒',
    summary: 'Six or five interlocking panels with alternating tenons/tabs and slots. This is the main laser-cut box method for student prototypes.',
    bestFor: ['storage box', 'product packaging mock-up', 'IB MYP prototype', 'DAT SBA model'],
    teacherNote: 'Students should test one corner before cutting a full box because kerf varies by material and laser cutter.',
  },
  {
    id: 'open-box',
    title: 'Open Box / Tray',
    titleZh: '開口盒 / 托盤',
    summary: 'A five-panel box without a lid. Low-height tray proportions are useful for organisers and classroom storage.',
    bestFor: ['parts tray', 'tool organiser', 'material sample tray'],
    teacherNote: 'Tall open boxes may flex more than closed boxes; discuss bracing and material thickness.',
  },
  {
    id: 'project-case',
    title: 'Project Case',
    titleZh: '專題外殼',
    summary: 'A closed finger-joint box for electronics, mechanisms or product mock-ups. Cable holes and vents can be added in later versions.',
    bestFor: ['electronics case', 'control-system enclosure', 'interactive product body'],
    teacherNote: 'This version exports the main panels. Ask students to annotate where switches, sensors or cable openings should go.',
  },
  {
    id: 'flat-edge',
    title: 'Flat Edge Panels',
    titleZh: '平邊面板',
    summary: 'Simple rectangular panels without interlocking fingers. Useful for early layout and material-size checks.',
    bestFor: ['early planning', 'card mock-up', 'visualising panel sizes'],
    teacherNote: 'Flat panels are easier to cut but weaker unless students add separate joining features.',
  },
  {
    id: 'future-tslot',
    title: 'T-slot / Screw Case',
    titleZh: 'T 槽螺絲盒',
    summary: 'A more advanced case method using tabs and screw fixings. Included as a teaching reference for future development.',
    bestFor: ['serviceable cases', 'repairable products', 'electronics enclosures'],
    teacherNote: 'Marked as planned in this version to avoid generating inaccurate screw geometry.',
  },
];

export const fingerJointLearningNotes = [
  {
    title: 'Finger size',
    note: '榫接 size should normally be equal to or larger than the material thickness. Very small tenons/fingers can break or burn.',
  },
  {
    title: 'Kerf',
    note: 'Kerf is the material removed by the laser beam. If the joint is loose, increase kerf compensation; if it is too tight, reduce it.',
  },
  {
    title: 'Inside vs outside dimensions',
    note: 'Inside dimensions protect storage space. Outside dimensions protect the final external product size.',
  },
  {
    title: 'Laser safety',
    note: 'Always test material compatibility, ventilation, laser settings and workshop supervision before cutting.',
  },
];

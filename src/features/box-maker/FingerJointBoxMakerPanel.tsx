import { useMemo, useState } from 'react';
import { AlertTriangle, Box, Clipboard, Download, Layers, Ruler, ShieldCheck } from 'lucide-react';
import {
  boxGeneratorOptions,
  boxMethodCards,
  cardboardCurvePresets,
  curvedPatternLabels,
  curvedPatternNotes,
  defaultPressFitTolerance,
  fingerJointLearningNotes,
  jointFitModeLabels,
  materialPresets,
  type BoxGeneratorType,
  type BoxType,
  type CurvedCardboardPatternType,
  type DimensionMode,
  type JointFitMode,
  type JointType,
  type MaterialPreset,
  type UnitType,
} from '../../data/design-skills/fingerJointBoxMaker';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

type BoxParameters = {
  generatorType: BoxGeneratorType;
  width: number;
  height: number;
  depth: number;
  materialThickness: number;
  fingerSize: number;
  kerf: number;
  pressFitTolerance: number;
  jointFitMode: JointFitMode;
  useKerfCompensation: boolean;
  measuredWithCaliper: boolean;
  dimensionMode: DimensionMode;
  boxType: BoxType;
  jointType: JointType;
  unit: UnitType;
  bedWidth: number;
  bedHeight: number;
  spacing: number;
  includeLabels: boolean;
  rows: number;
  columns: number;
};

type Panel = {
  id: string;
  label: string;
  width: number;
  height: number;
  x: number;
  y: number;
  startWithTab: boolean;
};

type AssemblyMode = 'assembled' | 'exploded';
type DrawingToolType = 'select' | 'circle' | 'rectangle' | 'roundedRectangle' | 'slot' | 'line' | 'text';
type ShapeOperation = 'cut' | 'engrave' | 'score';
type PanelShapeType = Exclude<DrawingToolType, 'select'>;
type FingerSegmentType = 'tab' | 'slot';

type FingerSegment = {
  type: FingerSegmentType;
  length: number;
  depth: number;
};

type PanelShape = {
  id: string;
  panelId: string;
  shapeType: PanelShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  cornerRadius: number;
  text: string;
  operation: ShapeOperation;
};

type DraftShape = Omit<PanelShape, 'id' | 'panelId'>;

type PanelShapeMap = Record<string, PanelShape[]>;

type KerfBendParams = {
  patternType: CurvedCardboardPatternType;
  width: number;
  height: number;
  materialThickness: number;
  slotSpacing: number;
  slotLength: number;
  margin: number;
  stagger: boolean;
  material: 'cardboard' | 'thin-plywood' | 'veneer';
  targetBendRadius: number;
  bendAngle: number;
  waveAmplitude: number;
  waveLength: number;
  crossAngleA: number;
  crossAngleB: number;
  slotWidth: number;
  slotRadius: number;
  honeycombRadius: number;
  honeycombGap: number;
};

const boxTypeLabels: Record<BoxType, string> = {
  open: 'Open box / tray',
  closed: 'Closed box',
  tray: 'Low tray',
  case: 'Project case',
};

const jointTypeLabels: Record<JointType, string> = {
  finger: '榫接 / Finger joint',
  flat: 'Flat edge',
  't-slot': 'T-slot planned',
};

const drawingToolLabels: Record<DrawingToolType, string> = {
  select: 'Select',
  circle: 'Circle hole',
  rectangle: 'Rectangle cut-out',
  roundedRectangle: 'Rounded rectangle',
  slot: 'Slot',
  line: 'Line',
  text: 'Text',
};

const shapeOperationLabels: Record<ShapeOperation, string> = {
  cut: 'Cut',
  engrave: 'Engrave',
  score: 'Score',
};

const defaultDraftShape: DraftShape = {
  shapeType: 'circle',
  x: 30,
  y: 30,
  width: 24,
  height: 18,
  radius: 10,
  cornerRadius: 4,
  text: 'Name',
  operation: 'cut',
};

const startingParams: BoxParameters = {
  generatorType: 'basicBox',
  width: 120,
  height: 80,
  depth: 80,
  materialThickness: 3,
  fingerSize: 10,
  kerf: 0.2,
  pressFitTolerance: 0.2,
  jointFitMode: 'tight',
  useKerfCompensation: true,
  measuredWithCaliper: false,
  dimensionMode: 'outside',
  boxType: 'closed',
  jointType: 'finger',
  unit: 'mm',
  bedWidth: 600,
  bedHeight: 400,
  spacing: 16,
  includeLabels: true,
  rows: 3,
  columns: 3,
};

const clampNumber = (value: number, fallback: number) => Number.isFinite(value) ? value : fallback;
const unitScaleToMm = (unit: UnitType) => unit === 'inch' ? 25.4 : 1;

const convertParamsToMillimetres = (params: BoxParameters): BoxParameters => {
  const scale = unitScaleToMm(params.unit);
  if (scale === 1) return params;
  return {
    ...params,
    width: params.width * scale,
    height: params.height * scale,
    depth: params.depth * scale,
    materialThickness: params.materialThickness * scale,
    fingerSize: params.fingerSize * scale,
    kerf: params.kerf * scale,
    pressFitTolerance: params.pressFitTolerance * scale,
    bedWidth: params.bedWidth * scale,
    bedHeight: params.bedHeight * scale,
    spacing: params.spacing * scale,
    unit: 'mm',
  };
};

const calculateFingerCount = (edgeLength: number, preferredFingerSize: number) => {
  const rawCount = Math.max(3, Math.floor(edgeLength / Math.max(1, preferredFingerSize)));
  const oddCount = rawCount % 2 === 0 ? rawCount - 1 : rawCount;
  return Math.max(3, oddCount);
};

const calculateFemaleSlotOpening = (maleTabSize: number, pressFitTolerance: number) => Math.max(0.1, maleTabSize - pressFitTolerance);

const calculateMaleTabSize = (femaleSlotOpening: number, pressFitTolerance: number) => Math.max(0.1, femaleSlotOpening + pressFitTolerance);

const calculateFingerJointFit = (
  nominalSize: number,
  pressFitTolerance: number,
  kerf: number,
  useKerfCompensation: boolean,
) => {
  if (!useKerfCompensation) {
    return {
      maleTabDesignSize: Math.max(0.1, nominalSize),
      femaleSlotDesignSize: calculateFemaleSlotOpening(nominalSize, pressFitTolerance),
      finalMaleTabSize: Math.max(0.1, nominalSize),
      finalFemaleSlotOpening: calculateFemaleSlotOpening(nominalSize, pressFitTolerance),
    };
  }

  const maleTabDesignSize = Math.max(0.1, nominalSize + kerf);
  const femaleSlotDesignSize = Math.max(0.1, nominalSize - pressFitTolerance - kerf);
  return {
    maleTabDesignSize,
    femaleSlotDesignSize,
    finalMaleTabSize: Math.max(0.1, maleTabDesignSize - kerf),
    finalFemaleSlotOpening: femaleSlotDesignSize + kerf,
  };
};

const generateFingerSegments = (
  edgeLength: number,
  preferredFingerWidth: number,
  startsWithTab: boolean,
): FingerSegment[] => {
  const count = calculateFingerCount(edgeLength, preferredFingerWidth);
  const actualFingerWidth = edgeLength / count;
  return Array.from({ length: count }).map((_, index) => {
    const isTab = startsWithTab ? index % 2 === 0 : index % 2 !== 0;
    return {
      type: isTab ? 'tab' : 'slot',
      length: actualFingerWidth,
      depth: 0,
    };
  });
};

const adjustedFingerWidthWithKerf = (
  baseFingerWidth: number,
  segmentType: FingerSegmentType,
  pressFitTolerance: number,
  kerf: number,
  useKerfCompensation: boolean,
) => {
  if (!useKerfCompensation) {
    return segmentType === 'tab'
      ? baseFingerWidth
      : Math.max(0.1, baseFingerWidth - pressFitTolerance);
  }
  return segmentType === 'tab'
    ? Math.max(0.1, baseFingerWidth + kerf)
    : Math.max(0.1, baseFingerWidth - pressFitTolerance - kerf);
};

const calculateOutsideDimensions = (params: BoxParameters) => {
  if (params.dimensionMode === 'outside') {
    return { width: params.width, height: params.height, depth: params.depth };
  }

  const lidAllowance = params.boxType === 'closed' || params.boxType === 'case' ? params.materialThickness * 2 : params.materialThickness;
  return {
    width: params.width + params.materialThickness * 2,
    height: params.height + lidAllowance,
    depth: params.depth + params.materialThickness * 2,
  };
};

const generatePanels = (params: BoxParameters): Panel[] => {
  const dims = calculateOutsideDimensions(params);
  const hasTop = (params.boxType === 'closed' || params.boxType === 'case') && params.generatorType !== 'slidingLidBox';
  let basePanels = [
    { id: 'front', label: 'Front', width: dims.width, height: dims.height, startWithTab: true },
    { id: 'back', label: 'Back', width: dims.width, height: dims.height, startWithTab: false },
    { id: 'left', label: 'Left', width: dims.depth, height: dims.height, startWithTab: false },
    { id: 'right', label: 'Right', width: dims.depth, height: dims.height, startWithTab: true },
    { id: 'bottom', label: 'Bottom', width: dims.width, height: dims.depth, startWithTab: true },
  ];

  if (hasTop) {
    basePanels.push({ id: 'top', label: 'Top', width: dims.width, height: dims.depth, startWithTab: false });
  }

  if (params.generatorType === 'laserHingeBox') {
    basePanels.push(
      { id: 'hinge-left', label: 'Hinge L', width: dims.width * 0.36, height: params.materialThickness * 5, startWithTab: false },
      { id: 'hinge-right', label: 'Hinge R', width: dims.width * 0.36, height: params.materialThickness * 5, startWithTab: true },
      { id: 'hinge-pin', label: 'Pivot guide', width: dims.width * 0.7, height: params.materialThickness * 2.5, startWithTab: false },
    );
  }

  if (params.generatorType === 'gridDividerBox' || params.generatorType === 'printedGridDividerBox') {
    for (let column = 1; column < Math.max(2, params.columns); column += 1) {
      basePanels.push({ id: `divider-column-${column}`, label: `Column divider ${column}`, width: dims.depth, height: dims.height * 0.88, startWithTab: false });
    }
    for (let row = 1; row < Math.max(2, params.rows); row += 1) {
      basePanels.push({ id: `divider-row-${row}`, label: `Row divider ${row}`, width: dims.width, height: dims.height * 0.88, startWithTab: true });
    }
  }

  if (params.generatorType === 'customDividerBox' || params.generatorType === 'printedCustomDividerBox') {
    basePanels.push(
      { id: 'custom-divider-a', label: 'Custom divider A', width: dims.width, height: dims.height * 0.82, startWithTab: true },
      { id: 'custom-divider-b', label: 'Custom divider B', width: dims.depth, height: dims.height * 0.82, startWithTab: false },
    );
  }

  if (params.generatorType === 'slidingLidBox') {
    basePanels.push(
      { id: 'sliding-lid', label: 'Sliding lid', width: dims.width + params.materialThickness * 2, height: dims.depth, startWithTab: false },
      { id: 'rail-left', label: 'Rail L', width: dims.depth, height: params.materialThickness * 3, startWithTab: false },
      { id: 'rail-right', label: 'Rail R', width: dims.depth, height: params.materialThickness * 3, startWithTab: false },
    );
  }

  if (params.generatorType === 'curvedBox') {
    basePanels = [
      { id: 'curved-base', label: 'Base', width: dims.width, height: dims.depth, startWithTab: true },
      { id: 'curved-wall', label: 'Curved wall', width: dims.width + dims.depth, height: dims.height, startWithTab: false },
      { id: 'curved-side-a', label: 'Side A', width: dims.depth, height: dims.height, startWithTab: true },
      { id: 'curved-side-b', label: 'Side B', width: dims.depth, height: dims.height, startWithTab: false },
    ];
  }

  if (params.generatorType === 'polygonBox') {
    basePanels = [
      { id: 'polygon-base', label: 'Polygon base guide', width: dims.width, height: dims.width, startWithTab: false },
      { id: 'polygon-lid', label: 'Polygon lid guide', width: dims.width, height: dims.width, startWithTab: false },
      { id: 'polygon-side', label: 'Repeated side strip', width: dims.width * 1.8, height: dims.height, startWithTab: true },
    ];
  }

  if (params.generatorType === 'basic3DPrintedBox') {
    basePanels = [
      { id: 'print-footprint', label: 'Print footprint', width: dims.width, height: dims.depth, startWithTab: false },
      { id: 'print-section', label: 'Wall section', width: dims.width, height: dims.height, startWithTab: false },
    ];
  }

  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;
  return basePanels.map((panel) => {
    if (cursorX > 0 && cursorX + panel.width > params.bedWidth) {
      cursorX = 0;
      cursorY += rowHeight + params.spacing;
      rowHeight = 0;
    }
    const placed = { ...panel, x: cursorX, y: cursorY };
    cursorX += panel.width + params.spacing;
    rowHeight = Math.max(rowHeight, panel.height);
    return placed;
  });
};

const buildFingerPath = (panel: Panel, params: BoxParameters) => {
  const { width, height, startWithTab } = panel;
  if (params.jointType !== 'finger') {
    return `M 0 0 H ${width} V ${height} H 0 Z`;
  }

  const fit = calculateFingerJointFit(
    params.materialThickness,
    params.pressFitTolerance,
    params.kerf,
    params.useKerfCompensation,
  );

  const points: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];
  const addEdge = (
    length: number,
    dirX: number,
    dirY: number,
    normalX: number,
    normalY: number,
    edgeStartsWithTab: boolean,
  ) => {
    const segments = generateFingerSegments(length, params.fingerSize, edgeStartsWithTab);
    segments.forEach((segment) => {
      const current = points[points.length - 1];
      const segmentLength = adjustedFingerWidthWithKerf(segment.length, segment.type, params.pressFitTolerance, params.kerf / 4, params.useKerfCompensation);
      const next = { x: current.x + dirX * segment.length, y: current.y + dirY * segment.length };
      const depth = segment.type === 'tab' ? fit.maleTabDesignSize : fit.femaleSlotDesignSize;
      const side = segment.type === 'tab' ? 1 : -1;
      const shoulder = Math.max(0, (segment.length - Math.min(segment.length, segmentLength)) / 2);
      const shoulderStart = { x: current.x + dirX * shoulder, y: current.y + dirY * shoulder };
      const shoulderEnd = { x: next.x - dirX * shoulder, y: next.y - dirY * shoulder };
      points.push(shoulderStart);
      points.push({ x: shoulderStart.x + normalX * depth * side, y: shoulderStart.y + normalY * depth * side });
      points.push({ x: shoulderEnd.x + normalX * depth * side, y: shoulderEnd.y + normalY * depth * side });
      points.push(shoulderEnd);
      points.push(next);
    });
  };

  addEdge(width, 1, 0, 0, -1, startWithTab);
  addEdge(height, 0, 1, 1, 0, !startWithTab);
  addEdge(width, -1, 0, 0, 1, startWithTab);
  addEdge(height, 0, -1, -1, 0, !startWithTab);

  return `${points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ')} Z`;
};

const getLayoutBounds = (panels: Panel[]) => panels.reduce(
  (bounds, panel) => ({
    width: Math.max(bounds.width, panel.x + panel.width),
    height: Math.max(bounds.height, panel.y + panel.height),
  }),
  { width: 0, height: 0 },
);

const getShapeStyle = (operation: ShapeOperation) => {
  if (operation === 'engrave') return { stroke: '#0000FF', strokeWidth: 0.1, dash: '2 1' };
  if (operation === 'score') return { stroke: '#00AA00', strokeWidth: 0.1, dash: '3 1' };
  return { stroke: '#D60000', strokeWidth: 0.1, dash: '' };
};

const escapeSvgText = (value = '') => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const renderShapeMarkup = (shape: PanelShape, preview = false) => {
  const style = getShapeStyle(shape.operation);
  const strokeWidth = preview ? 0.9 : style.strokeWidth;
  const dash = style.dash ? ` stroke-dasharray="${style.dash}"` : '';
  const fill = preview && shape.operation === 'cut' ? ' fill="#FFFFFF" fill-opacity="0.65"' : ' fill="none"';
  const common = `stroke="${style.stroke}" stroke-width="${strokeWidth}"${dash}`;

  if (shape.shapeType === 'circle') {
    return `<circle cx="${shape.x}" cy="${shape.y}" r="${Math.max(0.5, shape.radius)}"${fill} ${common}/>`;
  }
  if (shape.shapeType === 'rectangle') {
    return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}"${fill} ${common}/>`;
  }
  if (shape.shapeType === 'roundedRectangle' || shape.shapeType === 'slot') {
    return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" rx="${shape.cornerRadius}" ry="${shape.cornerRadius}"${fill} ${common}/>`;
  }
  if (shape.shapeType === 'line') {
    return `<line x1="${shape.x}" y1="${shape.y}" x2="${shape.x + shape.width}" y2="${shape.y + shape.height}" ${common}/>`;
  }
  if (shape.shapeType === 'text') {
    return `<text x="${shape.x}" y="${shape.y}" font-size="${Math.max(6, shape.height)}" fill="${style.stroke}" font-weight="700">${escapeSvgText(shape.text)}</text>`;
  }
  return '';
};

const renderShapesMarkup = (shapes: PanelShape[] = [], preview = false) => shapes.map((shape) => renderShapeMarkup(shape, preview)).join('');

const editableMarginForPanel = (panel: Panel, params: BoxParameters) => Math.min(
  Math.max(6, params.materialThickness + 5),
  Math.max(2, Math.min(panel.width, panel.height) / 4),
);

const validateShapePlacement = (shape: PanelShape, panel: Panel, params: BoxParameters) => {
  const warnings: string[] = [];
  const margin = editableMarginForPanel(panel, params);
  const bounds = shape.shapeType === 'circle'
    ? { x1: shape.x - shape.radius, y1: shape.y - shape.radius, x2: shape.x + shape.radius, y2: shape.y + shape.radius }
    : { x1: shape.x, y1: shape.y, x2: shape.x + shape.width, y2: shape.y + shape.height };

  if (bounds.x1 < 0 || bounds.y1 < 0 || bounds.x2 > panel.width || bounds.y2 > panel.height) {
    warnings.push(`${shape.shapeType} on ${panel.label} goes outside the panel boundary.`);
  }
  if (bounds.x1 < margin || bounds.y1 < margin || bounds.x2 > panel.width - margin || bounds.y2 > panel.height - margin) {
    warnings.push(`${shape.shapeType} on ${panel.label} is close to 榫接/joint edges. Move it inside the safe editable area.`);
  }
  const cutArea = Math.max(0, bounds.x2 - bounds.x1) * Math.max(0, bounds.y2 - bounds.y1);
  if (shape.operation === 'cut' && cutArea > panel.width * panel.height * 0.35) {
    warnings.push(`${shape.shapeType} on ${panel.label} removes a large area and may weaken the panel.`);
  }
  return warnings;
};

const buildSvgDocument = (params: BoxParameters, panels: Panel[], shapesByPanel: PanelShapeMap) => {
  const bounds = getLayoutBounds(panels);
  const fit = calculateFingerJointFit(params.materialThickness, params.pressFitTolerance, params.kerf, params.useKerfCompensation);
  const margin = 18;
  const viewWidth = Math.max(params.bedWidth, bounds.width + margin * 2);
  const viewHeight = Math.max(params.bedHeight, bounds.height + margin * 2);
  const panelPaths = panels.map((panel) => {
    const transform = `translate(${panel.x + margin} ${panel.y + margin})`;
    const label = params.includeLabels
      ? `<text x="${panel.width / 2}" y="${panel.height / 2}" text-anchor="middle" dominant-baseline="middle" font-size="8" fill="#4A4741">${panel.label}</text>`
      : '';
    const shapeMarkup = renderShapesMarkup(shapesByPanel[panel.id] ?? []);
    return `<g transform="${transform}"><path d="${buildFingerPath(panel, params)}" fill="none" stroke="#D60000" stroke-width="0.1"/><rect x="0" y="0" width="${panel.width}" height="${panel.height}" fill="none" stroke="#3066BE" stroke-width="0.05" stroke-dasharray="2 2"/>${shapeMarkup}${label}</g>`;
  }).join('');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${viewWidth}mm" height="${viewHeight}mm" viewBox="0 0 ${viewWidth} ${viewHeight}">`,
    '<title>Finger Joint Box Maker export</title>',
    '<desc>Original classroom SVG generated by Design Technology Lab. Test kerf and material settings before laser cutting.</desc>',
    `<metadata>{"app":"Design Technology Lab","tool":"榫接 Box Maker","generatorType":"${params.generatorType}","materialThickness":${params.materialThickness},"fingerWidth":${params.fingerSize},"pressFitTolerance":${params.pressFitTolerance},"kerf":${params.kerf},"useKerfCompensation":${params.useKerfCompensation},"maleTabDesignSize":${fit.maleTabDesignSize},"femaleSlotDesignSize":${fit.femaleSlotDesignSize}}</metadata>`,
    `<rect x="0" y="0" width="${params.bedWidth}" height="${params.bedHeight}" fill="none" stroke="#9CA3AF" stroke-width="0.2" stroke-dasharray="4 3"/>`,
    panelPaths,
    '</svg>',
  ].join('');
};

const validateDesign = (params: BoxParameters, panels: Panel[]) => {
  const warnings: string[] = [];
  const dims = calculateOutsideDimensions(params);
  const bounds = getLayoutBounds(panels);
  const fit = calculateFingerJointFit(params.materialThickness, params.pressFitTolerance, params.kerf, params.useKerfCompensation);

  if (params.materialThickness < 2) warnings.push('Material below 2 mm may produce weak tabs for a classroom box.');
  if (params.fingerSize < params.materialThickness) warnings.push('Finger size should normally be equal to or larger than material thickness.');
  if (params.kerf <= 0) warnings.push('Kerf is set to zero. Use a test cut before relying on the fit.');
  if (fit.finalFemaleSlotOpening < fit.finalMaleTabSize * 0.7) warnings.push('Female slot opening is less than 70% of the male tab size. This may be impossible to assemble.');
  if (params.pressFitTolerance > 0.4) warnings.push('Press-fit tolerance above 0.4 mm may be too tight for school laser-cut materials.');
  if (!params.measuredWithCaliper) warnings.push('Measure actual material thickness with calipers before final cutting. Nominal 3 mm material is often not exactly 3.0 mm.');
  if (bounds.width > params.bedWidth || bounds.height > params.bedHeight) warnings.push('The current flat layout may not fit inside the selected laser bed.');
  if (dims.height > Math.min(dims.width, dims.depth) * 2) warnings.push('The box is tall compared with its base and may be unstable or flexible.');
  if (params.fingerSize < 5) warnings.push('Very small fingers can burn, break or become difficult to assemble.');
  if (params.boxType === 'open') warnings.push('Open box selected: no top panel will be generated.');
  if (params.jointType === 't-slot') warnings.push('T-slot is shown as a method option, but this first version exports flat preview geometry only.');
  if (params.generatorType === 'cloneFromFile') warnings.push('Clone from File is a planned import workflow; this web version does not import SVG/DXF yet.');
  if (params.generatorType.includes('3DPrinted')) warnings.push('3D printed modes are concept previews in this web tool. STL/OBJ/3MF export should be implemented in a native mesh engine later.');
  if (params.generatorType === 'polygonBox') warnings.push('Polygon box is shown as a concept layout guide; precise polygon side geometry is planned.');
  if (params.generatorType === 'curvedBox') warnings.push('For curved boxes, use the Kerf Bend section below to export the curved-wall living-hinge pattern.');
  return warnings;
};

const inputClass = 'mt-1 w-full rounded-xl border border-[#E5E0D8] bg-white px-3 py-2 text-sm text-[#2C2A26] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]';

const downloadTextFile = (text: string, filename: string, type = 'image/svg+xml;charset=utf-8') => {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const buildAssemblySvgMarkup = (
  dims: { width: number; height: number; depth: number },
  hasTop: boolean,
  mode: AssemblyMode,
  explode: number,
  viewRotation = 0,
  shapesByPanel: PanelShapeMap = {},
  selectedPanelId?: string,
) => {
  const scale = Math.min(1.25, 190 / Math.max(dims.width, dims.depth, dims.height, 1));
  const width = dims.width * scale;
  const depth = dims.depth * scale;
  const height = dims.height * scale;
  const gap = mode === 'exploded' ? explode : 0;
  const origin = { x: 270, y: 260 };
  const iso = (x: number, y: number, z: number) => ({
    x: origin.x + (x - y) * 0.72,
    y: origin.y + (x + y) * 0.36 - z * 0.78,
  });
  const pointList = (points: Array<[number, number, number]>) => points.map(([x, y, z]) => {
    const point = iso(x, y, z);
    return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join(' ');
  const labelPoint = (x: number, y: number, z: number) => {
    const point = iso(x, y, z);
    return `x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}"`;
  };
  const renderProjectedShapes = (
    panelId: string,
    panelWidth: number,
    panelHeight: number,
    mapPoint: (x: number, y: number) => { x: number; y: number },
  ) => {
    const shapes = shapesByPanel[panelId] ?? [];
    return shapes.map((shape) => {
      const color = shape.operation === 'cut' ? '#D60000' : shape.operation === 'score' ? '#00AA00' : '#0000FF';
      const opacity = shape.operation === 'cut' ? '0.28' : '0.8';
      const rectPoints = (x: number, y: number, w: number, h: number) => [
        mapPoint(x, y),
        mapPoint(x + w, y),
        mapPoint(x + w, y + h),
        mapPoint(x, y + h),
      ].map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(' ');

      if (shape.shapeType === 'circle') {
        const point = mapPoint(shape.x, shape.y);
        const rx = Math.max(2, shape.radius * 0.72);
        const ry = Math.max(2, shape.radius * 0.42);
        return `<ellipse cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${color}" fill-opacity="${opacity}" stroke="${color}" stroke-width="1.2"/>`;
      }
      if (shape.shapeType === 'text') {
        const point = mapPoint(shape.x, shape.y);
        return `<text x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}" font-size="10" fill="${color}" font-weight="800">${escapeSvgText(shape.text)}</text>`;
      }
      if (shape.shapeType === 'line') {
        const p1 = mapPoint(shape.x, shape.y);
        const p2 = mapPoint(shape.x + shape.width, shape.y + shape.height);
        return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${color}" stroke-width="1.4"/>`;
      }
      return `<polygon points="${rectPoints(shape.x, shape.y, Math.min(shape.width, panelWidth), Math.min(shape.height, panelHeight))}" fill="${color}" fill-opacity="${opacity}" stroke="${color}" stroke-width="1.2"/>`;
    }).join('');
  };

  const mapFaceShapePoint = (
    panelId: string,
    panelWidth: number,
    panelHeight: number,
    x: number,
    y: number,
  ) => {
    const px = Math.max(0, Math.min(panelWidth, x)) / Math.max(1, panelWidth);
    const py = Math.max(0, Math.min(panelHeight, y)) / Math.max(1, panelHeight);
    if (panelId === 'front') return iso(px * width, -gap, (1 - py) * height);
    if (panelId === 'back') return iso(px * width, depth + gap, (1 - py) * height);
    if (panelId === 'right') return iso(width + gap, px * depth, (1 - py) * height);
    if (panelId === 'left') return iso(-gap, px * depth, (1 - py) * height);
    if (panelId === 'top') return iso(px * width, py * depth, height + gap);
    if (panelId === 'bottom') return iso(px * width, py * depth, -gap);
    return iso(px * width, -gap, (1 - py) * height);
  };

  const panel = (
    id: string,
    label: string,
    points: Array<[number, number, number]>,
    fill: string,
    stroke: string,
    labelPosition: [number, number, number],
    panelWidth: number,
    panelHeight: number,
  ) => {
    const shapeMarkup = renderProjectedShapes(id, panelWidth, panelHeight, (x, y) => mapFaceShapePoint(id, panelWidth, panelHeight, x, y));
    const selected = selectedPanelId === id ? '<animate attributeName="stroke-width" values="3;5;3" dur="1.4s" repeatCount="indefinite"/>' : '';
    return `<g><polygon points="${pointList(points)}" fill="${fill}" stroke="${selectedPanelId === id ? '#D5896F' : stroke}" stroke-width="${selectedPanelId === id ? 4 : 2}" stroke-linejoin="round">${selected}</polygon>${shapeMarkup}<text ${labelPoint(...labelPosition)} text-anchor="middle" font-size="12" font-weight="700" fill="#4A4741">${label}</text></g>`;
  };

  const panels = [
    panel('bottom', 'Bottom', [[0, 0, -gap], [width, 0, -gap], [width, depth, -gap], [0, depth, -gap]], '#E8EFE6', '#6B9080', [width / 2, depth / 2, -gap], dims.width, dims.depth),
    panel('front', 'Front', [[0, -gap, 0], [width, -gap, 0], [width, -gap, height], [0, -gap, height]], '#FFF5F0', '#D5896F', [width / 2, -gap, height / 2], dims.width, dims.height),
    panel('right', 'Right', [[width + gap, 0, 0], [width + gap, depth, 0], [width + gap, depth, height], [width + gap, 0, height]], '#F6E8C8', '#CCA068', [width + gap, depth / 2, height / 2], dims.depth, dims.height),
    panel('left', 'Left', [[-gap, 0, 0], [-gap, depth, 0], [-gap, depth, height], [-gap, 0, height]], '#EEF2F5', '#7B8FA1', [-gap, depth / 2, height / 2], dims.depth, dims.height),
    panel('back', 'Back', [[0, depth + gap, 0], [width, depth + gap, 0], [width, depth + gap, height], [0, depth + gap, height]], '#FDFCFB', '#8C857B', [width / 2, depth + gap, height / 2], dims.width, dims.height),
  ];

  if (hasTop) {
    panels.push(panel('top', 'Top', [[0, 0, height + gap], [width, 0, height + gap], [width, depth, height + gap], [0, depth, height + gap]], '#FFFFFF', '#2C2A26', [width / 2, depth / 2, height + gap], dims.width, dims.depth));
  }

  return `
    <defs>
      <marker id="assembly-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill="#D5896F"/>
      </marker>
      <pattern id="assembly-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E0D8" stroke-width="0.5"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#assembly-grid)"/>
    <g transform="rotate(${viewRotation.toFixed(1)} 270 230)">
    <line x1="270" y1="260" x2="360" y2="292" stroke="#D5896F" stroke-width="1.5" marker-end="url(#assembly-arrow)"/>
    <line x1="270" y1="260" x2="178" y2="292" stroke="#6B9080" stroke-width="1.5" marker-end="url(#assembly-arrow)"/>
    <line x1="270" y1="260" x2="270" y2="162" stroke="#7B8FA1" stroke-width="1.5" marker-end="url(#assembly-arrow)"/>
    <text x="365" y="296" font-size="11" font-weight="700" fill="#D5896F">Width</text>
    <text x="135" y="296" font-size="11" font-weight="700" fill="#6B9080">Depth</text>
    <text x="276" y="158" font-size="11" font-weight="700" fill="#7B8FA1">Height</text>
    ${panels.join('')}
    </g>
    <text x="24" y="42" font-size="14" font-weight="800" fill="#2C2A26">${mode === 'exploded' ? 'Exploded assembly view' : 'Assembled isometric view'}</text>
    <text x="24" y="62" font-size="11" fill="#6B665E">Coloured panels show how 榫接 edges meet during assembly.</text>
  `;
};

const buildAssemblySvgDocument = (
  dims: { width: number; height: number; depth: number },
  hasTop: boolean,
  mode: AssemblyMode,
  explode: number,
  viewRotation = 0,
  shapesByPanel: PanelShapeMap = {},
  selectedPanelId?: string,
) => [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<svg xmlns="http://www.w3.org/2000/svg" width="560mm" height="420mm" viewBox="0 0 560 420">',
  '<title>榫接 box isometric assembly preview</title>',
  '<desc>Original Design Technology Lab SVG showing an isometric or exploded panel assembly view.</desc>',
  buildAssemblySvgMarkup(dims, hasTop, mode, explode, viewRotation, shapesByPanel, selectedPanelId),
  '</svg>',
].join('');

const AssemblyPreview = ({
  dims,
  hasTop,
  shapesByPanel,
  selectedPanelId,
}: {
  dims: { width: number; height: number; depth: number };
  hasTop: boolean;
  shapesByPanel: PanelShapeMap;
  selectedPanelId?: string;
}) => {
  const [mode, setMode] = useState<AssemblyMode>('exploded');
  const [explode, setExplode] = useState(46);
  const [viewRotation, setViewRotation] = useState(0);
  const markup = useMemo(() => buildAssemblySvgMarkup(dims, hasTop, mode, explode, viewRotation, shapesByPanel, selectedPanelId), [dims, hasTop, mode, explode, viewRotation, shapesByPanel, selectedPanelId]);

  return (
    <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#2C2A26]">3D assembly preview / 榫接組裝示意</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B665E]">
            Use the exploded view to understand how the flat panels move together. The architectural isometric view helps students read width, depth and height as a product form.
          </p>
        </div>
        <button
          type="button"
          onClick={() => downloadTextFile(buildAssemblySvgDocument(dims, hasTop, mode, explode, viewRotation, shapesByPanel, selectedPanelId), `box-assembly-${mode}.svg`)}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#4A4741] hover:bg-white"
        >
          <Download className="h-4 w-4" /> Export preview SVG
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-1">
          {(['exploded', 'assembled'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-widest ${mode === item ? 'bg-white text-[#2C2A26] shadow-sm' : 'text-[#8C857B]'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="flex min-w-[240px] items-center gap-3 text-xs font-bold text-[#6B665E]">
          Explode distance
          <input
            type="range"
            min="0"
            max="90"
            value={explode}
            onChange={(event) => setExplode(Number(event.target.value))}
            className="flex-1"
          />
        </label>
        <label className="flex min-w-[240px] items-center gap-3 text-xs font-bold text-[#6B665E]">
          Rotate view
          <input
            type="range"
            min="-45"
            max="45"
            value={viewRotation}
            onChange={(event) => setViewRotation(Number(event.target.value))}
            className="flex-1"
          />
        </label>
        <button
          type="button"
          onClick={() => setViewRotation(0)}
          className="rounded-lg border border-[#E5E0D8] bg-white px-3 py-1.5 text-xs font-black uppercase tracking-widest text-[#6B665E] hover:bg-[#F9F8F6]"
        >
          Reset view
        </button>
      </div>
      <div className="mt-4 overflow-auto rounded-xl border border-[#E5E0D8] bg-[#FDFCFB]">
        <svg
          role="img"
          aria-label="Isometric exploded assembly preview of the generated 榫接 box"
          viewBox="0 0 560 420"
          className="h-[420px] min-w-[620px] w-full"
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      </div>
    </article>
  );
};

const generateStraightDashedGridMarkup = (params: KerfBendParams) => {
  const cuts: string[] = [];
  const safeSpacing = Math.max(1, params.slotSpacing);
  const safeLength = Math.max(2, params.slotLength);
  let row = 0;
  for (let y = params.margin; y <= params.height - params.margin; y += safeSpacing) {
    const offset = params.stagger && row % 2 === 1 ? safeSpacing / 2 : 0;
    for (let x = params.margin + offset; x + safeLength <= params.width - params.margin; x += safeLength + safeSpacing) {
      cuts.push(`<line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${(x + safeLength).toFixed(2)}" y2="${y.toFixed(2)}" stroke="#D60000" stroke-width="0.1"/>`);
    }
    row += 1;
  }
  return cuts.join('');
};

const generateWaveGridMarkup = (params: KerfBendParams) => {
  const cuts: string[] = [];
  const safeSpacing = Math.max(1, params.slotSpacing);
  const safeLength = Math.max(4, params.slotLength);
  const waveLength = Math.max(2, params.waveLength);
  const amplitude = Math.max(0.1, params.waveAmplitude);
  for (let y = params.margin; y <= params.height - params.margin; y += safeSpacing) {
    for (let x = params.margin; x + safeLength <= params.width - params.margin; x += safeLength + safeSpacing) {
      const points: string[] = [];
      const segments = Math.max(12, Math.ceil(safeLength / 2));
      for (let index = 0; index <= segments; index += 1) {
        const t = index / segments;
        const px = x + t * safeLength;
        const py = y + Math.sin(t * Math.PI * 2 * (safeLength / waveLength)) * amplitude;
        points.push(`${px.toFixed(2)},${py.toFixed(2)}`);
      }
      cuts.push(`<polyline points="${points.join(' ')}" fill="none" stroke="#D60000" stroke-width="0.1"/>`);
    }
  }
  return cuts.join('');
};

const generateAngledLineSetMarkup = (params: KerfBendParams, angleDegrees: number) => {
  const cuts: string[] = [];
  const safeSpacing = Math.max(2, params.slotSpacing);
  const safeLength = Math.max(4, params.slotLength);
  const angle = angleDegrees * Math.PI / 180;
  const dx = Math.cos(angle) * safeLength / 2;
  const dy = Math.sin(angle) * safeLength / 2;
  for (let y = params.margin; y <= params.height - params.margin; y += safeSpacing) {
    for (let x = params.margin; x <= params.width - params.margin; x += safeSpacing) {
      const x1 = x - dx;
      const y1 = y - dy;
      const x2 = x + dx;
      const y2 = y + dy;
      if (x1 >= params.margin && x2 >= params.margin && x1 <= params.width - params.margin && x2 <= params.width - params.margin && y1 >= params.margin && y2 >= params.margin && y1 <= params.height - params.margin && y2 <= params.height - params.margin) {
        cuts.push(`<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="#D60000" stroke-width="0.1"/>`);
      }
    }
  }
  return cuts.join('');
};

const generateRoundedSlotGridMarkup = (params: KerfBendParams) => {
  const cuts: string[] = [];
  const safeSpacing = Math.max(1, params.slotSpacing);
  const safeLength = Math.max(3, params.slotLength);
  const slotWidth = Math.max(0.5, params.slotWidth);
  let row = 0;
  for (let y = params.margin; y + slotWidth <= params.height - params.margin; y += safeSpacing) {
    const offset = params.stagger && row % 2 === 1 ? safeLength / 2 : 0;
    for (let x = params.margin + offset; x + safeLength <= params.width - params.margin; x += safeLength + safeSpacing) {
      cuts.push(`<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${safeLength.toFixed(2)}" height="${slotWidth.toFixed(2)}" rx="${Math.min(params.slotRadius, slotWidth / 2).toFixed(2)}" ry="${Math.min(params.slotRadius, slotWidth / 2).toFixed(2)}" fill="none" stroke="#D60000" stroke-width="0.1"/>`);
    }
    row += 1;
  }
  return cuts.join('');
};

const generateHoneycombGridMarkup = (params: KerfBendParams) => {
  const cuts: string[] = [];
  const radius = Math.max(2, params.honeycombRadius);
  const gap = Math.max(0.5, params.honeycombGap);
  const hexWidth = Math.sqrt(3) * radius;
  const verticalSpacing = radius * 1.5 + gap;
  const horizontalSpacing = hexWidth + gap;
  let row = 0;
  for (let y = params.margin + radius; y + radius <= params.height - params.margin; y += verticalSpacing) {
    const rowOffset = row % 2 === 0 ? 0 : horizontalSpacing / 2;
    for (let x = params.margin + hexWidth / 2 + rowOffset; x + hexWidth / 2 <= params.width - params.margin; x += horizontalSpacing) {
      const points = Array.from({ length: 6 }).map((_, index) => {
        const angle = index * Math.PI / 3 + Math.PI / 6;
        return `${(x + Math.cos(angle) * radius).toFixed(2)},${(y + Math.sin(angle) * radius).toFixed(2)}`;
      }).join(' ');
      cuts.push(`<polygon points="${points}" fill="none" stroke="#D60000" stroke-width="0.1"/>`);
    }
    row += 1;
  }
  return cuts.join('');
};

const buildKerfBendPatternMarkup = (params: KerfBendParams) => {
  if (params.patternType === 'waveGrid') return generateWaveGridMarkup(params);
  if (params.patternType === 'crossGrid') return `${generateAngledLineSetMarkup(params, params.crossAngleA)}${generateAngledLineSetMarkup(params, params.crossAngleB)}`;
  if (params.patternType === 'roundedGrid') return generateRoundedSlotGridMarkup(params);
  if (params.patternType === 'honeycombGrid') return generateHoneycombGridMarkup(params);
  return generateStraightDashedGridMarkup(params);
};

const buildKerfBendSvg = (params: KerfBendParams) => {
  const patternMarkup = buildKerfBendPatternMarkup(params);

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${params.width}mm" height="${params.height}mm" viewBox="0 0 ${params.width} ${params.height}">`,
    '<title>Kerf bend / living hinge curve pattern</title>',
    '<desc>Original classroom SVG for testing curved card or thin wood. Test on scrap material before final cutting.</desc>',
    `<metadata>{"app":"Design Technology Lab","tool":"kerf-bend","patternType":"${params.patternType}","width":${params.width},"height":${params.height},"materialThickness":${params.materialThickness},"slotSpacing":${params.slotSpacing},"slotLength":${params.slotLength}}</metadata>`,
    `<rect x="0" y="0" width="${params.width}" height="${params.height}" fill="none" stroke="#3066BE" stroke-width="0.15"/>`,
    patternMarkup,
    '</svg>',
  ].join('');
};

const KerfBendGenerator = () => {
  const [params, setParams] = useState<KerfBendParams>({
    patternType: 'straightDashedGrid',
    width: 160,
    height: 80,
    materialThickness: 2,
    slotSpacing: 5,
    slotLength: 62,
    margin: 9,
    stagger: true,
    material: 'cardboard',
    targetBendRadius: 30,
    bendAngle: 90,
    waveAmplitude: 1.5,
    waveLength: 10,
    crossAngleA: 45,
    crossAngleB: -45,
    slotWidth: 2,
    slotRadius: 1,
    honeycombRadius: 6,
    honeycombGap: 2,
  });
  const [copyStatus, setCopyStatus] = useState('');
  const svg = useMemo(() => buildKerfBendSvg(params), [params]);
  const patternMarkup = useMemo(() => buildKerfBendPatternMarkup(params), [params]);
  const slotCount = Math.max(1, Math.floor((params.width - params.margin * 2) / Math.max(1, params.slotSpacing)));
  const warnings = [
    params.slotSpacing < params.materialThickness * 1.5 ? 'Slot spacing is tight. The strip may become weak or break when bent.' : '',
    params.slotLength > params.height - params.margin * 2 ? 'Slot length exceeds the safe area. It will be clamped in the SVG output.' : '',
    params.material === 'thin-plywood' && params.materialThickness > 3 ? 'Thicker plywood may not bend well with a simple kerf pattern.' : '',
    params.patternType === 'honeycombGrid' && params.targetBendRadius < 40 ? 'Honeycomb is better for visual panels than tight bends. Use straight or rounded patterns for smaller radius bends.' : '',
    params.patternType === 'crossGrid' && params.materialThickness > 3 ? 'Cross grid works better with thin card. Thick material may not twist safely.' : '',
  ].filter(Boolean);
  const update = (key: keyof KerfBendParams, value: string | boolean) => {
    setParams((current) => ({
      ...current,
      [key]: typeof value === 'boolean' ? value : Math.max(0, clampNumber(Number(value), Number(current[key]) || 1)),
    }));
  };

  const copy = async () => {
    await navigator.clipboard.writeText(svg);
    setCopyStatus('SVG copied');
    window.setTimeout(() => setCopyStatus(''), 1800);
  };
  const applyCurvePreset = (presetLabel: string) => {
    const preset = cardboardCurvePresets.find((item) => item.preset === presetLabel);
    if (!preset) return;
    setParams((current) => ({
      ...current,
      patternType: preset.patternType,
      slotSpacing: preset.spacing || current.slotSpacing,
      slotLength: preset.cutLength || current.slotLength,
      margin: preset.margin,
      waveAmplitude: preset.waveAmplitude || current.waveAmplitude,
      waveLength: preset.waveLength || current.waveLength,
      slotWidth: preset.slotWidth || current.slotWidth,
      slotRadius: preset.slotRadius || current.slotRadius,
      honeycombRadius: preset.honeycombRadius || current.honeycombRadius,
      honeycombGap: preset.honeycombGap || current.honeycombGap,
    }));
  };
  const patternNote = curvedPatternNotes[params.patternType];

  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Curved material SVG tool</div>
          <h2 className="mt-1 text-2xl font-bold text-[#2C2A26]">Kerf Bend / Living Hinge Generator</h2>
          <p className="mt-1 text-lg font-semibold text-[#6B665E]">木材或紙板彎曲坑紋 SVG 產生器</p>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#6B665E]">
            Type the panel size and cut-gap spacing to create repeated kerf slots. These gaps let card, veneer or thin plywood curve more easily. Always test on scrap material because bend radius depends on grain, thickness, slot spacing and laser settings.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#4A4741] hover:bg-white">
            <Clipboard className="h-4 w-4" /> {copyStatus || 'Copy SVG'}
          </button>
          <button type="button" onClick={() => downloadTextFile(svg, 'kerf-bend-living-hinge.svg')} className="inline-flex items-center gap-2 rounded-xl bg-[#2C2A26] px-4 py-2 text-sm font-bold text-white hover:bg-[#4A4741]">
            <Download className="h-4 w-4" /> Export bend SVG
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[340px_1fr]">
        <div className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
          <label className="mb-3 block text-xs font-bold text-[#6B665E]">
            Curved pattern method
            <select className={inputClass} value={params.patternType} onChange={(event) => setParams((current) => ({ ...current, patternType: event.target.value as CurvedCardboardPatternType }))}>
              {Object.entries(curvedPatternLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="mb-3 block text-xs font-bold text-[#6B665E]">
            Student preset
            <select className={inputClass} defaultValue="" onChange={(event) => applyCurvePreset(event.target.value)}>
              <option value="" disabled>Choose a preset</option>
              {cardboardCurvePresets.map((preset) => <option key={preset.preset} value={preset.preset}>{preset.label}</option>)}
            </select>
          </label>
          <div className="mb-4 rounded-lg bg-white p-3 text-xs leading-5 text-[#6B665E]">
            <b>{curvedPatternLabels[params.patternType]}</b><br />
            {patternNote.purpose}<br />
            <span className="font-bold text-[#8C857B]">Best for:</span> {patternNote.bestFor}<br />
            <span className="font-bold text-[#8C857B]">Caution:</span> {patternNote.caution}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-xs font-bold text-[#6B665E]">Panel width<input className={inputClass} type="number" value={params.width} onChange={(event) => update('width', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Panel height<input className={inputClass} type="number" value={params.height} onChange={(event) => update('height', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Thickness<input className={inputClass} type="number" step="0.1" value={params.materialThickness} onChange={(event) => update('materialThickness', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Slot spacing<input className={inputClass} type="number" step="0.5" value={params.slotSpacing} onChange={(event) => update('slotSpacing', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Slot length<input className={inputClass} type="number" step="0.5" value={params.slotLength} onChange={(event) => update('slotLength', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Margin<input className={inputClass} type="number" step="0.5" value={params.margin} onChange={(event) => update('margin', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Target radius<input className={inputClass} type="number" step="1" value={params.targetBendRadius} onChange={(event) => update('targetBendRadius', event.target.value)} /></label>
            <label className="text-xs font-bold text-[#6B665E]">Bend angle<input className={inputClass} type="number" step="1" value={params.bendAngle} onChange={(event) => update('bendAngle', event.target.value)} /></label>
            {params.patternType === 'waveGrid' && (
              <>
                <label className="text-xs font-bold text-[#6B665E]">Wave amplitude<input className={inputClass} type="number" step="0.1" value={params.waveAmplitude} onChange={(event) => update('waveAmplitude', event.target.value)} /></label>
                <label className="text-xs font-bold text-[#6B665E]">Wave length<input className={inputClass} type="number" step="0.5" value={params.waveLength} onChange={(event) => update('waveLength', event.target.value)} /></label>
              </>
            )}
            {params.patternType === 'crossGrid' && (
              <>
                <label className="text-xs font-bold text-[#6B665E]">Angle A<input className={inputClass} type="number" step="1" value={params.crossAngleA} onChange={(event) => update('crossAngleA', event.target.value)} /></label>
                <label className="text-xs font-bold text-[#6B665E]">Angle B<input className={inputClass} type="number" step="1" value={params.crossAngleB} onChange={(event) => update('crossAngleB', event.target.value)} /></label>
              </>
            )}
            {params.patternType === 'roundedGrid' && (
              <>
                <label className="text-xs font-bold text-[#6B665E]">Slot width<input className={inputClass} type="number" step="0.1" value={params.slotWidth} onChange={(event) => update('slotWidth', event.target.value)} /></label>
                <label className="text-xs font-bold text-[#6B665E]">Slot radius<input className={inputClass} type="number" step="0.1" value={params.slotRadius} onChange={(event) => update('slotRadius', event.target.value)} /></label>
              </>
            )}
            {params.patternType === 'honeycombGrid' && (
              <>
                <label className="text-xs font-bold text-[#6B665E]">Hex radius<input className={inputClass} type="number" step="0.5" value={params.honeycombRadius} onChange={(event) => update('honeycombRadius', event.target.value)} /></label>
                <label className="text-xs font-bold text-[#6B665E]">Hex gap<input className={inputClass} type="number" step="0.5" value={params.honeycombGap} onChange={(event) => update('honeycombGap', event.target.value)} /></label>
              </>
            )}
            <label className="col-span-2 text-xs font-bold text-[#6B665E]">
              Material
              <select className={inputClass} value={params.material} onChange={(event) => setParams((current) => ({ ...current, material: event.target.value as KerfBendParams['material'] }))}>
                <option value="cardboard">Cardboard / mount board</option>
                <option value="thin-plywood">Thin plywood</option>
                <option value="veneer">Wood veneer</option>
              </select>
            </label>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm font-bold text-[#6B665E]">
            <input type="checkbox" checked={params.stagger} onChange={(event) => update('stagger', event.target.checked)} />
            Stagger alternate slots
          </label>
          <div className="mt-4 rounded-lg bg-white p-3 text-xs leading-5 text-[#8C857B]">
            Estimated pattern columns: <b>{slotCount}</b>. Red lines/shapes are cut gaps; blue rectangle is the material boundary.
          </div>
          {warnings.length > 0 && (
            <ul className="mt-3 space-y-2 text-xs leading-5 text-[#8C857B]">
              {warnings.map((warning) => <li key={warning} className="rounded-lg border border-[#E5E0D8] bg-white p-2">{warning}</li>)}
            </ul>
          )}
        </div>
        <div className="overflow-auto rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
          <svg
            role="img"
            aria-label="SVG preview of kerf bend slot pattern for curved card or wood"
            viewBox={`0 0 ${params.width} ${params.height}`}
            className="h-[320px] min-w-[620px] w-full"
          >
            <rect x="0" y="0" width={params.width} height={params.height} fill="#FFFDF9" stroke="#3066BE" strokeWidth="0.4" />
            <g dangerouslySetInnerHTML={{ __html: patternMarkup.replace(/#D60000/g, '#D5896F').replace(/stroke-width="0.1"/g, 'stroke-width="0.5"') }} />
          </svg>
        </div>
      </div>
    </section>
  );
};

export const FingerJointBoxMakerPanel = ({ onNavigate }: Props) => {
  const [params, setParams] = useState<BoxParameters>(startingParams);
  const [copyStatus, setCopyStatus] = useState('');
  const [selectedPanelId, setSelectedPanelId] = useState('front');
  const [drawingTool, setDrawingTool] = useState<DrawingToolType>('circle');
  const [draftShape, setDraftShape] = useState<DraftShape>(defaultDraftShape);
  const [shapesByPanel, setShapesByPanel] = useState<PanelShapeMap>({});

  const workingParams = useMemo(() => convertParamsToMillimetres(params), [params]);
  const panels = useMemo(() => generatePanels(workingParams), [workingParams]);
  const selectedPanel = panels.find((panel) => panel.id === selectedPanelId) ?? panels[0];
  const svgText = useMemo(() => buildSvgDocument(workingParams, panels, shapesByPanel), [workingParams, panels, shapesByPanel]);
  const shapeWarnings = useMemo(() => panels.flatMap((panel) => (shapesByPanel[panel.id] ?? []).flatMap((shape) => validateShapePlacement(shape, panel, workingParams))), [panels, shapesByPanel, workingParams]);
  const warnings = useMemo(() => [...validateDesign(workingParams, panels), ...shapeWarnings], [workingParams, panels, shapeWarnings]);
  const dims = calculateOutsideDimensions(workingParams);
  const bounds = getLayoutBounds(panels);
  const unitLabel = params.unit === 'inch' ? 'in' : 'mm';
  const selectedGenerator = boxGeneratorOptions.find((option) => option.id === params.generatorType) ?? boxGeneratorOptions[1];
  const fit = calculateFingerJointFit(
    workingParams.materialThickness,
    workingParams.pressFitTolerance,
    workingParams.kerf,
    workingParams.useKerfCompensation,
  );
  const reverseMaleTabFromSlot = calculateMaleTabSize(fit.finalFemaleSlotOpening, workingParams.pressFitTolerance);

  const updateNumber = (key: keyof BoxParameters, value: string, fallback: number) => {
    setParams((current) => ({ ...current, [key]: Math.max(0, clampNumber(Number(value), fallback)) }));
  };

  const updateDraftNumber = (key: keyof DraftShape, value: string, fallback: number) => {
    setDraftShape((current) => ({ ...current, [key]: Math.max(0, clampNumber(Number(value), fallback)) }));
  };

  const addShapeToSelectedPanel = () => {
    if (!selectedPanel || drawingTool === 'select') return;
    const nextShape: PanelShape = {
      ...draftShape,
      id: `${selectedPanel.id}-${Date.now()}`,
      panelId: selectedPanel.id,
      shapeType: drawingTool,
      x: Math.min(Math.max(0, draftShape.x), Math.max(0, selectedPanel.width - 1)),
      y: Math.min(Math.max(0, draftShape.y), Math.max(0, selectedPanel.height - 1)),
      width: Math.min(draftShape.width, selectedPanel.width),
      height: Math.min(draftShape.height, selectedPanel.height),
    };
    setShapesByPanel((current) => ({
      ...current,
      [selectedPanel.id]: [...(current[selectedPanel.id] ?? []), nextShape],
    }));
  };

  const deleteShape = (panelId: string, shapeId: string) => {
    setShapesByPanel((current) => ({
      ...current,
      [panelId]: (current[panelId] ?? []).filter((shape) => shape.id !== shapeId),
    }));
  };

  const applyPreset = (preset: MaterialPreset) => {
    setParams((current) => ({
      ...current,
      unit: 'mm',
      materialThickness: preset.thickness,
      kerf: preset.kerf,
      fingerSize: Math.max(current.fingerSize, preset.thickness * 3),
    }));
  };

  const downloadSvg = () => {
    const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finger-joint-box-${Math.round(params.width)}x${Math.round(params.height)}x${Math.round(params.depth)}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copySvg = async () => {
    await navigator.clipboard.writeText(svgText);
    setCopyStatus('SVG copied');
    window.setTimeout(() => setCopyStatus(''), 1800);
  };

  return (
    <div className="space-y-8 pb-20">
      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-8">
        <div className="mb-3 inline-flex rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#8C857B]">
          Shared Design Skills
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2C2A26] md:text-4xl">榫接 Box Maker</h1>
            <p className="mt-2 text-xl font-semibold text-[#6B665E]">榫接盒與雷射切割外殼產生器 · Finger Joint Box Maker</p>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-[#6B665E]">
              Generate classroom-ready flat panel layouts for 榫接 finger-joint boxes, trays and project cases. This is an original Design Technology tool inspired by common laser-box workflows: choose dimensions, material thickness, tenon/finger size and kerf, then preview or export an SVG for testing.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onNavigate('fun_learning', 'design-skill-finger-joint-box')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2C2A26] px-4 py-2 text-sm font-bold text-white hover:bg-[#4A4741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
            >
              <Ruler className="h-4 w-4" /> Practice questions
            </button>
            <button
              type="button"
              onClick={downloadSvg}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#4A4741] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
            >
              <Download className="h-4 w-4" /> Export SVG
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-1">
          <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Full box generator list</div>
          <h2 className="text-xl font-bold text-[#2C2A26]">Laser-cut, curved-material and 3D-print box methods</h2>
          <p className="text-sm leading-6 text-[#6B665E]">
            This web version now lists the full BoxStudio DT method set. SVG-ready laser and curved-material modes are active here; 3D-print mesh export and clone-from-file import remain planned for a later native/CAD engine.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {boxGeneratorOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setParams((current) => ({ ...current, generatorType: option.id }))}
              className={`rounded-xl border p-4 text-left transition-all ${params.generatorType === option.id ? 'border-[#D5896F] bg-[#FFF5F0]' : 'border-[#E5E0D8] bg-[#FDFCFB] hover:bg-white'}`}
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B]">{option.category}</div>
              <h3 className="mt-1 text-sm font-bold text-[#2C2A26]">{option.labelZh} / {option.label}</h3>
              <p className="mt-2 text-xs leading-5 text-[#6B665E]">{option.summary}</p>
              <div className="mt-2 text-xs font-bold text-[#8C857B]">{option.exportStatus}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-5">
          <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Box className="h-5 w-5 text-[#D5896F]" />
              <h2 className="text-lg font-bold text-[#2C2A26]">Box settings</h2>
            </div>
            <label className="mb-3 block text-xs font-bold text-[#6B665E]">
              Generator type
              <select className={inputClass} value={params.generatorType} onChange={(event) => setParams((current) => ({ ...current, generatorType: event.target.value as BoxGeneratorType }))}>
                {boxGeneratorOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.labelZh} / {option.label}</option>
                ))}
              </select>
            </label>
            <div className="mb-4 rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-3 text-xs leading-5 text-[#6B665E]">
              <b>{selectedGenerator.labelZh} / {selectedGenerator.label}</b><br />
              {selectedGenerator.summary}<br />
              <span className="font-bold text-[#8C857B]">Status:</span> {selectedGenerator.exportStatus}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-[#6B665E]">
                Width
                <input className={inputClass} type="number" min="1" value={params.width} onChange={(event) => updateNumber('width', event.target.value, 120)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Height
                <input className={inputClass} type="number" min="1" value={params.height} onChange={(event) => updateNumber('height', event.target.value, 80)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Depth
                <input className={inputClass} type="number" min="1" value={params.depth} onChange={(event) => updateNumber('depth', event.target.value, 80)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Unit
                <select className={inputClass} value={params.unit} onChange={(event) => setParams((current) => ({ ...current, unit: event.target.value as UnitType }))}>
                  <option value="mm">mm</option>
                  <option value="inch">inch</option>
                </select>
              </label>
              <label className="col-span-2 text-xs font-bold text-[#6B665E]">
                Dimension mode
                <select className={inputClass} value={params.dimensionMode} onChange={(event) => setParams((current) => ({ ...current, dimensionMode: event.target.value as DimensionMode }))}>
                  <option value="outside">Outside dimensions</option>
                  <option value="inside">Inside dimensions</option>
                </select>
              </label>
              <label className="col-span-2 text-xs font-bold text-[#6B665E]">
                Box type
                <select className={inputClass} value={params.boxType} onChange={(event) => setParams((current) => ({ ...current, boxType: event.target.value as BoxType }))}>
                  {Object.entries(boxTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="col-span-2 text-xs font-bold text-[#6B665E]">
                Joint method
                <select className={inputClass} value={params.jointType} onChange={(event) => setParams((current) => ({ ...current, jointType: event.target.value as JointType }))}>
                  {Object.entries(jointTypeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              {(params.generatorType === 'gridDividerBox' || params.generatorType === 'printedGridDividerBox') && (
                <>
                  <label className="text-xs font-bold text-[#6B665E]">
                    Rows
                    <input className={inputClass} type="number" min="2" value={params.rows} onChange={(event) => updateNumber('rows', event.target.value, 3)} />
                  </label>
                  <label className="text-xs font-bold text-[#6B665E]">
                    Columns
                    <input className={inputClass} type="number" min="2" value={params.columns} onChange={(event) => updateNumber('columns', event.target.value, 3)} />
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#6B9080]" />
              <h2 className="text-lg font-bold text-[#2C2A26]">Material and kerf</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-[#6B665E]">
                Thickness
                <input className={inputClass} type="number" step="0.1" min="0" value={params.materialThickness} onChange={(event) => updateNumber('materialThickness', event.target.value, 3)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                榫接 size
                <input className={inputClass} type="number" step="0.1" min="0" value={params.fingerSize} onChange={(event) => updateNumber('fingerSize', event.target.value, 10)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Kerf
                <input className={inputClass} type="number" step="0.01" min="0" value={params.kerf} onChange={(event) => updateNumber('kerf', event.target.value, 0.2)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Fit mode
                <select
                  className={inputClass}
                  value={params.jointFitMode}
                  onChange={(event) => {
                    const mode = event.target.value as JointFitMode;
                    setParams((current) => ({
                      ...current,
                      jointFitMode: mode,
                      pressFitTolerance: mode === 'custom' ? current.pressFitTolerance : defaultPressFitTolerance(mode),
                    }));
                  }}
                >
                  {Object.entries(jointFitModeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Press-fit tolerance
                <input
                  className={inputClass}
                  type="number"
                  step="0.01"
                  value={params.pressFitTolerance}
                  onChange={(event) => setParams((current) => ({ ...current, jointFitMode: 'custom', pressFitTolerance: clampNumber(Number(event.target.value), 0.2) }))}
                />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Spacing
                <input className={inputClass} type="number" min="0" value={params.spacing} onChange={(event) => updateNumber('spacing', event.target.value, 16)} />
              </label>
            </div>
            <div className="mt-4 space-y-2 rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-3 text-xs leading-5 text-[#6B665E]">
              <div className="font-bold text-[#2C2A26]">Press-fit calculation</div>
              <div>Male tab design size: <b>{fit.maleTabDesignSize.toFixed(2)} mm</b></div>
              <div>Female slot design opening: <b>{fit.femaleSlotDesignSize.toFixed(2)} mm</b></div>
              <div>Estimated final fit after kerf: tab <b>{fit.finalMaleTabSize.toFixed(2)} mm</b> into slot <b>{fit.finalFemaleSlotOpening.toFixed(2)} mm</b></div>
              <div>Reverse check: slot {fit.finalFemaleSlotOpening.toFixed(2)} mm expects about <b>{reverseMaleTabFromSlot.toFixed(2)} mm</b> male tab before fit allowance.</div>
              <div className="rounded-lg bg-white p-2 text-[#8C857B]">
                母槽開口比公榫細 {Math.max(0, workingParams.pressFitTolerance).toFixed(2)} mm，令接合位更緊、更穩定。Cut a small test piece before the final box.
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-[#6B665E]">
                <input
                  type="checkbox"
                  checked={params.useKerfCompensation}
                  onChange={(event) => setParams((current) => ({ ...current, useKerfCompensation: event.target.checked }))}
                />
                Use kerf compensation
              </label>
              <label className="flex items-center gap-2 text-sm font-bold text-[#6B665E]">
                <input
                  type="checkbox"
                  checked={params.measuredWithCaliper}
                  onChange={(event) => setParams((current) => ({ ...current, measuredWithCaliper: event.target.checked }))}
                />
                Material thickness measured with calipers
              </label>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {materialPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-3 text-left text-xs leading-5 text-[#6B665E] hover:bg-white"
                >
                  <span className="font-bold text-[#2C2A26]">{preset.name}</span> · {preset.thickness} mm · kerf {preset.kerf} mm
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-[#2C2A26]">Laser bed</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="text-xs font-bold text-[#6B665E]">
                Bed width
                <input className={inputClass} type="number" min="1" value={params.bedWidth} onChange={(event) => updateNumber('bedWidth', event.target.value, 600)} />
              </label>
              <label className="text-xs font-bold text-[#6B665E]">
                Bed height
                <input className={inputClass} type="number" min="1" value={params.bedHeight} onChange={(event) => updateNumber('bedHeight', event.target.value, 400)} />
              </label>
            </div>
            <label className="mt-4 flex items-center gap-2 text-sm font-bold text-[#6B665E]">
              <input type="checkbox" checked={params.includeLabels} onChange={(event) => setParams((current) => ({ ...current, includeLabels: event.target.checked }))} />
              Include panel labels
            </label>
          </div>
        </aside>

        <div className="space-y-5">
          <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Synced panel editor</div>
                <h2 className="text-lg font-bold text-[#2C2A26]">Draw holes, slots, engravings and labels on panels</h2>
                <p className="mt-1 text-sm leading-6 text-[#6B665E]">
                  Shapes are stored on the selected panel and are used by the 2D preview, SVG export and 榫接組裝示意 preview.
                </p>
              </div>
              <button
                type="button"
                onClick={addShapeToSelectedPanel}
                className="rounded-xl bg-[#2C2A26] px-4 py-2 text-sm font-bold text-white hover:bg-[#4A4741]"
              >
                Add shape
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
                <label className="col-span-2 text-xs font-bold text-[#6B665E]">
                  Panel
                  <select className={inputClass} value={selectedPanel?.id ?? ''} onChange={(event) => setSelectedPanelId(event.target.value)}>
                    {panels.map((panel) => <option key={panel.id} value={panel.id}>{panel.label} ({panel.width.toFixed(0)} x {panel.height.toFixed(0)} mm)</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold text-[#6B665E]">
                  Tool
                  <select
                    className={inputClass}
                    value={drawingTool}
                    onChange={(event) => {
                      const tool = event.target.value as DrawingToolType;
                      setDrawingTool(tool);
                      if (tool !== 'select') setDraftShape((current) => ({ ...current, shapeType: tool }));
                    }}
                  >
                    {Object.entries(drawingToolLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold text-[#6B665E]">
                  Operation
                  <select className={inputClass} value={draftShape.operation} onChange={(event) => setDraftShape((current) => ({ ...current, operation: event.target.value as ShapeOperation }))}>
                    {Object.entries(shapeOperationLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
                <label className="text-xs font-bold text-[#6B665E]">X<input className={inputClass} type="number" value={draftShape.x} onChange={(event) => updateDraftNumber('x', event.target.value, 30)} /></label>
                <label className="text-xs font-bold text-[#6B665E]">Y<input className={inputClass} type="number" value={draftShape.y} onChange={(event) => updateDraftNumber('y', event.target.value, 30)} /></label>
                {drawingTool === 'circle' ? (
                  <label className="text-xs font-bold text-[#6B665E]">Radius<input className={inputClass} type="number" value={draftShape.radius} onChange={(event) => updateDraftNumber('radius', event.target.value, 10)} /></label>
                ) : (
                  <>
                    <label className="text-xs font-bold text-[#6B665E]">Width<input className={inputClass} type="number" value={draftShape.width} onChange={(event) => updateDraftNumber('width', event.target.value, 24)} /></label>
                    <label className="text-xs font-bold text-[#6B665E]">Height<input className={inputClass} type="number" value={draftShape.height} onChange={(event) => updateDraftNumber('height', event.target.value, 18)} /></label>
                  </>
                )}
                {(drawingTool === 'roundedRectangle' || drawingTool === 'slot') && (
                  <label className="text-xs font-bold text-[#6B665E]">Corner radius<input className={inputClass} type="number" value={draftShape.cornerRadius} onChange={(event) => updateDraftNumber('cornerRadius', event.target.value, 4)} /></label>
                )}
                {drawingTool === 'text' && (
                  <label className="col-span-2 text-xs font-bold text-[#6B665E]">
                    Text
                    <input className={inputClass} type="text" value={draftShape.text} onChange={(event) => setDraftShape((current) => ({ ...current, text: event.target.value }))} />
                  </label>
                )}
                <div className="col-span-2 rounded-lg bg-white p-3 text-xs leading-5 text-[#8C857B]">
                  Safe editable area keeps holes away from 榫接 edges. The green dashed guide in the 2D preview shows this margin.
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
                <h3 className="text-sm font-bold text-[#2C2A26]">Shapes on {selectedPanel?.label ?? 'selected panel'}</h3>
                <div className="mt-3 max-h-64 space-y-2 overflow-auto">
                  {(shapesByPanel[selectedPanel?.id ?? ''] ?? []).length === 0 ? (
                    <div className="rounded-lg bg-white p-3 text-sm text-[#8C857B]">No shapes added yet.</div>
                  ) : (
                    (shapesByPanel[selectedPanel?.id ?? ''] ?? []).map((shape) => (
                      <div key={shape.id} className="flex items-center justify-between gap-3 rounded-lg bg-white p-3 text-xs text-[#6B665E]">
                        <div>
                          <b>{drawingToolLabels[shape.shapeType]}</b> · {shapeOperationLabels[shape.operation]} · x {shape.x}, y {shape.y}
                        </div>
                        <button type="button" onClick={() => deleteShape(shape.panelId, shape.id)} className="rounded-lg border border-[#E5E0D8] px-2 py-1 font-bold text-[#D5896F] hover:bg-[#FFF5F0]">
                          Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#2C2A26]">2D laser-cut layout preview</h2>
                <p className="mt-1 text-xs text-[#8C857B]">
                  Outside size: {dims.width.toFixed(1)} x {dims.height.toFixed(1)} x {dims.depth.toFixed(1)} mm · Input unit: {unitLabel} · Panels: {panels.length} · Layout: {bounds.width.toFixed(1)} x {bounds.height.toFixed(1)} mm
                </p>
              </div>
              <button
                type="button"
                onClick={copySvg}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#4A4741] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
              >
                <Clipboard className="h-4 w-4" /> {copyStatus || 'Copy SVG'}
              </button>
            </div>
            <div className="mt-4 overflow-auto rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
              <svg
                role="img"
                aria-label="Flat SVG preview of generated box panels"
                viewBox={`0 0 ${Math.max(workingParams.bedWidth, bounds.width + 36)} ${Math.max(workingParams.bedHeight, bounds.height + 36)}`}
                className="h-[430px] min-w-[720px] w-full"
              >
                <defs>
                  <pattern id="box-maker-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#E5E0D8" strokeWidth="0.25" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#box-maker-grid)" />
                <rect x="0" y="0" width={workingParams.bedWidth} height={workingParams.bedHeight} fill="none" stroke="#9CA3AF" strokeWidth="0.8" strokeDasharray="6 4" />
                {panels.map((panel) => (
                  <g key={panel.id} transform={`translate(${panel.x + 18} ${panel.y + 18})`} onClick={() => setSelectedPanelId(panel.id)} className="cursor-pointer">
                    <path d={buildFingerPath(panel, workingParams)} fill={selectedPanelId === panel.id ? '#FFF5F0' : '#FFFDF9'} stroke={selectedPanelId === panel.id ? '#D5896F' : '#8C857B'} strokeWidth={selectedPanelId === panel.id ? 1.8 : 1.1} />
                    <rect x="0" y="0" width={panel.width} height={panel.height} fill="none" stroke="#6B9080" strokeWidth="0.5" strokeDasharray="4 3" />
                    <rect
                      x={editableMarginForPanel(panel, workingParams)}
                      y={editableMarginForPanel(panel, workingParams)}
                      width={Math.max(0, panel.width - editableMarginForPanel(panel, workingParams) * 2)}
                      height={Math.max(0, panel.height - editableMarginForPanel(panel, workingParams) * 2)}
                      fill="none"
                      stroke="#6B9080"
                      strokeWidth="0.5"
                      strokeDasharray="3 3"
                      opacity="0.55"
                    />
                    <g dangerouslySetInnerHTML={{ __html: renderShapesMarkup(shapesByPanel[panel.id] ?? [], true) }} />
                    {params.includeLabels && (
                      <text x={panel.width / 2} y={panel.height / 2} textAnchor="middle" dominantBaseline="middle" className="fill-[#4A4741] text-[8px] font-bold">
                        {panel.label}
                      </text>
                    )}
                  </g>
                ))}
              </svg>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <AssemblyPreview
              dims={dims}
              hasTop={workingParams.boxType === 'closed' || workingParams.boxType === 'case'}
              shapesByPanel={shapesByPanel}
              selectedPanelId={selectedPanelId}
            />
            <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#CCA068]" />
                <h2 className="text-lg font-bold text-[#2C2A26]">Design warnings</h2>
              </div>
              {warnings.length > 0 ? (
                <ul className="space-y-3 text-sm leading-6 text-[#6B665E]">
                  {warnings.map((warning) => (
                    <li key={warning} className="rounded-xl border border-[#E5E0D8] bg-[#FFFDF9] p-3">{warning}</li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-xl border border-[#D1DCD0] bg-[#F3F8F1] p-4 text-sm leading-6 text-[#4A674F]">
                  No major warnings. Still run a small kerf and corner test before cutting the full box.
                </div>
              )}
              <div className="mt-4 rounded-xl bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">
                SVG cut lines use red strokes. Check your school laser cutter settings before sending any file to the machine.
              </div>
            </article>
          </section>
        </div>
      </section>

      <KerfBendGenerator />

      <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#6B9080]" />
          <h2 className="text-lg font-bold text-[#2C2A26]">Methods for joint boxes and cases</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {boxMethodCards.map((method) => (
            <article key={method.id} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
              <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{method.titleZh}</div>
              <h3 className="mt-1 text-base font-bold text-[#2C2A26]">{method.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B665E]">{method.summary}</p>
              <p className="mt-2 text-xs leading-5 text-[#6B665E]"><b>Best for:</b> {method.bestFor.join(', ')}</p>
              <p className="mt-2 rounded-lg bg-white p-2 text-xs leading-5 text-[#8C857B]"><b>Teacher note:</b> {method.teacherNote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {fingerJointLearningNotes.map((note) => (
          <article key={note.title} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <h3 className="text-base font-bold text-[#2C2A26]">{note.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">{note.note}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

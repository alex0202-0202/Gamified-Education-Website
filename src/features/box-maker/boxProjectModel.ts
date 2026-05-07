import type { BoxGeneratorType, BoxType, JointFitMode, JointType } from '../../data/design-skills/fingerJointBoxMaker';

export type BoxAssemblyMode = 'assembled' | 'exploded' | 'stepByStep';
export type JointDisplayMode = 'normal' | 'highlightJoints' | 'xray';
export type ShapeOperation3D = 'cut' | 'engrave' | 'score';
export type PanelShapeType3D = 'circle' | 'rectangle' | 'roundedRectangle' | 'slot' | 'line' | 'text';

export type BoxDimensions3D = {
  width: number;
  height: number;
  depth: number;
};

export type BoxMakerPanel3D = {
  id: string;
  label: string;
  width: number;
  height: number;
  x: number;
  y: number;
  startWithTab: boolean;
};

export type BoxMakerShape3D = {
  id: string;
  panelId: string;
  shapeType: PanelShapeType3D;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  cornerRadius: number;
  text: string;
  operation: ShapeOperation3D;
};

export type BoxMakerShapeMap3D = Record<string, BoxMakerShape3D[]>;

export type BoxMakerParameters3D = {
  generatorType: BoxGeneratorType;
  boxType: BoxType;
  jointType: JointType;
  jointFitMode: JointFitMode;
  materialThickness: number;
  fingerSize: number;
  kerf: number;
  pressFitTolerance: number;
  useKerfCompensation: boolean;
};

export type BoxProject3D = {
  dimensions: BoxDimensions3D;
  panels: BoxMakerPanel3D[];
  shapesByPanel: BoxMakerShapeMap3D;
  selectedPanelId?: string;
  parameters: BoxMakerParameters3D;
  hasTop: boolean;
  assemblyMode: BoxAssemblyMode;
  jointDisplayMode: JointDisplayMode;
  explodedDistance: number;
};

export type PanelTransform3D = {
  position: [number, number, number];
  rotation: [number, number, number];
  localWidth: number;
  localHeight: number;
  normalSign: number;
};

export const BOX_MAKER_UNIT_SCALE = 0.01;

export const scaleMm = (value: number) => value * BOX_MAKER_UNIT_SCALE;

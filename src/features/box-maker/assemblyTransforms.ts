import { scaleMm, type BoxAssemblyMode, type BoxDimensions3D, type PanelTransform3D } from './boxProjectModel';

const getExplodeOffset = (panelId: string, distance: number): [number, number, number] => {
  if (panelId === 'front') return [0, 0, -distance];
  if (panelId === 'back') return [0, 0, distance];
  if (panelId === 'left') return [-distance, 0, 0];
  if (panelId === 'right') return [distance, 0, 0];
  if (panelId === 'top') return [0, distance, 0];
  if (panelId === 'bottom') return [0, -distance, 0];
  if (panelId.includes('divider')) return [0, distance * 0.45, distance * 0.25];
  if (panelId.includes('lid') || panelId.includes('rail')) return [0, distance * 0.55, distance * 0.35];
  return [0, distance * 0.35, 0];
};

export const getAssemblyTransform = (
  panelId: string,
  panelWidthMm: number,
  panelHeightMm: number,
  dims: BoxDimensions3D,
  assemblyMode: BoxAssemblyMode,
  explodedDistanceMm: number,
): PanelTransform3D => {
  const width = scaleMm(dims.width);
  const height = scaleMm(dims.height);
  const depth = scaleMm(dims.depth);
  const panelWidth = scaleMm(panelWidthMm);
  const panelHeight = scaleMm(panelHeightMm);
  const explode = assemblyMode === 'exploded' ? scaleMm(explodedDistanceMm) : 0;
  const [ex, ey, ez] = getExplodeOffset(panelId, explode);

  if (panelId === 'front') {
    return {
      position: [0 + ex, height / 2 + ey, -depth / 2 + ez],
      rotation: [0, 0, 0],
      localWidth: width,
      localHeight: height,
      normalSign: 1,
    };
  }

  if (panelId === 'back') {
    return {
      position: [0 + ex, height / 2 + ey, depth / 2 + ez],
      rotation: [0, Math.PI, 0],
      localWidth: width,
      localHeight: height,
      normalSign: 1,
    };
  }

  if (panelId === 'left') {
    return {
      position: [-width / 2 + ex, height / 2 + ey, 0 + ez],
      rotation: [0, -Math.PI / 2, 0],
      localWidth: depth,
      localHeight: height,
      normalSign: 1,
    };
  }

  if (panelId === 'right') {
    return {
      position: [width / 2 + ex, height / 2 + ey, 0 + ez],
      rotation: [0, Math.PI / 2, 0],
      localWidth: depth,
      localHeight: height,
      normalSign: 1,
    };
  }

  if (panelId === 'top') {
    return {
      position: [0 + ex, height + ey, 0 + ez],
      rotation: [-Math.PI / 2, 0, 0],
      localWidth: width,
      localHeight: depth,
      normalSign: 1,
    };
  }

  if (panelId === 'bottom') {
    return {
      position: [0 + ex, 0 + ey, 0 + ez],
      rotation: [Math.PI / 2, 0, 0],
      localWidth: width,
      localHeight: depth,
      normalSign: 1,
    };
  }

  return {
    position: [0 + ex, height * 0.52 + ey, 0 + ez],
    rotation: [0, panelId.includes('column') || panelId.endsWith('-b') ? Math.PI / 2 : 0, 0],
    localWidth: panelWidth,
    localHeight: panelHeight,
    normalSign: 1,
  };
};

import { scaleMm, type BoxMakerPanel3D, type BoxMakerParameters3D } from './boxProjectModel';

export const getPanelThickness = (parameters: Pick<BoxMakerParameters3D, 'materialThickness'>) => (
  Math.max(0.018, scaleMm(parameters.materialThickness))
);

export const getTabCountForEdge = (edgeLengthMm: number, fingerSizeMm: number) => {
  const raw = Math.max(3, Math.floor(edgeLengthMm / Math.max(1, fingerSizeMm)));
  return raw % 2 === 0 ? raw + 1 : raw;
};

export const getTabVisuals = (panel: BoxMakerPanel3D, parameters: BoxMakerParameters3D) => {
  if (parameters.jointType !== 'finger') return [];

  const countX = getTabCountForEdge(panel.width, parameters.fingerSize);
  const countY = getTabCountForEdge(panel.height, parameters.fingerSize);
  const tabDepth = Math.max(0.018, scaleMm(parameters.materialThickness));
  const tabWidthX = scaleMm(panel.width / countX) * 0.58;
  const tabWidthY = scaleMm(panel.height / countY) * 0.58;
  const width = scaleMm(panel.width);
  const height = scaleMm(panel.height);
  const tabs: Array<{ key: string; position: [number, number, number]; size: [number, number, number]; isSlot: boolean }> = [];

  for (let index = 0; index < countX; index += 1) {
    const startsTab = panel.startWithTab ? index % 2 === 0 : index % 2 !== 0;
    const x = -width / 2 + scaleMm(panel.width) * ((index + 0.5) / countX);
    tabs.push({
      key: `top-${index}`,
      position: [x, height / 2 + tabDepth * 0.5, tabDepth * 0.57],
      size: [tabWidthX, tabDepth, tabDepth * 0.42],
      isSlot: !startsTab,
    });
    tabs.push({
      key: `bottom-${index}`,
      position: [x, -height / 2 - tabDepth * 0.5, tabDepth * 0.57],
      size: [tabWidthX, tabDepth, tabDepth * 0.42],
      isSlot: startsTab,
    });
  }

  for (let index = 0; index < countY; index += 1) {
    const startsTab = panel.startWithTab ? index % 2 !== 0 : index % 2 === 0;
    const y = -height / 2 + scaleMm(panel.height) * ((index + 0.5) / countY);
    tabs.push({
      key: `left-${index}`,
      position: [-width / 2 - tabDepth * 0.5, y, tabDepth * 0.57],
      size: [tabDepth, tabWidthY, tabDepth * 0.42],
      isSlot: !startsTab,
    });
    tabs.push({
      key: `right-${index}`,
      position: [width / 2 + tabDepth * 0.5, y, tabDepth * 0.57],
      size: [tabDepth, tabWidthY, tabDepth * 0.42],
      isSlot: startsTab,
    });
  }

  return tabs;
};

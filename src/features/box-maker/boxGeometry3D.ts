import { scaleMm, type BoxMakerPanel3D, type BoxMakerShape3D } from './boxProjectModel';

export const getShapeColor = (operation: BoxMakerShape3D['operation']) => {
  if (operation === 'engrave') return '#3066BE';
  if (operation === 'score') return '#2F9E44';
  return '#D60000';
};

export const getPanelColor = (panelId: string, selectedPanelId?: string) => {
  if (panelId === selectedPanelId) return '#FFF5F0';
  if (panelId === 'front') return '#F8D6C9';
  if (panelId === 'back') return '#F2ECE4';
  if (panelId === 'left' || panelId === 'right') return '#E8EFE6';
  if (panelId === 'top') return '#FDFCFB';
  if (panelId === 'bottom') return '#F5E6BE';
  if (panelId.includes('divider')) return '#DCE8F2';
  return '#F4EFE8';
};

export const mapShapeToPanelLocal = (shape: BoxMakerShape3D, panel: BoxMakerPanel3D) => {
  const panelWidth = scaleMm(panel.width);
  const panelHeight = scaleMm(panel.height);
  const x = scaleMm(shape.x) - panelWidth / 2;
  const y = panelHeight / 2 - scaleMm(shape.y);
  return { x, y };
};

export const shapeLocalSize = (shape: BoxMakerShape3D) => ({
  width: Math.max(0.01, scaleMm(shape.width || shape.radius * 2 || 8)),
  height: Math.max(0.01, scaleMm(shape.height || shape.radius * 2 || 8)),
  radius: Math.max(0.01, scaleMm(shape.radius || Math.min(shape.width, shape.height) / 2 || 4)),
});

export const visiblePanelIds = new Set(['front', 'back', 'left', 'right', 'top', 'bottom']);

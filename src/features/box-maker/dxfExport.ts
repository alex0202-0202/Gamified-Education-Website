export const DXF_EXPORT_STATUS = 'planned' as const;

export const explainDxfExportStatus = () => (
  'DXF export is planned. This version exports SVG with metadata for school laser-cut testing; DXF will be added after the geometry model is split from the UI.'
);

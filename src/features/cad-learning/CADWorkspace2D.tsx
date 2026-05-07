export type CadTool = 'select' | 'rectangle' | 'circle' | 'line';
export type CadShapeType = 'rectangle' | 'circle' | 'line';

export type CadShape = {
  id: string;
  type: CadShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  tool: CadTool;
  shapes: CadShape[];
  selectedShapeId?: string;
  onToolChange: (tool: CadTool) => void;
  onAddShape: (shape: CadShapeType) => void;
  onSelectShape: (id: string) => void;
  onDeleteSelected: () => void;
};

const toolLabels: Array<{ id: CadTool; label: string }> = [
  { id: 'select', label: 'Select' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
  { id: 'line', label: 'Line' },
];

export const CADWorkspace2D = ({ tool, shapes, selectedShapeId, onToolChange, onAddShape, onSelectShape, onDeleteSelected }: Props) => (
  <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-bold text-[#2C2A26]">CAD-style 2D Workspace</h2>
        <p className="text-sm text-[#6B665E]">Use the toolbar to add simple 2D profiles. Shapes snap to a 20 px grid in this first version.</p>
      </div>
      <button
        type="button"
        onClick={onDeleteSelected}
        disabled={!selectedShapeId}
        className="rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm font-bold text-[#6B665E] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Delete selected
      </button>
    </div>

    <div className="mb-4 flex flex-wrap gap-2">
      {toolLabels.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => {
            onToolChange(item.id);
            if (item.id === 'rectangle' || item.id === 'circle' || item.id === 'line') onAddShape(item.id);
          }}
          className={`rounded-lg border px-3 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F] ${
            tool === item.id ? 'border-[#D5896F] bg-[#FFF4EF] text-[#2C2A26]' : 'border-[#E5E0D8] bg-[#F9F8F6] text-[#6B665E]'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>

    <svg
      role="img"
      aria-label="Simple CAD grid with student-created shapes"
      viewBox="0 0 520 340"
      className="h-[340px] w-full rounded-xl border border-[#E5E0D8] bg-[#FCFBF8]"
    >
      <defs>
        <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E5E0D8" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="520" height="340" fill="url(#cad-grid)" />
      <line x1="40" y1="300" x2="490" y2="300" stroke="#8C857B" strokeWidth="1.5" />
      <line x1="40" y1="300" x2="40" y2="30" stroke="#8C857B" strokeWidth="1.5" />
      <text x="492" y="306" fontSize="12" fill="#6B665E">X</text>
      <text x="33" y="26" fontSize="12" fill="#6B665E">Y</text>
      {shapes.map((shape) => {
        const selected = shape.id === selectedShapeId;
        const common = {
          stroke: selected ? '#D5896F' : '#2C2A26',
          strokeWidth: selected ? 3 : 2,
          fill: shape.type === 'line' ? 'none' : selected ? '#FFF4EF' : '#FFFFFF',
          onClick: () => onSelectShape(shape.id),
          className: 'cursor-pointer',
        };

        if (shape.type === 'circle') {
          return <ellipse key={shape.id} cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} rx={shape.width / 2} ry={shape.height / 2} {...common} />;
        }
        if (shape.type === 'line') {
          return <line key={shape.id} x1={shape.x} y1={shape.y + shape.height} x2={shape.x + shape.width} y2={shape.y} {...common} />;
        }
        return <rect key={shape.id} x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx="2" {...common} />;
      })}
    </svg>

    <p className="mt-3 text-xs leading-5 text-[#8C857B]">
      Text fallback: this workspace represents a 2D CAD grid. Use rectangle/circle/line buttons to add profiles, then select a shape and use the preview panel to view extrusion.
    </p>
  </section>
);

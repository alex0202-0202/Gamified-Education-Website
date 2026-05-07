import { useRef, useState, type PointerEvent } from 'react';

export type CadTool = 'select' | 'rectangle' | 'circle' | 'roundedRectangle' | 'slot' | 'line';
export type CadShapeType = Exclude<CadTool, 'select'>;

export type CadShape = {
  id: string;
  type: CadShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
};

type DragMode = 'move' | 'resize';

type ActiveDrag = {
  id: string;
  mode: DragMode;
  startX: number;
  startY: number;
  initial: CadShape;
};

type Props = {
  tool: CadTool;
  shapes: CadShape[];
  selectedShapeId?: string;
  onToolChange: (tool: CadTool) => void;
  onAddShape: (shape: CadShapeType) => void;
  onSelectShape: (id: string) => void;
  onUpdateShape: (id: string, patch: Partial<CadShape>) => void;
  onDeleteSelected: () => void;
};

const toolLabels: Array<{ id: CadTool; label: string }> = [
  { id: 'select', label: 'Select' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
  { id: 'roundedRectangle', label: 'Rounded rect' },
  { id: 'slot', label: 'Slot' },
  { id: 'line', label: 'Line' },
];

const snap = (value: number) => Math.round(value / 20) * 20;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const CADWorkspace2D = ({ tool, shapes, selectedShapeId, onToolChange, onAddShape, onSelectShape, onUpdateShape, onDeleteSelected }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);
  const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);

  const getPoint = (event: PointerEvent<SVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const matrix = svg.getScreenCTM();
    if (!matrix) return { x: 0, y: 0 };
    const transformed = point.matrixTransform(matrix.inverse());
    return { x: transformed.x, y: transformed.y };
  };

  const beginDrag = (event: PointerEvent<SVGElement>, shape: CadShape, mode: DragMode) => {
    event.stopPropagation();
    const point = getPoint(event);
    onSelectShape(shape.id);
    setActiveDrag({ id: shape.id, mode, startX: point.x, startY: point.y, initial: shape });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const updateDrag = (event: PointerEvent<SVGSVGElement>) => {
    if (!activeDrag) return;
    const point = getPoint(event);
    const dx = point.x - activeDrag.startX;
    const dy = point.y - activeDrag.startY;
    if (activeDrag.mode === 'move') {
      onUpdateShape(activeDrag.id, {
        x: clamp(snap(activeDrag.initial.x + dx), 20, 480),
        y: clamp(snap(activeDrag.initial.y + dy), 20, 300),
      });
      return;
    }
    onUpdateShape(activeDrag.id, {
      width: clamp(snap(activeDrag.initial.width + dx), 20, 440),
      height: clamp(snap(activeDrag.initial.height + dy), 20, 280),
    });
  };

  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#2C2A26]">CAD-style 2D Workspace</h2>
          <p className="text-sm text-[#6B665E]">Add 2D profiles, select them, then drag to move or use the corner handle to resize. Shapes snap to a 20 px grid.</p>
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
              if (item.id !== 'select') onAddShape(item.id);
            }}
            className={`rounded-lg border px-3 py-2 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F] ${
              tool === item.id ? 'border-[#D5896F] bg-[#FFF4EF] text-[#2C2A26]' : 'border-[#E5E0D8] bg-[#F9F8F6] text-[#6B665E]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {selectedShape && (
        <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-3 text-xs font-bold text-[#6B665E] md:grid-cols-4">
          {(['x', 'y', 'width', 'height'] as const).map((key) => (
            <label key={key} className="capitalize">
              {key}
              <input
                type="number"
                value={selectedShape[key]}
                onChange={(event) => onUpdateShape(selectedShape.id, { [key]: clamp(Number(event.target.value), 0, key === 'x' ? 500 : key === 'y' ? 320 : 500) })}
                className="mt-1 w-full rounded-lg border border-[#E5E0D8] bg-white px-2 py-1.5 text-sm text-[#2C2A26]"
              />
            </label>
          ))}
        </div>
      )}

      <svg
        ref={svgRef}
        role="img"
        aria-label="Simple CAD grid with student-created shapes"
        viewBox="0 0 520 340"
        className="h-[340px] w-full touch-none rounded-xl border border-[#E5E0D8] bg-[#FCFBF8]"
        onPointerMove={updateDrag}
        onPointerUp={() => setActiveDrag(null)}
        onPointerLeave={() => setActiveDrag(null)}
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
            onPointerDown: (event: PointerEvent<SVGElement>) => beginDrag(event, shape, 'move'),
            className: 'cursor-move',
          };

          return (
            <g key={shape.id}>
              {shape.type === 'circle' && <ellipse cx={shape.x + shape.width / 2} cy={shape.y + shape.height / 2} rx={shape.width / 2} ry={shape.height / 2} {...common} />}
              {shape.type === 'line' && <line x1={shape.x} y1={shape.y + shape.height} x2={shape.x + shape.width} y2={shape.y} {...common} />}
              {shape.type === 'rectangle' && <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx="2" {...common} />}
              {shape.type === 'roundedRectangle' && <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx="10" {...common} />}
              {shape.type === 'slot' && <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={Math.min(shape.height / 2, 14)} {...common} />}
              {selected && shape.type !== 'line' && (
                <rect
                  x={shape.x + shape.width - 7}
                  y={shape.y + shape.height - 7}
                  width="14"
                  height="14"
                  fill="#D5896F"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="cursor-nwse-resize"
                  onPointerDown={(event) => beginDrag(event, shape, 'resize')}
                />
              )}
            </g>
          );
        })}
      </svg>

      <p className="mt-3 text-xs leading-5 text-[#8C857B]">
        Text fallback: this workspace represents a 2D CAD grid. Use the toolbar to add profiles, select a shape to edit dimensions, then use the preview panel to extrude it.
      </p>
    </section>
  );
};

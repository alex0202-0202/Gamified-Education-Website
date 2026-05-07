import { useMemo, useState } from 'react';
import { Box, Ruler, Shapes } from 'lucide-react';
import { orthographicPracticeTasks, orthographicViewGuides, type OrthographicViewId } from '../../data/design-skills/orthographicProjection';
import { CADWorkspace2D, type CadShape, type CadShapeType, type CadTool } from './CADWorkspace2D';
import { ModelPreview3D } from './ModelPreview3D';
import { SectionViewPanel } from './SectionViewPanel';
import { ViewSelector } from './ViewSelector';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

const snap = (value: number) => Math.round(value / 20) * 20;

export const OrthographicProjectionPanel = ({ onNavigate }: Props) => {
  const [activeView, setActiveView] = useState<OrthographicViewId>('isometric');
  const [tool, setTool] = useState<CadTool>('select');
  const [shapeCounter, setShapeCounter] = useState(3);
  const [selectedShapeId, setSelectedShapeId] = useState<string | undefined>('shape-1');
  const [dimensions, setDimensions] = useState({ width: 80, depth: 60, height: 50 });
  const [rotation, setRotation] = useState(0);
  const [cutPosition, setCutPosition] = useState(50);
  const [shapes, setShapes] = useState<CadShape[]>([
    { id: 'shape-1', type: 'rectangle', x: 120, y: 110, width: 120, height: 80 },
    { id: 'shape-2', type: 'circle', x: 300, y: 100, width: 80, height: 80 },
    { id: 'shape-3', type: 'line', x: 130, y: 240, width: 160, height: 80 },
  ]);

  const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);
  const activeGuide = useMemo(() => orthographicViewGuides.find((view) => view.id === activeView) ?? orthographicViewGuides[0], [activeView]);

  const addShape = (type: CadShapeType) => {
    const nextId = `shape-${shapeCounter + 1}`;
    setShapeCounter((value) => value + 1);
    const offset = snap(60 + shapeCounter * 14);
    const next: CadShape = {
      id: nextId,
      type,
      x: Math.min(380, offset),
      y: Math.min(240, offset),
      width: type === 'line' ? 120 : 80,
      height: type === 'line' ? 60 : 60,
    };
    setShapes((current) => [...current, next]);
    setSelectedShapeId(nextId);
  };

  const deleteSelected = () => {
    setShapes((current) => current.filter((shape) => shape.id !== selectedShapeId));
    setSelectedShapeId(undefined);
  };

  const updateDimension = (key: 'width' | 'depth' | 'height', value: number) => {
    const safeValue = Math.max(10, Math.min(200, value));
    setDimensions((current) => ({ ...current, [key]: safeValue }));
  };

  return (
    <div className="space-y-8 pb-20">
      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-8 shadow-sm">
        <div className="mb-3 inline-flex rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#8C857B]">
          Shared Design Skills
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#2C2A26] md:text-4xl">Orthographic Projection & Beginner CAD</h1>
        <p className="mt-2 text-xl font-semibold text-[#6B665E]">正投影圖與基礎 CAD 繪圖</p>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-[#6B665E]">
          Learn how plan, elevation, side, isometric and section views communicate a 3D object. This shared skill supports EDB DT, HKDSE DAT, IB MYP Design and IB DP Design Technology.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('fun_learning', 'design-skill-orthographic-projection')}
          className="mt-5 rounded-xl bg-[#2C2A26] px-4 py-2 text-sm font-bold text-white hover:bg-[#4A4741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
        >
          Practice orthographic questions
        </button>
      </section>

      <ViewSelector views={orthographicViewGuides} activeView={activeView} onChange={setActiveView} />

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <CADWorkspace2D
          tool={tool}
          shapes={shapes}
          selectedShapeId={selectedShapeId}
          onToolChange={setTool}
          onAddShape={addShape}
          onSelectShape={setSelectedShapeId}
          onDeleteSelected={deleteSelected}
        />
        <ModelPreview3D
          selectedShape={selectedShape}
          activeView={activeView}
          width={dimensions.width}
          depth={dimensions.depth}
          height={dimensions.height}
          rotation={rotation}
          onRotate={() => setRotation((value) => (value + 30) % 360)}
          onReset={() => setRotation(0)}
        />
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-[#D5896F]"><Ruler className="h-5 w-5" /><h2 className="text-lg font-bold text-[#2C2A26]">{activeGuide.title} / {activeGuide.titleZh}</h2></div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ['Explanation', activeGuide.explanation],
              ['Look for', activeGuide.lookFor],
              ['Common mistake', activeGuide.commonMistake],
              ['Drawing tip', activeGuide.drawingTip],
              ['Mini practice task', activeGuide.practiceTask],
            ].map(([title, body]) => (
              <div key={title} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A4741]">{body}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-[#6B9080]"><Shapes className="h-5 w-5" /><h2 className="text-lg font-bold text-[#2C2A26]">Dimensions</h2></div>
          {(['width', 'depth', 'height'] as const).map((key) => (
            <label key={key} className="mb-3 block text-sm font-bold capitalize text-[#4A4741]">
              {key} mm
              <input
                type="number"
                min="10"
                max="200"
                value={dimensions[key]}
                onChange={(event) => updateDimension(key, Number(event.target.value))}
                className="mt-1 w-full rounded-lg border border-[#E5E0D8] px-3 py-2 text-sm"
              />
            </label>
          ))}
          <button type="button" className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#6B9080] px-4 py-2 text-sm font-bold text-white">
            <Box className="h-4 w-4" /> Extrude selected profile
          </button>
        </article>
      </section>

      <SectionViewPanel cutPosition={cutPosition} onCutPositionChange={setCutPosition} />

      <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-[#2C2A26]">Practice Tasks</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          {orthographicPracticeTasks.map((task, index) => (
            <div key={task} className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4">
              <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Task {index + 1}</div>
              <p className="mt-2 text-sm leading-6 text-[#4A4741]">{task}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

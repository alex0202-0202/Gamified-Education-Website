import type { CadShape } from './CADWorkspace2D';
import type { OrthographicViewId } from '../../data/design-skills/orthographicProjection';

type Props = {
  selectedShape?: CadShape;
  activeView: OrthographicViewId;
  width: number;
  depth: number;
  height: number;
  rotation: number;
  onRotate: () => void;
  onReset: () => void;
};

export const ModelPreview3D = ({ selectedShape, activeView, width, depth, height, rotation, onRotate, onReset }: Props) => {
  const isSection = activeView === 'section';
  const face = selectedShape?.type === 'circle' ? 'rounded-full' : selectedShape?.type === 'line' ? 'rounded-sm' : 'rounded-md';

  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#2C2A26]">3D Preview / Extrusion</h2>
          <p className="text-sm text-[#6B665E]">Simplified CSS preview showing how a 2D profile can become a 3D design body.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onRotate} className="rounded-lg bg-[#2C2A26] px-3 py-2 text-xs font-bold text-white">Rotate</button>
          <button type="button" onClick={onReset} className="rounded-lg border border-[#E5E0D8] px-3 py-2 text-xs font-bold text-[#6B665E]">Reset</button>
        </div>
      </div>

      <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-xl border border-[#E5E0D8] bg-[#F9F8F6]">
        <div className="absolute left-4 top-4 text-xs font-bold text-[#8C857B]">Z ↑</div>
        <div className="absolute bottom-4 left-4 text-xs font-bold text-[#8C857B]">X →</div>
        <div className="absolute bottom-4 right-4 text-xs font-bold text-[#8C857B]">Y / depth</div>
        {!selectedShape ? (
          <p className="max-w-xs text-center text-sm text-[#8C857B]">Select or create a 2D shape to preview a simple extrusion.</p>
        ) : (
          <div
            className="relative"
            style={{
              width: Math.min(180, width * 2),
              height: Math.min(150, height * 2),
              transform: activeView === 'isometric'
                ? `rotateX(58deg) rotateZ(${45 + rotation}deg)`
                : `rotateZ(${rotation}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className={`absolute inset-0 border-2 border-[#2C2A26] bg-[#FDFCFB] ${face}`}
              style={{ boxShadow: activeView === 'isometric' ? `${Math.min(70, depth)}px ${Math.min(55, depth * 0.75)}px 0 #D8C8B8` : 'none' }}
            />
            {isSection && (
              <div className="absolute inset-y-0 left-1/2 w-1/2 border-l-4 border-[#D5896F] bg-[repeating-linear-gradient(45deg,#F5C9B8_0,#F5C9B8_4px,#FFF4EF_4px,#FFF4EF_8px)] opacity-90" />
            )}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Width</b><br />{width} mm</div>
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Depth</b><br />{depth} mm</div>
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Height</b><br />{height} mm</div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#8C857B]">
        Accessibility note: the preview shows a simplified extruded object. Written dimensions and active-view guidance are provided so students do not need to rely only on the visual preview.
      </p>
    </section>
  );
};

import { Canvas } from '@react-three/fiber';
import { Edges, OrbitControls, Text } from '@react-three/drei';
import type { CadElevationView, CadShape } from './CADWorkspace2D';
import type { OrthographicViewId } from '../../data/design-skills/orthographicProjection';

type Props = {
  shapes: CadShape[];
  selectedShapeId?: string;
  activeElevation: CadElevationView;
  activeView: OrthographicViewId;
  width: number;
  depth: number;
  height: number;
  rotation: number;
  onRotate: () => void;
  onReset: () => void;
};

const scale = (value: number) => value / 80;
const WORKSPACE_W = 520;
const WORKSPACE_H = 340;

const faceMeta: Record<CadElevationView, { label: string; normal: [number, number, number] }> = {
  north: { label: 'North face', normal: [0, 0, 1] },
  east: { label: 'East face', normal: [1, 0, 0] },
  south: { label: 'South face', normal: [0, 0, -1] },
  west: { label: 'West face', normal: [-1, 0, 0] },
  top: { label: 'Top face', normal: [0, 1, 0] },
};

const getFaceSize = (view: CadElevationView, w: number, d: number, h: number) => {
  if (view === 'east' || view === 'west') return { faceW: d, faceH: h };
  if (view === 'top') return { faceW: w, faceH: d };
  return { faceW: w, faceH: h };
};

const getFaceTransform = (view: CadElevationView, w: number, d: number, h: number, x: number, y: number) => {
  const inset = 0.012;
  switch (view) {
    case 'north':
      return { position: [x, y, d / 2 + inset] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] };
    case 'south':
      return { position: [-x, y, -d / 2 - inset] as [number, number, number], rotation: [0, Math.PI, 0] as [number, number, number] };
    case 'east':
      return { position: [w / 2 + inset, y, -x] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number] };
    case 'west':
      return { position: [-w / 2 - inset, y, x] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number] };
    case 'top':
      return { position: [x, h / 2 + inset, y] as [number, number, number], rotation: [-Math.PI / 2, 0, 0] as [number, number, number] };
    default:
      return { position: [x, y, d / 2 + inset] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] };
  }
};

const FaceShapeMark = ({ shape, selected, w, d, h }: { shape: CadShape; selected: boolean; w: number; d: number; h: number }) => {
  const { faceW, faceH } = getFaceSize(shape.view, w, d, h);
  const markW = Math.max(0.08, (shape.width / WORKSPACE_W) * faceW);
  const markH = Math.max(0.08, (shape.height / WORKSPACE_H) * faceH);
  const centerX = ((shape.x + shape.width / 2) / WORKSPACE_W - 0.5) * faceW;
  const centerY = (0.5 - (shape.y + shape.height / 2) / WORKSPACE_H) * faceH;
  const { position, rotation } = getFaceTransform(shape.view, w, d, h, centerX, centerY);
  const color = selected ? '#D5896F' : '#2C2A26';
  const fill = shape.type === 'line' ? '#2C2A26' : shape.type === 'slot' ? '#6B9080' : '#F8D6C9';

  if (shape.type === 'circle') {
    return (
      <mesh position={position} rotation={rotation}>
        <circleGeometry args={[Math.max(0.05, Math.min(markW, markH) / 2), 48]} />
        <meshBasicMaterial color={fill} transparent opacity={selected ? 0.88 : 0.62} />
        <Edges color={color} />
      </mesh>
    );
  }

  if (shape.type === 'line') {
    return (
      <mesh position={position} rotation={[rotation[0], rotation[1], rotation[2] - 0.45]}>
        <planeGeometry args={[Math.max(markW, 0.12), 0.028]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    );
  }

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[markW, markH]} />
      <meshBasicMaterial color={fill} transparent opacity={selected ? 0.88 : 0.58} />
      <Edges color={color} />
    </mesh>
  );
};

const SyncedModel = ({ shapes, selectedShapeId, activeElevation, activeView, width, depth, height, rotation }: Pick<Props, 'shapes' | 'selectedShapeId' | 'activeElevation' | 'activeView' | 'width' | 'depth' | 'height' | 'rotation'>) => {
  const w = Math.max(0.35, scale(width));
  const d = Math.max(0.25, scale(depth));
  const h = Math.max(0.25, scale(height));
  const isSection = activeView === 'section';
  const activeFace = faceMeta[activeElevation];

  return (
    <group rotation={[0, (rotation * Math.PI) / 180, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#FDFCFB" roughness={0.76} metalness={0.03} />
        <Edges color="#2C2A26" />
      </mesh>
      {shapes.map((shape) => (
        <FaceShapeMark key={shape.id} shape={shape} selected={shape.id === selectedShapeId} w={w} d={d} h={h} />
      ))}
      {isSection && (
        <mesh position={[w * 0.18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[Math.max(h, 0.8), Math.max(d, 0.8)]} />
          <meshBasicMaterial color="#D5896F" transparent opacity={0.38} />
        </mesh>
      )}
      <Text position={[0, -h / 2 - 0.22, 0]} fontSize={0.08} color="#6B665E" anchorX="center" anchorY="middle">
        Synced 2D profiles · {activeFace.label}
      </Text>
    </group>
  );
};

export const ModelPreview3D = ({ shapes, selectedShapeId, activeElevation, activeView, width, depth, height, rotation, onRotate, onReset }: Props) => {
  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#2C2A26]">3D Preview / Synced Elevations</h2>
          <p className="text-sm text-[#6B665E]">The object uses the same 2D shapes from North, East, South, West and Top drawings. Mouse drag rotates, scroll zooms, and right drag pans.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onRotate} className="rounded-lg bg-[#2C2A26] px-3 py-2 text-xs font-bold text-white">Rotate</button>
          <button type="button" onClick={onReset} className="rounded-lg border border-[#E5E0D8] px-3 py-2 text-xs font-bold text-[#6B665E]">Reset</button>
        </div>
      </div>

      <div className="h-[280px] overflow-hidden rounded-xl border border-[#E5E0D8] bg-[#F9F8F6]">
        <Canvas camera={{ position: [1.9, 1.4, 2.6], fov: 42 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.76} />
          <directionalLight position={[2, 4, 3]} intensity={1.4} />
          <SyncedModel
            shapes={shapes}
            selectedShapeId={selectedShapeId}
            activeElevation={activeElevation}
            activeView={activeView}
            width={width}
            depth={depth}
            height={height}
            rotation={rotation}
          />
          <gridHelper args={[4, 16, '#D8CFC3', '#EFEAE3']} position={[0, -0.82, 0]} />
          <axesHelper args={[0.9]} position={[-1.5, -0.8, -1.1]} />
          <OrbitControls enableDamping enablePan enableZoom minDistance={1} maxDistance={6} />
        </Canvas>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Width</b><br />{width} mm</div>
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Depth</b><br />{depth} mm</div>
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Height</b><br />{height} mm</div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#8C857B]">
        Current drawing face: {faceMeta[activeElevation].label}. Shape markings are synced previews; true cut-through boolean subtraction is a planned next CAD step.
      </p>
    </section>
  );
};

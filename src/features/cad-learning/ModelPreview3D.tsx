import { Canvas } from '@react-three/fiber';
import { Edges, OrbitControls, Text } from '@react-three/drei';
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

const scale = (value: number) => value / 80;

const ExtrusionMesh = ({ selectedShape, activeView, width, depth, height, rotation }: Required<Pick<Props, 'selectedShape' | 'activeView' | 'width' | 'depth' | 'height' | 'rotation'>>) => {
  const w = Math.max(0.35, scale(width));
  const d = Math.max(0.25, scale(depth));
  const h = Math.max(0.25, scale(height));
  const isCircle = selectedShape.type === 'circle';
  const isLine = selectedShape.type === 'line';
  const isSection = activeView === 'section';

  return (
    <group rotation={[0, (rotation * Math.PI) / 180, 0]}>
      {isCircle ? (
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[Math.max(0.18, Math.min(w, h) / 2), Math.max(0.18, Math.min(w, h) / 2), d, 48]} />
          <meshStandardMaterial color="#F8D6C9" roughness={0.7} />
          <Edges color="#2C2A26" />
        </mesh>
      ) : isLine ? (
        <mesh rotation={[0, 0, -0.45]} castShadow receiveShadow>
          <boxGeometry args={[Math.max(0.8, w), 0.08, d]} />
          <meshStandardMaterial color="#DCE8F2" roughness={0.7} />
          <Edges color="#2C2A26" />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={selectedShape.type === 'slot' ? '#E8EFE6' : '#FDFCFB'} roughness={0.7} />
          <Edges color="#2C2A26" />
        </mesh>
      )}
      {isSection && (
        <mesh position={[w * 0.18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[Math.max(h, 0.8), Math.max(d, 0.8)]} />
          <meshBasicMaterial color="#D5896F" transparent opacity={0.38} />
        </mesh>
      )}
      <Text position={[0, -h / 2 - 0.22, 0]} fontSize={0.08} color="#6B665E" anchorX="center" anchorY="middle">
        {selectedShape.type} profile extrusion
      </Text>
    </group>
  );
};

export const ModelPreview3D = ({ selectedShape, activeView, width, depth, height, rotation, onRotate, onReset }: Props) => {
  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#2C2A26]">3D Preview / Extrusion</h2>
          <p className="text-sm text-[#6B665E]">Orbit the selected 2D profile as a simple 3D body. Mouse drag rotates, scroll zooms, and right drag pans.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onRotate} className="rounded-lg bg-[#2C2A26] px-3 py-2 text-xs font-bold text-white">Rotate</button>
          <button type="button" onClick={onReset} className="rounded-lg border border-[#E5E0D8] px-3 py-2 text-xs font-bold text-[#6B665E]">Reset</button>
        </div>
      </div>

      <div className="h-[280px] overflow-hidden rounded-xl border border-[#E5E0D8] bg-[#F9F8F6]">
        {selectedShape ? (
          <Canvas camera={{ position: [1.9, 1.4, 2.6], fov: 42 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.76} />
            <directionalLight position={[2, 4, 3]} intensity={1.4} />
            <ExtrusionMesh selectedShape={selectedShape} activeView={activeView} width={width} depth={depth} height={height} rotation={rotation} />
            <gridHelper args={[4, 16, '#D8CFC3', '#EFEAE3']} position={[0, -0.82, 0]} />
            <axesHelper args={[0.9]} position={[-1.5, -0.8, -1.1]} />
            <OrbitControls enableDamping enablePan enableZoom minDistance={1} maxDistance={6} />
          </Canvas>
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-[#8C857B]">
            Select or create a 2D shape, then press Extrude selected profile.
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Width</b><br />{width} mm</div>
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Depth</b><br />{depth} mm</div>
        <div className="rounded-lg bg-[#F9F8F6] p-3"><b>Height</b><br />{height} mm</div>
      </div>
      <p className="mt-3 text-xs leading-5 text-[#8C857B]">
        Accessibility note: written dimensions and active-view guidance are provided so students do not need to rely only on the visual preview.
      </p>
    </section>
  );
};

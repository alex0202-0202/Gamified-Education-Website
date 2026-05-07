import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Edges, OrbitControls, Text } from '@react-three/drei';
import { RotateCcw } from 'lucide-react';
import { getAssemblyTransform } from './assemblyTransforms';
import { getPanelColor, getShapeColor, mapShapeToPanelLocal, shapeLocalSize } from './boxGeometry3D';
import { getPanelThickness, getTabVisuals } from './panelMeshFactory';
import { scaleMm, type BoxAssemblyMode, type BoxDimensions3D, type BoxMakerPanel3D, type BoxMakerParameters3D, type BoxMakerShape3D, type BoxMakerShapeMap3D, type JointDisplayMode } from './boxProjectModel';

type Props = {
  dims: BoxDimensions3D;
  panels: BoxMakerPanel3D[];
  shapesByPanel: BoxMakerShapeMap3D;
  selectedPanelId?: string;
  hasTop: boolean;
  params: BoxMakerParameters3D;
};

type PanelMeshProps = {
  panel: BoxMakerPanel3D;
  dims: BoxDimensions3D;
  shapes: BoxMakerShape3D[];
  selectedPanelId?: string;
  params: BoxMakerParameters3D;
  mode: BoxAssemblyMode;
  jointDisplayMode: JointDisplayMode;
  explodedDistance: number;
};

const ShapeMarker = ({ shape, panel, z }: { shape: BoxMakerShape3D; panel: BoxMakerPanel3D; z: number }) => {
  const { x, y } = mapShapeToPanelLocal(shape, panel);
  const size = shapeLocalSize(shape);
  const color = getShapeColor(shape.operation);
  const opacity = shape.operation === 'cut' ? 0.82 : 0.95;

  if (shape.shapeType === 'circle') {
    return (
      <mesh position={[x, y, z + 0.003]}>
        <circleGeometry args={[size.radius, 36]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    );
  }

  if (shape.shapeType === 'line') {
    const length = Math.sqrt(size.width * size.width + size.height * size.height);
    const angle = Math.atan2(-size.height, size.width);
    return (
      <mesh position={[x + size.width / 2, y - size.height / 2, z + 0.003]} rotation={[0, 0, angle]}>
        <planeGeometry args={[Math.max(0.04, length), 0.012]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    );
  }

  if (shape.shapeType === 'text') {
    return (
      <Text position={[x, y, z + 0.004]} fontSize={Math.max(0.045, scaleMm(shape.height || 9))} color={color} anchorX="left" anchorY="middle">
        {shape.text || 'Text'}
      </Text>
    );
  }

  return (
    <mesh position={[x + size.width / 2, y - size.height / 2, z + 0.003]}>
      <planeGeometry args={[size.width, size.height]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
};

const PanelMesh = ({ panel, dims, shapes, selectedPanelId, params, mode, jointDisplayMode, explodedDistance }: PanelMeshProps) => {
  const transform = getAssemblyTransform(panel.id, panel.width, panel.height, dims, mode, explodedDistance);
  const thickness = getPanelThickness(params);
  const selected = selectedPanelId === panel.id;
  const opacity = jointDisplayMode === 'xray' ? 0.42 : 0.92;
  const panelColor = getPanelColor(panel.id, selectedPanelId);
  const tabVisuals = getTabVisuals(panel, params);
  const showJointColors = jointDisplayMode === 'highlightJoints' || selected;

  return (
    <group position={transform.position} rotation={transform.rotation}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[transform.localWidth, transform.localHeight, thickness]} />
        <meshStandardMaterial color={panelColor} transparent opacity={opacity} roughness={0.72} metalness={0.04} />
        <Edges color={selected ? '#D5896F' : '#4A4741'} threshold={15} />
      </mesh>

      {tabVisuals.map((tab) => (
        <mesh key={tab.key} position={tab.position}>
          <boxGeometry args={tab.size} />
          <meshStandardMaterial
            color={showJointColors ? (tab.isSlot ? '#3066BE' : '#D5896F') : '#D8CFC3'}
            transparent
            opacity={tab.isSlot && !showJointColors ? 0.32 : 0.86}
            roughness={0.8}
          />
        </mesh>
      ))}

      {shapes.map((shape) => (
        <ShapeMarker key={shape.id} shape={shape} panel={panel} z={thickness / 2} />
      ))}

      <Text position={[0, 0, thickness / 2 + 0.008]} fontSize={0.07} color="#4A4741" anchorX="center" anchorY="middle">
        {panel.label}
      </Text>
    </group>
  );
};

const Scene = ({
  dims,
  panels,
  shapesByPanel,
  selectedPanelId,
  hasTop,
  params,
  mode,
  jointDisplayMode,
  explodedDistance,
}: Props & { mode: BoxAssemblyMode; jointDisplayMode: JointDisplayMode; explodedDistance: number }) => {
  const centerY = scaleMm(dims.height) / 2;
  const visiblePanels = useMemo(() => {
    const allowed = new Set(['front', 'back', 'left', 'right', 'bottom']);
    if (hasTop) allowed.add('top');
    return panels.filter((panel) => allowed.has(panel.id) || panel.id.includes('divider') || panel.id.includes('lid') || panel.id.includes('rail'));
  }, [hasTop, panels]);

  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[3, 5, 4]} intensity={1.55} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} />
      <group position={[0, -centerY, 0]}>
        {visiblePanels.map((panel) => (
          <PanelMesh
            key={panel.id}
            panel={panel}
            dims={dims}
            shapes={shapesByPanel[panel.id] ?? []}
            selectedPanelId={selectedPanelId}
            params={params}
            mode={mode}
            jointDisplayMode={jointDisplayMode}
            explodedDistance={explodedDistance}
          />
        ))}
      </group>
      <gridHelper args={[6, 24, '#D8CFC3', '#EFEAE3']} position={[0, -centerY - 0.02, 0]} />
      <axesHelper args={[1.35]} position={[-2.5, -centerY, -1.8]} />
      <OrbitControls enableDamping enablePan enableZoom minDistance={1.1} maxDistance={7.5} target={[0, 0, 0]} />
    </>
  );
};

export const BoxAssembly3DView = ({ dims, panels, shapesByPanel, selectedPanelId, hasTop, params }: Props) => {
  const [mode, setMode] = useState<BoxAssemblyMode>('exploded');
  const [jointDisplayMode, setJointDisplayMode] = useState<JointDisplayMode>('highlightJoints');
  const [explodedDistance, setExplodedDistance] = useState(42);
  const [cameraKey, setCameraKey] = useState(0);

  return (
    <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">True 3D View</div>
          <h2 className="mt-1 text-lg font-bold text-[#2C2A26]">360 degree 榫接 assembly preview</h2>
          <p className="mt-2 text-sm leading-6 text-[#6B665E]">
            Mouse drag rotates the model, scroll zooms, and right-drag pans. The same panel and shape data used by the 2D SVG preview is shown here as a 3D assembly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCameraKey((value) => value + 1)}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#4A4741] hover:bg-white"
        >
          <RotateCcw className="h-4 w-4" /> Reset camera
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-1">
          {(['exploded', 'assembled', 'stepByStep'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-widest ${mode === item ? 'bg-white text-[#2C2A26] shadow-sm' : 'text-[#8C857B]'}`}
            >
              {item === 'stepByStep' ? 'step preview' : item}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-1">
          {(['normal', 'highlightJoints', 'xray'] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setJointDisplayMode(item)}
              className={`rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-widest ${jointDisplayMode === item ? 'bg-white text-[#2C2A26] shadow-sm' : 'text-[#8C857B]'}`}
            >
              {item === 'highlightJoints' ? 'joints' : item}
            </button>
          ))}
        </div>
        <label className="flex min-w-[260px] items-center gap-3 text-xs font-bold text-[#6B665E]">
          Explode distance
          <input
            type="range"
            min="0"
            max="90"
            value={explodedDistance}
            onChange={(event) => setExplodedDistance(Number(event.target.value))}
            className="flex-1"
          />
        </label>
      </div>

      <div className="mt-4 h-[460px] overflow-hidden rounded-xl border border-[#E5E0D8] bg-[#FDFCFB]">
        <Canvas key={cameraKey} camera={{ position: [2.6, 2.0, 3.1], fov: 44 }} shadows dpr={[1, 1.5]}>
          <Scene
            dims={dims}
            panels={panels}
            shapesByPanel={shapesByPanel}
            selectedPanelId={selectedPanelId}
            hasTop={hasTop}
            params={params}
            mode={mode === 'stepByStep' ? 'exploded' : mode}
            jointDisplayMode={jointDisplayMode}
            explodedDistance={mode === 'stepByStep' ? Math.max(18, explodedDistance * 0.55) : explodedDistance}
          />
        </Canvas>
      </div>

      <div className="mt-3 rounded-xl bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">
        Current MVP shows cut-outs as surface markings in 3D. SVG export remains the exact laser-cut source; true 3D boolean holes are planned for a later CSG pass.
      </div>
    </article>
  );
};

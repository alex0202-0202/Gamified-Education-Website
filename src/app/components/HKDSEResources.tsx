import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  FileText,
  Layers,
  Settings,
  Shield,
  PenTool,
  Cpu,
  Zap,
  Wrench,
  FolderOpen,
  ListChecks,
  Lightbulb,
  Globe,
  MonitorPlay,
  Hammer,
  CircuitBoard,
  Monitor,
  GraduationCap,
  Star,
  Package,
  BookMarked,
  X,
} from 'lucide-react';
import { XRayArchitect } from './modules/XRayArchitect';

const StudioSplit = ({
  left,
  right,
  accent,
  panelBg,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  accent: string;
  panelBg: string;
}) => (
  <div className="rounded-2xl border border-[#E5E0D8] overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[560px]">
      <aside className="lg:col-span-2 p-6 border-b lg:border-b-0 lg:border-r border-[#E5E0D8]" style={{ background: panelBg }}>
        <div className="w-10 h-1 rounded-full mb-4" style={{ background: accent }} />
        {left}
      </aside>
      <main className="lg:col-span-3 p-6 bg-white">
        {right}
      </main>
    </div>
  </div>
);

const AutomationLab = () => {
  const { t } = useLanguage();
  const [sensorPlaced, setSensorPlaced] = useState(false);
  const [logicCode, setLogicCode] = useState('If sensor == 1 then Extend Cylinder');
  const [isRunning, setIsRunning] = useState(false);
  const [isRejectDetected, setIsRejectDetected] = useState(false);

  const codeValid = logicCode.toLowerCase().includes('sensor == 1') && logicCode.toLowerCase().includes('extend cylinder');

  const start = () => {
    setIsRunning(true);
    const working = sensorPlaced && codeValid;
    setIsRejectDetected(working);
    setTimeout(() => setIsRunning(false), 2200);
  };

  return (
    <StudioSplit
      accent="#E67E22"
      panelBg="#F6F4EF"
      left={(
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#6B705C]">{t('模組一：自動化操作', 'Module 1: Automation')}</h3>
          <p className="text-sm text-[#6B665E] leading-relaxed">{t('核心概念是 Sense-Think-Act：傳感器讀取訊號，微控制器判斷邏輯，再由氣缸執行機械動作。', 'The core idea is Sense-Think-Act: sensors read signals, the controller decides the logic, and the cylinder carries out the motion.')}</p>
          <div className="space-y-2 text-sm text-[#4A4741]">
            <div className="font-bold text-xs uppercase tracking-wider text-[#8C857B]">{t('知識架構', 'Knowledge Architecture')}</div>
            <ul className="space-y-1">
              <li>• {t('氣動系統：單動 / 雙動氣缸', 'Pneumatic systems: single-acting / double-acting cylinders')}</li>
              <li>• {t('邏輯控制：AND / OR valves', 'Logic control: AND / OR valves')}</li>
              <li>• {t('微控制器：Arduino / Micro:bit I/O', 'Microcontrollers: Arduino / Micro:bit I/O')}</li>
              <li>• {t('傳感器：紅外線、超聲波', 'Sensors: infrared and ultrasonic')}</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-3">
            <div className="text-[11px] font-bold text-[#8C857B] mb-2">{t('任務步驟', 'Task Steps')}</div>
            <ol className="text-xs text-[#6B665E] space-y-1">
              <li>1. {t('先放置紅外線傳感器', 'Place the infrared sensor first')}</li>
              <li>2. {t('寫入控制邏輯', 'Enter the control logic')}</li>
              <li>3. {t('按 Start 觀察氣缸動作', 'Press Start to observe the cylinder action')}</li>
            </ol>
          </div>
        </div>
      )}
      right={(
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSensorPlaced(true)}
              className={`text-xs px-3 py-1.5 rounded-lg border ${sensorPlaced ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-[#2C2A26] border-[#E5E0D8]'}`}
            >
              {t('放置紅外線傳感器', 'Place Infrared Sensor')}
            </button>
            <button
              onClick={() => { setSensorPlaced(false); setIsRejectDetected(false); }}
              className="text-xs px-3 py-1.5 rounded-lg border bg-white text-[#6B665E] border-[#E5E0D8]"
            >
              {t('重設', 'Reset')}
            </button>
          </div>
          <textarea
            value={logicCode}
            onChange={(e) => setLogicCode(e.target.value)}
            className="w-full h-24 rounded-xl border border-[#E5E0D8] p-3 text-sm font-mono text-[#2C2A26]"
          />
          <button onClick={start} className="text-sm px-4 py-2 rounded-lg bg-[#E67E22] text-white font-bold hover:opacity-90">
            {t('啟動生產線', 'Start Production Line')}
          </button>

          <div className="relative rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] h-40 overflow-hidden">
            <div className="absolute left-0 right-0 top-1/2 h-2 bg-[#6B705C] -translate-y-1/2" />
            {sensorPlaced && <div className="absolute left-24 top-[44%] w-3 h-8 bg-[#1F2937] rounded" />}
            <motion.div
              animate={{ x: isRunning ? 360 : 0 }}
              transition={{ duration: 2, ease: 'linear' }}
              className="absolute left-4 top-[44%] w-8 h-8 rounded bg-[#8D99AE]"
            />
            <motion.div
              animate={{ x: isRunning && isRejectDetected ? 44 : 0 }}
              transition={{ duration: 0.35, delay: 0.9 }}
              className="absolute left-32 top-[40%] w-6 h-14 bg-[#E67E22] rounded"
            />
          </div>
          <div className={`text-xs font-medium ${sensorPlaced && codeValid ? 'text-emerald-700' : 'text-amber-700'}`}>
            {sensorPlaced && codeValid ? t('系統有效：次品會被氣缸推出。', 'System working: the defective item is pushed out by the cylinder.') : t('提示：請放置傳感器並使用 If sensor == 1 then Extend Cylinder', 'Hint: place the sensor and use If sensor == 1 then Extend Cylinder')}
          </div>
        </div>
      )}
    />
  );
};

const hexToRgb = (hex: string) => {
  const value = hex.replace('#', '');
  const n = parseInt(value, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const luminance = (r: number, g: number, b: number) => {
  const convert = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * convert(r) + 0.7152 * convert(g) + 0.0722 * convert(b);
};

const contrastRatio = (fg: string, bg: string) => {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const l1 = luminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const l2 = luminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const max = Math.max(l1, l2);
  const min = Math.min(l1, l2);
  return (max + 0.05) / (min + 0.05);
};

const CreativeMediaStudio = () => {
  const { t } = useLanguage();
  const [padding, setPadding] = useState(6);
  const [bgShade, setBgShade] = useState(72);
  const buttonColor = `hsl(170 60% ${bgShade}%)`;
  const ratio = contrastRatio('#FFFFFF', buttonColor);

  return (
    <StudioSplit
      accent="#2A9D8F"
      panelBg="#F9F8F6"
      left={(
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#2A9D8F]">{t('模組二：創意數碼媒體', 'Module 2: Creative Digital Media')}</h3>
          <p className="text-sm text-[#6B665E] leading-relaxed">{t('透過 UX Debugger 修復「壞掉」的介面，理解 CRAP 原則、色彩空間與可讀性。', 'Use the UX Debugger to fix a broken interface and learn the CRAP principles, colour spaces, and readability.')}</p>
          <div className="space-y-1 text-sm text-[#4A4741]">
            <div>• Bitmap vs Vector</div>
            <div>• RGB vs CMYK</div>
            <div>• {t('UI/UX：對比、重複、對齊、親密性', 'UI/UX: contrast, repetition, alignment, and proximity')}</div>
            <div>• {t('Keyframe 影格動畫概念', 'Keyframe animation basics')}</div>
          </div>
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-3 text-xs text-[#6B665E]">
            {t('任務：調整按鈕 padding 與背景顏色，讓對比度達到 WCAG AA（4.5:1 以上）。', 'Task: adjust the button padding and background colour so the contrast reaches WCAG AA (4.5:1 or above).')}
          </div>
        </div>
      )}
      right={(
        <div className="space-y-4">
          <div className="rounded-xl border border-[#E5E0D8] p-5 bg-[#F4FBFA]">
            <div className="w-[220px] mx-auto bg-white border border-[#E5E0D8] rounded-2xl p-4 space-y-3">
              <div className="h-2 w-16 rounded bg-[#E5E0D8]" />
              <div className="h-2 w-28 rounded bg-[#E5E0D8]" />
              <button
                style={{ backgroundColor: buttonColor, padding: `${padding}px 14px` }}
                className="rounded-lg text-white font-bold text-sm transition-all"
              >
                Confirm
              </button>
              <div className="text-[10px] text-[#8C857B]">{t('壞掉的介面目標：按鈕太小 + 對比不足', 'Broken UI target: button too small + weak contrast')}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="rounded-xl border border-[#E5E0D8] p-3 text-xs">
              {t('內邊距', 'Padding')}: {padding}px
              <input type="range" min={4} max={22} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full mt-2" />
            </label>
            <label className="rounded-xl border border-[#E5E0D8] p-3 text-xs">
              {t('背景亮度', 'Background Lightness')}: {bgShade}%
              <input type="range" min={25} max={82} value={bgShade} onChange={(e) => setBgShade(Number(e.target.value))} className="w-full mt-2" />
            </label>
          </div>
          <div className={`rounded-xl border p-3 text-sm font-bold ${ratio >= 4.5 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            {t('對比率', 'Contrast Ratio')}: {ratio.toFixed(2)} : 1 {ratio >= 4.5 ? t('✓ 合格', '✓ Pass') : t('✗ 需改善', '✗ Needs Improvement')}
          </div>
        </div>
      )}
    />
  );
};

const MaterialProcessingLab = () => {
  const { t } = useLanguage();
  const materials = {
    steel: { name: '鋼 Steel', yield: 260, ultimate: 420, color: '#8D99AE' },
    aluminium: { name: '鋁 Aluminium', yield: 140, ultimate: 250, color: '#A8B5C2' },
    carbon: { name: '碳纖維 Carbon Fiber', yield: 500, ultimate: 650, color: '#2C2A26' },
  } as const;
  type Mat = keyof typeof materials;
  const [selected, setSelected] = useState<Mat>('steel');
  const [load, setLoad] = useState(0);
  const mat = materials[selected];
  const failed = load >= mat.ultimate;

  const points = Array.from({ length: 9 }, (_, i) => {
    const x = i * 12;
    const stress = (load / 10) * (i + 1);
    const cap = stress > mat.ultimate ? mat.ultimate : stress;
    const y = 90 - (cap / 700) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <StudioSplit
      accent="#D5896F"
      panelBg="#FAF5F3"
      left={(
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#D5896F]">{t('模組三：設計實踐及材料處理', 'Module 3: Design Practice and Material Processing')}</h3>
          <p className="text-sm text-[#6B665E]">{t('比較鋼、鋁、碳纖維在不同載重下的應力反應，並觀察屈服與斷裂行為。', 'Compare how steel, aluminium, and carbon fibre respond under load and observe yielding and fracture.')}</p>
          <ul className="text-sm text-[#4A4741] space-y-1">
            <li>• {t('拉伸 / 壓縮測試', 'Tensile / Compression Testing')}</li>
            <li>• {t('應力 / 應變曲線', 'Stress / Strain Curves')}</li>
            <li>• {t('鑄造、模具、熱處理', 'Casting, moulds, and heat treatment')}</li>
            <li>• {t('QA/QC 品質保證流程', 'QA/QC procedures')}</li>
          </ul>
        </div>
      )}
      right={(
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(materials) as Mat[]).map((k) => (
              <button key={k} onClick={() => { setSelected(k); setLoad(0); }} className={`text-xs px-3 py-1.5 rounded-lg border ${selected === k ? 'bg-[#8D99AE] text-white border-[#8D99AE]' : 'bg-white text-[#2C2A26] border-[#E5E0D8]'}`}>
                {t(materials[k].name, materials[k].name.replace(/^.*?\s/, ''))}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setLoad((v) => Math.min(v + 40, 800))} className="text-sm px-4 py-2 rounded-lg bg-[#D5896F] text-white font-bold">{t('增加載重 +40 MPa', 'Increase Load +40 MPa')}</button>
            <button onClick={() => setLoad(0)} className="text-sm px-4 py-2 rounded-lg border border-[#E5E0D8]">{t('重設', 'Reset')}</button>
          </div>
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-4">
            <div className="text-xs text-[#8C857B] mb-2">{t('應力-應變曲線', 'Stress-Strain Curve')} (Simplified)</div>
            <svg viewBox="0 0 100 100" className="w-full h-40">
              <line x1="8" y1="90" x2="95" y2="90" stroke="#C0BAB2" strokeWidth="1" />
              <line x1="8" y1="10" x2="8" y2="90" stroke="#C0BAB2" strokeWidth="1" />
              <polyline points={points} fill="none" stroke={mat.color} strokeWidth="2" />
              <line x1="8" y1={90 - (mat.yield / 700) * 80} x2="95" y2={90 - (mat.yield / 700) * 80} stroke="#E67E22" strokeDasharray="2 2" />
            </svg>
            <div className="text-xs text-[#6B665E]">{t('當前載重', 'Current Load')}: <span className="font-bold">{load} MPa</span> | {t('屈服點', 'Yield Point')}: {mat.yield} MPa | {t('極限', 'Ultimate Strength')}: {mat.ultimate} MPa</div>
          </div>
          <div className={`rounded-xl border p-3 text-sm font-bold ${failed ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
            {failed ? t('材料超過屈服/極限，發生斷裂。', 'The material has exceeded its yield/limit and fractured.') : t('材料仍在可承受範圍內。', 'The material remains within its safe range.')}
          </div>
        </div>
      )}
    />
  );
};

const ElectronicsLab = () => {
  const { t } = useLanguage();
  const [selectedGate, setSelectedGate] = useState<'AND' | 'OR' | 'NAND' | null>(null);
  const [inputDark, setInputDark] = useState(true);
  const [inputSwitch, setInputSwitch] = useState(false);
  const [draggingGate, setDraggingGate] = useState<'AND' | 'OR' | 'NAND' | null>(null);

  const output = selectedGate === 'AND'
    ? inputDark && inputSwitch
    : selectedGate === 'OR'
      ? inputDark || inputSwitch
      : selectedGate === 'NAND'
        ? !(inputDark && inputSwitch)
        : false;

  const solved = selectedGate === 'AND' && output;

  return (
    <StudioSplit
      accent="#4361EE"
      panelBg="#EEF1FF"
      left={(
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#1B263B]">{t('模組四：電子學', 'Module 4: Electronics')}</h3>
          <p className="text-sm text-[#6B665E]">{t('任務條件：只有「光線暗」且「開關開啟」時，警報才會響。請選正確邏輯門。', 'Task condition: the alarm sounds only when it is dark and the switch is on. Choose the correct logic gate.')}</p>
          <ul className="text-sm text-[#4A4741] space-y-1">
            <li>• {t('OP-AMP 比較器（閾值判斷）', 'OP-AMP comparator (threshold judgement)')}</li>
            <li>• {t('邏輯門：AND / OR / NAND / NOR', 'Logic gates: AND / OR / NAND / NOR')}</li>
            <li>• {t('電路板與焊接安全流程', 'PCB and soldering safety procedures')}</li>
          </ul>
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-3 text-xs text-[#6B665E]">
            {t('提示：目標語句是 A 且 B，同時成立才輸出 1。', 'Hint: the target statement is A AND B, so output 1 only when both are true.')}
          </div>
        </div>
      )}
      right={(
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['AND', 'OR', 'NAND'] as const).map((gate) => (
              <div
                key={gate}
                draggable
                onDragStart={() => setDraggingGate(gate)}
                className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-xs font-bold cursor-grab"
              >
                {gate} Gate
              </div>
            ))}
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => setSelectedGate(draggingGate)}
            className="rounded-xl border-2 border-dashed border-[#4361EE]/30 bg-[#F8FAFF] p-4"
          >
            <div className="text-xs text-[#8C857B]">{t('把邏輯門放到這裡', 'Drop gate here')}:</div>
            <div className="text-lg font-bold text-[#1B263B] mt-1">{selectedGate ? `${selectedGate} ${t('已安裝', 'Installed')}` : t('空插槽', 'Empty Slot')}</div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setInputDark(v => !v)} className="text-xs px-3 py-1.5 rounded border border-[#E5E0D8] bg-white">{t('光線暗', 'Dark')} = {inputDark ? '1' : '0'}</button>
            <button onClick={() => setInputSwitch(v => !v)} className="text-xs px-3 py-1.5 rounded border border-[#E5E0D8] bg-white">{t('開關開啟', 'Switch On')} = {inputSwitch ? '1' : '0'}</button>
          </div>

          <div className="rounded-xl border border-[#E5E0D8] bg-white p-4 flex items-center justify-between">
            <div className="text-sm text-[#2C2A26]">{t('輸出 LED', 'Output LED')}</div>
            <div className={`w-5 h-5 rounded-full ${output ? 'bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.9)]' : 'bg-slate-300'}`} />
          </div>

          <div className={`rounded-xl border p-3 text-sm font-bold ${solved ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            {solved ? t('解密成功：AND gate 正確，條件同時成立時 LED 亮起。', 'Solved: the AND gate is correct and the LED lights when both conditions are true.') : t('尚未完成：請放置正確邏輯門並調整輸入條件。', 'Not complete yet: place the correct logic gate and adjust the input conditions.')}
          </div>
        </div>
      )}
    />
  );
};

const VisualisationCadLab = () => {
  const { t } = useLanguage();

  return (
    <StudioSplit
      accent="#E0C097"
      panelBg="#F8F4EC"
      left={(
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#3D405B]">{t('模組五：視覺化及電腦輔助設計', 'Module 5: Visualisation and CAD')}</h3>
          <p className="text-sm text-[#6B665E]">{t('核心重點：第一/第三角投影、30° 等角圖、剖面圖，以及 STL/G-code 到 CAM 的流程。', 'Core focus: first/third-angle projection, 30-degree isometric drawing, sectional views, and the STL/G-code to CAM workflow.')}</p>
          <ul className="text-sm text-[#4A4741] space-y-1">
            <li>• Orthographic: Front / Plan / Side</li>
            <li>• {t('等角圖：30° 軸測表達', 'Isometric: 30-degree axis representation')}</li>
            <li>• {t('剖面圖規則', 'Sectional view rules')}</li>
            <li>• STL → Slicer → G-code → CAM</li>
          </ul>
          <div className="rounded-xl border border-[#E5E0D8] bg-white p-3 text-xs text-[#6B665E]">
            {t('任務：在右側 Projection Master 中配對 3D 模型與 2D 投影視圖。', 'Task: match the 3D model with the correct 2D projection views in Projection Master.')}
          </div>
        </div>
      )}
      right={<XRayArchitect />}
    />
  );
};

// ─── Module metadata ────────────────────────────────────────────────────────
const moduleInfo: Record<string, { name: string; nameEn: string; icon: React.ElementType; color: string; desc: string }> = {
  K3: { name: '物料及資源', nameEn: 'Materials & Resources', icon: Layers, color: '#6B9080', desc: '認識常用物料（木材、金屬、塑膠、複合材料）的特性、測試方法及可持續應用。' },
  K4: { name: '結構和機械結構', nameEn: 'Structures & Mechanisms', icon: Settings, color: '#CCA068', desc: '了解結構原理、載荷、機械裝置（凸輪、齒輪、連桿）及運動傳動。' },
  K5: { name: '工具及儀器安全', nameEn: 'Tools, Instruments & Safety', icon: Shield, color: '#D5896F', desc: '安全使用手工具、量度工具及各類機器；認識工業安全守則。' },
  K6: { name: '製造過程與設計', nameEn: 'Manufacturing Process & Design', icon: PenTool, color: '#8A9A5B', desc: '設計流程（問題探索→構思→製作→評鑒）、草圖技巧、CAD 應用及產品標準。' },
  K8: { name: '系統概念', nameEn: 'Systems Concepts', icon: Cpu, color: '#7B8FA1', desc: '輸入—處理—輸出模型；開環與閉環控制系統的概念與應用。' },
  K9: { name: '系統應用', nameEn: 'Systems Applications', icon: Cpu, color: '#7B8FA1', desc: '機動式、電機式、電子式及氣動式控制系統的實際應用案例。' },
  E2: { name: '物料處理', nameEn: 'Material Processing', icon: Wrench, color: '#A0856C', desc: '切除、成形、接合及表面完成處理；選取適當製造工序的因素。' },
  E3: { name: '項目管理', nameEn: 'Project Management', icon: ListChecks, color: '#9B8EA0', desc: '計劃及組織工作步驟；甘特圖應用；項目內個體協作與分工。' },
  E6: { name: '系統整合', nameEn: 'Systems Integration', icon: Zap, color: '#6B9080', desc: '系統與子系統之間的聯繫；機電整合設計與實作。' },
  E7: { name: '控制與自動化', nameEn: 'Control & Automation', icon: Cpu, color: '#D5896F', desc: '自動化控制原理；微控制器應用；現代產品中的自動化技術。' },
};

// ─── Junior (S1–S3) curriculum map — full EDB Teacher Manual data ────────────
type ModuleRow = { code: string; elements: string[]; hours: number; breakdown: string[] };
type CurrSection = { title: string; modules: string[]; rows: ModuleRow[]; subtotal?: number; note?: string };
type GradeCurriculum = { grade: string; gradeSub: string; colorBar: string; tagColor: string; tagBg: string; total: number; note: string; sections: CurrSection[] };
type BilingualText = { zh: string; en: string };

const juniorCurriculum: GradeCurriculum[] = [
  {
    grade: '中一 (S1)',
    gradeSub: '教學計劃 · 全學年33週 · 每節40分鐘',
    colorBar: 'bg-[#D5896F]',
    tagColor: 'text-[#D5896F]',
    tagBg: 'bg-[#D5896F]/10',
    total: 66,
    note: '每週兩節可選組合甲＋乙（共66節）；每週一節可選組合甲或組合乙',
    sections: [
      {
        title: '核心部分 組合甲 (Core A)',
        modules: ['K6', 'K3', 'K5'],
        subtotal: 34,
        rows: [
          { code: 'K6 – S1a', elements: ['基本的設計理念', '草繪技巧'], hours: 6, breakdown: ['相關知識 1.5節', '課堂練習 0.5節', '專題活動 4節'] },
          { code: 'K3 – S1', elements: ['物料的基本認識', '物料的特性'], hours: 9, breakdown: ['相關知識 2節', '課堂練習 1節', '專題活動 6節'] },
          { code: 'K5 – S1a', elements: ['安全', '基本手工具', '基本量度工具'], hours: 4, breakdown: ['相關知識 3節', '課堂練習 1節'] },
          { code: 'K6 – S1b', elements: ['進行設計', '使用不同的物料', '人的因素'], hours: 15, breakdown: ['相關知識 3節', '課堂活動 1節', '專題活動 8節', '個案研究 3節'] },
        ],
      },
      {
        title: '核心部分 組合乙 (Core B)',
        modules: ['K4', 'K8', 'K9', 'K5', 'K6'],
        subtotal: 32,
        rows: [
          { code: 'K4 – S1', elements: ['結構和機械結構的基本概念'], hours: 8, breakdown: ['相關知識 3節', '課堂活動 0.5節', '課堂練習 0.5節', '專題活動 4節'] },
          { code: 'K8 – S1', elements: ['系統的基本概念'], hours: 2, breakdown: ['相關知識 1.5節', '課堂活動 0.5節'] },
          { code: 'K9 – S1', elements: ['系統應用的基本概念'], hours: 5, breakdown: ['專題活動 3節（與K8共用教材六）'] },
          { code: 'K5 – S1b', elements: ['安全', '基本手工具', '基本量度工具'], hours: 4, breakdown: ['相關知識 2節', '課堂練習 2節'] },
          { code: 'K6 – S1c', elements: ['進行設計', '包括結構和機械結構的製作'], hours: 15, breakdown: ['相關知識 4節', '課堂活動 2節', '專題活動 9節'] },
        ],
      },
      {
        title: '延伸部分',
        modules: ['E2', 'E6'],
        note: '延伸部分另加25節（核心共66節）',
        rows: [
          { code: 'E2 – S1', elements: ['切除、成形、接合及完成處理'], hours: 11, breakdown: ['相關知識 3節', '課堂活動 1節', '個案研究 3節', '專題活動 4節'] },
          { code: 'E6 – S1', elements: ['系統與系統及子系統之間的聯繫'], hours: 12, breakdown: ['相關知識 6節', '課堂練習 2節', '專題活動 6節'] },
        ],
      },
    ],
  },
  {
    grade: '中二 (S2)',
    gradeSub: '教學計劃 · 全學年33週 · 每節40分鐘',
    colorBar: 'bg-[#6B9080]',
    tagColor: 'text-[#6B9080]',
    tagBg: 'bg-[#6B9080]/10',
    total: 66,
    note: '每週兩節可選組合甲＋乙（共66節）；延伸部分另加32節（共98節）',
    sections: [
      {
        title: '核心部分 組合甲 (Core A)',
        modules: ['K3', 'K5', 'K6'],
        subtotal: 34,
        rows: [
          { code: 'K3 – 中二', elements: ['物料的特性及測試'], hours: 5, breakdown: ['相關知識 1節', '課堂活動 2節', '個案研究 2節'] },
          { code: 'K5 – 中二', elements: ['安全使用工具及儀器', '選取及運用合適工具、儀器和機器以實踐設計概念'], hours: 7, breakdown: ['相關知識 2節', '專題活動 5節'] },
          { code: 'K6 – 中二甲', elements: ['基本設計元素', '設計過程', '設計上的考慮'], hours: 22, breakdown: ['相關知識 4節', '課堂練習 3節', '專題練習 7節', '專題活動 8節'] },
        ],
      },
      {
        title: '核心部分 組合乙 (Core B)',
        modules: ['K4', 'K8', 'K9', 'K6'],
        subtotal: 32,
        rows: [
          { code: 'K4 – 中二', elements: ['結構及運動的簡單特性', '按不同需求而設計的結構', '應用機械結構裝置傳動及控制運動', '生活模式的改變'], hours: 15, breakdown: ['相關知識 1節', '課堂活動 2節', '專題活動 12節'] },
          { code: 'K8 – 中二', elements: ['開環式及閉環式控制系統'], hours: 1, breakdown: ['相關知識 2節', '課堂練習 1節'] },
          { code: 'K9 – 中二', elements: ['機動式、電機式、電子式及氣動式控制系統', '控制系統模式'], hours: 8, breakdown: ['專題活動 6節（與K8共用教材四）'] },
          { code: 'K6 – 中二乙', elements: ['設計過程', '選取合適製造過程所涉及的因素及限制'], hours: 8, breakdown: ['相關知識 2節', '課堂活動 1節', '個案研究 5節'] },
        ],
      },
      {
        title: '延伸部分 組合甲 — 物料及製造',
        modules: ['E2', 'E3', 'E6'],
        subtotal: 32,
        rows: [
          { code: 'E2 – 中二', elements: ['切除、成形、接合及完成處理', '選擇及使用合適的物料處理過程'], hours: 8, breakdown: ['相關知識 2節', '課堂練習 1節', '專題活動 5節'] },
          { code: 'E3 – 中二', elements: ['計畫及組織工作的步驟或程式'], hours: 6, breakdown: ['相關知識 2節', '課堂活動 1節', '個案研究 3節'] },
          { code: 'E6 – 中二', elements: ['系統與系統及子系統之間的聯繫'], hours: 18, breakdown: ['相關知識 2節', '課堂活動 2節', '專題活動 14節'] },
        ],
      },
      {
        title: '延伸部分 組合乙 — 結構及系統',
        modules: ['E7'],
        subtotal: 32,
        note: '可選延伸組合甲或組合乙，二者不並行',
        rows: [
          { code: 'E7 – 中二', elements: ['自動化控制'], hours: 32, breakdown: ['相關知識 8節', '課堂練習 24節'] },
        ],
      },
    ],
  },
  {
    grade: '中三 (S3)',
    gradeSub: '教學計劃 · 全學年33週 · 每節40分鐘',
    colorBar: 'bg-[#CCA068]',
    tagColor: 'text-[#CCA068]',
    tagBg: 'bg-[#CCA068]/10',
    total: 80,
    note: '組合甲 34節 ＋ 組合乙 46節 = 共80節',
    sections: [
      {
        title: '核心部分 組合甲 (Core A)',
        modules: ['K3', 'K4', 'K5', 'K6'],
        subtotal: 34,
        rows: [
          { code: 'K3 – 中三', elements: ['應用各種常見的物料', '資源再用、回收及可持續發展'], hours: 3, breakdown: ['相關知識 1節', '課堂練習 2節', '個案研究（課後進行）'] },
          { code: 'K4 – 中三', elements: ['結構及運動的簡單特性', '應用機械結構裝置傳動及控制運動'], hours: 5, breakdown: ['相關知識 2節', '課堂練習 1節', '專題活動 2節'] },
          { code: 'K5 – 中三', elements: ['安全使用工具及儀器', '應用一系列的機器以實施設計問題的方案'], hours: 8, breakdown: ['相關知識 2節', '專題活動 6節'] },
          { code: 'K6 – 中三甲', elements: ['電腦輔助設計', 'CAD立體模型', '應加強設計效果', '設計批判及評鑒'], hours: 18, breakdown: ['相關知識 5節', '課堂練習 1節', 'CAD練習 12節'] },
        ],
      },
      {
        title: '核心及延伸部分 組合乙 (Core + Extension B)',
        modules: ['E2', 'K6', 'E3'],
        subtotal: 46,
        note: '教材四乙及五的專題活動為「健身公園」，建議先教E3再教K6-中三乙',
        rows: [
          { code: 'E2 – 中三', elements: ['物料接合', '製造過程的設備', '物料表面處理'], hours: 13, breakdown: ['相關知識 4節', '課堂活動 2節', '個案研究 7節'] },
          { code: 'K6 – 中三乙', elements: ['產品標準', '設計評鑒', '知識產權', '設計師和工程師在工作中的角色', '設計的演示', '應用於不同領域的製造過程'], hours: 25, breakdown: ['相關知識 3節', '課堂練習 5節', '專題活動 12節', '個案研究 5節'] },
          { code: 'E3 – 中三', elements: ['項目里的個體協作'], hours: 8, breakdown: ['相關知識 3節', '專題活動 5節'] },
        ],
      },
      {
        title: '增潤延伸 核心部分 (組合甲) — 系統',
        modules: ['K8', 'K9'],
        subtotal: 7,
        note: '以教材六教授；K9 另設專題活動12節及個案研究5節（延伸）',
        rows: [
          { code: 'K8 – 中三', elements: ['系統組件', '簡單系統設計的例子和子系統的分析'], hours: 1, breakdown: ['相關知識 1節'] },
          { code: 'K9 – 中三', elements: ['機動式、電機式、電子式及氣動式系統應用', '控制系統模式、建構模型的工具包及模擬科技的解決方案'], hours: 6, breakdown: ['相關知識 1節', '課堂練習 5節', '(延伸) 專題活動 12節', '(延伸) 個案研究 5節'] },
        ],
      },
      {
        title: '增潤延伸 核心及延伸部分 (組合乙) — 系統整合及控制',
        modules: ['E6', 'E7'],
        note: 'E7 分四個教材單元（八至十一），每單元獨立施教',
        rows: [
          { code: 'E6 – 中三', elements: ['將互相有關聯的系統組合（應用軟體、結構和/或機械），以創建一個新的系統，並可以與其他系統連接'], hours: 30, breakdown: ['個案研究 6節', '專題活動 24節'] },
          { code: 'E7 – 中三 (教材八)', elements: ['電腦輔助製造(CAM)及彈性製造系統(FMS)基本認知'], hours: 25, breakdown: ['相關知識 2節', '課堂活動 2節'] },
          { code: 'E7 – 中三 (教材九)', elements: ['3D立體列印基本概念'], hours: 12, breakdown: ['相關知識 3節', '專題活動 9節'] },
          { code: 'E7 – 中三 (教材十)', elements: ['電腦控制基本概念（以Arduino或其他進行簡單實驗）'], hours: 8, breakdown: ['相關知識 3節', '課堂活動 5節'] },
          { code: 'E7 – 中三 (教材十一)', elements: ['機器人及機器人控制基本概念'], hours: 12, breakdown: ['相關知識 3節', '課堂活動 9節'] },
        ],
      },
    ],
  },
];

const s1KnowledgeHighlights: Array<{
  title: BilingualText;
  subtitle: BilingualText;
  modules: string[];
  color: string;
  bullets: BilingualText[];
}> = [
  {
    title: { zh: '核心組合甲', en: 'Core Pathway A' },
    subtitle: { zh: 'K6 + K3 + K5', en: 'K6 + K3 + K5' },
    modules: ['K6', 'K3', 'K5'],
    color: '#D5896F',
    bullets: [
      { zh: '建立基本設計概念，學習草圖表達與初步設計溝通。', en: 'Build basic design concepts and practise sketching for early design communication.' },
      { zh: '認識常見物料及其基本特性，例如強度、質感與加工方式。', en: 'Recognise common materials and their basic properties such as strength, texture, and processing methods.' },
      { zh: '掌握工場安全、基本手工具與量度工具的正確使用方法。', en: 'Master workshop safety and the correct use of basic hand tools and measuring instruments.' },
    ],
  },
  {
    title: { zh: '核心組合乙', en: 'Core Pathway B' },
    subtitle: { zh: 'K4 + K8 + K9 + K5 + K6', en: 'K4 + K8 + K9 + K5 + K6' },
    modules: ['K4', 'K8', 'K9', 'K5', 'K6'],
    color: '#6B9080',
    bullets: [
      { zh: '理解結構與機械結構的基本概念，認識簡單運動與傳動。', en: 'Understand basic ideas of structures and mechanisms, including simple motion and power transmission.' },
      { zh: '學習系統概念，包括輸入、處理、輸出與基礎系統應用。', en: 'Learn system concepts, including input, process, output, and basic system applications.' },
      { zh: '把安全與設計實踐結合，從製作中理解結構、系統與設計流程。', en: 'Connect safety with design practice, using making tasks to understand structures, systems, and the design process.' },
    ],
  },
  {
    title: { zh: '延伸學習重點', en: 'Extension Focus' },
    subtitle: { zh: 'E2 + E6', en: 'E2 + E6' },
    modules: ['E2', 'E6'],
    color: '#CCA068',
    bullets: [
      { zh: '物料處理涵蓋切除、成形、接合與完成處理，建立製作基礎。', en: 'Material processing covers cutting, forming, joining, and finishing to build core making skills.' },
      { zh: '系統整合強調系統與子系統之間的關係，為之後自動化學習打基礎。', en: 'System integration emphasises the relationship between systems and subsystems, preparing students for later automation work.' },
      { zh: '延伸部分適合把核心知識轉化為更完整的專題活動。', en: 'The extension is suitable for turning core knowledge into more complete project work.' },
    ],
  },
  {
    title: { zh: '中一關鍵能力', en: 'S1 Key Competencies' },
    subtitle: { zh: '學習成果重點', en: 'Expected Learning Outcomes' },
    modules: ['Design', 'Safety', 'Materials', 'Systems'],
    color: '#4A4741',
    bullets: [
      { zh: '能用簡單草圖、標註與口頭說明表達設計意念。', en: 'Communicate design ideas with simple sketches, labels, and verbal explanations.' },
      { zh: '能按安全守則選擇合適工具與物料完成基本製作。', en: 'Select suitable tools and materials safely to complete basic making tasks.' },
      { zh: '能初步比較不同結構、物料與系統方案的優點與限制。', en: 'Begin comparing the advantages and limits of different structures, materials, and system solutions.' },
    ],
  },
];

const s3AddOnKnowledgeHighlights: Array<{
  title: BilingualText;
  subtitle: BilingualText;
  modules: string[];
  color: string;
  bullets: BilingualText[];
  targetSection?: string;
}> = [
  {
    title: { zh: '增潤延伸一：系統基礎深化', en: 'Add-on 1: Deeper Systems Foundations' },
    subtitle: { zh: 'K8 + K9', en: 'K8 + K9' },
    modules: ['K8', 'K9'],
    color: '#6B9080',
    targetSection: '增潤延伸 核心部分 (組合甲) — 系統',
    bullets: [
      { zh: '理解系統組件與子系統分析，能從整體與局部兩個層面看科技方案。', en: 'Understand system components and subsystem analysis so technological solutions can be viewed at both whole-system and part-system levels.' },
      { zh: '學習機動式、電機式、電子式及氣動式系統應用，建立跨系統比較能力。', en: 'Study mechanical, electrical, electronic, and pneumatic system applications to build cross-system comparison skills.' },
      { zh: '開始接觸模型建構與模擬科技方案，為高中 DAT 的控制與自動化內容鋪路。', en: 'Begin working with model building and simulated technological solutions, preparing for senior DAT topics in control and automation.' },
    ],
  },
  {
    title: { zh: '增潤延伸二：系統整合', en: 'Add-on 2: Systems Integration' },
    subtitle: { zh: 'E6', en: 'E6' },
    modules: ['E6'],
    color: '#CCA068',
    targetSection: '增潤延伸 核心及延伸部分 (組合乙) — 系統整合及控制',
    bullets: [
      { zh: '學習把軟體、結構與機械元素整合成一個新的系統。', en: 'Learn how to combine software, structural, and mechanical elements into a new integrated system.' },
      { zh: '重點不只是單一元件，而是元件之間如何互相配合與連接。', en: 'The focus is not only on individual components, but on how components connect and work together.' },
      { zh: '這部分直接培養高中 DAT 專題所需的系統思維。', en: 'This directly develops the systems thinking needed for senior DAT projects.' },
    ],
  },
  {
    title: { zh: '增潤延伸三：控制與自動化', en: 'Add-on 3: Control and Automation' },
    subtitle: { zh: 'E7（教材八至十一）', en: 'E7 (Teaching Units 8 to 11)' },
    modules: ['E7'],
    color: '#D5896F',
    targetSection: '增潤延伸 核心及延伸部分 (組合乙) — 系統整合及控制',
    bullets: [
      { zh: '內容涵蓋 CAM、彈性製造系統、3D 列印、電腦控制與機器人及機器人控制。', en: 'Topics include CAM, flexible manufacturing systems, 3D printing, computer control, robotics, and robot control.' },
      { zh: '學生會從數碼製造與自動化角度理解現代科技產品與生產方式。', en: 'Students understand modern products and production methods through the lens of digital manufacturing and automation.' },
      { zh: '這是中三最接近高中 DAT 選修內容的橋樑部分。', en: 'This is the part of S3 that most directly bridges into senior DAT elective content.' },
    ],
  },
  {
    title: { zh: '中三增潤延伸關鍵能力', en: 'S3 Add-on Key Competencies' },
    subtitle: { zh: '銜接高中 DAT', en: 'Transition to Senior DAT' },
    modules: ['Integration', 'Automation', 'CAD', 'Systems'],
    color: '#4A4741',
    targetSection: '增潤延伸 核心及延伸部分 (組合乙) — 系統整合及控制',
    bullets: [
      { zh: '能從系統整合角度分析設計，而不只看單一零件或單一步驟。', en: 'Analyse designs from a systems-integration perspective instead of focusing only on single parts or steps.' },
      { zh: '能初步理解數碼製造、自動化控制與產品系統應用的基本流程。', en: 'Gain an initial understanding of the basic processes behind digital manufacturing, automation control, and product-system applications.' },
      { zh: '能把初中所學的物料、結構、設計與系統知識整合為更成熟的科技方案。', en: 'Integrate lower-secondary knowledge of materials, structures, design, and systems into more mature technological solutions.' },
    ],
  },
];

// ─── S1–S3 Case Studies ───────────────────────────────────────────────────
const juniorCaseStudies = [
  { id: 'cs1', num: '個案一', title: '人體工程學的設計過程', en: 'Ergonomic Design Process', tags: ['K6', '設計思維'], modules: ['K3', 'K6'], icon: '🧑‍🔬' },
  { id: 'cs2', num: '個案二', title: '數碼音樂的發展和影響', en: 'Development & Impact of Digital Music', tags: ['K9', '創新'], modules: ['K8', 'K9'], icon: '🎵' },
  { id: 'cs3', num: '個案三', title: '成功的創新——智能電話', en: 'Successful Innovation: Smartphones', tags: ['K6', 'E6', '商業'], modules: ['K6', 'E6'], icon: '📱' },
  { id: 'cs4', num: '個案四', title: '三綠——綠色設計、綠色科技和綠色企業', en: '3 Greens: Green Design, Green Tech, Green Business', tags: ['K3', '可持續'], modules: ['K3', 'E6'], icon: '🌿' },
];

// ─── Shared (S1–S6) Teaching Resources ────────────────────────────────────
const sharedResources = [
  { title: '原型製作於產品設計過程中的應用', sub: '學習資源', icon: Package, tag: 'S1–S6' },
  { title: '原型製作於產品設計過程中的應用', sub: '教學簡報', icon: FileText, tag: 'S1–S6' },
  { title: '原型製作於產品設計過程中的應用', sub: '手提吸塵機原型製作影片', icon: MonitorPlay, tag: '影片' },
  { title: '運用徒手草圖作為視覺思維及傳意工具', sub: '學習資源', icon: PenTool, tag: 'S1–S6' },
  { title: '機械及機械元件', sub: '學習資源', icon: Settings, tag: 'S1–S6' },
  { title: '機械及機械元件', sub: '拍翼小鳥自動機製作影片', icon: MonitorPlay, tag: '影片' },
];

// ─── S4–S6 DAT modules ─────────────────────────────────────────────────────
const seniorCompulsory = [
  {
    num: '學習範疇一',
    title: '設計與創新',
    en: 'Design & Innovation',
    icon: Lightbulb,
    color: '#D5896F',
    points: ['設計過程：探索問題 → 製作原型 → 測試與評鑒', '企業精神、專利與版權、市場推廣', '腦力激盪、仿生學、設計思維 (Design Thinking)', 'SBA 設計作業與 Design Folio'],
    resources: ['學與教資源', '簡易版', '評估練習'],
    tags: ['[理論]', '[實作]', '[DSE 必考]'],
  },
  {
    num: '學習範疇二',
    title: '科技原理',
    en: 'Technological Principles',
    icon: Settings,
    color: '#6B9080',
    points: ['材料及標準元件（木材、金屬、塑膠、複合材料屬性）', '機械系統與控制（齒輪 / 凸輪 / 連桿 / 帶傳動）', '生產及製造程序（加工、成形、接合、表面處理）', '電子基礎（輸入—處理—輸出、邏輯門）'],
    resources: ['學與教資源', '簡易版', '評估練習'],
    tags: ['[理論]', '[實作]', '[DSE 必考]'],
  },
  {
    num: '學習範疇三',
    title: '價值與影響',
    en: 'Value & Impact',
    icon: Globe,
    color: '#8A9A5B',
    points: ['科技對社會及生活模式的影響', '可持續發展：5R 概念、環保設計、產品生命週期 (LCA)', '職業與道德：工業安全 (OSH)、設計師倫理', '知識產權 (IP)：著作權、商標、專利'],
    resources: ['學與教資源', '簡易版', '評估練習'],
    tags: ['[理論]', '[DSE 必考]'],
  },
];

const seniorElectives = [
  {
    topic: 'automation',
    num: '模組一',
    title: '自動化操作',
    en: 'Automation',
    icon: Cpu,
    color: '#7B8FA1',
    points: ['氣動系統 (Pneumatics) 原理與迴路設計', '微控制器 (Microcontrollers)：Arduino / Micro:bit 編程', '傳感器 (Sensors)：LDR、溫敏電阻、超聲波', '自動化生產線設計原理'],
    tags: ['[理論]', '[實作]', '[編程]'],
  },
  {
    topic: 'creative_digital_media',
    num: '模組二',
    title: '創意數碼媒體',
    en: 'Creative Digital Media',
    icon: MonitorPlay,
    color: '#CCA068',
    points: ['2D/3D 圖像處理：Photoshop / Illustrator 基礎', '動畫製作與聲音影像編輯技術', 'UI/UX 互動介面設計原則', '數碼產品的用戶體驗 (UX) 研究'],
    tags: ['[實作]', '[電腦軟件]'],
  },
  {
    topic: 'design_material_processing',
    num: '模組三',
    title: '設計實踐及材料處理',
    en: 'Design & Material Processing',
    icon: Hammer,
    color: '#A0856C',
    points: ['深入材料測試：拉伸、壓縮、抗剪強度試驗', '進階生產技術：鑄造、模具設計、熱處理', '大量生產 (Mass Production) 與質量保證 (QA/QC)', '工業安全標準與生產成本分析'],
    tags: ['[實作]', '[進階]'],
  },
  {
    topic: 'electronics',
    num: '模組四',
    title: '電子學',
    en: 'Electronics',
    icon: CircuitBoard,
    color: '#9B8EA0',
    points: ['邏輯門電路：AND、OR、NOT、NAND、NOR', '運算放大器 (OP-AMP) 的應用', '電路板 (PCB) 設計與焊接技術', '電子測試儀器使用：示波器、萬用錶'],
    tags: ['[理論]', '[實作]'],
  },
  {
    topic: 'visualisation_cad',
    num: '模組五',
    title: '視覺化及電腦輔助設計',
    en: 'Visualisation and CAD',
    icon: Monitor,
    color: '#6B9080',
    points: ['正投影圖 (Orthographic Projection)、等角圖 (Isometric Drawing)', '剖面圖 (Sectional View)、展開圖', '3D 建模軟件：SolidWorks / Fusion 360 / TinkerCAD', '電腦輔助製造 (CAM) 與快速原型製作 (RP)'],
    tags: ['[實作]', '[電腦軟件]'],
  },
];

// ─── S4–S6 Thematic Resources ────────────────────────────────────────────
const thematicResources = [
  { num: '主題一', title: '桌上遊戲‧寓教於樂', icon: '♟️', related: ['學習範疇一', '選修單元二'] },
  { num: '主題二', title: '高鐵之旅', icon: '🚄', related: ['學習範疇二', '選修單元三'] },
  { num: '主題三', title: '優質生活模式', icon: '🏡', related: ['學習範疇一', '學習範疇三'] },
  { num: '主題四', title: '自動化遊戲設計', icon: '🤖', related: ['選修單元一', '選修單元四'] },
  { num: '主題五', title: '第三類接觸', icon: '🛸', related: ['學習範疇二', '選修單元一'] },
  { num: '主題六', title: '綠色設計技術', icon: '🌱', related: ['學習範疇三', '選修單元三'] },
  { num: '主題七', title: '自由飛鳥', icon: '🐦', related: ['學習範疇二', '選修單元五'] },
  { num: '主題八', title: '夢想家居', icon: '🏠', related: ['學習範疇一', '選修單元五'] },
  { num: '主題九', title: '可持續建築', icon: '🏗️', related: ['學習範疇三', '選修單元三'] },
  { num: '主題十', title: '中國太空探索計劃', icon: '🚀', related: ['學習範疇二', '選修單元一'] },
];

// ─── S4–S6 Case Studies ──────────────────────────────────────────────────
const seniorCaseStudies = [
  { id: 'scs1', num: '個案一', title: '零售商店設計', en: 'Retail Store Design', icon: '🏪', related: '學習範疇一：設計與創新' },
  { id: 'scs2', num: '個案二', title: '企業的轉型——從 OEM 到 ODM', en: 'OEM to ODM Transition', icon: '🏭', related: '學習範疇一 + 學習範疇三' },
  { id: 'scs3', num: '個案三', title: '智能保安系統的應用', en: 'Smart Security Systems', icon: '🔒', related: '選修單元一：自動化操作' },
  { id: 'scs4', num: '個案四', title: '數碼視頻的發展', en: 'Development of Digital Video', icon: '🎬', related: '選修單元二：創意數碼媒體' },
  { id: 'scs5', num: '個案五', title: '遊戲機背後的科技', en: 'Technology Behind Game Consoles', icon: '🎮', related: '學習範疇二：科技原理' },
  { id: 'scs6', num: '個案六', title: '環保科技：氫氣驅動汽車', en: 'Green Tech: Hydrogen-powered Vehicles', icon: '🚘', related: '學習範疇三：價值與影響' },
];

// ─── Component ───────────────────────────────────────────────────────────

type Tab = 'junior' | 'senior' | 'resources';

type HKDSEResourcesProps = {
  activeTopic?: string;
  onNavigate?: (screen: string, topic?: string) => void;
};

// Metadata for each elective game panel (no JSX, components rendered inline)
const ELECTIVE_GAMES: { label: string; sublabel: string }[] = [
  { label: '虛擬自動化工廠', sublabel: 'Production Line Sim' },
  { label: 'UI 佈局調試器', sublabel: 'UX Debugger' },
  { label: '材料壓力測試儀', sublabel: 'The Stress Lab' },
  { label: '邏輯門解密任務', sublabel: 'Logic Gate Puzzle' },
  { label: '3D 轉 2D 投影挑戰', sublabel: 'Projection Master' },
];

export const HKDSEResources = ({ activeTopic, onNavigate }: HKDSEResourcesProps = {}) => {
  const { t, tr, isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('junior');
  const [expandedGrade, setExpandedGrade] = useState<string | null>('中一 (S1)');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeElective, setActiveElective] = useState<number | null>(null);

  const getSectionAnchorId = (grade: string, section: string) =>
    `section-${grade}-${section}`.replace(/[^a-zA-Z0-9\u4e00-\u9fff-]+/g, '-');

  const jumpToJuniorSection = (gradeKey: string, sectionTitle?: string) => {
    setActiveTab('junior');
    setExpandedGrade(gradeKey);

    if (!sectionTitle) {
      setTimeout(() => {
        const gradeEl = document.getElementById(`grade-${gradeKey}`);
        gradeEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
      return;
    }

    const sectionKey = `${gradeKey}-${sectionTitle}`;
    setExpandedSection(sectionKey);

    setTimeout(() => {
      const sectionEl = document.getElementById(getSectionAnchorId(gradeKey, sectionTitle));
      sectionEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  // When activeTopic changes (e.g. "中一 (S1)|K3"), auto-expand the right grade + section
  useEffect(() => {
    if (!activeTopic) return;
    const sep = activeTopic.indexOf('|');
    const gradeKey = sep > -1 ? activeTopic.slice(0, sep) : activeTopic;
    const moduleCode = sep > -1 ? activeTopic.slice(sep + 1) : '';

    setActiveTab('junior');
    setExpandedGrade(gradeKey);

    if (moduleCode) {
      const grade = juniorCurriculum.find(g => g.grade === gradeKey);
      if (grade) {
        const section = grade.sections.find(s => s.modules.includes(moduleCode));
        if (section) {
          const sectionKey = `${gradeKey}-${section.title}`;
          setExpandedSection(sectionKey);
          // Scroll to grade container after animation
          setTimeout(() => {
            const el = document.getElementById(`grade-${gradeKey}`);
            el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 350);
        }
      }
    }
  }, [activeTopic]);

  const tabs: { id: Tab; label: string; labelSub: string }[] = [
    { id: 'junior', label: t('中一至中三', 'S1 to S3'), labelSub: t('設計與科技 (D&T)', 'Design and Technology (D&T)') },
    { id: 'senior', label: t('中四至中六', 'S4 to S6'), labelSub: t('設計與應用科技 (DAT)', 'Design and Applied Technology (DAT)') },
    { id: 'resources', label: t('共用教學資源', 'Shared Resources'), labelSub: t('S1–S6 共用', 'Shared Across S1–S6') },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-[#F2EFE9] rounded-xl">
            <GraduationCap className="w-7 h-7 text-[#D5896F]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-1">
              {t('教育局 · 香港中學課程', 'EDB · Hong Kong Secondary Curriculum')}
            </div>
            <h1 className="text-3xl font-bold text-[#2C2A26] tracking-tight mb-2">
              {t('HKDSE 設計與科技 / 設計與應用科技', 'HKDSE Design & Technology / Design and Applied Technology')}
            </h1>
            <p className="text-[#6B665E] max-w-3xl text-sm leading-relaxed">
              {t('根據教育局課程指引整理的中一至中六 D&T / DAT 課程地圖，涵蓋各年級核心模組、個案研究及官方學與教資源連結。', 'An S1–S6 D&T / DAT curriculum map based on EDB guidance, covering core modules, case studies, and official learning resource links for each level.')}
              <span className="ml-1 font-medium text-[#8A9A5B]">{t('此頁專為 HKDSE 學生設計，與 IB Design Technology 課程分開管理。', 'This page is dedicated to HKDSE students and is managed separately from IB Design Technology content.')}</span>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mt-6 border-b border-[#E5E0D8] pb-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-bold rounded-t-lg border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? 'text-[#D5896F] border-[#D5896F] bg-[#FDF9F7]'
                  : 'text-[#8C857B] border-transparent hover:text-[#2C2A26]'
              }`}
            >
              <div>{tab.label}</div>
              <div className="text-[10px] font-normal opacity-70">{tab.labelSub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── JUNIOR TAB ─────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {activeTab === 'junior' && (
          <motion.div key="junior" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            {/* Quick Module Reference */}
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#2C2A26] mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-[#6B9080]" /> {t('模組說明', 'Module Reference')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(moduleInfo).map(([code, mod]) => (
                  <div key={code} className="bg-[#F9F8F6] rounded-xl p-3 border border-[#E5E0D8] hover:border-[#D5896F] transition-colors group">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <mod.icon className="w-4 h-4 flex-shrink-0" style={{ color: mod.color }} />
                      <span className="font-black text-xs" style={{ color: mod.color }}>{code}</span>
                    </div>
                    <div className="font-bold text-[#2C2A26] text-xs leading-tight mb-0.5">{isEnglish ? mod.nameEn : mod.name}</div>
                    <div className="text-[10px] text-[#8C857B] leading-tight line-clamp-2">{tr(mod.desc)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="text-lg font-bold text-[#2C2A26] flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#D5896F]" /> {t('中一 HKDSE 重點知識整理', 'S1 HKDSE Key Knowledge Map')}
                  </h2>
                  <p className="text-sm text-[#8C857B] mt-1 max-w-3xl">
                    {t('把中一課程的核心知識、延伸方向與學習成果整理成清晰重點，先掌握整體脈絡，再進入下方詳細課程表。', 'This section organises the S1 core knowledge, extension direction, and expected outcomes so students can grasp the big picture before reading the detailed curriculum table below.')}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#FDF5F2] text-[#D5896F] text-xs font-black tracking-wide">
                  {t('中一基礎年', 'Foundation Year')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {s1KnowledgeHighlights.map((card) => (
                  <div key={card.title.zh} className="rounded-2xl border border-[#E5E0D8] bg-[#FCFBF9] p-5">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="text-base font-bold text-[#2C2A26]">{isEnglish ? card.title.en : card.title.zh}</div>
                        <div className="text-xs text-[#8C857B] mt-1">{isEnglish ? card.subtitle.en : card.subtitle.zh}</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {card.modules.map((module) => (
                          <span
                            key={module}
                            className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: card.color }}
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm text-[#4A4741]">
                      {card.bullets.map((bullet) => (
                        <div key={bullet.zh} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: card.color }} />
                          <span>{isEnglish ? bullet.en : bullet.zh}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
                <div>
                  <h2 className="text-lg font-bold text-[#2C2A26] flex items-center">
                    <Star className="w-5 h-5 mr-2 text-[#CCA068]" /> {t('中三 HKDSE 增潤延伸重點知識整理', 'S3 HKDSE Add-on Key Knowledge Map')}
                  </h2>
                  <p className="text-sm text-[#8C857B] mt-1 max-w-3xl">
                    {t('此部分整理中三增潤延伸內容，特別聚焦系統、系統整合、控制與自動化，幫助學生銜接高中 DAT。', 'This section organises the S3 add-on content, with a focus on systems, systems integration, control, and automation to support progression into senior DAT.')}
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#FBF8F1] text-[#CCA068] text-xs font-black tracking-wide">
                  {t('中三增潤延伸', 'S3 Add-on')}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {s3AddOnKnowledgeHighlights.map((card) => (
                  <button
                    key={card.title.zh}
                    type="button"
                    onClick={() => jumpToJuniorSection('中三 (S3)', card.targetSection)}
                    className="rounded-2xl border border-[#E5E0D8] bg-[#FCFBF9] p-5 text-left transition-colors hover:border-[#CCA068] hover:bg-[#FFFDF9]"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="text-base font-bold text-[#2C2A26]">{isEnglish ? card.title.en : card.title.zh}</div>
                        <div className="text-xs text-[#8C857B] mt-1">{isEnglish ? card.subtitle.en : card.subtitle.zh}</div>
                        <div className="text-[11px] text-[#A8A29A] mt-2">{t('點擊跳至對應中三課程章節', 'Click to jump to the matching S3 curriculum section')}</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {card.modules.map((module) => (
                          <span
                            key={module}
                            className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: card.color }}
                          >
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5 text-sm text-[#4A4741]">
                      {card.bullets.map((bullet) => (
                        <div key={bullet.zh} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: card.color }} />
                          <span>{isEnglish ? bullet.en : bullet.zh}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Grade Accordions */}
            <div className="space-y-4">
              {juniorCurriculum.map(grade => (
                <div key={grade.grade} id={`grade-${grade.grade}`} className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedGrade(expandedGrade === grade.grade ? null : grade.grade)}
                    className="w-full flex items-center justify-between p-6 hover:bg-[#FDFCFB] transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${grade.colorBar}`} />
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="text-xl font-bold text-[#2C2A26]">{tr(grade.grade)}</div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${grade.tagBg} ${grade.tagColor}`}>
                            {t('核心', 'Core')} {grade.total} {t('節', 'periods')}
                          </span>
                        </div>
                        <div className="text-xs text-[#8C857B] mt-0.5">{tr(grade.gradeSub)}</div>
                        <div className="text-[11px] text-[#A8A29A] mt-0.5 italic">{tr(grade.note)}</div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 ml-2">
                        {grade.sections.flatMap(s => s.modules).filter((m, i, a) => a.indexOf(m) === i).map(mod => (
                          <span key={mod} className={`text-[10px] font-black px-2 py-0.5 rounded ${grade.tagBg} ${grade.tagColor}`}>{mod}</span>
                        ))}
                      </div>
                    </div>
                    {expandedGrade === grade.grade
                      ? <ChevronDown className="w-5 h-5 text-[#A8A29A]" />
                      : <ChevronRight className="w-5 h-5 text-[#A8A29A]" />}
                  </button>

                  <AnimatePresence>
                    {expandedGrade === grade.grade && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-[#F2EFE9]"
                      >
                        <div className="p-6 space-y-4">
                          {grade.sections.map(section => (
                            <div key={section.title} id={getSectionAnchorId(grade.grade, section.title)} className="rounded-xl border border-[#E5E0D8] overflow-hidden">
                              <button
                                onClick={() => setExpandedSection(expandedSection === `${grade.grade}-${section.title}` ? null : `${grade.grade}-${section.title}`)}
                                className="w-full flex items-center justify-between px-5 py-3.5 bg-[#F9F8F6] hover:bg-[#F2EFE9] transition-colors text-left"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-bold text-sm text-[#2C2A26]">{tr(section.title)}</span>
                                    {section.subtotal && (
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${grade.tagBg} ${grade.tagColor}`}>
                                        {section.subtotal} {t('節', 'periods')}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {section.modules.map(m => (
                                      <span key={m} className="text-[10px] font-black px-1.5 py-0.5 rounded bg-white border border-[#E5E0D8] text-[#6B665E]">{m}</span>
                                    ))}
                                  </div>
                                </div>
                                {expandedSection === `${grade.grade}-${section.title}`
                                  ? <ChevronDown className="w-4 h-4 text-[#A8A29A] flex-shrink-0 ml-2" />
                                  : <ChevronRight className="w-4 h-4 text-[#A8A29A] flex-shrink-0 ml-2" />}
                              </button>

                              <AnimatePresence>
                                {expandedSection === `${grade.grade}-${section.title}` && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-5 py-4 space-y-3 border-t border-[#F2EFE9]">
                                      {section.note && (
                                        <p className="text-xs text-[#8C857B] italic border-l-2 border-[#CCA068] pl-3">{tr(section.note)}</p>
                                      )}
                                      {/* EDB Teacher Manual breakdown table */}
                                      <div className="overflow-x-auto rounded-lg border border-[#E5E0D8]">
                                        <table className="w-full text-xs">
                                          <thead>
                                            <tr className="bg-[#F2EFE9]">
                                              <th className="text-left px-3 py-2 font-bold text-[#4A4741] w-28">{t('課程代碼', 'Code')}</th>
                                              <th className="text-left px-3 py-2 font-bold text-[#4A4741]">{t('學習元素', 'Learning Elements')}</th>
                                              <th className="text-right px-3 py-2 font-bold text-[#4A4741] whitespace-nowrap">{t('課節', 'Periods')}</th>
                                              <th className="text-left px-3 py-2 font-bold text-[#4A4741]">{t('課節分佈', 'Period Breakdown')}</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {section.rows.map((row, i) => (
                                              <tr key={row.code} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF8]'}>
                                                <td className="px-3 py-2.5 font-bold text-[#2C2A26] align-top whitespace-nowrap">{row.code}</td>
                                                <td className="px-3 py-2.5 text-[#4A4741] align-top">
                                                  <ul className="space-y-0.5">
                                                    {row.elements.map(el => (
                                                      <li key={el} className="flex items-start gap-1">
                                                        <span className="text-[#D5896F] mt-0.5">·</span>
                                                        <span>{tr(el)}</span>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </td>
                                                <td className={`px-3 py-2.5 text-right font-bold align-top ${grade.tagColor}`}>{row.hours}</td>
                                                <td className="px-3 py-2.5 text-[#8C857B] align-top">
                                                  <ul className="space-y-0.5">
                                                    {row.breakdown.map(b => (
                                                      <li key={b}>{tr(b)}</li>
                                                    ))}
                                                  </ul>
                                                </td>
                                              </tr>
                                            ))}
                                            {section.subtotal && (
                                              <tr className={`border-t border-[#E5E0D8] ${grade.tagBg}`}>
                                                <td colSpan={2} className={`px-3 py-2 font-black text-xs text-right ${grade.tagColor}`}>{t('小計', 'Subtotal')}</td>
                                                <td className={`px-3 py-2 text-right font-black text-xs ${grade.tagColor}`}>{section.subtotal}</td>
                                                <td />
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* S1–S3 Module Teaching Plan Table */}
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#E5E0D8] bg-[#F9F8F6]">
                <h2 className="text-lg font-bold text-[#2C2A26] flex items-center">
                  <BookMarked className="w-5 h-5 mr-2 text-[#CCA068]" /> {t('模組及教學計劃總覽', 'Module and Teaching Plan Overview')}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#F2EFE9]">
                      <th className="text-left px-6 py-3 font-bold text-[#4A4741]">{t('級別', 'Level')}</th>
                      <th className="text-left px-6 py-3 font-bold text-[#4A4741]">{t('相關模組', 'Related Modules')}</th>
                      <th className="text-left px-6 py-3 font-bold text-[#4A4741]">{t('建議節數', 'Suggested Time')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2EFE9]">
                    {[
                      { grade: '中一', modules: 'K3, K4, K5, K6, K8, K9, E3, E6, E7', hrs: '66–91 節' },
                      { grade: '中二', modules: 'K3, K4, K5, K6, K8, K9, E2, E3, E6, E7', hrs: '66–98 節' },
                      { grade: '中三（核心部份）', modules: 'K3, K4, K5, K6, K8, K9, E2, E3, E6, E7', hrs: '80 節' },
                      { grade: '中三（延伸部份）', modules: 'K8, K9, E6, E7', hrs: '視乎學校' },
                    ].map(row => (
                      <tr key={row.grade} className="hover:bg-[#FDFCFB] transition-colors">
                        <td className="px-6 py-3 font-bold text-[#2C2A26]">{tr(row.grade)}</td>
                        <td className="px-6 py-3">
                          <div className="flex flex-wrap gap-1">
                            {row.modules.split(', ').map(m => (
                              <span key={m} className="text-[11px] font-bold px-2 py-0.5 bg-[#F2EFE9] text-[#6B665E] rounded border border-[#E5E0D8]">{m}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-[#8C857B] font-medium">{tr(row.hrs)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* S1–S3 Case Studies */}
            <div>
              <h2 className="text-lg font-bold text-[#2C2A26] mb-4 flex items-center">
                <FolderOpen className="w-5 h-5 mr-2 text-[#D5896F]" /> {t('個案研究 — 中一至中三', 'Case Studies — S1 to S3')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {juniorCaseStudies.map(cs => (
                  <motion.div key={cs.id} whileHover={{ y: -3 }} className="bg-white rounded-xl border border-[#E5E0D8] shadow-sm p-5 hover:border-[#D5896F] transition-all group cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{cs.icon}</div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-[#A8A29A] mb-0.5">{cs.num}</div>
                        <h3 className="font-bold text-[#2C2A26] group-hover:text-[#D5896F] transition-colors">{isEnglish ? cs.en : cs.title}</h3>
                        <p className="text-xs text-[#8C857B] mt-1 italic">{cs.en}</p>
                        <div className="flex items-center space-x-3 mt-3">
                          <div className="flex gap-1">
                            {cs.modules.map(m => (
                              <span key={m} className="text-[10px] font-black px-1.5 py-0.5 bg-[#F2EFE9] text-[#6B9080] border border-[#E5E0D8] rounded">{m}</span>
                            ))}
                          </div>
                          <a href="https://www.edb.gov.hk/tc/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html"
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center text-xs text-[#6B9080] hover:text-[#D5896F] font-medium transition-colors ml-auto"
                            onClick={e => e.stopPropagation()}>
                            {t('教局資源', 'EDB Resource')} <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ── SENIOR TAB ─────────────────────────────────────────────── */}
        {activeTab === 'senior' && (
          <motion.div key="senior" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">

            {/* Compulsory */}
            <section>
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-1.5 h-8 rounded-full bg-[#D5896F]" />
                <h2 className="text-2xl font-bold text-[#2C2A26]">{t('必修學習範疇', 'Compulsory Areas')}</h2>
                <span className="text-xs font-bold text-[#D5896F] bg-[#D5896F]/10 px-3 py-1 rounded-full">{t('DSE 必考 · 全部必修', 'Required in DSE · All Compulsory')}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {seniorCompulsory.map(area => (
                  <div key={area.num} className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6 hover:shadow-md transition-all">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2.5 rounded-xl" style={{ background: `${area.color}15`, color: area.color }}>
                        <area.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: area.color }}>{area.num}</div>
                        <h3 className="font-bold text-[#2C2A26] leading-tight">{isEnglish ? area.en : area.title}</h3>
                        <span className="text-[10px] text-[#8C857B]">{area.en}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mb-4">
                      {area.points.map((pt, i) => (
                        <li key={i} className="text-sm text-[#6B665E] flex items-start">
                          <span className="mr-2 mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: area.color }} />
                          {tr(pt)}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-[#F2EFE9]">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {area.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-[#F2EFE9] text-[#6B665E] rounded border border-[#E5E0D8]">{tag}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {area.resources.map(r => (
                          <a key={r} href="https://www.edb.gov.hk/tc/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html"
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center text-[11px] text-[#6B9080] hover:underline font-medium">
                            {r} <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Electives ─ interactive */}
            <section>
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-1.5 h-8 rounded-full bg-[#6B9080]" />
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2A26]">{t('選修部分', 'Elective Modules')}</h2>
                  <p className="text-sm text-[#8C857B] mt-0.5">
                    {t('DSE 規定學生須「五選二」，點擊進入了解各模組內容。', 'DSE students choose two of the five electives. Click to explore each module.')}
                  </p>
                </div>
                <span className="ml-auto text-xs font-bold text-[#6B9080] bg-[#6B9080]/10 px-3 py-1.5 rounded-full border border-[#6B9080]/20 whitespace-nowrap">
                  {t('五選二', 'Choose 2 of 5')}
                </span>
              </div>

              {/* Module Selector Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mt-5">
                {seniorElectives.map((el, i) => {
                  const isActive = activeElective === i;
                  return (
                    <motion.button
                      key={el.num}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveElective(isActive ? null : i)}
                      className={`relative flex flex-col items-start text-left p-4 rounded-2xl border-2 transition-all shadow-sm group ${
                        isActive
                          ? 'border-[#6B9080] bg-[#6B9080]/5 shadow-md'
                          : 'border-[#E5E0D8] bg-white hover:border-[#6B9080]/40 hover:bg-[#FDFCFB]'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl mb-3 transition-colors ${isActive ? 'text-white' : 'text-white'}`}
                        style={{ background: el.color }}
                      >
                        <el.icon className="w-4 h-4" />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#A8A29A] mb-0.5">{el.num}</div>
                      <div className={`font-bold text-sm leading-tight mb-0.5 transition-colors ${isActive ? 'text-[#6B9080]' : 'text-[#2C2A26]'}`}>
                        {isEnglish ? el.en : el.title}
                      </div>
                      <div className="text-[10px] text-[#8C857B] mb-3">{el.en}</div>
                      <div className="flex flex-wrap gap-1">
                        {el.tags.map(tag => (
                          <span key={tag} className={`text-[9px] font-bold px-1.5 py-0.5 rounded border transition-colors ${isActive ? 'bg-[#6B9080]/10 text-[#6B9080] border-[#6B9080]/20' : 'bg-[#F2EFE9] text-[#8C857B] border-[#E5E0D8]'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="elective-active-dot"
                          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#6B9080]"
                        />
                      )}
                      <div className={`mt-2 text-[10px] font-medium flex items-center gap-1 transition-colors ${isActive ? 'text-[#6B9080]' : 'text-[#A8A29A] group-hover:text-[#6B9080]'}`}>
                        {isActive ? t('▲ 收起', '▲ Collapse') : t('▶ 點擊互動', '▶ Open Interaction')}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Expanded Interactive Panel */}
              <AnimatePresence mode="wait">
                {activeElective !== null && (
                  <motion.div
                    key={activeElective}
                    initial={{ opacity: 0, y: 16, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.99 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="mt-4 bg-white rounded-2xl border border-[#6B9080]/30 shadow-lg overflow-hidden"
                  >
                    {/* Panel Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E0D8]" style={{ background: `${seniorElectives[activeElective].color}10` }}>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl text-white" style={{ background: seniorElectives[activeElective].color }}>
                          {(() => { const Icon = seniorElectives[activeElective].icon; return <Icon className="w-5 h-5" />; })()}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29A]">{seniorElectives[activeElective].num}</div>
                          <h3 className="font-bold text-[#2C2A26]">{isEnglish ? seniorElectives[activeElective].en : seniorElectives[activeElective].title}</h3>
                          <span className="text-xs text-[#8C857B]">{seniorElectives[activeElective].en}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {onNavigate && (
                          <button
                            onClick={() => onNavigate('senior_module', seniorElectives[activeElective].topic)}
                            className="hidden sm:inline-flex items-center gap-2 bg-white border border-[#E5E0D8] rounded-xl px-3 py-1.5 text-[11px] font-bold text-[#2C2A26] hover:border-[#6B9080]"
                          >
                            {t('進入完整模組頁', 'Open Full Module Page')}
                          </button>
                        )}
                        <div className="hidden sm:flex items-center gap-2 bg-white border border-[#E5E0D8] rounded-xl px-3 py-1.5">
                          <span className="text-[10px] font-bold text-[#8C857B] uppercase tracking-wide">{t('互動遊戲', 'Interactive Activity')}</span>
                          <span className="text-[10px] font-medium text-[#6B9080]">{isEnglish ? ELECTIVE_GAMES[activeElective].sublabel : ELECTIVE_GAMES[activeElective].label}</span>
                        </div>
                        <button
                          onClick={() => setActiveElective(null)}
                          className="p-2 rounded-lg text-[#8C857B] hover:text-[#2C2A26] hover:bg-[#F2EFE9] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-[#FCFCFB]">
                      {activeElective === 0 && <AutomationLab />}
                      {activeElective === 1 && <CreativeMediaStudio />}
                      {activeElective === 2 && <MaterialProcessingLab />}
                      {activeElective === 3 && <ElectronicsLab />}
                      {activeElective === 4 && <VisualisationCadLab />}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Thematic Resources */}
            <section>
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-1.5 h-8 rounded-full bg-[#CCA068]" />
                <h2 className="text-2xl font-bold text-[#2C2A26]">{t('主題式學與教資源', 'Thematic Resources')}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {thematicResources.map(t => (
                  <a key={t.num}
                    href="https://www.edb.gov.hk/tc/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html"
                    target="_blank" rel="noreferrer"
                    className="bg-white rounded-xl border border-[#E5E0D8] p-4 hover:border-[#CCA068] transition-all group flex flex-col items-center text-center">
                    <div className="text-2xl mb-2">{t.icon}</div>
                    <div className="text-[10px] font-bold text-[#A8A29A] mb-1">{t.num}</div>
                    <div className="text-sm font-bold text-[#2C2A26] group-hover:text-[#CCA068] transition-colors leading-tight mb-2">{tr(t.title)}</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {t.related.map(r => (
                        <span key={r} className="text-[9px] px-1.5 py-0.5 bg-[#F2EFE9] text-[#8C857B] rounded">{r}</span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Senior Case Studies */}
            <section>
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-1.5 h-8 rounded-full bg-[#8A9A5B]" />
                <h2 className="text-2xl font-bold text-[#2C2A26]">{t('個案研究 — 中四至中六', 'Case Studies — S4 to S6')}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {seniorCaseStudies.map(cs => (
                  <motion.div key={cs.id} whileHover={{ y: -3 }} className="bg-white rounded-xl border border-[#E5E0D8] shadow-sm p-5 hover:border-[#8A9A5B] transition-all group cursor-pointer">
                    <div className="text-2xl mb-2">{cs.icon}</div>
                    <div className="text-xs font-bold text-[#A8A29A] mb-1">{cs.num}</div>
                    <h3 className="font-bold text-[#2C2A26] group-hover:text-[#8A9A5B] transition-colors text-sm leading-tight mb-1">{isEnglish ? cs.en : cs.title}</h3>
                    <p className="text-[11px] text-[#8C857B] italic mb-3">{cs.en}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] px-2 py-1 bg-[#E8EFE6] text-[#6B9080] rounded font-medium">{cs.related}</span>
                      <a href="https://www.edb.gov.hk/tc/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html"
                        target="_blank" rel="noreferrer"
                        className="inline-flex items-center text-xs text-[#6B9080] hover:underline font-medium"
                        onClick={e => e.stopPropagation()}>
                        {t('教局', 'EDB')} <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* ── SHARED RESOURCES TAB ───────────────────────────────────── */}
        {activeTab === 'resources' && (
          <motion.div key="resources" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">

            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#2C2A26] mb-1 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-[#6B9080]" /> {t('中一至中六 共用學與教資源', 'Shared Learning and Teaching Resources for S1–S6')}
              </h2>
              <p className="text-sm text-[#8C857B] mb-6">{t('以下資源適用於中一至中六 D&T / DAT 各年級，由教育局提供。', 'These resources apply to D&T / DAT across S1–S6 and are provided by the Education Bureau.')}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sharedResources.map((res, i) => (
                  <a key={i}
                    href="https://www.edb.gov.hk/tc/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html"
                    target="_blank" rel="noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-xl border border-[#E5E0D8] hover:border-[#D5896F] hover:bg-[#FDF9F7] transition-all group">
                    <div className="p-3 bg-[#F2EFE9] rounded-xl group-hover:bg-[#D5896F]/10 transition-colors">
                      <res.icon className="w-5 h-5 text-[#D5896F]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[#2C2A26] text-sm group-hover:text-[#D5896F] transition-colors">{tr(res.title)}</div>
                      <div className="text-xs text-[#8C857B]">{tr(res.sub)}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#E8EFE6] text-[#6B9080] rounded">{res.tag}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#A8A29A] group-hover:text-[#D5896F] transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* SBA Resources note */}
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#2C2A26] mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#CCA068]" /> {t('中四至中六 DAT 校本評核 (SBA) 資源', 'S4–S6 DAT SBA Resources')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: '「設計與應用科技」校本評核設計作業展覽及資源', sub: '教育局 SBA 支援頁面' },
                  { label: '學與教資源：使用指引 (PDF)', sub: '中四至中六 DAT 官方使用指引' },
                ].map((item, i) => (
                  <a key={i}
                    href="https://www.edb.gov.hk/tc/curriculum-development/kla/technology-edu/resources/tech-subjects/resources.html"
                    target="_blank" rel="noreferrer"
                    className="flex items-center space-x-3 p-4 rounded-xl border border-[#E5E0D8] hover:border-[#CCA068] hover:bg-[#FDF9F5] transition-all group">
                    <div className="p-2.5 bg-[#CCA068]/10 rounded-xl">
                      <FileText className="w-5 h-5 text-[#CCA068]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-[#2C2A26] group-hover:text-[#CCA068] transition-colors">{tr(item.label)}</div>
                      <div className="text-xs text-[#8C857B]">{tr(item.sub)}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#A8A29A] group-hover:text-[#CCA068] flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Module codes quick-ref: reordered by type */}
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#2C2A26] mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-[#6B9080]" /> {t('模組代碼速查', 'Module Code Reference')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { group: '核心模組 (Core K)', codes: ['K3', 'K4', 'K5', 'K6', 'K8', 'K9'], color: '#6B9080' },
                  { group: '延伸模組 (Extension E)', codes: ['E2', 'E3', 'E6', 'E7'], color: '#CCA068' },
                ].map(grp => (
                  <div key={grp.group} className="rounded-xl bg-[#F9F8F6] border border-[#E5E0D8] p-4">
                    <div className="font-bold text-sm mb-3" style={{ color: grp.color }}>{tr(grp.group)}</div>
                    <div className="space-y-2">
                      {grp.codes.map(code => {
                        const m = moduleInfo[code];
                        if (!m) return null;
                        return (
                          <div key={code} className="flex items-center space-x-3">
                            <span className="font-black text-xs w-8 flex-shrink-0" style={{ color: m.color }}>{code}</span>
                            <span className="text-xs font-bold text-[#2C2A26]">{isEnglish ? m.nameEn : m.name}</span>
                            <span className="text-[10px] text-[#8C857B] italic hidden md:block">({m.nameEn})</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

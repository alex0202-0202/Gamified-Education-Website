import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  RefreshCw,
  Layers3,
  FlaskConical,
  MonitorCog,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';
import { seniorModules, type SeniorModuleId } from '../data/seniorModules';
import { useLanguage } from '../context/LanguageContext';
import { XRayArchitect } from './modules/XRayArchitect';

type SeniorModuleStudioProps = {
  moduleId: SeniorModuleId;
  onNavigate: (screen: string, topic?: string) => void;
};

type QuizQuestion = {
  question: string;
  enQuestion?: string;
  options: string[];
  enOptions?: string[];
  answer: number;
};

const moduleQuiz: Record<SeniorModuleId, QuizQuestion[]> = {
  design_innovation: [
    {
      question: '以下哪一項最能代表迭代式設計流程？',
      enQuestion: 'Which option best represents an iterative design process?',
      options: ['一次完成後不再修改', '分析、原型、測試、再改良', '只重視外觀設計', '只由工程師完成'],
      enOptions: ['Finish it once with no revision', 'Analyse, prototype, test, and improve again', 'Focus only on appearance', 'Completed only by engineers'],
      answer: 1,
    },
    {
      question: '在設計與創新中，專利主要用來：',
      enQuestion: 'In design and innovation, patents are mainly used to:',
      options: ['降低材料成本', '保護創新成果', '替代市場研究', '避免製作原型'],
      enOptions: ['Lower material cost', 'Protect innovation', 'Replace market research', 'Avoid prototyping'],
      answer: 1,
    },
  ],
  technological_principles: [
    {
      question: '以下哪一組最適合用於高強度結構支架？',
      enQuestion: 'Which combination is most suitable for a high-strength structural bracket?',
      options: ['泡棉 + 紙膠帶', '低碳鋼 + 螺栓接合', '蠟 + 卡紙', '亞加力 + 熱熔膠'],
      enOptions: ['Foam + masking tape', 'Mild steel + bolted joint', 'Wax + card', 'Acrylic + hot glue'],
      answer: 1,
    },
    {
      question: '輸入—處理—輸出模型屬於哪個範疇？',
      enQuestion: 'The input-process-output model belongs to which area?',
      options: ['表面處理', '系統與控制', '色彩理論', '知識產權'],
      enOptions: ['Surface finishing', 'Systems and control', 'Colour theory', 'Intellectual property'],
      answer: 1,
    },
  ],
  value_impact: [
    {
      question: '5R 原則中不包括以下哪項？',
      enQuestion: 'Which of the following is not part of the 5R principles?',
      options: ['Reduce', 'Repair', 'Recycle', 'Repaint'],
      answer: 3,
    },
    {
      question: '設計決策中考慮職業安全屬於：',
      enQuestion: 'Considering occupational safety in design decisions belongs to:',
      options: ['純粹美學因素', '價值與影響', '電路分析', '動畫原理'],
      enOptions: ['Pure aesthetics', 'Value and impact', 'Circuit analysis', 'Animation principles'],
      answer: 1,
    },
  ],
  automation: [
    {
      question: 'Sense-Think-Act 中，氣缸屬於哪一部分？',
      enQuestion: 'In Sense-Think-Act, which part does the cylinder belong to?',
      options: ['Sense', 'Think', 'Act', 'Logic'],
      answer: 2,
    },
    {
      question: '若要求兩個感測器同時為 1 才啟動，最接近：',
      enQuestion: 'If two sensors must both be 1 before the system starts, which is closest?',
      options: ['OR', 'AND', 'NOT', 'NAND'],
      answer: 1,
    },
  ],
  creative_digital_media: [
    {
      question: '對比度不足最直接影響的是：',
      enQuestion: 'Insufficient contrast most directly affects:',
      options: ['檔案大小', '可讀性與無障礙', '動畫幀率', '列印速度'],
      enOptions: ['File size', 'Readability and accessibility', 'Animation frame rate', 'Printing speed'],
      answer: 1,
    },
    {
      question: '以下哪一項屬於向量圖形優勢？',
      enQuestion: 'Which of the following is an advantage of vector graphics?',
      options: ['放大後一定模糊', '適合像素繪圖', '可無損縮放', '只能用於印刷'],
      enOptions: ['It always becomes blurry when enlarged', 'It is best for pixel art', 'It can be scaled without quality loss', 'It can only be used for print'],
      answer: 2,
    },
  ],
  design_material_processing: [
    {
      question: '材料超過屈服點後，通常會：',
      enQuestion: 'After a material passes its yield point, it will usually:',
      options: ['完全沒有變形', '開始永久變形', '立即蒸發', '變成絕緣體'],
      enOptions: ['Show no deformation', 'Begin permanent deformation', 'Evaporate immediately', 'Become an insulator'],
      answer: 1,
    },
    {
      question: 'QA/QC 在大量生產中的主要目的為：',
      enQuestion: 'What is the main purpose of QA/QC in mass production?',
      options: ['增加顏色種類', '確保產品一致性', '減少圖紙尺寸', '替代熱處理'],
      enOptions: ['Increase colour variations', 'Ensure product consistency', 'Reduce drawing size', 'Replace heat treatment'],
      answer: 1,
    },
  ],
  electronics: [
    {
      question: '若只有 A 與 B 同時為 1 才輸出 1，應使用：',
      enQuestion: 'If output should be 1 only when both A and B are 1, which gate should be used?',
      options: ['OR', 'AND', 'NOR', 'NOT'],
      answer: 1,
    },
    {
      question: 'OP-AMP 作比較器時，會比較：',
      enQuestion: 'When an OP-AMP is used as a comparator, it compares:',
      options: ['電阻值與頻率', '輸入電壓與參考電壓', '溫度與濕度', '顏色與尺寸'],
      enOptions: ['Resistance and frequency', 'Input voltage and reference voltage', 'Temperature and humidity', 'Colour and size'],
      answer: 1,
    },
  ],
  visualisation_cad: [
    {
      question: '工程圖中的 Front / Plan / End 視圖屬於：',
      enQuestion: 'Front / Plan / End views in engineering drawings are examples of:',
      options: ['動畫分鏡', '正投影圖', 'UI 線框圖', '色彩樣板'],
      enOptions: ['Animation storyboards', 'Orthographic drawings', 'UI wireframes', 'Colour palettes'],
      answer: 1,
    },
    {
      question: '3D 列印常見的模型交換格式為：',
      enQuestion: 'A common model exchange format for 3D printing is:',
      options: ['MP3', 'STL', 'PNG', 'HTML'],
      answer: 1,
    },
  ],
};

const StudioCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-[#E5E0D8] bg-white ${className}`}>{children}</div>
);

const DesignInnovationSandbox = () => {
  const { t } = useLanguage();
  const steps = ['探索問題', '構思方案', '製作原型', '測試評鑒'];
  const [picked, setPicked] = useState<string[]>([]);
  const isCorrect = picked.length === steps.length && picked.every((step, i) => step === steps[i]);

  return (
    <div className="space-y-4">
      <StudioCard className="p-4 bg-[#FFF8F5]">
        <div className="text-sm font-bold text-[#2C2A26] mb-1">{t('Design Sprint 排序', 'Design Sprint Sequence')}</div>
        <div className="text-xs text-[#6B665E]">{t('按正確順序建立設計流程，體驗設計思維與迭代邏輯。', 'Build the design process in the correct order and experience iterative design logic.')}</div>
      </StudioCard>
      <div className="flex flex-wrap gap-2">
        {steps.map((step) => (
          <button
            key={step}
            onClick={() => !picked.includes(step) && setPicked((prev) => [...prev, step])}
            disabled={picked.includes(step)}
            className={clsx(
              'px-3 py-2 rounded-lg border text-sm',
              picked.includes(step)
                ? 'bg-[#F2EFE9] text-[#8C857B] border-[#E5E0D8]'
                : 'bg-white text-[#2C2A26] border-[#E5E0D8] hover:border-[#D5896F]'
            )}
          >
            {t(step, step === '探索問題' ? 'Explore the Problem' : step === '構思方案' ? 'Develop Ideas' : step === '製作原型' ? 'Build the Prototype' : 'Test and Evaluate')}
          </button>
        ))}
        <button onClick={() => setPicked([])} className="px-3 py-2 rounded-lg border text-sm border-[#E5E0D8] bg-white">
          {t('重設', 'Reset')}
        </button>
      </div>
      <StudioCard className="p-4">
        <div className="text-xs font-bold text-[#8C857B] uppercase mb-2">{t('你的流程', 'Your Sequence')}</div>
        <ol className="space-y-1 text-sm text-[#4A4741]">
          {picked.length === 0 ? <li className="text-[#A8A29A]">{t('尚未選擇步驟', 'No steps selected yet')}</li> : picked.map((item, index) => <li key={item}>{index + 1}. {t(item, item === '探索問題' ? 'Explore the Problem' : item === '構思方案' ? 'Develop Ideas' : item === '製作原型' ? 'Build the Prototype' : 'Test and Evaluate')}</li>)}
        </ol>
      </StudioCard>
      {isCorrect && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          {t('設計流程正確。下一步可開始原型測試與評鑒。', 'The design sequence is correct. Next, you can move on to prototype testing and evaluation.')}
        </div>
      )}
    </div>
  );
};

const TechnologicalPrinciplesSandbox = () => {
  const { t } = useLanguage();
  const [material, setMaterial] = useState('低碳鋼');
  const [mechanism, setMechanism] = useState('齒輪');
  const valid = material === '低碳鋼' && mechanism === '齒輪';

  return (
    <div className="space-y-4">
      <StudioCard className="p-4 bg-[#F5FBF7]">
        <div className="text-sm font-bold text-[#2C2A26] mb-1">{t('結構與機構配搭', 'Structure and Mechanism Match')}</div>
        <div className="text-xs text-[#6B665E]">{t('為重型閘門選擇最合理的材料與傳動機構。', 'Choose the most suitable material and drive mechanism for a heavy gate.')}</div>
      </StudioCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StudioCard className="p-4">
          <div className="text-xs font-bold text-[#8C857B] uppercase mb-2">{t('材料', 'Material')}</div>
          <div className="flex flex-wrap gap-2">
            {['低碳鋼', '亞加力', '紙板'].map((option) => (
              <button key={option} onClick={() => setMaterial(option)} className={clsx('px-3 py-2 rounded-lg border text-sm', material === option ? 'bg-[#6B9080] text-white border-[#6B9080]' : 'bg-white border-[#E5E0D8]')}>
                {option}
              </button>
            ))}
          </div>
        </StudioCard>
        <StudioCard className="p-4">
          <div className="text-xs font-bold text-[#8C857B] uppercase mb-2">{t('機構', 'Mechanism')}</div>
          <div className="flex flex-wrap gap-2">
            {['齒輪', '繩結', '膠貼'].map((option) => (
              <button key={option} onClick={() => setMechanism(option)} className={clsx('px-3 py-2 rounded-lg border text-sm', mechanism === option ? 'bg-[#6B9080] text-white border-[#6B9080]' : 'bg-white border-[#E5E0D8]')}>
                {option}
              </button>
            ))}
          </div>
        </StudioCard>
      </div>
      <div className={`rounded-xl border p-3 text-sm font-bold ${valid ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
        {valid ? t('配搭合理：低碳鋼具強度，齒輪可提供可靠傳動。', 'Good match: mild steel provides strength and gears provide reliable transmission.') : t('目前配搭不夠理想，請重新選擇較合理的材料與機構。', 'This combination is not ideal. Choose a more suitable material and mechanism.')}
      </div>
    </div>
  );
};

const ValueImpactSandbox = () => {
  const { t } = useLanguage();
  const [choices, setChoices] = useState({ material: '', power: '', disposal: '' });
  const score = (choices.material === '可回收鋁' ? 1 : 0) + (choices.power === '低功耗' ? 1 : 0) + (choices.disposal === '可維修與回收' ? 1 : 0);

  return (
    <div className="space-y-4">
      <StudioCard className="p-4 bg-[#FBF8F1]">
        <div className="text-sm font-bold text-[#2C2A26] mb-1">{t('可持續設計決策', 'Sustainable Design Decisions')}</div>
        <div className="text-xs text-[#6B665E]">{t('為一款智能燈具選擇較平衡的環保方案。', 'Choose a more balanced environmental plan for a smart lamp.')}</div>
      </StudioCard>
      {[
        { key: 'material', title: '外殼材料', options: ['一次性塑膠', '可回收鋁'] },
        { key: 'power', title: '能源方案', options: ['高耗電', '低功耗'] },
        { key: 'disposal', title: '產品生命週期', options: ['直接丟棄', '可維修與回收'] },
      ].map((group) => (
        <StudioCard key={group.key} className="p-4">
          <div className="text-xs font-bold text-[#8C857B] uppercase mb-2">{group.title}</div>
          <div className="flex gap-2 flex-wrap">
            {group.options.map((option) => (
              <button
                key={option}
                onClick={() => setChoices((prev) => ({ ...prev, [group.key]: option }))}
                className={clsx(
                  'px-3 py-2 rounded-lg border text-sm',
                  choices[group.key as keyof typeof choices] === option
                    ? 'bg-[#CCA068] text-white border-[#CCA068]'
                    : 'bg-white border-[#E5E0D8]'
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </StudioCard>
      ))}
      <div className={`rounded-xl border p-3 text-sm font-bold ${score === 3 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
        {t('可持續得分', 'Sustainability Score')}: {score} / 3 {score === 3 ? t('✓ 方案平衡良好', '✓ Well-balanced solution') : t('請再考慮環境與維修影響', 'Reconsider the environmental and maintenance impact')}
      </div>
    </div>
  );
};

const AutomationSandbox = () => {
  const { t } = useLanguage();
  const [sensorPlaced, setSensorPlaced] = useState(false);
  const [logicCode, setLogicCode] = useState('If sensor == 1 then Extend Cylinder');
  const [isRunning, setIsRunning] = useState(false);
  const [isRejectDetected, setIsRejectDetected] = useState(false);

  const codeValid = logicCode.toLowerCase().includes('sensor == 1') && logicCode.toLowerCase().includes('extend cylinder');

  const start = () => {
    setIsRunning(true);
    setIsRejectDetected(sensorPlaced && codeValid);
    setTimeout(() => setIsRunning(false), 2200);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSensorPlaced(true)} className={clsx('px-3 py-2 rounded-lg border text-sm', sensorPlaced ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white border-[#E5E0D8]')}>
          {t('放置紅外線傳感器', 'Place Infrared Sensor')}
        </button>
        <button onClick={() => { setSensorPlaced(false); setIsRejectDetected(false); }} className="px-3 py-2 rounded-lg border text-sm bg-white border-[#E5E0D8]">
          {t('重設', 'Reset')}
        </button>
      </div>
      <textarea value={logicCode} onChange={(e) => setLogicCode(e.target.value)} className="w-full h-24 rounded-xl border border-[#E5E0D8] p-3 text-sm font-mono" />
      <button onClick={start} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E67E22] text-white font-bold">
        <Play size={16} /> {t('啟動', 'Start')}
      </button>
      <StudioCard className="p-4 bg-[#F9F8F6]">
        <div className="relative h-40 overflow-hidden rounded-xl bg-white border border-[#E5E0D8]">
          <div className="absolute left-0 right-0 top-1/2 h-2 bg-[#6B705C] -translate-y-1/2" />
          {sensorPlaced && <div className="absolute left-24 top-[44%] w-3 h-8 bg-[#1F2937] rounded" />}
          <motion.div animate={{ x: isRunning ? 360 : 0 }} transition={{ duration: 2, ease: 'linear' }} className="absolute left-4 top-[44%] w-8 h-8 rounded bg-[#8D99AE]" />
          <motion.div animate={{ x: isRunning && isRejectDetected ? 44 : 0 }} transition={{ duration: 0.35, delay: 0.9 }} className="absolute left-32 top-[40%] w-6 h-14 bg-[#E67E22] rounded" />
        </div>
      </StudioCard>
      <div className={`rounded-xl border p-3 text-sm font-bold ${sensorPlaced && codeValid ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
        {sensorPlaced && codeValid ? t('系統運作正常：次品被推出。', 'System running normally: the defective item is pushed out.') : t('請放置傳感器並使用正確控制語句。', 'Place the sensor and use the correct control statement.')}
      </div>
    </div>
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

const CreativeDigitalSandbox = () => {
  const { t } = useLanguage();
  const [padding, setPadding] = useState(6);
  const [bgShade, setBgShade] = useState(72);
  const buttonColor = `hsl(170 60% ${bgShade}%)`;
  const ratio = contrastRatio('#FFFFFF', buttonColor);

  return (
    <div className="space-y-4">
      <StudioCard className="p-5 bg-[#F4FBFA]">
        <div className="w-[220px] mx-auto bg-white border border-[#E5E0D8] rounded-2xl p-4 space-y-3">
          <div className="h-2 w-16 rounded bg-[#E5E0D8]" />
          <div className="h-2 w-28 rounded bg-[#E5E0D8]" />
          <button style={{ backgroundColor: buttonColor, padding: `${padding}px 14px` }} className="rounded-lg text-white font-bold text-sm transition-all">
            Confirm
          </button>
        </div>
      </StudioCard>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="rounded-xl border border-[#E5E0D8] p-4 text-sm bg-white">
          {t('內邊距', 'Padding')}: {padding}px
          <input type="range" min={4} max={22} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full mt-2" />
        </label>
        <label className="rounded-xl border border-[#E5E0D8] p-4 text-sm bg-white">
          {t('背景亮度', 'Background Lightness')}: {bgShade}%
          <input type="range" min={25} max={82} value={bgShade} onChange={(e) => setBgShade(Number(e.target.value))} className="w-full mt-2" />
        </label>
      </div>
      <div className={`rounded-xl border p-3 text-sm font-bold ${ratio >= 4.5 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
        {t('對比率', 'Contrast Ratio')}: {ratio.toFixed(2)} : 1 {ratio >= 4.5 ? t('✓ 合格', '✓ Pass') : t('✗ 需改善', '✗ Needs Improvement')}
      </div>
    </div>
  );
};

const MaterialStressSandbox = () => {
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
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(materials) as Mat[]).map((key) => (
          <button key={key} onClick={() => { setSelected(key); setLoad(0); }} className={clsx('px-3 py-2 rounded-lg border text-sm', selected === key ? 'bg-[#8D99AE] text-white border-[#8D99AE]' : 'bg-white border-[#E5E0D8]')}>
            {materials[key].name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setLoad((v) => Math.min(v + 40, 800))} className="px-4 py-2 rounded-lg bg-[#D5896F] text-white font-bold text-sm">{t('增加載重 +40 MPa', 'Increase Load +40 MPa')}</button>
        <button onClick={() => setLoad(0)} className="px-4 py-2 rounded-lg border border-[#E5E0D8] text-sm">{t('重設', 'Reset')}</button>
      </div>
      <StudioCard className="p-4">
        <div className="text-xs text-[#8C857B] mb-2">{t('應力-應變曲線', 'Stress-Strain Curve')} (Simplified)</div>
        <svg viewBox="0 0 100 100" className="w-full h-40">
          <line x1="8" y1="90" x2="95" y2="90" stroke="#C0BAB2" strokeWidth="1" />
          <line x1="8" y1="10" x2="8" y2="90" stroke="#C0BAB2" strokeWidth="1" />
          <polyline points={points} fill="none" stroke={mat.color} strokeWidth="2" />
          <line x1="8" y1={90 - (mat.yield / 700) * 80} x2="95" y2={90 - (mat.yield / 700) * 80} stroke="#E67E22" strokeDasharray="2 2" />
        </svg>
        <div className="text-xs text-[#6B665E]">{t('當前載重', 'Current Load')}: <span className="font-bold">{load} MPa</span> | {t('屈服點', 'Yield Point')}: {mat.yield} MPa | {t('極限', 'Ultimate Strength')}: {mat.ultimate} MPa</div>
      </StudioCard>
      <div className={`rounded-xl border p-3 text-sm font-bold ${failed ? 'bg-red-50 border-red-200 text-red-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
        {failed ? t('材料超過極限，發生斷裂。', 'The material has exceeded its limit and fractured.') : t('材料仍在可承受範圍內。', 'The material remains within its safe range.')}
      </div>
    </div>
  );
};

const ElectronicsSandbox = () => {
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

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['AND', 'OR', 'NAND'] as const).map((gate) => (
          <div key={gate} draggable onDragStart={() => setDraggingGate(gate)} className="px-3 py-2 rounded-lg border border-[#E5E0D8] bg-white text-sm font-bold cursor-grab">
            {gate} Gate
          </div>
        ))}
      </div>
      <div onDragOver={(e) => e.preventDefault()} onDrop={() => setSelectedGate(draggingGate)} className="rounded-xl border-2 border-dashed border-[#4361EE]/30 bg-[#F8FAFF] p-4">
        <div className="text-xs text-[#8C857B]">{t('把邏輯門放到這裡', 'Drop gate here')}</div>
        <div className="text-lg font-bold text-[#1B263B] mt-1">{selectedGate ? `${selectedGate} ${t('已安裝', 'Installed')}` : t('空插槽', 'Empty Slot')}</div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setInputDark((v) => !v)} className="px-3 py-2 rounded border border-[#E5E0D8] text-sm bg-white">{t('光線暗', 'Dark')} = {inputDark ? '1' : '0'}</button>
        <button onClick={() => setInputSwitch((v) => !v)} className="px-3 py-2 rounded border border-[#E5E0D8] text-sm bg-white">{t('開關開啟', 'Switch On')} = {inputSwitch ? '1' : '0'}</button>
      </div>
      <StudioCard className="p-4 flex items-center justify-between">
        <div className="text-sm text-[#2C2A26]">{t('輸出 LED', 'Output LED')}</div>
        <div className={`w-5 h-5 rounded-full ${output ? 'bg-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.9)]' : 'bg-slate-300'}`} />
      </StudioCard>
      <div className={`rounded-xl border p-3 text-sm font-bold ${selectedGate === 'AND' && output ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
        {selectedGate === 'AND' && output ? t('條件正確：LED 在暗且開啟時亮起。', 'Correct condition: the LED lights when it is dark and the switch is on.') : t('提示：應使用 AND，並令兩個輸入同時為 1。', 'Hint: use AND and make both inputs equal to 1.')}
      </div>
    </div>
  );
};

const CadSandbox = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <StudioCard className="p-4 bg-[#F8F4EC]">
        <div className="text-sm font-bold text-[#2C2A26] mb-1">Projection Master</div>
        <div className="text-xs text-[#6B665E]">{t('根據 3D 模型，把 Front / Plan / End 視圖放到正確位置。', 'Based on the 3D model, place the Front / Plan / End views in the correct positions.')}</div>
      </StudioCard>
      <XRayArchitect />
    </div>
  );
};

const renderSandbox = (moduleId: SeniorModuleId) => {
  switch (moduleId) {
    case 'design_innovation':
      return <DesignInnovationSandbox />;
    case 'technological_principles':
      return <TechnologicalPrinciplesSandbox />;
    case 'value_impact':
      return <ValueImpactSandbox />;
    case 'automation':
      return <AutomationSandbox />;
    case 'creative_digital_media':
      return <CreativeDigitalSandbox />;
    case 'design_material_processing':
      return <MaterialStressSandbox />;
    case 'electronics':
      return <ElectronicsSandbox />;
    case 'visualisation_cad':
      return <CadSandbox />;
    default:
      return null;
  }
};

export const SeniorModuleStudio = ({ moduleId, onNavigate }: SeniorModuleStudioProps) => {
  const { t, tr, isEnglish } = useLanguage();
  const module = seniorModules[moduleId];
  const [activeTab, setActiveTab] = useState<'overview' | 'sandbox' | 'quiz'>('overview');
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!module) {
    return <div className="text-sm text-[#8C857B]">{t('找不到模組。', 'Module not found.')}</div>;
  }

  const quiz = moduleQuiz[moduleId];
  const score = quiz.reduce((acc, q, idx) => acc + (q.answer === answers[idx] ? 1 : 0), 0);
  const answeredCount = answers.filter((answer) => answer !== undefined).length;

  return (
    <div className="space-y-8 pb-20">
      <StudioCard className="p-8" >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <button onClick={() => onNavigate('dashboard')} className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-[#6B665E] hover:text-[#2C2A26]">
              <ArrowLeft size={16} /> {t('返回', 'Back')}
            </button>
            <div className="h-8 w-px bg-[#E5E0D8] hidden md:block" />
            <div className="p-3 rounded-2xl text-white" style={{ background: module.accent }}>
              <module.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-1">{module.num} · {module.section === 'elective' ? t('選修', 'Elective') : t('必修', 'Compulsory')}</div>
              <h1 className="text-3xl font-bold text-[#2C2A26] leading-tight">{isEnglish ? module.en : module.title}</h1>
              <div className="text-sm text-[#8C857B] mt-1">{module.en}</div>
              <p className="text-sm text-[#6B665E] mt-3 max-w-2xl">{isEnglish ? module.enDesc ?? tr(module.desc) : module.desc}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {(isEnglish ? module.enTags ?? module.tags.map((tag) => tr(tag)) : module.tags).map((tag) => (
              <span key={tag} className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#F2EFE9] text-[#6B665E] border border-[#E5E0D8]">{tag}</span>
            ))}
          </div>
        </div>
      </StudioCard>

      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'overview', label: t('概覽', 'Overview'), icon: Layers3 },
          { id: 'sandbox', label: t('互動沙盒', 'Sandbox'), icon: module.section === 'elective' ? MonitorCog : FlaskConical },
          { id: 'quiz', label: t('測驗', 'Quiz'), icon: ShieldCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'overview' | 'sandbox' | 'quiz')}
            className={clsx(
              'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-colors',
              activeTab === tab.id
                ? 'bg-[#2C2A26] text-white border-[#2C2A26]'
                : 'bg-white text-[#6B665E] border-[#E5E0D8] hover:text-[#2C2A26]'
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <StudioCard className="lg:col-span-2 p-6" >
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('知識架構', 'Knowledge Architecture')}</div>
              <div className="space-y-2 text-sm text-[#4A4741]">
                {(isEnglish ? module.enPoints ?? module.points.map((point) => tr(point)) : module.points).map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: module.accent }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </StudioCard>
            <div className="lg:col-span-3 space-y-6">
              <StudioCard className="p-6" >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('核心筆記', 'Core Notes')}</div>
                <div className="space-y-3 text-sm text-[#6B665E]">
                  {(isEnglish ? module.enKnowledge ?? module.knowledge.map((item) => tr(item)) : module.knowledge).map((item) => <p key={item}>{item}</p>)}
                </div>
              </StudioCard>
              <StudioCard className="p-6" >
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('學習步驟', 'Study Steps')}</div>
                <ol className="space-y-2 text-sm text-[#4A4741]">
                  {(isEnglish ? module.enInstructions ?? module.instructions.map((instruction) => tr(instruction)) : module.instructions).map((instruction, index) => <li key={instruction}>{index + 1}. {instruction}</li>)}
                </ol>
                <button onClick={() => setActiveTab('sandbox')} className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ background: module.accent }}>
                  <Play size={16} /> {t('進入互動沙盒', 'Open Interactive Sandbox')}
                </button>
              </StudioCard>
            </div>
          </motion.div>
        )}

        {activeTab === 'sandbox' && (
          <motion.div key="sandbox" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {renderSandbox(moduleId)}
          </motion.div>
        )}

        {activeTab === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-3xl mx-auto">
            <StudioCard className="p-8" >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="text-[#D5896F]" />
                <h2 className="text-xl font-bold text-[#2C2A26]">{t('模組測驗', 'Module Quiz')}</h2>
              </div>
              <div className="space-y-8">
                {quiz.map((question, qIndex) => (
                  <div key={question.question}>
                    <div className="font-bold text-[#2C2A26] mb-3">{qIndex + 1}. {isEnglish ? question.enQuestion ?? tr(question.question) : question.question}</div>
                    <div className="space-y-2">
                      {(isEnglish ? question.enOptions ?? question.options.map((option) => tr(option)) : question.options).map((option, optionIndex) => (
                        <button
                          key={option}
                          disabled={showResult}
                          onClick={() => {
                            const next = [...answers];
                            next[qIndex] = optionIndex;
                            setAnswers(next);
                          }}
                          className={clsx(
                            'w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors',
                            showResult && optionIndex === question.answer
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              : showResult && answers[qIndex] === optionIndex && optionIndex !== question.answer
                                ? 'bg-red-50 border-red-200 text-red-700'
                                : answers[qIndex] === optionIndex
                                  ? 'bg-[#2C2A26] text-white border-[#2C2A26]'
                                  : 'bg-white border-[#E5E0D8] text-[#4A4741]'
                          )}
                        >
                          {tr(option)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-[#E5E0D8] flex flex-wrap items-center justify-between gap-4">
                {showResult ? (
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg text-[#2C2A26]">{t('得分', 'Score')}: {score} / {quiz.length}</span>
                    <button onClick={() => { setShowResult(false); setAnswers([]); }} className="inline-flex items-center gap-2 text-sm text-[#6B665E] hover:text-[#2C2A26]">
                      <RefreshCw size={16} /> {t('重試', 'Retry')}
                    </button>
                  </div>
                ) : <div className="text-xs text-[#8C857B]">{t('完成所有題目後提交', 'Answer all questions before submitting')}</div>}

                {!showResult && (
                  <button onClick={() => setShowResult(true)} disabled={answeredCount !== quiz.length} className="px-5 py-2.5 rounded-lg text-white font-bold disabled:opacity-50" style={{ background: module.accent }}>
                    {t('提交答案', 'Submit Answers')}
                  </button>
                )}
              </div>
            </StudioCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

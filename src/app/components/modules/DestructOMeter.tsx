import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Hammer, Flame, RefreshCcw, Info, Beaker, Layers, Zap } from 'lucide-react';
import clsx from 'clsx';

const materials = [
  { id: 'pine', name: '松木 (Pine Wood)', type: '天然木材', category: 'wood', image: 'https://images.unsplash.com/photo-1611600700192-d87eaeed4f81?w=400' },
  { id: 'mdf', name: '中密度纖維板 (MDF)', type: '人造板材', category: 'wood', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400' },
  { id: 'acrylic', name: '亞加力 (Acrylic)', type: '熱塑性塑膠', category: 'polymer', image: 'https://images.unsplash.com/photo-1608702540328-70b0453d0828?w=400' },
  { id: 'abs', name: 'ABS 塑膠', type: '熱塑性塑膠', category: 'polymer', image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=400' },
  { id: 'steel', name: '低碳鋼 (Mild Steel)', type: '黑色金屬', category: 'metal', image: 'https://images.unsplash.com/photo-1673083424160-4bf59a6145c3?w=400' },
  { id: 'aluminium', name: '鋁合金 (Aluminium Alloy)', type: '有色金屬', category: 'metal', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400' },
];

type TestType = 'none' | 'hammer' | 'heat' | 'scratch';

const testResults: Record<string, Record<string, string>> = {
  hammer: {
    pine: '結果：出現凹痕及木紋壓縮。松木屬軟木，抗衝擊性低，端木紋較硬。',
    mdf: '結果：局部破裂。MDF 為均質板材，無天然木紋，受衝擊後碎裂較均勻。',
    acrylic: '結果：脆性斷裂。亞加力韌性低，受衝擊後產生裂縫甚至破碎（缺口衝擊值低）。',
    abs: '結果：吸收衝擊，產生微小凹痕而不碎裂。ABS 加入丁二烯提升韌性，常用作安全帽外殼。',
    steel: '結果：輕微永久變形（塑性變形）。低碳鋼延展性強，吸收能量後彎曲不斷裂。',
    aluminium: '結果：凹痕明顯，較鋼軟。鋁合金質輕，但抗衝擊性不及鋼，常用喜結構設計補強。',
  },
  heat: {
    pine: '結果：溫度升高後開始焦化，繼而燃燒。木材為有機物，燃點約 250–300°C。',
    mdf: '結果：焦化並釋出刺激性煙氣（含甲醛）。切勿在密閉空間加熱 MDF。',
    acrylic: '結果：約 160°C 開始軟化，可塑形。屬熱塑性，冷卻後定形，可循環加工。',
    abs: '結果：約 100°C 開始軟化變形。屬熱塑性，熔點比亞加力稍低，廣用於 FDM 3D 打印。',
    steel: '結果：傳導熱量，端部發紅（約 700°C）。熔點高達 1425°C，保持形狀。',
    aluminium: '結果：傳導性極佳（熱導率 205 W/m·K），熔點 660°C，較鋼低，加工性好。',
  },
  scratch: {
    pine: '結果：用鑰匙即可刮出痕跡（莫氏硬度約 1–2）。木材表面硬度低，需塗層保護。',
    mdf: '結果：易刮花，硬度比實木低。表面需貼皮或烤漆處理以提高耐磨性。',
    acrylic: '結果：容易出現刮痕（HRC 約 85–90，布氏硬度 HB 約 200）。拋光可去除淺刮痕。',
    abs: '結果：可見刮痕，硬度適中（洛氏硬度 R 105）。比亞加力稍耐刮，但仍需面層保護。',
    steel: '結果：難以刮花（維氏硬度 HV 約 120）。需耐磨鋼材（如 Hardox）抵抗磨損。',
    aluminium: '結果：可刮花，比鋼軟（HB 約 60–100）。可陽極氧化處理（Anodising）增加硬度。',
  },
};

// K3 material classification theory data
const k3Theory = [
  { category: '黑色金屬 (Ferrous Metals)', color: 'bg-slate-100 border-slate-200', items: ['低碳鋼 — 延展性強，易焊接', '高碳鋼 — 硬而脆，用作刀具', '不銹鋼 — 耐腐蝕，含鉻'] },
  { category: '有色金屬 (Non-Ferrous Metals)', color: 'bg-amber-50 border-amber-100', items: ['鋁合金 — 質輕耐腐蝕', '黃銅 — 易加工，導電性好', '銅 — 導電導熱性極佳'] },
  { category: '熱塑性塑膠 (Thermoplastics)', color: 'bg-blue-50 border-blue-100', items: ['亞加力 — 透明，易成形', 'ABS — 韌性高，用於 3D 打印', 'HDPE — 耐化學品，食品容器級'] },
  { category: '木材及板材 (Wood & Board)', color: 'bg-orange-50 border-orange-100', items: ['硬木 (Hardwood) — 橡木、柚木', '軟木 (Softwood) — 松木、雲杉', '人造板 — MDF、膠合板、刨花板'] },
];

export const DestructOMeter = () => {
  const { completeModule, selectedLevel } = useGame();
  const { t, tr } = useLanguage();
  const [selectedMaterial, setSelectedMaterial] = useState('pine');
  const [activeTest, setActiveTest] = useState<TestType>('none');
  const [testResult, setTestResult] = useState<string | null>(null);

  const moduleCode = selectedLevel === 'S1' ? 'K3 – S1' : selectedLevel === 'S2' ? 'K3 – 中二' : 'K3 – 中三';

  const runTest = (test: Exclude<TestType, 'none'>) => {
    setActiveTest(test);
    setTestResult(null);
    setTimeout(() => {
      setTestResult(testResults[test]?.[selectedMaterial] ?? t('測試結果暫無數據。', 'No test data available.'));
      completeModule('materials');
    }, 1500);
  };

  const reset = () => {
    setActiveTest('none');
    setTestResult(null);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
       <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm">
        <div className="flex items-center space-x-2 text-emerald-600 mb-1">
             <Beaker size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">{moduleCode}</span>
          </div>
        <h2 className="text-2xl font-bold text-[#2C2A26]">{t('物料特性測試', 'Material Properties Lab')}</h2>
        <p className="text-[#6B665E] text-sm mt-1">{t('選擇一種物料並進行標準測試，觀察其物理特性。', 'Choose a material and perform a standard test to observe its physical properties.')}</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm">
            <h3 className="text-xs font-bold text-[#8C857B] uppercase mb-4 tracking-wider">{t('1. 樣本選擇', '1. Select Specimen')}</h3>
            <div className="space-y-3">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedMaterial(m.id); reset(); }}
                  className={clsx(
                    "w-full flex items-center space-x-3 p-3 rounded-lg border transition-all text-left",
                    selectedMaterial === m.id 
                      ? "bg-emerald-50 border-emerald-200 shadow-sm" 
                      : "bg-white border-[#F0F0F0] hover:border-[#E5E0D8] hover:bg-[#FAF9F6]"
                  )}
                >
                  <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden border border-[#E5E0D8]">
                    <img src={m.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div>
                    <div className={clsx("font-bold text-sm", selectedMaterial === m.id ? "text-emerald-800" : "text-[#2C2A26]")}>{tr(m.name)}</div>
                    <div className="text-xs text-[#6B665E]">{tr(m.type)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm">
            <h3 className="text-xs font-bold text-[#8C857B] uppercase mb-4 tracking-wider">{t('2. 測試方法', '2. Test Method')}</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => runTest('hammer')}
                disabled={activeTest !== 'none'}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 disabled:opacity-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mb-2 group-hover:bg-white transition-colors">
                  <Hammer className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-xs font-bold text-slate-700">{t('衝擊/硬度', 'Impact / Hardness')}</span>
              </button>
              <button
                 onClick={() => runTest('heat')}
                 disabled={activeTest !== 'none'}
                 className="flex flex-col items-center justify-center p-4 rounded-xl bg-orange-50 border border-orange-200 hover:bg-orange-100 hover:border-orange-300 disabled:opacity-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center mb-2 group-hover:bg-white transition-colors">
                  <Flame className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs font-bold text-orange-700">{t('熱特性', 'Thermal Properties')}</span>
              </button>
              <button
                onClick={() => runTest('scratch')}
                disabled={activeTest !== 'none'}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 disabled:opacity-50 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mb-2 group-hover:bg-white transition-colors">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs font-bold text-purple-700">{t('表面硬度', 'Surface Hardness')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Simulation Area */}
        <div className="lg:col-span-2 bg-[#F5F5F0] rounded-2xl border border-[#E5E0D8] relative overflow-hidden flex flex-col items-center justify-center p-12">
           <div className="absolute inset-0 bg-[radial-gradient(#E5E0D8_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
           
           {/* The Stage */}
           <div className="relative z-10 w-full max-w-md h-64 bg-white rounded-lg shadow-sm border border-[#E5E0D8] flex items-end justify-center pb-12 overflow-hidden">
             
             {/* The Material Specimen */}
             <motion.div
               key={selectedMaterial}
               initial={{ y: -20, opacity: 0 }}
               animate={{ 
                  y: 0, 
                  opacity: 1,
                  rotateX: activeTest === 'heat' && selectedMaterial === 'acrylic' ? 45 : 0,
                  scale: activeTest === 'hammer' && (selectedMaterial === 'pine' || selectedMaterial === 'mdf') ? 0.95 : 1,
                  filter: activeTest === 'heat' && (selectedMaterial === 'steel' || selectedMaterial === 'aluminium') ? 'brightness(1.1) sepia(0.5) hue-rotate(-15deg) saturate(3)' : 'none',
                  backgroundColor: activeTest === 'heat' && (selectedMaterial === 'pine' || selectedMaterial === 'mdf') ? '#5D4037' : 'rgba(0,0,0,0)'
               }}
               className="w-40 h-40 bg-cover bg-center shadow-lg relative rounded-sm"
               style={{ 
                 backgroundImage: `url(${materials.find(m => m.id === selectedMaterial)?.image})`,
               }}
             >
                {/* Shatter Effect for Acrylic */}
                {activeTest === 'hammer' && selectedMaterial === 'acrylic' && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm"
                   >
                     <span className="text-sm font-bold text-slate-800 border-2 border-slate-800 px-2 py-1 transform -rotate-12">{t('斷裂', 'FRACTURED')}</span>
                   </motion.div>
                )}
             </motion.div>

             {/* Tools Animation */}
             <AnimatePresence>
               {activeTest === 'hammer' && (
                 <motion.div
                   initial={{ rotate: -45, x: 100, y: -100 }}
                   animate={{ rotate: [-45, -90, 0], x: [100, 100, 0], y: [-100, -100, -40] }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.5, times: [0, 0.2, 1] }}
                   className="absolute top-10 right-10 z-20"
                 >
                   <Hammer size={100} className="text-slate-700 drop-shadow-lg" fill="#475569" />
                 </motion.div>
               )}
                {activeTest === 'heat' && (
                 <motion.div
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1.2 }}
                   exit={{ opacity: 0 }}
                   className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20"
                 >
                   <Flame size={100} className="text-orange-500 animate-pulse drop-shadow-lg" fill="#F97316" />
                 </motion.div>
               )}
             </AnimatePresence>

           </div>

           {/* Results Overlay */}
           <AnimatePresence>
             {testResult && (
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mt-6 w-full max-w-lg bg-white border border-[#E5E0D8] text-[#4A4741] px-6 py-4 rounded-xl flex items-start space-x-3 shadow-sm"
               >
                 <Info className="w-5 h-5 flex-shrink-0 text-blue-500 mt-0.5" />
                  <span className="text-sm leading-relaxed">{testResult ? tr(testResult) : ''}</span>
                 <button onClick={reset} className="ml-auto p-1 hover:bg-[#F0F0F0] rounded-full text-[#8C857B]">
                    <RefreshCcw size={16} />
                 </button>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      {/* K3 Theory Panel */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-emerald-50 to-white">
          <Layers size={18} className="text-emerald-600" />
          <h3 className="font-bold text-[#2C2A26]">{t('K3 物料分類 — EDB 課程重點', 'K3 Material Classification — EDB Key Points')}</h3>
          <span className="ml-auto text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full font-medium">{t('理論參考', 'Theory Reference')}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          {k3Theory.map((cat, i) => (
            <div key={i} className={`rounded-xl p-4 border ${cat.color}`}>
              <div className="font-bold text-[#2C2A26] text-sm mb-3">{tr(cat.category)}</div>
              <ul className="space-y-1.5">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-xs text-[#4A4741] flex items-start space-x-2">
                    <span className="text-[#CCA068] mt-0.5 flex-shrink-0">▸</span>
                    <span>{tr(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-6 pb-4 text-xs text-[#8C857B] border-t border-[#E5E0D8] pt-3">
          {t('參考來源：EDB《設計與科技》課程指引 — 物料及資源（K3）；香港考試及評核局 DAT 課程大綱', 'Source: EDB Design and Technology Curriculum Guide — Materials and Resources (K3); HKEAA DAT syllabus')}
        </div>
      </div>
    </div>
  );
};

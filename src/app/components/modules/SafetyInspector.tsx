import { useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, CheckCircle, Info, BookOpen, Shield } from 'lucide-react';

const WORKSHOP_IMAGE = "https://images.unsplash.com/photo-1581092921461-eab62e97a783?q=80&w=2070&auto=format&fit=crop";

const hazards = [
  { id: 1, x: 25, y: 75, label: '絆倒危險 (Trip Hazard)', tip: '地上散落的電線或工具是常見的絆倒隱患，應立即清理。', type: 'trip' },
  { id: 2, x: 55, y: 35, label: '欠缺護目鏡 (Missing Goggles)', tip: '進行切割、打磨或鑽孔時必須佩戴防護眼鏡（ANSI Z87.1標準）。', type: 'ppe' },
  { id: 3, x: 85, y: 65, label: '地面濕滑 (Spill Hazard)', tip: '液體溢出必須立即清理並放置警告標誌，防止滑倒受傷。', type: 'slip' },
  { id: 4, x: 15, y: 40, label: '未固定工件 (Unsecured Workpiece)', tip: '加工前必須用夾具或虎口鉗固定工件，防止工件飛出造成傷害。', type: 'clamp' },
  { id: 5, x: 70, y: 20, label: '長髮未束起 (Loose Hair)', tip: '長髮、領帶及寬鬆衣物在機器旁工作時必須固定，避免被捲入旋轉機件。', type: 'ppe' },
  { id: 6, x: 45, y: 80, label: '防護罩移除 (Guard Removed)', tip: '機器防護罩（Machine Guard）必須在操作時保持原位，保護操作者免受傷害。', type: 'guard' },
];

// EDB K5 safety rules
const safetyRules = [
  { rule: '個人防護裝備 (PPE)', items: ['護目鏡 (Safety Goggles)', '防護手套 (Gloves) — 視情況使用', '安全鞋 (Safety Boots)', '護耳裝置 (Ear Protection) — 高噪音工具'] },
  { rule: '工具正確使用', items: ['按工具設計用途使用', '使用前檢查工具狀態', '鋒利工具遠離身體方向切割', '不使用時放回指定位置'] },
  { rule: '機器安全操作', items: ['啟動前確認防護罩在位', '長髮及寬鬆衣物必須固定', '工件必須用夾具固定', '機器運轉時不可徒手清潔'] },
  { rule: '工場環境整理', items: ['工作台保持整潔', '通道保持暢通', '廢料即時清理', '液體溢出即時處理'] },
];

export const SafetyInspector = () => {
  const { completeModule, selectedLevel } = useGame();
  const { t, tr } = useLanguage();
  const [foundHazards, setFoundHazards] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const moduleCode = selectedLevel === 'S1' ? 'K5 – S1a' : selectedLevel === 'S2' ? 'K5 – 中二' : 'K5 – 中三';

  const handleHazardClick = (id: number) => {
    if (!foundHazards.includes(id)) {
      const newFound = [...foundHazards, id];
      setFoundHazards(newFound);
      if (newFound.length === hazards.length) {
        setShowSuccess(true);
        completeModule('safety');
      }
    }
  };

  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).dataset.hazard !== 'true') {
      setMistakes(p => p + 1);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-orange-600 mb-1">
             <AlertTriangle size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">{moduleCode}</span>
          </div>
           <h2 className="text-2xl font-bold text-[#2C2A26]">{t('工具及儀器安全', 'Workshop Safety')}</h2>
           <p className="text-[#6B665E] text-sm mt-1">{t('識別工場內的潛在危險，確保工作環境安全。', 'Identify hazards in the workshop and keep the environment safe.')}</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <div className="text-right">
             <div className="text-xs font-bold text-[#8C857B] uppercase">{t('狀態', 'Status')}</div>
             <div className="font-mono text-xl text-[#2C2A26] font-bold">
               {foundHazards.length} / {hazards.length} <span className="text-sm font-normal text-[#6B665E]">{t('已發現', 'found')}</span>
             </div>
           </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-[#E5E0D8] shadow-sm bg-[#F0F0F0]">
        <div 
          className="absolute inset-0 bg-cover bg-center cursor-crosshair"
          style={{ backgroundImage: `url('${WORKSHOP_IMAGE}')` }}
          onClick={handleBackgroundClick}
        >
          {/* Hazards */}
          {hazards.map((hazard) => (
            <div
              key={hazard.id}
              data-hazard="true"
              className="absolute w-20 h-20 -ml-10 -mt-10 flex items-center justify-center group"
              style={{ left: `${hazard.x}%`, top: `${hazard.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                handleHazardClick(hazard.id);
              }}
            >
              {foundHazards.includes(hazard.id) ? (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-lg flex flex-col space-y-1 border border-emerald-200 max-w-[200px]"
                >
                  <div className="flex items-center space-x-2 text-emerald-700">
                    <CheckCircle size={14} />
                    <span className="text-xs font-bold whitespace-nowrap">{tr(hazard.label)}</span>
                  </div>
                  <p className="text-xs text-[#6B665E] leading-tight">{tr(hazard.tip)}</p>
                </motion.div>
              ) : (
                <div className="w-full h-full rounded-full border-2 border-transparent hover:border-orange-400/50 flex items-center justify-center transition-all duration-300 relative">
                  <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-orange-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none transition-opacity">
                    {t('點擊識別', 'Click to identify')}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instructions Overlay */}
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-[#E5E0D8] shadow-sm max-w-xs">
           <div className="flex items-start space-x-3">
             <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
             <div className="text-xs text-[#4A4741]">
               <strong className="block mb-1 text-[#2C2A26]">{t('指引', 'Instructions')}</strong>
               {t('點擊場景中的不安全物品或行為。尋找散落的物品、缺少的安全裝備或溢出物。', 'Click unsafe objects or behaviours in the scene. Look for loose items, missing safety equipment, or spills.')}
             </div>
           </div>
        </div>

        {/* Mistake Indicator */}
        <AnimatePresence>
          {mistakes > 0 && (
            <motion.div
              key={mistakes}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center bg-red-500/10"
            >
               <div className="bg-white px-6 py-3 rounded-full shadow-xl text-red-600 font-bold flex items-center space-x-2">
                 <AlertTriangle size={20} />
                 <span>{t('繼續尋找！該區域是安全的。', 'Keep looking. That area is safe.')}</span>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-800">{t('檢查完成', 'Inspection Complete')}</h3>
                <p className="text-emerald-600 text-sm">{t('你已識別出所有危險。工場現在安全了。', 'You identified all hazards. The workshop is now safe.')}</p>
              </div>
            </div>
            <button 
               onClick={() => { setFoundHazards([]); setShowSuccess(false); setMistakes(0); }}
               className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-50 text-sm font-medium transition-colors"
            >
              {t('再次檢查', 'Inspect Again')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* K5 Theory Panel */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-orange-50 to-white">
          <BookOpen size={18} className="text-orange-500" />
          <h3 className="font-bold text-[#2C2A26]">{t('K5 工場安全知識 — EDB 課程重點', 'K5 Workshop Safety Knowledge — EDB Key Points')}</h3>
          <span className="ml-auto text-xs text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-full font-medium">{t('理論參考', 'Theory Reference')}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 p-6">
          {safetyRules.map((section, i) => (
            <div key={i} className="bg-orange-50/50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center space-x-2 mb-3">
                <Shield size={14} className="text-orange-500" />
                <span className="font-bold text-[#2C2A26] text-sm">{tr(section.rule)}</span>
              </div>
              <ul className="space-y-1.5">
                {section.items.map((item, j) => (
                  <li key={j} className="text-xs text-[#4A4741] flex items-start space-x-2">
                    <span className="text-orange-400 mt-0.5 flex-shrink-0">▸</span>
                    <span>{tr(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-6 pb-4 text-xs text-[#8C857B] border-t border-[#E5E0D8] pt-3">
          {t('參考來源：EDB《設計與科技》課程指引 — 工具及儀器的安全使用（K5）、《職業安全及健康條例》（香港法例第509章）', 'Source: EDB Design and Technology Curriculum Guide — Safe Use of Tools and Equipment (K5); Occupational Safety and Health Ordinance (Hong Kong Cap. 509)')}
        </div>
      </div>
    </div>
  );
};

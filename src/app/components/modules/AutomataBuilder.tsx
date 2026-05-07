import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Play, Square, Rabbit, Settings, Calculator, BookOpen } from 'lucide-react';
import clsx from 'clsx';

const cams = [
  { id: 'eccentric', name: '偏心輪 (Eccentric Cam)', description: '產生平滑、連續的上下運動 (簡諧運動)。', type: 'smooth' },
  { id: 'pear', name: '梨形輪 (Pear Cam)', description: '上升、下降，並有一段靜止 (Dwell) 時間。', type: 'dwell' },
  { id: 'snail', name: '蝸牛輪 (Snail Cam)', description: '緩慢上升，隨後突然下降。', type: 'drop' },
];

export const AutomataBuilder = () => {
  const { completeModule, selectedLevel } = useGame();
  const { t, tr } = useLanguage();
  const [selectedCam, setSelectedCam] = useState('eccentric');
  const [isPlaying, setIsPlaying] = useState(false);
  const [followerY, setFollowerY] = useState(0);
  const [driverTeeth, setDriverTeeth] = useState(20);
  const [drivenTeeth, setDrivenTeeth] = useState(40);

  const gearRatio = (drivenTeeth / driverTeeth).toFixed(2);
  const speedRatio = (driverTeeth / drivenTeeth).toFixed(2);
  const torqueMultiplier = (drivenTeeth / driverTeeth).toFixed(2);

  const moduleCode = selectedLevel === 'S1' ? 'K4 – S1' : selectedLevel === 'S2' ? 'K4 – 中二' : 'K4 – 中三';

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) % 2000;
      const progress = elapsed / 2000;

      let y = 0;
      if (selectedCam === 'eccentric') {
        y = Math.sin(progress * Math.PI * 2) * 20;
      } else if (selectedCam === 'pear') {
        if (progress < 0.5) y = Math.sin(progress * Math.PI * 4) * 20;
        else y = 0;
      } else if (selectedCam === 'snail') {
        if (progress < 0.9) y = progress * 40 - 20;
        else y = -20;
      }

      setFollowerY(y);

      if (isPlaying) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, selectedCam]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && selectedCam === 'snail') {
      setTimeout(() => completeModule('mechanisms'), 3000);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
       <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm">
        <div className="flex items-center space-x-2 text-amber-600 mb-1">
             <Settings size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">{moduleCode}</span>
          </div>
        <h2 className="text-2xl font-bold text-[#2C2A26]">{t('機械結構', 'Mechanisms')}</h2>
        <p className="text-[#6B665E] text-sm mt-1">{t('嘗試不同的凸輪 (Cam) 形狀來控制從動件 (Follower) 的運動。', 'Try different cam profiles to control the motion of the follower.')}</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
           <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm">
             <h3 className="text-xs font-bold text-[#8C857B] uppercase mb-4 tracking-wider">{t('凸輪選擇', 'Cam Profile')}</h3>
             <div className="space-y-3">
               {cams.map((cam) => (
                 <button
                   key={cam.id}
                   onClick={() => { setSelectedCam(cam.id); setIsPlaying(false); }}
                   className={clsx(
                     "w-full text-left p-4 rounded-xl border transition-all",
                     selectedCam === cam.id 
                       ? "bg-amber-50 border-amber-200 shadow-sm" 
                       : "bg-white border-[#F0F0F0] hover:bg-[#FAF9F6] hover:border-[#E5E0D8]"
                   )}
                 >
                   <div className={clsx("font-bold text-sm", selectedCam === cam.id ? "text-amber-800" : "text-[#2C2A26]")}>{tr(cam.name)}</div>
                   <div className="text-xs text-[#6B665E] mt-1 leading-relaxed">{tr(cam.description)}</div>
                 </button>
               ))}
             </div>
           </div>

           <button
             onClick={handlePlay}
             className={clsx(
               "w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-sm border",
               isPlaying 
                 ? "bg-white border-[#E5E0D8] text-[#2C2A26] hover:bg-[#F9F8F6]" 
                 : "bg-amber-600 border-amber-700 text-white hover:bg-amber-700"
             )}
           >
             {isPlaying ? <><Square size={18} fill="currentColor" /> <span>{t('停止模擬', 'Stop Simulation')}</span></> : <><Play size={18} fill="currentColor" /> <span>{t('開始模擬', 'Start Simulation')}</span></>}
           </button>
        </div>

        <div className="lg:col-span-2 bg-[#F5F5F0] rounded-2xl border border-[#E5E0D8] relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }} />
            
            {/* Simulation View */}
            <div className="relative w-full max-w-lg h-96 flex flex-col items-center justify-end pb-12">
               
               {/* Guide Lines */}
               <div className="absolute top-10 bottom-32 w-px bg-dashed border-l border-[#D5D0C8] border-dashed" />

               {/* Toy / Follower */}
               <div className="relative z-10 flex flex-col items-center">
                  <motion.div 
                    className="mb-2"
                    style={{ y: -followerY }}
                  >
                    <Rabbit size={56} className="text-[#8A9A5B]" />
                  </motion.div>
                  
                  {/* Follower Rod */}
                  <motion.div 
                      className="w-3 bg-[#A8A29A] rounded-t-sm shadow-sm border-x border-[#8C857B]"
                      style={{ 
                        height: '160px', 
                        y: -followerY
                      }}
                  />
               </div>

               {/* Cam Mechanism */}
               <div className="relative z-20 mt-[-20px]">
                  {/* Axle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#6B665E] rounded-full z-30 shadow-sm" />
                  
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying ? { repeat: Infinity, duration: 2, ease: "linear" } : { duration: 0.5 }}
                    className="w-32 h-32 bg-[#E0C097] rounded-full border-4 border-[#C0A077] relative flex items-center justify-center shadow-md"
                  >
                     {/* Cam Shape Visuals */}
                     {selectedCam === 'eccentric' && (
                       <div className="absolute w-full h-full rounded-full border-2 border-dashed border-[#A68A64]/50" style={{ transform: 'translate(10px, 0)' }} />
                     )}
                     {selectedCam === 'pear' && (
                       <div className="absolute w-24 h-36 bg-[#E0C097] rounded-[50%] -top-8 border-4 border-[#C0A077]" style={{ zIndex: -1 }} />
                     )}
                     {selectedCam === 'snail' && (
                       <svg className="absolute inset-0 w-full h-full text-[#C0A077]" viewBox="0 0 100 100">
                         <path d="M50,50 L50,10 A40,40 0 1,1 90,50 Z" fill="#E0C097" stroke="currentColor" strokeWidth="4" />
                       </svg>
                     )}
                  </motion.div>
               </div>
               
               {/* Base */}
               <div className="absolute bottom-0 w-full h-4 bg-[#6B665E] rounded-full opacity-10 blur-xl" />
            </div>

            {/* Task Info */}
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur px-4 py-3 rounded-xl border border-[#E5E0D8] shadow-sm max-w-xs">
                 <div className="text-xs font-bold text-[#8C857B] uppercase mb-1">{t('目標', 'Goal')}</div>
                 <div className="text-sm font-medium text-[#2C2A26]">{t('選擇', 'Choose')} <span className="text-amber-600 font-bold">{tr('蝸牛輪 (Snail Cam)')}</span> {t('使兔子突然跳起。', 'to make the rabbit jump suddenly.')}</div>
            </div>
        </div>
      </div>

      {/* Gear Ratio Calculator + K4 Theory */}
      <div className="grid grid-cols-2 gap-6">
        {/* Gear Ratio Calculator */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-amber-50 to-white">
            <Calculator size={16} className="text-amber-600" />
            <h3 className="font-bold text-[#2C2A26] text-sm">{t('齒輪比計算器', 'Gear Ratio Calculator')}</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#8C857B] uppercase mb-2">{t('主動齒輪齒數', 'Driver Gear Teeth')}</label>
                <input
                  type="number" min={4} max={120} value={driverTeeth}
                  onChange={e => setDriverTeeth(Math.max(4, parseInt(e.target.value) || 4))}
                  className="w-full border border-[#E5E0D8] rounded-lg px-3 py-2 text-center font-mono text-lg font-bold text-[#2C2A26] focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#8C857B] uppercase mb-2">{t('從動齒輪齒數', 'Driven Gear Teeth')}</label>
                <input
                  type="number" min={4} max={120} value={drivenTeeth}
                  onChange={e => setDrivenTeeth(Math.max(4, parseInt(e.target.value) || 4))}
                  className="w-full border border-[#E5E0D8] rounded-lg px-3 py-2 text-center font-mono text-lg font-bold text-[#2C2A26] focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-[#8C857B] font-bold uppercase mb-1">{t('齒輪比', 'Gear Ratio')}</div>
                <div className="font-mono text-2xl font-bold text-amber-700">{gearRatio}:1</div>
              </div>
              <div>
                <div className="text-xs text-[#8C857B] font-bold uppercase mb-1">{t('速度比', 'Speed Ratio')}</div>
                <div className="font-mono text-2xl font-bold text-amber-700">×{speedRatio}</div>
                <div className="text-[10px] text-[#A8A29A]">{parseFloat(speedRatio) < 1 ? t('減速', 'Speed Reduction') : t('增速', 'Speed Increase')}</div>
              </div>
              <div>
                <div className="text-xs text-[#8C857B] font-bold uppercase mb-1">{t('扭矩倍數', 'Torque Multiplier')}</div>
                <div className="font-mono text-2xl font-bold text-amber-700">×{torqueMultiplier}</div>
                <div className="text-[10px] text-[#A8A29A]">{parseFloat(torqueMultiplier) > 1 ? t('增加扭力', 'Higher Torque') : t('減少扭力', 'Lower Torque')}</div>
              </div>
            </div>
            <p className="text-xs text-[#8C857B]">{t('齒輪比 = 從動齒數 ÷ 主動齒數 | 速度與扭矩成反比 (能量守恆)', 'Gear ratio = driven teeth ÷ driver teeth | Speed and torque are inversely related (energy conservation)')}</p>
          </div>
        </div>

        {/* K4 Theory Panel */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-yellow-50 to-white">
            <BookOpen size={16} className="text-yellow-600" />
            <h3 className="font-bold text-[#2C2A26] text-sm">{t('K4 機械結構 — EDB 課程重點', 'K4 Mechanisms — EDB Key Points')}</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {[
              { title: '連桿機構 (Linkage)', desc: '將旋轉運動轉換為往復直線運動，應用於活塞引擎、縫紉機。' },
              { title: '凸輪機構 (Cam & Follower)', desc: '不規則形狀凸輪旋轉驅動從動件，產生預設運動模式（靜止/上升/下降）。' },
              { title: '齒輪系統 (Gear Train)', desc: '透過不同齒數比改變速度和扭矩，廣用於時鐘、變速箱。' },
              { title: '螺桿機構 (Screw Mechanism)', desc: '旋轉運動轉換為線性推力，應用於虎口鉗、千斤頂、3D 打印機進給。' },
            ].map((item, i) => (
              <div key={i} className="bg-yellow-50/60 border border-yellow-100 rounded-xl p-3">
                <div className="font-bold text-[#2C2A26] text-xs mb-1.5">{tr(item.title)}</div>
                <p className="text-xs text-[#6B665E] leading-snug">{tr(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

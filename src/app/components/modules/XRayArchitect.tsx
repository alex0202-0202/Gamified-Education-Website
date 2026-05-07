import { useState, type ReactNode } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Box, Check, RotateCw, PenTool, BookOpen, Ruler } from 'lucide-react';
import clsx from 'clsx';

const ItemType = 'VIEW_CARD';

const views = [
  { id: 'front', label: '正視圖 (Front)', content: <div className="w-12 h-16 bg-white border-2 border-[#2C2A26] relative"><div className="absolute top-0 right-0 w-8 h-8 bg-[#E5E0D8] border-l-2 border-b-2 border-[#2C2A26]"/></div> },
  { id: 'plan', label: '俯視圖 (Plan)', content: <div className="w-12 h-12 bg-white border-2 border-[#2C2A26] relative flex items-center justify-center"><div className="w-full h-px bg-[#2C2A26]" /></div> },
  { id: 'end', label: '側視圖 (End)', content: <div className="w-8 h-16 bg-white border-2 border-[#2C2A26] relative flex flex-col justify-end"><div className="w-full h-8 border-t-2 border-[#2C2A26] border-dashed" /></div> },
];

export const XRayArchitect = () => {
  const { completeModule, selectedLevel } = useGame();
  const { t, tr } = useLanguage();
  const [placed, setPlaced] = useState<{ [key: string]: string | null }>({ front: null, plan: null, end: null });
  const [rotation, setRotation] = useState(0);

  const moduleCode = selectedLevel === 'S1'
    ? 'K6 – S1a'
    : selectedLevel === 'S2'
      ? 'K6 – 中二'
      : selectedLevel === 'S3'
        ? 'K6 – 中三'
        : selectedLevel === 'S4_S6'
          ? 'DAT 模組五'
          : 'Projection Master';

  const handleDrop = (slot: string, viewId: string) => {
    setPlaced((prev) => {
       const newPlaced = { ...prev, [slot]: viewId };
       if (newPlaced.front === 'front' && newPlaced.plan === 'plan' && newPlaced.end === 'end') {
         setTimeout(() => completeModule('design'), 500);
       }
       return newPlaced;
    });
  };

  const isComplete = placed.front === 'front' && placed.plan === 'plan' && placed.end === 'end';

  return (
    <div className="h-full flex flex-col space-y-6">
       <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 mb-1">
             <PenTool size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">{moduleCode}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('正投影圖', 'Orthographic Projection')}</h2>
          <p className="text-[#6B665E] text-sm mt-1">{t('將正確的 2D 視圖與 3D L形塊模型進行配對。', 'Match the correct 2D views with the 3D L-shaped block model.')}</p>
        </div>
        <button 
          onClick={() => setRotation(p => p + 90)}
          className="flex items-center space-x-2 bg-[#F2EFE9] px-4 py-2 rounded-lg text-[#6B665E] hover:bg-[#E5E0D8] transition-colors"
        >
          <RotateCw size={18} />
          <span className="text-xs font-bold">{t('旋轉 3D 模型', 'Rotate 3D Model')}</span>
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 3D Viewer */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] flex items-center justify-center relative overflow-hidden shadow-sm">
           {/* Graph paper background */}
           <div className="absolute inset-0 bg-[linear-gradient(#E5E0D8_1px,transparent_1px),linear-gradient(90deg,#E5E0D8_1px,transparent_1px)] bg-[size:20px_20px]" />
           
           <motion.div 
             animate={{ rotateY: rotation, rotateX: -15 }}
             transition={{ duration: 0.5 }}
             className="relative w-48 h-48 preserve-3d"
             style={{ transformStyle: 'preserve-3d' }}
           >
             {/* 3D Model with softer colors */}
             {/* Front Face */}
             <div className="absolute inset-0 bg-[#D5896F] border border-[#B06D55] opacity-90" style={{ transform: 'translateZ(48px)', clipPath: 'polygon(0 0, 33% 0, 33% 50%, 100% 50%, 100% 100%, 0 100%)' }} />
             {/* Back Face */}
             <div className="absolute inset-0 bg-[#A66851] border border-[#8C5542] opacity-90" style={{ transform: 'rotateY(180deg) translateZ(48px)' }} />
             {/* Right Face */}
             <div className="absolute inset-0 bg-[#C07A60] border border-[#A66851] opacity-90" style={{ transform: 'rotateY(90deg) translateZ(48px)', width: '96px', left: '48px' }} />
             {/* Left Face */}
             <div className="absolute inset-0 bg-[#E09D83] border border-[#C07A60] opacity-90" style={{ transform: 'rotateY(-90deg) translateZ(48px)', width: '96px', left: '48px', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 100%, 50% 50%, 0 50%)' }} />
             {/* Top Face */}
             <div className="absolute inset-0 bg-[#E8B49E] border border-[#D5896F] opacity-90" style={{ transform: 'rotateX(90deg) translateZ(48px)', height: '96px', top: '48px' }} />
             {/* Bottom Face */}
             <div className="absolute inset-0 bg-[#8C5542] border border-[#5D3A2D] opacity-90" style={{ transform: 'rotateX(-90deg) translateZ(48px)', height: '96px', top: '48px' }} />
           </motion.div>
        </div>

        {/* Drawing Board */}
        <div className="bg-[#F9F8F6] rounded-2xl border border-[#E5E0D8] p-8 flex flex-col">
           <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 mb-8">
              <div className="border border-dashed border-[#C0BAB2] rounded-lg flex items-center justify-center text-[#C0BAB2] font-mono text-xs font-bold text-center">{t('投影參考', 'Projection Reference')}<br/>(Reference)</div>
              <DropSlot id="plan" label={t('俯視圖', 'Plan View')} placedId={placed.plan} onDrop={(id) => handleDrop('plan', id)} correct={placed.plan === 'plan'} />
              <DropSlot id="front" label={t('正視圖', 'Front View')} placedId={placed.front} onDrop={(id) => handleDrop('front', id)} correct={placed.front === 'front'} />
              <DropSlot id="end" label={t('側視圖', 'Side View')} placedId={placed.end} onDrop={(id) => handleDrop('end', id)} correct={placed.end === 'end'} />
           </div>

           <div className="bg-white p-6 rounded-xl border border-[#E5E0D8] shadow-sm">
             <h3 className="text-xs font-bold text-[#8C857B] uppercase mb-4 tracking-wider text-center">{t('將視圖拖曳到正確位置', 'Drag each view to the correct position')}</h3>
             <div className="flex space-x-6 justify-center">
               {views.map((view) => {
                 if (Object.values(placed).includes(view.id)) return null;
                 return <DraggableItem key={view.id} id={view.id} content={view.content} label={tr(view.label)} />;
               })}
               {Object.values(placed).filter(Boolean).length === 3 && isComplete && (
                  <div className="text-emerald-600 font-bold flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                    <Check size={18} /> <span>{t('投影正確', 'Projection Correct')}</span>
                  </div>
               )}
             </div>
           </div>
        </div>
      </div>

      {/* K6 Theory Panel */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-blue-50 to-white">
          <BookOpen size={16} className="text-blue-600" />
          <h3 className="font-bold text-[#2C2A26]">{t('K6 設計呈現 — 正投影圖規則 (EDB 課程重點)', 'K6 Design Representation — Orthographic Projection Rules')}</h3>
          <span className="ml-auto text-xs text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-medium">{t('理論參考', 'Theory Reference')}</span>
        </div>
        <div className="grid grid-cols-4 gap-4 p-6">
          {[
            { icon: <Ruler size={14} />, title: 'First-Angle Projection', desc: t('香港及英國標準（BS 8888）採用第一角投影，視圖置於對應面的對面位置。', 'Hong Kong and UK standards (BS 8888) use first-angle projection, placing views on the opposite side of the observed face.'), tag: 'ISO E' },
            { icon: <Box size={14} />, title: t('三視圖排列', 'Three-view Arrangement'), desc: t('正視圖 (Front) 為主視圖，俯視圖 (Plan) 在正視圖正下方，側視圖 (End) 在左側。', 'The front view is the principal view. The plan sits below it and the end view is placed on the left in this standard arrangement.'), tag: t('排列規則', 'Layout Rule') },
            { icon: <PenTool size={14} />, title: t('線型規範', 'Line Conventions'), desc: t('實線：可見輪廓；虛線：隱藏線；點劃線：中心線或對稱軸；細實線：尺標寸線。', 'Solid lines show visible outlines, dashed lines show hidden detail, chain lines show centres or symmetry, and thin solid lines mark dimensions.'), tag: 'BS ISO 128' },
            { icon: <Check size={14} />, title: t('尺寸標注', 'Dimensioning'), desc: t('尺寸線使用箭頭，單位為毫米（mm），數字寫在尺寸線上方或中斷處，避免重複。', 'Dimension lines use arrowheads, values are given in millimetres, and dimensions should be placed clearly without duplication.'), tag: 'BS ISO 129' },
          ].map((item, i) => (
            <div key={i} className="bg-blue-50/40 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2 text-blue-700">
                {item.icon}
                <span className="font-bold text-[#2C2A26] text-xs">{item.title}</span>
              </div>
              <p className="text-xs text-[#6B665E] leading-snug mb-2">{item.desc}</p>
              <span className="text-[10px] font-mono text-blue-600 bg-white border border-blue-100 px-1.5 py-0.5 rounded">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DraggableItem = ({ id, content, label }: { id: string, content: ReactNode, label: string }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        if (node) drag(node);
      }}
      className={clsx(
        "cursor-grab active:cursor-grabbing p-3 bg-[#F9F8F6] rounded-lg border border-[#E5E0D8] flex flex-col items-center space-y-2 hover:shadow-md transition-all",
        isDragging && "opacity-50"
      )}
    >
      {content}
      <span className="text-[10px] text-[#4A4741] font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
};

const DropSlot = ({ label, placedId, onDrop, correct }: { id: string, label: string, placedId: string | null, onDrop: (id: string) => void, correct: boolean }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const placedView = views.find(v => v.id === placedId);

  return (
    <div
      ref={(node) => {
        if (node) drop(node);
      }}
      className={clsx(
        "rounded-lg border-2 flex flex-col items-center justify-center relative transition-all bg-white",
        isOver ? "bg-blue-50 border-blue-300" : "border-[#E5E0D8]",
        correct ? "border-emerald-500 bg-emerald-50" : (placedId ? "border-red-400 bg-red-50" : "border-dashed")
      )}
    >
      <span className="absolute top-2 left-2 text-[10px] text-[#8C857B] font-bold uppercase tracking-wider">{label}</span>
      {placedView ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-2"
        >
          {placedView.content}
        </motion.div>
      ) : (
        <Box className="text-[#E5E0D8]" size={24} />
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sun, Moon, Lightbulb, Cpu, CheckCircle, Table2 } from 'lucide-react';
import clsx from 'clsx';

const LogicGateType = 'LOGIC_GATE';

const gates = [
  { id: 'AND', label: '及門 (AND)', symbol: '&', ic: '7408', color: 'text-purple-700', desc: '兩個輸入均為 1 時輸出 1' },
  { id: 'OR', label: '或門 (OR)', symbol: '≥1', ic: '7432', color: 'text-blue-700', desc: '任一輸入為 1 時輸出 1' },
  { id: 'NOT', label: '非門 (NOT)', symbol: '1', ic: '7404', color: 'text-red-700', desc: '將輸入反轉（反相器）' },
  { id: 'NAND', label: '與非門 (NAND)', symbol: '&̄', ic: '7400', color: 'text-orange-700', desc: 'AND 輸出取反，CMOS 設計基本單元' },
  { id: 'NOR', label: '或非門 (NOR)', symbol: '≥1̄', ic: '7402', color: 'text-emerald-700', desc: 'OR 輸出取反，通用邏輯元件' },
];

// Generate truth table rows for a gate
const getTruthTable = (gateId: string): { a: number; b?: number; out: number }[] => {
  if (gateId === 'NOT') return [{ a: 0, out: 1 }, { a: 1, out: 0 }];
  const rows = [{ a: 0, b: 0 }, { a: 0, b: 1 }, { a: 1, b: 0 }, { a: 1, b: 1 }];
  return rows.map(r => {
    let out = 0;
    if (gateId === 'AND') out = r.a & r.b;
    else if (gateId === 'OR') out = r.a | r.b;
    else if (gateId === 'NAND') out = (r.a & r.b) ? 0 : 1;
    else if (gateId === 'NOR') out = (r.a | r.b) ? 0 : 1;
    return { ...r, out };
  });
};

const k8Theory = [
  { title: '開環系統 (Open-Loop)', desc: '無回饋，輸出不影響輸入。例：計時洗衣機、電風扇。', example: '輸入 → 過程 → 輸出' },
  { title: '閉環系統 (Closed-Loop)', desc: '有回饋，輸出會調節輸入，維持穩定狀態。例：恆溫空調、自動燈控。', example: '輸入 → 過程 → 輸出 → 反饋 → 比較' },
  { title: '感測器 (Sensor/Input)', desc: 'LDR（光敏電阻）、NTC（熱敏電阻）、麥克風、PIR 人體紅外感測器', example: '電阻隨光線/溫度變化' },
  { title: '執行器 (Actuator/Output)', desc: 'LED、直流電動機、伺服馬達、揚聲器、繼電器', example: '接收信號後產生動作' },
];

export const LogicGatePuzzle = () => {
  const { completeModule, selectedLevel } = useGame();
  const { t, tr } = useLanguage();
  const [placedGate, setPlacedGate] = useState<string | null>(null);
  const [lightLevel, setLightLevel] = useState(100); 
  const [switchState, setSwitchState] = useState(false);

  const moduleCode = selectedLevel === 'S1' ? 'K8 – S1' : selectedLevel === 'S2' ? 'K8 – 中二' : 'K8 – 中三';

  const isDark = lightLevel < 50;
  const sensorOutput = isDark; 

  let circuitOutput = false;
  if (placedGate === 'AND') {
    circuitOutput = sensorOutput && switchState;
  } else if (placedGate === 'OR') {
    circuitOutput = sensorOutput || switchState;
  } else if (placedGate === 'NOT') {
    circuitOutput = !sensorOutput;
  } else if (placedGate === 'NAND') {
    circuitOutput = !(sensorOutput && switchState);
  } else if (placedGate === 'NOR') {
    circuitOutput = !(sensorOutput || switchState);
  }

  useEffect(() => {
    if (placedGate === 'AND') {
        if (circuitOutput) {
            setTimeout(() => completeModule('systems'), 1000);
        }
    }
  }, [placedGate, circuitOutput, completeModule]);

  return (
    <div className="h-full flex flex-col space-y-6">
       <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 text-purple-600 mb-1">
             <Cpu size={18} />
             <span className="text-xs font-bold uppercase tracking-widest">{moduleCode}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('系統與控制', 'Systems and Control')}</h2>
          <p className="text-[#6B665E] text-sm mt-1">{t('設計一個自動夜燈系統的邏輯電路。', 'Design the logic circuit for an automatic night light system.')}</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Component Toolbox */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-sm h-full">
           <h3 className="text-xs font-bold text-[#8C857B] uppercase mb-4 tracking-wider">{t('邏輯元件', 'Logic Gates')}</h3>
           <div className="space-y-3">
             {gates.map((gate) => (
               <DraggableGate key={gate.id} gate={gate} />
             ))}
           </div>
           
           <div className="mt-8 p-4 bg-purple-50 rounded-xl text-purple-800 text-xs leading-relaxed border border-purple-100">
             <strong>{t('提示:', 'Hint:')}</strong> {t('燈應該只在黑暗', 'The lamp should only light when it is dark')} <span className="underline">{t('及 (AND)', 'and (AND)')}</span> {t('開關開啟時才亮起。', 'and the switch is on.')}
           </div>
        </div>

        {/* Circuit Board Area */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-10 relative flex flex-col shadow-sm">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#E5E0D8_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="flex-1 flex items-center justify-around relative z-10">
               {/* Inputs */}
               <div className="space-y-16">
                  {/* LDR Input */}
                  <div className="flex items-center space-x-4">
                     <div className={clsx(
                       "w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm font-mono text-xl font-bold",
                       isDark ? "bg-purple-100 border-purple-400 text-purple-700" : "bg-white border-[#E5E0D8] text-[#A8A29A]"
                     )}>
                        {isDark ? "1" : "0"}
                     </div>
                     <div className="text-xs font-bold text-[#6B665E] uppercase tracking-wider">{t('光敏電阻', 'Light-dependent Resistor')}<br/>(LDR)</div>
                  </div>

                  {/* Switch Input */}
                  <div className="flex items-center space-x-4">
                     <div className={clsx(
                       "w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm font-mono text-xl font-bold",
                       switchState ? "bg-purple-100 border-purple-400 text-purple-700" : "bg-white border-[#E5E0D8] text-[#A8A29A]"
                     )}>
                        {switchState ? "1" : "0"}
                     </div>
                     <div className="text-xs font-bold text-[#6B665E] uppercase tracking-wider">{t('手動開關', 'Manual Switch')}<br/>(Switch)</div>
                  </div>
               </div>

               {/* Wires */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#E5E0D8] stroke-[3px]" style={{ zIndex: -1 }}>
                  {/* Wire from LDR to Gate */}
                  <path d="M 150 120 L 300 120 L 300 180" fill="none" className={isDark ? "stroke-purple-400" : ""} />
                  {/* Wire from Switch to Gate */}
                  <path d="M 150 250 L 300 250 L 300 220" fill="none" className={switchState ? "stroke-purple-400" : ""} />
                  {/* Wire from Gate to LED */}
                  <path d="M 450 200 L 600 200" fill="none" className={circuitOutput ? "stroke-purple-400" : ""} />
               </svg>

               {/* Logic Gate Slot */}
               <GateSlot placedGate={placedGate} onDrop={setPlacedGate} />

               {/* Output */}
               <div className="flex flex-col items-center">
                  <div className={clsx(
                    "w-24 h-24 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-300 shadow-md",
                    circuitOutput 
                      ? "bg-yellow-100 border-yellow-400 ring-4 ring-yellow-100/50" 
                      : "bg-[#F9F8F6] border-[#E5E0D8]"
                  )}>
                    <Lightbulb size={48} className={circuitOutput ? "text-yellow-500 fill-yellow-500" : "text-[#D5D0C8]"} />
                  </div>
                  <div className="text-xs font-bold text-[#6B665E] uppercase tracking-wider">{t('系統輸出', 'System Output')}<br/>(Output)</div>
               </div>
            </div>

            {/* Controls */}
            <div className="mt-8 grid grid-cols-2 gap-8 border-t border-[#E5E0D8] pt-8 bg-[#F9F8F6]/50 rounded-xl p-6">
               <div className="space-y-3">
                 <div className="flex justify-between text-xs text-[#8C857B] font-bold uppercase">
                      <span className="flex items-center"><Moon size={14} className="mr-1" /> {t('黑暗', 'Dark')}</span>
                      <span className="flex items-center">{t('光亮', 'Bright')} <Sun size={14} className="ml-1" /></span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   value={lightLevel} 
                   onChange={(e) => setLightLevel(parseInt(e.target.value))}
                   className="w-full h-2 bg-[#E5E0D8] rounded-lg appearance-none cursor-pointer accent-purple-600"
                 />
               </div>

               <div className="flex items-center justify-between pl-8 border-l border-[#E5E0D8]">
                  <span className="text-xs font-bold text-[#8C857B] uppercase">{t('總電源', 'Master Power')}</span>
                  <button 
                    onClick={() => setSwitchState(!switchState)}
                    className={clsx(
                        "w-14 h-8 rounded-full p-1 transition-colors relative shadow-inner",
                        switchState ? "bg-emerald-500" : "bg-[#D5D0C8]"
                    )}
                  >
                     <div className={clsx(
                        "w-6 h-6 bg-white rounded-full shadow-sm transition-transform",
                        switchState ? "translate-x-6" : "translate-x-0"
                     )} />
                  </button>
               </div>
            </div>
        </div>
      </div>

      {/* Truth Table + K8 Theory Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Truth Table */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-purple-50 to-white">
            <Table2 size={16} className="text-purple-500" />
            <h3 className="font-bold text-[#2C2A26] text-sm">{t('真值表', 'Truth Table')}</h3>
            <span className="ml-auto text-xs font-mono text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full">
              {placedGate ?? '—'}
            </span>
          </div>
          {placedGate ? (
            <div className="p-4">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr className="border-b border-[#E5E0D8]">
                    <th className="pb-2 text-[#8C857B] font-bold text-xs uppercase">A</th>
                    {placedGate !== 'NOT' && <th className="pb-2 text-[#8C857B] font-bold text-xs uppercase">B</th>}
                    <th className="pb-2 text-purple-700 font-bold text-xs uppercase">{t('輸出 (Q)', 'Output (Q)')}</th>
                  </tr>
                </thead>
                <tbody>
                  {getTruthTable(placedGate).map((row, i) => (
                    <tr key={i} className={clsx('border-b border-[#F5F5F0] last:border-0', row.out === 1 && 'bg-purple-50')}>
                      <td className={clsx("py-2 font-mono font-bold", row.a ? 'text-purple-700' : 'text-[#A8A29A]')}>{row.a}</td>
                      {placedGate !== 'NOT' && <td className={clsx("py-2 font-mono font-bold", row.b ? 'text-purple-700' : 'text-[#A8A29A]')}>{row.b}</td>}
                      <td className={clsx("py-2 font-mono font-bold text-lg", row.out ? 'text-purple-700' : 'text-[#D5D0C8]')}>{row.out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-[#8C857B] leading-relaxed">{placedGate ? tr(gates.find(g => g.id === placedGate)?.desc ?? '') : ''}</p>
            </div>
          ) : (
            <div className="p-8 text-center text-[#A8A29A] text-sm">{t('請先拖放一個邏輯閘以顯示真值表', 'Drag a logic gate first to display the truth table')}</div>
          )}
        </div>

        {/* K8 Theory Panel */}
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
          <div className="flex items-center space-x-3 px-6 py-4 border-b border-[#E5E0D8] bg-gradient-to-r from-blue-50 to-white">
            <Cpu size={16} className="text-blue-500" />
            <h3 className="font-bold text-[#2C2A26] text-sm">{t('K8 系統概念 — EDB 課程重點', 'K8 System Concepts — EDB Key Points')}</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-3">
            {k8Theory.map((item, i) => (
              <div key={i} className="bg-blue-50/50 border border-blue-100 rounded-xl p-3">
                <div className="font-bold text-[#2C2A26] text-xs mb-1.5">{tr(item.title)}</div>
                <p className="text-xs text-[#6B665E] leading-snug mb-2">{tr(item.desc)}</p>
                <div className="font-mono text-[10px] text-blue-700 bg-white border border-blue-100 px-2 py-1 rounded">{item.example}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DraggableGate = ({ gate }: { gate: any }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: LogicGateType,
    item: { id: gate.id },
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
        "bg-[#F9F8F6] p-4 rounded-xl border border-[#E5E0D8] cursor-grab active:cursor-grabbing hover:border-purple-300 hover:shadow-md transition-all group",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex justify-between items-center mb-3">
         <span className="font-bold text-[#4A4741] group-hover:text-purple-700">{gate.label}</span>
         <div className="text-[10px] text-[#A8A29A] font-mono bg-white px-1 py-0.5 rounded border border-[#E5E0D8]">{gate.ic}</div>
      </div>
      <div className="h-12 bg-white border border-[#E5E0D8] rounded-lg flex items-center justify-center font-mono text-xl text-[#6B665E] group-hover:text-purple-600 group-hover:border-purple-200">
         {gate.symbol}
      </div>
    </div>
  );
};

const GateSlot = ({ placedGate, onDrop }: { placedGate: string | null, onDrop: (id: string) => void }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: LogicGateType,
    drop: (item: { id: string }) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const gateInfo = gates.find(g => g.id === placedGate);

  return (
    <div
       ref={(node) => {
         if (node) drop(node);
       }}
       className={clsx(
         "w-36 h-36 border-2 border-dashed rounded-2xl flex items-center justify-center relative transition-all bg-white",
         isOver ? "bg-purple-50 border-purple-400 scale-105" : "border-[#D5D0C8]",
         placedGate ? "border-solid border-purple-500 shadow-md" : ""
       )}
    >
       {placedGate ? (
          <div className="w-full h-full bg-white rounded-2xl flex flex-col items-center justify-center border border-purple-100">
             <div className="text-xl font-bold text-purple-700">{gateInfo?.label}</div>
             <div className="text-3xl text-[#4A4741] font-mono mt-1">{gateInfo?.symbol}</div>
             <div className="absolute top-2 right-2 text-purple-400">
               <CheckCircle size={14} />
             </div>
          </div>
       ) : (
          <div className="text-center text-[#A8A29A] text-xs font-bold uppercase tracking-wider">
             放置邏輯門<br/>(Drop Here)
          </div>
       )}
    </div>
  );
};

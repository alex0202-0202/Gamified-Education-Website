import { motion } from 'motion/react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Beaker, PenTool, Settings, Cpu, ArrowRight, BookOpen, Layers, Zap } from 'lucide-react';
import { S4S6Dashboard } from './S4S6Dashboard';
import { IBDashboard } from './IBDashboard';

type LevelSelectProps = {
  onNavigate: (screen: string, topic?: string) => void;
  activeTopic?: string;
};

// Data structure based on Hong Kong EDB Curriculum (Teacher Manuals F1/F2/F3)
export const curriculum = {
  S1: [
    {
      title: "核心部分 (組合甲) — 小計 34節",
      enTitle: 'Core Part (Option A) — 34 periods',
      color: "bg-[#D5896F]",
      modules: [
        { id: 'design', code: 'K6 – S1a', name: '製造過程：基本設計元素', enName: 'Manufacturing: Basic Design Elements', desc: '基本的設計理念、草繪技巧｜相關知識1.5節 · 課堂練習0.5節 · 專題活動4節', enDesc: 'Basic design concepts and sketching skills | Related knowledge 1.5 periods · Class exercise 0.5 period · Project activity 4 periods', icon: PenTool, link: 'design', hours: 6 },
        { id: 'materials', code: 'K3 – S1', name: '物料及資源', enName: 'Materials and Resources', desc: '物料的基本認識、物料的特性｜相關知識2節 · 課堂練習1節 · 專題活動6節', enDesc: 'Basic understanding of materials and their properties | Related knowledge 2 periods · Class exercise 1 period · Project activity 6 periods', icon: Beaker, link: 'materials', hours: 9 },
        { id: 'safety', code: 'K5 – S1a', name: '工具及儀器安全', enName: 'Tool and Equipment Safety', desc: '基本手工具、基本量度工具｜相關知識3節 · 課堂練習1節', enDesc: 'Basic hand tools and measuring tools | Related knowledge 3 periods · Class exercise 1 period', icon: Shield, link: 'safety', hours: 4 },
        { id: 'design_b', code: 'K6 – S1b', name: '製造過程：進行設計', enName: 'Manufacturing: Carrying Out Design', desc: '使用不同的物料、人的因素｜相關知識3節 · 課堂活動1節 · 專題活動8節 · 個案研究3節', enDesc: 'Using different materials and considering human factors | Related knowledge 3 periods · Class activity 1 period · Project activity 8 periods · Case study 3 periods', icon: PenTool, link: 'design', hours: 15 },
      ]
    },
    {
      title: "核心部分 (組合乙) — 小計 32節",
      enTitle: 'Core Part (Option B) — 32 periods',
      color: "bg-[#6B9080]",
      modules: [
        { id: 'mechanisms', code: 'K4 – S1', name: '結構和機械結構', enName: 'Structures and Mechanisms', desc: '結構和機械結構的基本概念｜相關知識3節 · 課堂活動0.5節 · 課堂練習0.5節 · 專題活動4節', enDesc: 'Basic concepts of structures and mechanisms | Related knowledge 3 periods · Class activity 0.5 period · Class exercise 0.5 period · Project activity 4 periods', icon: Settings, link: 'mechanisms', hours: 8 },
        { id: 'systems', code: 'K8 – S1', name: '系統概念', enName: 'System Concepts', desc: '系統的基本概念｜相關知識1.5節 · 課堂活動0.5節 (教材六)', enDesc: 'Basic system concepts | Related knowledge 1.5 periods · Class activity 0.5 period (Teaching Pack 6)', icon: Cpu, link: 'systems', hours: 2 },
        { id: 'systems_app', code: 'K9 – S1', name: '系統應用', enName: 'System Applications', desc: '系統應用的基本概念｜專題活動3節 (與K8共用教材六)', enDesc: 'Basic concepts of system applications | Project activity 3 periods (shared with K8 in Teaching Pack 6)', icon: Cpu, link: 'systems', hours: 5 },
        { id: 'safety_b', code: 'K5 – S1b', name: '工具及儀器安全', enName: 'Tool and Equipment Safety', desc: '基本手工具、基本量度工具｜相關知識2節 · 課堂練習2節', enDesc: 'Basic hand tools and measuring tools | Related knowledge 2 periods · Class exercise 2 periods', icon: Shield, link: 'safety', hours: 4 },
        { id: 'design_c', code: 'K6 – S1c', name: '製造過程：進行設計', enName: 'Manufacturing: Carrying Out Design', desc: '包括結構和機械結構的製作｜相關知識4節 · 課堂活動2節 · 專題活動9節', enDesc: 'Including the making of structures and mechanisms | Related knowledge 4 periods · Class activity 2 periods · Project activity 9 periods', icon: PenTool, link: 'design', hours: 15 },
      ]
    },
    {
      title: "延伸部分 (合計+25節)",
      enTitle: 'Extension Part (Total +25 periods)',
      color: "bg-[#CCA068]",
      modules: [
        { id: 'ext_material', code: 'E2 – S1', name: '物料處理', enName: 'Material Processing', desc: '切除、成形、接合及完成處理｜相關知識3節 · 課堂活動1節 · 個案研究3節 · 專題活動4節', enDesc: 'Cutting, forming, joining, and finishing | Related knowledge 3 periods · Class activity 1 period · Case study 3 periods · Project activity 4 periods', icon: Layers, link: 'materials', hours: 11 },
        { id: 'ext_sys', code: 'E6 – S1', name: '系統整合', enName: 'System Integration', desc: '系統與系統及子系統之間的聯繫｜相關知識6節 · 課堂練習2節 · 專題活動6節', enDesc: 'Links between systems and subsystems | Related knowledge 6 periods · Class exercise 2 periods · Project activity 6 periods', icon: Cpu, link: 'systems', hours: 12 },
      ]
    }
  ],
  S2: [
    {
      title: "核心部分 (組合甲) — 小計 34節",
      enTitle: 'Core Part (Option A) — 34 periods',
      color: "bg-[#D5896F]",
      modules: [
        { id: 'mat_s2', code: 'K3 – 中二', name: '物料及資源', enName: 'Materials and Resources', desc: '物料的特性及測試｜相關知識1節 · 課堂活動2節 · 個案研究2節', enDesc: 'Material properties and testing | Related knowledge 1 period · Class activity 2 periods · Case study 2 periods', icon: Beaker, link: 'materials', hours: 5 },
        { id: 'safe_s2', code: 'K5 – 中二', name: '工具及儀器安全', enName: 'Tool and Equipment Safety', desc: '安全使用工具及儀器；選取及運用合適工具、儀器和機器以實踐設計概念｜相關知識2節 · 專題活動5節', enDesc: 'Safe use of tools and equipment; selecting and using suitable tools, instruments, and machines to realise design ideas | Related knowledge 2 periods · Project activity 5 periods', icon: Shield, link: 'safety', hours: 7 },
        { id: 'des_s2a', code: 'K6 – 中二甲', name: '製造過程：基本設計元素', enName: 'Manufacturing: Basic Design Elements', desc: '設計過程、設計上的考慮｜相關知識4節 · 課堂練習3節 · 專題練習7節 · 專題活動8節', enDesc: 'Design process and design considerations | Related knowledge 4 periods · Class exercise 3 periods · Practice task 7 periods · Project activity 8 periods', icon: PenTool, link: 'design', hours: 22 },
      ]
    },
    {
      title: "核心部分 (組合乙) — 小計 32節",
      enTitle: 'Core Part (Option B) — 32 periods',
      color: "bg-[#6B9080]",
      modules: [
        { id: 'mech_s2', code: 'K4 – 中二', name: '結構和機械結構', enName: 'Structures and Mechanisms', desc: '結構及運動的簡單特性；按不同需求而設計的結構；應用機械結構裝置傳動及控制運動；生活模式的改變｜相關知識1節 · 課堂活動2節 · 專題活動12節', enDesc: 'Simple properties of structures and motion; structures designed for different needs; using mechanisms to transmit and control movement; changes in lifestyle patterns | Related knowledge 1 period · Class activity 2 periods · Project activity 12 periods', icon: Settings, link: 'mechanisms', hours: 15 },
        { id: 'sys_s2', code: 'K8 – 中二', name: '系統概念', enName: 'System Concepts', desc: '開環式及閉環式控制系統｜相關知識2節 · 課堂練習1節 (教材四)', enDesc: 'Open-loop and closed-loop control systems | Related knowledge 2 periods · Class exercise 1 period (Teaching Pack 4)', icon: Cpu, link: 'systems', hours: 1 },
        { id: 'sys_app_s2', code: 'K9 – 中二', name: '系統應用', enName: 'System Applications', desc: '機動式、電機式、電子式及氣動式控制系統；控制系統模式｜專題活動6節 (與K8共用教材四)', enDesc: 'Mechanical, electrical, electronic, and pneumatic control systems; control system models | Project activity 6 periods (shared with K8 in Teaching Pack 4)', icon: Cpu, link: 'systems', hours: 8 },
        { id: 'des_s2b', code: 'K6 – 中二乙', name: '製造過程：設計過程', enName: 'Manufacturing: Design Process', desc: '選取合適製造過程所涉及的因素及限制｜相關知識2節 · 課堂活動1節 · 個案研究5節', enDesc: 'Factors and constraints involved in selecting suitable manufacturing processes | Related knowledge 2 periods · Class activity 1 period · Case study 5 periods', icon: PenTool, link: 'design', hours: 8 },
      ]
    },
    {
      title: "延伸部分 　組合甲 — 物料及製造 (+32節)",
      enTitle: 'Extension Part Option A — Materials and Manufacturing (+32 periods)',
      color: "bg-[#CCA068]",
      modules: [
        { id: 'ext_mat_s2', code: 'E2 – 中二', name: '物料處理', enName: 'Material Processing', desc: '切除、成形、接合及完成處理；選擇及使用合適的物料處理過程｜相關知識2節 · 課堂練習1節 · 專題活動5節', enDesc: 'Cutting, forming, joining, and finishing; selecting and using suitable material-processing methods | Related knowledge 2 periods · Class exercise 1 period · Project activity 5 periods', icon: Layers, link: 'materials', hours: 8 },
        { id: 'ext_proj_s2', code: 'E3 – 中二', name: '項目管理', enName: 'Project Management', desc: '計畫及組織工作的步驟或程式｜相關知識2節 · 課堂活動1節 · 個案研究3節', enDesc: 'Planning and organising work steps and procedures | Related knowledge 2 periods · Class activity 1 period · Case study 3 periods', icon: BookOpen, link: 'design', hours: 6 },
        { id: 'ext_sys_s2', code: 'E6 – 中二', name: '系統整合', enName: 'System Integration', desc: '系統與系統及子系統之間的聯繫｜相關知識2節 · 課堂活動2節 · 專題活動14節', enDesc: 'Links between systems and subsystems | Related knowledge 2 periods · Class activity 2 periods · Project activity 14 periods', icon: Cpu, link: 'systems', hours: 18 },
      ]
    },
    {
      title: "延伸部分 　組合乙 — 結構及系統 (+32節)",
      enTitle: 'Extension Part Option B — Structures and Systems (+32 periods)',
      color: "bg-[#8A9A5B]",
      modules: [
        { id: 'ext_auto_s2', code: 'E7 – 中二', name: '控制與自動化', enName: 'Control and Automation', desc: '自動化控制｜相關知識8節 · 課堂練習24節', enDesc: 'Automation control | Related knowledge 8 periods · Class exercise 24 periods', icon: Zap, link: 'systems', hours: 32 },
      ]
    }
  ],
  S3: [
    {
      title: "核心部分 (組合甲) — 小計 34節",
      enTitle: 'Core Part (Option A) — 34 periods',
      color: "bg-[#D5896F]",
      modules: [
        { id: 'mat_s3', code: 'K3 – 中三', name: '物料及資源', enName: 'Materials and Resources', desc: '應用各種常見的物料；資源再用、回收及可持續發展｜相關知識1節 · 課堂練習2節 · 個案研究(課後)', enDesc: 'Applying common materials; reuse, recycling, and sustainability | Related knowledge 1 period · Class exercise 2 periods · Case study (after class)', icon: Beaker, link: 'materials', hours: 3 },
        { id: 'mech_s3', code: 'K4 – 中三', name: '結構和機械結構', enName: 'Structures and Mechanisms', desc: '結構及運動的簡單特性；應用機械結構裝置傳動及控制運動｜相關知識2節 · 課堂練習1節 · 專題活動2節', enDesc: 'Simple properties of structures and motion; applying mechanisms to transmit and control movement | Related knowledge 2 periods · Class exercise 1 period · Project activity 2 periods', icon: Settings, link: 'mechanisms', hours: 5 },
        { id: 'safe_s3', code: 'K5 – 中三', name: '工具及儀器安全', enName: 'Tool and Equipment Safety', desc: '安全使用工具及儀器；應用一系列的機器以實施設計問題的方案｜相關知識2節 · 專題活動6節', enDesc: 'Safe use of tools and equipment; using a range of machines to implement a design solution | Related knowledge 2 periods · Project activity 6 periods', icon: Shield, link: 'safety', hours: 8 },
        { id: 'cad_s3', code: 'K6 – 中三甲', name: '製造過程：電腦輔助設計', enName: 'Manufacturing: Computer-aided Design', desc: 'CAD立體模型；應加強設計效果；設計批判及評鑒｜相關知識5節 · 課堂練習1節 · CAD練習12節', enDesc: 'CAD 3D models; enhancing design presentation; design critique and evaluation | Related knowledge 5 periods · Class exercise 1 period · CAD practice 12 periods', icon: PenTool, link: 'design', hours: 18 },
      ]
    },
    {
      title: "核心及延伸部分 (組合乙) — 小計 46節",
      enTitle: 'Core and Extension Part (Option B) — 46 periods',
      color: "bg-[#6B9080]",
      modules: [
        { id: 'ext_mat_s3', code: 'E2 – 中三', name: '物料處理', enName: 'Material Processing', desc: '物料接合；製造過程的設備；物料表面處理｜相關知識4節 · 課堂活動2節 · 個案研究7節', enDesc: 'Material joining; manufacturing equipment; surface treatment | Related knowledge 4 periods · Class activity 2 periods · Case study 7 periods', icon: Layers, link: 'materials', hours: 13 },
        { id: 'prod_s3', code: 'K6 – 中三乙', name: '製造過程：產品標準與設計評鑒', enName: 'Manufacturing: Product Standards and Design Evaluation', desc: '產品標準；設計評鑒；知識產權；設計師和工程師在工作中的角色；設計的演示；應用於不同領域的製造過程｜相關知識3節 · 課堂練習5節 · 專題活動12節 · 個案研究5節', enDesc: 'Product standards; design evaluation; intellectual property; the roles of designers and engineers; design presentation; manufacturing in different fields | Related knowledge 3 periods · Class exercise 5 periods · Project activity 12 periods · Case study 5 periods', icon: PenTool, link: 'design', hours: 25 },
        { id: 'proj_s3', code: 'E3 – 中三', name: '項目管理', enName: 'Project Management', desc: '項目里的個體協作｜相關知識3節 · 專題活動5節', enDesc: 'Individual collaboration in projects | Related knowledge 3 periods · Project activity 5 periods', icon: BookOpen, link: 'design', hours: 8 },
      ]
    },
    {
      title: "增潤延伸 核心部分 (組合甲) — 小計 7節",
      enTitle: 'Enrichment Extension Core Part (Option A) — 7 periods',
      color: "bg-[#8A9A5B]",
      modules: [
        { id: 'sys_k8_s3', code: 'K8 – 中三', name: '系統概念', enName: 'System Concepts', desc: '系統組件；簡單系統設計的例子和子系統的分析｜相關知識1節', enDesc: 'System components; examples of simple system design and subsystem analysis | Related knowledge 1 period', icon: Cpu, link: 'systems', hours: 1 },
        { id: 'sys_k9_s3', code: 'K9 – 中三', name: '系統應用', enName: 'System Applications', desc: '機動式、電機式、電子式及氣動式系統應用；控制系統模式、建構模型的工具包及模擬科技的解決方案｜相關知識1節 · 課堂練習5節 (另: 專題活動12節 · 個案研究5節)', enDesc: 'Mechanical, electrical, electronic, and pneumatic system applications; control models, construction kits, and simulated technological solutions | Related knowledge 1 period · Class exercise 5 periods (plus project activity 12 periods · case study 5 periods)', icon: Cpu, link: 'systems', hours: 6 },
      ]
    },
    {
      title: "增潤延伸 核心及延伸部分 (組合乙) — 系統整合及控制",
      enTitle: 'Enrichment Core and Extension Part (Option B) — System Integration and Control',
      color: "bg-[#4A4741]",
      modules: [
        { id: 'sys_e6_s3', code: 'E6 – 中三', name: '系統整合', enName: 'System Integration', desc: '將互相有關聯的系統組合（應用軟體、結構和/或機械），以創建一個新的系統，並可以與其他系統連接｜個案研究6節 · 專題活動24節', enDesc: 'Combine related systems (software, structures, and/or mechanisms) to create a new system that can connect with others | Case study 6 periods · Project activity 24 periods', icon: Cpu, link: 'systems', hours: 30 },
        { id: 'ctrl_e7_s3', code: 'E7 – 中三', name: '控制與自動化', enName: 'Control and Automation', desc: '電腦輔助製造(CAM)及彈性製造系統(FMS)；3D立體列印；電腦控制(Arduino)；機器人及機器人控制｜包括教材八至教材十一，合計57節', enDesc: 'Computer-aided manufacturing (CAM), flexible manufacturing systems (FMS), 3D printing, computer control (Arduino), robotics and robot control | Includes Teaching Packs 8 to 11, total 57 periods', icon: Zap, link: 'systems', hours: 57 },
      ]
    }
  ]
};

export const LevelSelect = ({ onNavigate, activeTopic }: LevelSelectProps) => {
  const { user, selectedLevel } = useGame();
  const { t, tr, isEnglish } = useLanguage();
  
  if (selectedLevel === 'IB') {
    return <IBDashboard onNavigate={onNavigate} activeTopic={activeTopic} />;
  }

  if (selectedLevel === 'S4_S6') {
    return <S4S6Dashboard onNavigate={onNavigate} />;
  }

  const currentCurriculum = curriculum[selectedLevel as 'S1' | 'S2' | 'S3'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-[#E5E0D8]">
        <div>
          <h2 className="text-2xl font-bold text-[#2C2A26] mb-1 tracking-tight">
             {selectedLevel === 'S1'
              ? t('中一級課程概覽', 'Secondary 1 Overview')
              : selectedLevel === 'S2'
                ? t('中二級課程概覽', 'Secondary 2 Overview')
                : t('中三級課程概覽', 'Secondary 3 Overview')}
          </h2>
          <p className="text-sm text-[#6B665E]">
             <span className="font-semibold text-[#D5896F]">{user.name}</span>，{t('選擇單元開始學習', 'select a unit to start learning')}
          </p>
        </div>
        
        {/* Progress Card */}
        <div className="flex items-center gap-4 bg-[#F9F8F6] px-5 py-3.5 rounded-xl border border-[#E5E0D8]">
           <div className="text-right">
             <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-0.5">{t('學習進度', 'Progress')}</div>
             <div className="text-xl font-bold text-[#2C2A26]">{user.xp} <span className="text-xs font-normal text-[#8C857B]">/ 1000 XP</span></div>
           </div>
           <div className="w-12 h-12 relative">
             <svg className="w-full h-full transform -rotate-90">
               <circle cx="24" cy="24" r="20" stroke="#E5E0D8" strokeWidth="5" fill="transparent" />
               <circle 
                  cx="24" 
                  cy="24" 
                  r="20" 
                  stroke="#D5896F" 
                  strokeWidth="5" 
                  fill="transparent" 
                  strokeDasharray={125} 
                  strokeDashoffset={125 - (125 * (user.xp / 1000))} 
                  className="transition-all duration-1000 ease-out"
               />
             </svg>
           </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-10"
      >
        {currentCurriculum.map((section, idx) => (
          <section key={idx}>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-1.5 h-8 rounded-full ${section.color}`} />
                <h3 className="text-xl font-bold text-[#4A4741]">{isEnglish ? (section as any).enTitle ?? tr(section.title) : section.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.modules.map((module) => (
                <ModuleCard 
                   key={module.id} 
                   module={module} 
                   color={section.color}
                   onClick={() => onNavigate(module.link)} 
                />
              ))}
            </div>
          </section>
        ))}
      </motion.div>
    </div>
  );
};

const ModuleCard = ({ module, onClick, color }: { module: any, onClick: () => void, color: string }) => {
  const { t, tr, isEnglish } = useLanguage();

  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl p-5 border border-[#E5E0D8] cursor-pointer transition-all shadow-sm group flex flex-col h-full hover:border-[#D5896F]"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg text-white ${color}`}>
          <module.icon className="w-5 h-5" />
        </div>
        <div className="text-[10px] font-bold text-[#8C857B] bg-[#F9F8F6] px-2 py-1 rounded border border-[#E5E0D8] font-mono">
          {module.code}
        </div>
      </div>
      
      <h4 className="text-base font-bold text-[#2C2A26] mb-2 group-hover:text-[#D5896F] transition-colors leading-tight">{isEnglish ? module.enName ?? tr(module.name) : module.name}</h4>
      <p className="text-xs text-[#6B665E] leading-relaxed mb-6 flex-1">
        {isEnglish
          ? (module.enDesc ?? tr(module.desc)).split(' | ')[0]
          : module.desc.split('｜')[0]}
      </p>
      
      <div className="flex items-center justify-between border-t border-[#F0F0F0] pt-4">
         <span className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] bg-[#F9F8F6] border border-[#E5E0D8] px-2 py-1 rounded">{module.hours} {t('課節', 'periods')}</span>
         <div className="flex items-center text-xs font-bold text-[#4A4741] group-hover:translate-x-1 transition-transform">
           <span>{t('開始', 'Open')}</span>
           <ArrowRight className="w-3 h-3 ml-1" />
         </div>
      </div>
    </motion.div>
  );
};

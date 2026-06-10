import type { ReactNode } from 'react';
import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Cpu, 
  Settings, 
  Award, 
  User, 
  BookOpen,
  Home,
  GraduationCap,
  Layers,
  Box,
  Lightbulb,
  Globe,
  MonitorPlay,
  Hammer,
  CircuitBoard,
  Monitor,
  Trophy,
  LogOut,
  Images,
  Factory,
  FileQuestion,
  CalendarCheck,
  UploadCloud,
  ClipboardCheck,
  Megaphone,
} from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'motion/react';

import { curriculum } from './LevelSelect';

type LayoutProps = {
  children: ReactNode;
  currentScreen: string;
  activeTopic?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

// Short display labels for curriculum section titles
const SEC_LABELS: Record<string, string> = {
  '核心部分 (組合甲) — 小計 34節':                         '核心 甲 (Core A)',
  '核心部分 (組合乙) — 小計 32節':                         '核心 乙 (Core B)',
  '延伸部分 (合計+25節)':                                   '延伸 (Extension)',
  '延伸部分 　組合甲 — 物料及製造 (+32節)':                 '延伸 甲 (Ext A)',
  '延伸部分 　組合乙 — 結構及系統 (+32節)':                 '延伸 乙 (Ext B)',
  '核心及延伸部分 (組合乙) — 小計 46節':                   '核心+延伸 乙',
  '增潤延伸 核心部分 (組合甲) — 小計 7節':                 '增潤 核心甲',
  '增潤延伸 核心及延伸部分 (組合乙) — 系統整合及控制':     '增潤 核心+延伸乙',
};
const MODULE_META: Record<string, { name: string; en: string; color: string }> = {
  K3:  { name: '物料及資源',       en: 'Materials and Resources', color: 'text-[#6B9080]' },
  K4:  { name: '結構和機械結構',   en: 'Structures and Mechanisms', color: 'text-[#CCA068]' },
  K5:  { name: '工具及儀器安全',   en: 'Tool and Equipment Safety', color: 'text-[#D5896F]' },
  K6:  { name: '製造過程與設計',   en: 'Manufacturing and Design', color: 'text-[#8A9A5B]' },
  K8:  { name: '系統概念',         en: 'System Concepts', color: 'text-[#7B8FA1]' },
  K9:  { name: '系統應用',         en: 'System Applications', color: 'text-[#7B8FA1]' },
  E2:  { name: '物料處理',         en: 'Material Processing', color: 'text-[#A0856C]' },
  E3:  { name: '項目管理',         en: 'Project Management', color: 'text-[#9B8EA0]' },
  E6:  { name: '系統整合',         en: 'System Integration', color: 'text-[#6B9080]' },
  E7:  { name: '控制與自動化',     en: 'Control and Automation', color: 'text-[#D5896F]' },
};

const GRADE_KEY: Record<string, { zh: string; en: string }> = {
  S1: { zh: '中一 (S1)', en: 'Secondary 1 (S1)' },
  S2: { zh: '中二 (S2)', en: 'Secondary 2 (S2)' },
  S3: { zh: '中三 (S3)', en: 'Secondary 3 (S3)' },
};

const SENIOR_LABELS: Record<string, { zh: string; en: string }> = {
  design_innovation: { zh: '設計與創新', en: 'Design and Innovation' },
  technological_principles: { zh: '科技原理', en: 'Technological Principles' },
  value_impact: { zh: '價值與影響', en: 'Value and Impact' },
  automation: { zh: '模組一：自動化操作', en: 'Module 1: Automation' },
  creative_digital_media: { zh: '模組二：創意數碼媒體', en: 'Module 2: Creative Digital Media' },
  design_material_processing: { zh: '模組三：設計實踐及材料處理', en: 'Module 3: Design Practice and Material Processing' },
  electronics: { zh: '模組四：電子學', en: 'Module 4: Electronics' },
  visualisation_cad: { zh: '模組五：視覺化及電腦輔助設計', en: 'Module 5: Visualisation and CAD' },
};

export const Layout = ({ children, currentScreen, activeTopic, onNavigate }: LayoutProps) => {
  const { user: gameUser, selectedLevel, setSelectedLevel } = useGame();
  const { language, toggleLanguage, t, tr, isEnglish } = useLanguage();
  const { user: authUser, isAdmin, logout } = useAuth();
  const [lastDSELevel, setLastDSELevel] = useState<'S1' | 'S2' | 'S3' | 'S4_S6'>('S1');

  const switchToDSE = () => {
    setSelectedLevel(lastDSELevel);
    onNavigate('dashboard', 'HKDSE_DNT');
  };
  const switchToIB = () => {
    if (selectedLevel !== 'IB') setLastDSELevel(selectedLevel as 'S1' | 'S2' | 'S3' | 'S4_S6');
    setSelectedLevel('IB');
    onNavigate('dashboard', 'IB_DESIGN');
  };
  const switchToIGCSE = () => {
    onNavigate('dashboard', 'IGCSE_DT');
  };
  const switchToALevel = () => {
    onNavigate('dashboard', 'A_LEVEL_DT');
  };

  // Navigation items mapping based on EDB Curriculum
  let navGroups = [];

  if (selectedLevel === 'IB') {
    navGroups = [
      {
        title: 'IB Design Technology',
        items: [
          { id: 'dashboard', label: t('IB 課程概覽 (Home)', 'IB Overview (Home)'), icon: Home, color: 'text-gray-600' }
        ]
      },
      {
        title: t('核心主題 SL + HL (Core Topics)', 'Core Topics SL + HL'),
        items: [
          { id: 'dashboard', topic: 'ib_t1', label: t('Topic 1: 人因工程與人機界面', 'Topic 1: Human Factors and Ergonomics'), icon: Lightbulb, color: 'text-[#D5896F]' },
          { id: 'dashboard', topic: 'ib_t2', label: t('Topic 2: 資源管理與可持續性', 'Topic 2: Resource Management and Sustainability'), icon: Layers, color: 'text-[#6B9080]' },
          { id: 'dashboard', topic: 'ib_t3', label: t('Topic 3: 模型製作', 'Topic 3: Modelling'), icon: Box, color: 'text-[#CCA068]' },
          { id: 'dashboard', topic: 'ib_t4', label: t('Topic 4: 材料與製造過程', 'Topic 4: Materials and Manufacturing Processes'), icon: Settings, color: 'text-stone-600' },
          { id: 'dashboard', topic: 'ib_t5', label: t('Topic 5: 創新', 'Topic 5: Innovation'), icon: GraduationCap, color: 'text-[#D5896F]' },
          { id: 'dashboard', topic: 'ib_t6', label: t('Topic 6: 經典設計', 'Topic 6: Classic Design'), icon: BookOpen, color: 'text-[#6B9080]' },
        ]
      },
      {
        title: t('HL 延伸主題 (HL Extensions)', 'HL Extension Topics'),
        items: [
          { id: 'dashboard', topic: 'ib_t7', label: t('Topic 7: 用戶中心設計', 'Topic 7: User-Centred Design'), icon: User, color: 'text-[#D5896F]' },
          { id: 'dashboard', topic: 'ib_t8', label: t('Topic 8: 可持續性', 'Topic 8: Sustainability'), icon: Globe, color: 'text-[#8A9A5B]' },
          { id: 'dashboard', topic: 'ib_t9', label: t('Topic 9: 創新與市場', 'Topic 9: Innovation and Markets'), icon: Cpu, color: 'text-[#CCA068]' },
          { id: 'dashboard', topic: 'ib_t10', label: t('Topic 10: 商業生產', 'Topic 10: Commercial Production'), icon: Cpu, color: 'text-[#CCA068]' },
        ]
      }
    ];
  } else if (selectedLevel === 'S4_S6') {
    navGroups = [
      {
        title: t('高中 (S4-S6) 概覽', 'Senior Secondary (S4-S6) Overview'),
        items: [
          { id: 'dashboard', label: t('DSE 概覽 (Home)', 'DSE Overview (Home)'), icon: Home, color: 'text-gray-600' }
        ]
      },
      {
        title: t('必修部分 (Compulsory)', 'Compulsory Part'),
        items: [
          { id: 'senior_module', topic: 'design_innovation', label: isEnglish ? SENIOR_LABELS.design_innovation.en : '1. 設計與創新', icon: Lightbulb, color: 'text-[#D5896F]' },
          { id: 'senior_module', topic: 'technological_principles', label: isEnglish ? '2. Technological Principles' : '2. 科技原理', icon: Settings, color: 'text-[#6B9080]' },
          { id: 'senior_module', topic: 'value_impact', label: isEnglish ? '3. Value and Impact' : '3. 價值與影響', icon: Globe, color: 'text-[#CCA068]' },
        ]
      },
      {
        title: t('選修部分 (Electives)', 'Elective Modules'),
        items: [
          { id: 'senior_module', topic: 'automation', label: isEnglish ? 'Module 1: Automation' : '模組一：自動化操作', icon: Cpu, color: 'text-[#6B9080]' },
          { id: 'senior_module', topic: 'creative_digital_media', label: isEnglish ? 'Module 2: Creative Digital Media' : '模組二：創意數碼媒體', icon: MonitorPlay, color: 'text-[#CCA068]' },
          { id: 'senior_module', topic: 'design_material_processing', label: isEnglish ? 'Module 3: Design and Materials' : '模組三：設計與材料', icon: Hammer, color: 'text-[#D5896F]' },
          { id: 'senior_module', topic: 'electronics', label: isEnglish ? 'Module 4: Electronics' : '模組四：電子學', icon: CircuitBoard, color: 'text-[#8C857B]' },
          { id: 'senior_module', topic: 'visualisation_cad', label: isEnglish ? 'Module 5: Visualisation and CAD' : '模組五：視覺傳達與CAD', icon: Monitor, color: 'text-[#4A4741]' },
        ]
      }
    ];
  } else {
    const gradeText = selectedLevel === 'S1' ? t('中一', 'S1') : selectedLevel === 'S2' ? t('中二', 'S2') : t('中三', 'S3');
    const gradeTopicKey = GRADE_KEY[selectedLevel].zh;
    const levelData = curriculum[selectedLevel as 'S1' | 'S2' | 'S3'];

    // Extract unique K/E codes used in this level, in order of first appearance
    const seenCodes: string[] = [];
    levelData.forEach(section => {
      section.modules.forEach(mod => {
        const match = mod.code.match(/^([A-Z]\d+)/);
        if (match && !seenCodes.includes(match[1])) seenCodes.push(match[1]);
      });
    });

    // Build section groups matching EDB structure
    const sectionGroups = levelData.map(section => {
      // Get unique codes for this section
      const sectionCodes: string[] = [];
      section.modules.forEach(mod => {
        const match = mod.code.match(/^([A-Z]\d+)/);
        if (match && !sectionCodes.includes(match[1])) sectionCodes.push(match[1]);
      });

      // Short section label
      const secLabel = SEC_LABELS[section.title] ?? section.title.slice(0, 18);

      const items = sectionCodes.map(code => {
        const meta = MODULE_META[code];
        return {
          id: `hkdse_resources`,
          topic: `${gradeTopicKey}|${code}`,
          label: `${code} ${isEnglish ? meta?.en ?? code : meta?.name ?? code}`,
          icon: code.startsWith('E') ? Layers : BookOpen,
          color: meta?.color ?? 'text-gray-600',
        };
      });

      return { title: secLabel, items };
    });

    navGroups = [
      {
        title: isEnglish ? `${gradeText} Overview` : `${gradeText}級概覽`,
        items: [{ id: 'dashboard', label: t('學習中心 (Home)', 'Learning Hub (Home)'), icon: Home, color: 'text-gray-600', topic: undefined }]
      },
      ...sectionGroups
    ];
  }

  const allItems = navGroups.flatMap(g => g.items);
  const labelOverrides: Record<string, string> = {
    dashboard: 'Study Curriculum',
    legacy_dashboard: 'Legacy Curriculum Dashboard',
    hkdse_thematic_resources: 'DAT 主題式學與教資源',
    hkdse_case_studies: 'DAT 個案研究',
    hkdse_sba_support: 'DAT SBA Support',
    edb_junior_dt: 'S1-S3 DT Learning Resources',
    ib_myp_design: 'IB MYP Design Y6-Y10',
    ib_current_2026: 'IB Current / Last-Assessment 2026',
    ib_new_2027: 'IB New / First-Assessment 2027',
    ib_ia_support: 'IB IA Support',
    ib_case_studies: 'IB Case Studies',
    ib_research_for_design: 'Research for Design',
    source_metadata: 'Source / Reference Metadata',
    poster_library: '知識海報庫 (Poster Library)',
    cambridge_alevel_dt: 'Cambridge A Level D&T 9705',
    design_booking: 'Design Teacher Booking',
    dt_submission: 'DT Coursework Submission',
    submission_dashboard: 'Submission Dashboard',
    dt_classroom: 'DT Classroom Hub',
    materials_db: '材料資料庫 (Materials Database)',
    hkdse_resources: 'HKDSE 課程資源 (D&T / DAT 中一至中六)',
    resource_hub: '學習資源中心',
    ib_resources: 'IB 資源中心',
    ib_subtopic: 'IB 子主題詳解',
    ib_resource: 'IB 資源詳解',
    project_hub: '專題活動中心',
    orthographic_projection: '正投影圖與基礎 CAD',
    joining_methods: '接合方法與黏合技術',
    finger_joint_box_maker: '榫接盒產生器',
    fun_learning: '趣味學習中心',
  };
  const activeItem = allItems.find(n =>
    n.id === currentScreen &&
    (!(n as any).topic || (n as any).topic === activeTopic)
  );
  const currentLabel = currentScreen === 'senior_module' && activeTopic
    ? (isEnglish ? SENIOR_LABELS[activeTopic]?.en ?? 'Senior Module' : SENIOR_LABELS[activeTopic]?.zh ?? '高中模組')
    : tr(labelOverrides[currentScreen] ?? activeItem?.label ?? '學習概覽');

  const levelHeader = currentScreen === 'dashboard'
    ? 'Study Curriculum'
    : selectedLevel === 'S1'
      ? t('中一 · HKDSE', 'Secondary 1 · HKDSE')
      : selectedLevel === 'S2'
        ? t('中二 · HKDSE', 'Secondary 2 · HKDSE')
        : selectedLevel === 'S3'
          ? t('中三 · HKDSE', 'Secondary 3 · HKDSE')
          : selectedLevel === 'S4_S6'
            ? t('高中 (S4-S6) · HKDSE DAT', 'Senior Secondary (S4-S6) · HKDSE DAT')
            : t('IB 文憑課程 · Design Technology', 'IB Diploma · Design Technology');

  return (
    <div className="flex h-screen flex-col bg-[#F9F8F6] text-[#4A4741] overflow-hidden font-sans selection:bg-[#D5896F] selection:text-white lg:flex-row">
      {/* Sidebar */}
      <aside className="z-20 flex max-h-[46vh] w-full shrink-0 flex-col border-b border-[#E5E0D8] bg-white shadow-sm lg:h-screen lg:max-h-none lg:w-80 lg:border-b-0 lg:border-r">
        <div className="border-b border-[#E5E0D8] bg-[#FDFCFB] p-4 lg:p-6">
          <div className="flex items-center space-x-2 text-[#D5896F] mb-2">
            <GraduationCap className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">{t('HKDSE · IB · IGCSE · A Level', 'HKDSE · IB · IGCSE · A Level')}</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#2C2A26] leading-tight">
            Design Technology Lab<br/>
            <span className="text-base font-normal text-[#6B665E]">Study Curriculum</span>
          </h1>
        </div>

        {/* Curriculum Selector */}
        <div className="border-b border-[#E5E0D8] px-4 py-3 lg:px-5">
          <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#A8A29A]">
            {t('課程選擇', 'Curriculum')}
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <button
              onClick={switchToDSE}
              className={clsx(
                'rounded-lg border px-2 py-2 text-xs font-black transition',
                currentScreen === 'dashboard' && activeTopic?.startsWith('HKDSE_DNT')
                  ? 'border-[#D5896F]/40 bg-[#FFF5F0] text-[#D5896F]'
                  : 'border-[#E5E0D8] bg-white text-[#6B665E] hover:bg-[#F9F8F6]'
              )}
            >
              HKDSE
            </button>
            <button
              onClick={switchToIB}
              className={clsx(
                'rounded-lg border px-2 py-2 text-xs font-black transition',
                currentScreen === 'dashboard' && activeTopic?.startsWith('IB_DESIGN')
                  ? 'border-[#6B9080]/40 bg-[#F1F7F2] text-[#6B9080]'
                  : 'border-[#E5E0D8] bg-white text-[#6B665E] hover:bg-[#F9F8F6]'
              )}
            >
              IB
            </button>
            <button
              onClick={switchToIGCSE}
              className={clsx(
                'rounded-lg border px-2 py-2 text-xs font-black transition',
                currentScreen === 'dashboard' && activeTopic?.startsWith('IGCSE_DT')
                  ? 'border-[#CCA068]/50 bg-[#FFF8E6] text-[#A77811]'
                  : 'border-[#E5E0D8] bg-white text-[#6B665E] hover:bg-[#F9F8F6]'
              )}
            >
              IGCSE
            </button>
            <button
              onClick={switchToALevel}
              className={clsx(
                'rounded-lg border px-2 py-2 text-xs font-black transition',
                currentScreen === 'dashboard' && activeTopic?.startsWith('A_LEVEL_DT')
                  ? 'border-[#7B8FA1]/40 bg-[#F2F5F7] text-[#66788A]'
                  : 'border-[#E5E0D8] bg-white text-[#6B665E] hover:bg-[#F9F8F6]'
              )}
            >
              A-Level
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 lg:p-5">
          {currentScreen !== 'dashboard' && navGroups.map((group, idx) => (
            <div key={idx} className="mb-5">
              <div className="text-xs font-bold text-[#A8A29A] uppercase mb-2 px-3 tracking-wider">
                {tr(group.title)}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const itemActive = currentScreen === item.id &&
                    (!(item as any).topic || (item as any).topic === activeTopic);
                  const Icon = item.icon;
                  return (
                  <button
                    key={(item as any).topic ?? item.id}
                    onClick={() => onNavigate(item.id, (item as any).topic)}
                    className={clsx(
                      "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden text-sm font-medium text-left",
                      itemActive
                        ? "bg-[#F2EFE9] text-[#2C2A26] shadow-sm"
                        : "text-[#6B665E] hover:text-[#2C2A26] hover:bg-[#F9F8F6]"
                    )}
                  >
                    {itemActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#D5896F]"
                      />
                    )}
                    <Icon className={clsx("w-5 h-5 flex-shrink-0", item.color, !itemActive && "opacity-70 grayscale group-hover:grayscale-0 transition-all")} />
                    <span className="truncate">{tr(item.label)}</span>
                  </button>
                  );
                })}
              </div>
            </div>
          ))}
          
          <div className="mt-8 mb-6">
            <div className="text-xs font-bold text-[#A8A29A] uppercase mb-3 px-3 tracking-wider">{t('學習資源 (Resources)', 'Resources')}</div>
            <div className="space-y-1">
              {selectedLevel === 'IB' ? (
                <>
                  <button
                    onClick={() => onNavigate('ib_resources')}
                    className={clsx(
                      'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                      currentScreen === 'ib_resources'
                        ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                        : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                    )}
                  >
                    <BookOpen className="w-5 h-5 flex-shrink-0 text-[#6B9080]" />
                    <span>{t('IB 資源中心', 'IB Resource Library')}</span>
                  </button>
                  {[
                    { id: 'ib_myp_design', label: t('IB MYP 設計', 'IB MYP Design'), icon: GraduationCap, color: 'text-[#6B9080]' },
                    { id: 'ib_current_2026', label: t('IB DP 2026 課程', 'IB DP 2026 Course'), icon: BookOpen, color: 'text-[#D5896F]' },
                    { id: 'ib_new_2027', label: t('IB DP 2027 課程', 'IB DP 2027 Course'), icon: Globe, color: 'text-[#6B9080]' },
                    { id: 'ib_ia_support', label: t('IB IA 專題支援', 'IB IA Project Support'), icon: Award, color: 'text-[#CCA068]' },
                    { id: 'ib_case_studies', label: t('IB 個案研究', 'IB Case Studies'), icon: Layers, color: 'text-[#7B8FA1]' },
                    { id: 'ib_research_for_design', label: t('設計研究方法', 'Research for Design'), icon: User, color: 'text-[#8A9A5B]' },
                  ].map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <button
                        key={resource.id}
                        onClick={() => onNavigate(resource.id)}
                        className={clsx(
                          'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                          currentScreen === resource.id
                            ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                            : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                        )}
                      >
                        <Icon className={clsx('w-5 h-5 flex-shrink-0', resource.color)} />
                        <span>{resource.label}</span>
                      </button>
                    );
                  })}
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('materials_db')}
                    className={clsx(
                      "w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left",
                      currentScreen === 'materials_db'
                        ? "bg-[#F2EFE9] text-[#2C2A26] shadow-sm"
                        : "text-[#6B665E] hover:bg-[#F9F8F6]"
                    )}
                  >
                    <Layers className="w-5 h-5 flex-shrink-0 text-[#6B9080]" />
                    <span>{t('材料資料庫', 'Materials Database')}</span>
                  </button>
                  <button
                    onClick={() => onNavigate('hkdse_resources')}
                    className={clsx(
                      'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                      currentScreen === 'hkdse_resources'
                        ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                        : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                    )}
                  >
                    <BookOpen className="w-5 h-5 flex-shrink-0 text-[#CCA068]" />
                    <span>{t('HKDSE 課程資源', 'HKDSE Resources')}</span>
                  </button>
                  {selectedLevel !== 'S4_S6' && (
                    <button
                      onClick={() => onNavigate('edb_junior_dt')}
                      className={clsx(
                        'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                        currentScreen === 'edb_junior_dt'
                          ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                          : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                      )}
                    >
                      <GraduationCap className="w-5 h-5 flex-shrink-0 text-[#6B9080]" />
                      <span>{t('S1-S3 DT 學習資源', 'S1-S3 DT Resources')}</span>
                    </button>
                  )}
                  {selectedLevel === 'S4_S6' && [
                    { id: 'hkdse_thematic_resources', label: t('DAT 主題式資源', 'DAT Thematic Resources'), icon: Layers, color: 'text-[#D5896F]' },
                    { id: 'hkdse_case_studies', label: t('DAT 個案研究', 'DAT Case Studies'), icon: BookOpen, color: 'text-[#6B9080]' },
                    { id: 'hkdse_sba_support', label: t('DAT SBA 專題支援', 'DAT SBA Project Support'), icon: Award, color: 'text-[#CCA068]' },
                  ].map((resource) => {
                    const Icon = resource.icon;
                    return (
                      <button
                        key={resource.id}
                        onClick={() => onNavigate(resource.id)}
                        className={clsx(
                          'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                          currentScreen === resource.id
                            ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                            : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                        )}
                      >
                        <Icon className={clsx('w-5 h-5 flex-shrink-0', resource.color)} />
                        <span>{resource.label}</span>
                      </button>
                    );
                  })}
                </>
              )}
              <button
                onClick={() => onNavigate('source_metadata')}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'source_metadata'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <Shield className="w-5 h-5 flex-shrink-0 text-[#7B8FA1]" />
                <span>{t('來源與版權', 'Sources / Copyright')}</span>
              </button>
              <button
                onClick={() => onNavigate('poster_library')}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'poster_library'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <Images className="w-5 h-5 flex-shrink-0 text-[#D5896F]" />
                <span>{t('知識海報庫', 'Poster Library')}</span>
              </button>
              <button
                onClick={() => onNavigate('cambridge_alevel_dt')}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'cambridge_alevel_dt'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <Factory className="w-5 h-5 flex-shrink-0 text-[#6B9080]" />
                <span>{t('Cambridge A Level D&T', 'Cambridge A Level D&T')}</span>
              </button>
              <button
                onClick={() => onNavigate('past_papers', activeTopic)}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'past_papers'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <FileQuestion className="w-5 h-5 flex-shrink-0 text-[#CCA068]" />
                <span>{t('歷屆試題練習', 'Past Paper Exercise')}</span>
              </button>
              <button
                onClick={() => onNavigate('design_booking')}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'design_booking'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <CalendarCheck className="w-5 h-5 flex-shrink-0 text-[#6B9080]" />
                <span>{t('教師預約', 'Booking')}</span>
              </button>
              <button
                onClick={() => onNavigate('dt_submission')}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'dt_submission'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <UploadCloud className="w-5 h-5 flex-shrink-0 text-[#D5896F]" />
                <span>{t('作品提交', 'Submission')}</span>
              </button>
              {isAdmin && (
                <button
                  onClick={() => onNavigate('submission_dashboard')}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                    currentScreen === 'submission_dashboard'
                      ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                      : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                  )}
                >
                  <ClipboardCheck className="w-5 h-5 flex-shrink-0 text-[#7B8FA1]" />
                  <span>{t('提交管理', 'Submission Dashboard')}</span>
                </button>
              )}
              <button
                onClick={() => onNavigate('dt_classroom')}
                className={clsx(
                  'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                  currentScreen === 'dt_classroom'
                    ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                    : 'text-[#6B665E] hover:bg-[#F9F8F6]'
                )}
              >
                <Megaphone className="w-5 h-5 flex-shrink-0 text-[#CCA068]" />
                <span>{t('DT 課堂', 'Classroom')}</span>
              </button>
              <div className="px-3 pt-4 text-xs font-bold uppercase tracking-wider text-[#A8A29A]">
                {t('設計工具', 'Design Tools')}
              </div>
              <button onClick={() => onNavigate('project_hub')} className={clsx(
                'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                currentScreen === 'project_hub'
                  ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                  : 'text-[#6B665E] hover:bg-[#F9F8F6]'
              )}>
                <Box className="w-5 h-5 flex-shrink-0" />
                <span>{t('專題活動', 'Project Hub')}</span>
              </button>
              <button onClick={() => onNavigate('orthographic_projection')} className={clsx(
                'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                currentScreen === 'orthographic_projection'
                  ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                  : 'text-[#6B665E] hover:bg-[#F9F8F6]'
              )}>
                <Monitor className="w-5 h-5 flex-shrink-0 text-[#D5896F]" />
                <span>{t('正投影 / CAD', 'Orthographic / CAD')}</span>
              </button>
              <button onClick={() => onNavigate('joining_methods')} className={clsx(
                'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                currentScreen === 'joining_methods'
                  ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                  : 'text-[#6B665E] hover:bg-[#F9F8F6]'
              )}>
                <Hammer className="w-5 h-5 flex-shrink-0 text-[#6B9080]" />
                <span>{t('接合 / 黏合', 'Joining / Adhesives')}</span>
              </button>
              <button onClick={() => onNavigate('finger_joint_box_maker')} className={clsx(
                'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                currentScreen === 'finger_joint_box_maker'
                  ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                  : 'text-[#6B665E] hover:bg-[#F9F8F6]'
              )}>
                <Box className="w-5 h-5 flex-shrink-0 text-[#D5896F]" />
                <span>{t('榫接盒產生器', 'Finger Box Maker')}</span>
              </button>
              <button onClick={() => onNavigate('fun_learning')} className={clsx(
                'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-left',
                currentScreen === 'fun_learning'
                  ? 'bg-[#F2EFE9] text-[#2C2A26] shadow-sm'
                  : 'text-[#6B665E] hover:bg-[#F9F8F6]'
              )}>
                <Trophy className="w-5 h-5 flex-shrink-0 text-[#CCA068]" />
                <span>{t('趣味學習', 'Fun Learning')}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* User Profile Mini */}
        <div className="p-4 bg-[#FDFCFB] border-t border-[#E5E0D8]">
          <div className="flex items-center gap-3 bg-white px-3 py-2.5 rounded-xl border border-[#E5E0D8] shadow-sm mb-2">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0 ${
              isAdmin ? 'bg-[#EEF2F5] border-[#C2CEDB]' : 'bg-[#E8EFE6] border-[#D1DCD0]'
            }`}>
              {isAdmin ? <Shield className="w-4 h-4 text-[#7B8FA1]" /> : <User className="w-4 h-4 text-[#6B9080]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-[#2C2A26] truncate">{authUser?.displayName ?? gameUser.name}</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${
                isAdmin ? 'text-[#7B8FA1]' : 'text-[#D5896F]'
              }`}>
                {isAdmin ? '管理員 · Admin' : `學生 · ${selectedLevel}`}
              </div>
            </div>
            <div className="text-xs font-bold text-[#8C857B] bg-[#F2EFE9] px-2 py-1 rounded-md">{gameUser.xp} XP</div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold text-[#8C857B] hover:text-[#D5896F] hover:bg-[#FFF5F0] border border-transparent hover:border-[#F5D0C0] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            {t('登出', 'Log Out')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F9F8F6]">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 flex min-h-20 flex-col gap-3 border-b border-[#E5E0D8] bg-white/85 px-4 py-4 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:px-8">
          <div className="min-w-0">
             <div className="text-[#8C857B] text-xs font-bold uppercase tracking-widest mb-1">
               {levelHeader}
             </div>
             <h2 className="truncate text-xl font-bold tracking-tight text-[#2C2A26]">
               {currentLabel}
             </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Study curriculum quick switch */}
            <div className="flex items-center bg-[#F2EFE9] border border-[#E5E0D8] rounded-full p-1 shadow-sm">
              <button
                onClick={switchToDSE}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  currentScreen === 'dashboard' && activeTopic?.startsWith('HKDSE_DNT')
                    ? 'bg-[#D5896F] text-white shadow-sm'
                    : 'text-[#8C857B] hover:text-[#4A4741]'
                }`}
              >
                HKDSE
              </button>
              <button
                onClick={switchToIB}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  currentScreen === 'dashboard' && activeTopic?.startsWith('IB_DESIGN')
                    ? 'bg-[#6B9080] text-white shadow-sm'
                    : 'text-[#8C857B] hover:text-[#4A4741]'
                }`}
              >
                IB
              </button>
              <button
                onClick={switchToIGCSE}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  currentScreen === 'dashboard' && activeTopic?.startsWith('IGCSE_DT')
                    ? 'bg-[#CCA068] text-white shadow-sm'
                    : 'text-[#8C857B] hover:text-[#4A4741]'
                }`}
              >
                IGCSE
              </button>
              <button
                onClick={switchToALevel}
                className={`px-4 py-1.5 rounded-full text-xs font-black transition-all ${
                  currentScreen === 'dashboard' && activeTopic?.startsWith('A_LEVEL_DT')
                    ? 'bg-[#7B8FA1] text-white shadow-sm'
                    : 'text-[#8C857B] hover:text-[#4A4741]'
                }`}
              >
                A Level
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('design_booking')}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black shadow-sm transition-colors',
                  currentScreen === 'design_booking'
                    ? 'border-[#6B9080]/40 bg-[#F1F7F2] text-[#557869]'
                    : 'border-[#E5E0D8] bg-[#FAF9F6] text-[#6B665E] hover:bg-[#F2EFE9]'
                )}
              >
                <CalendarCheck className="h-4 w-4" />
                Booking
              </button>
              <button
                onClick={() => onNavigate('dt_submission')}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black shadow-sm transition-colors',
                  currentScreen === 'dt_submission'
                    ? 'border-[#D5896F]/40 bg-[#FFF5F0] text-[#C4785E]'
                    : 'border-[#E5E0D8] bg-[#FAF9F6] text-[#6B665E] hover:bg-[#F2EFE9]'
                )}
              >
                <UploadCloud className="h-4 w-4" />
                Submission
              </button>
              {isAdmin && (
                <button
                  onClick={() => onNavigate('submission_dashboard')}
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black shadow-sm transition-colors',
                    currentScreen === 'submission_dashboard'
                      ? 'border-[#7B8FA1]/40 bg-[#F2F5F7] text-[#66788A]'
                      : 'border-[#E5E0D8] bg-[#FAF9F6] text-[#6B665E] hover:bg-[#F2EFE9]'
                  )}
                >
                  <ClipboardCheck className="h-4 w-4" />
                  Dashboard
                </button>
              )}
              <button
                onClick={() => onNavigate('dt_classroom')}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black shadow-sm transition-colors',
                  currentScreen === 'dt_classroom'
                    ? 'border-[#CCA068]/40 bg-[#FFF9EC] text-[#9B7B46]'
                    : 'border-[#E5E0D8] bg-[#FAF9F6] text-[#6B665E] hover:bg-[#F2EFE9]'
                )}
              >
                <Megaphone className="h-4 w-4" />
                Classroom
              </button>
            </div>

            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full bg-[#FAF9F6] border border-[#E5E0D8] shadow-sm text-sm font-bold text-[#4A4741] hover:bg-[#F2EFE9] transition-colors"
              aria-label={t('切換語言', 'Toggle language')}
            >
              {language === 'en' ? '繁中' : 'EN'}
            </button>
            <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-[#FAF9F6] border border-[#E5E0D8] shadow-sm">
              <div className="p-1 bg-[#E0C097]/20 rounded-full">
                <Award className="w-4 h-4 text-[#CCA068]" />
              </div>
              <span className="text-sm font-medium text-[#6B665E]">
                {t('工具箱: ', 'Toolkit: ')}<span className="text-[#2C2A26] font-bold">{gameUser.tools.filter(tool => tool.unlocked).length}/{gameUser.tools.length}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div data-main-scroll className="relative flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          <div className="max-w-[1400px] mx-auto pb-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

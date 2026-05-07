import { motion } from 'motion/react';
import { ArrowRight, Beaker, BookOpen, Box, ClipboardList, Cpu, FileSearch, Hammer, PenTool, Ruler, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';

type ProjectHubProps = {
  onNavigate: (screen: string, topic?: string) => void;
};

type ProjectCard = {
  title: string;
  enTitle: string;
  desc: string;
  enDesc: string;
  icon: LucideIcon;
  color: string;
  action: () => void;
};

export const ProjectHub = ({ onNavigate }: ProjectHubProps) => {
  const { selectedLevel } = useGame();
  const { t, isEnglish } = useLanguage();

  const juniorProjects: ProjectCard[] = [
    {
      title: '設計與製作活動',
      enTitle: 'Design and Make Activity',
      desc: '從問題識別、草圖、選材到製作測試，回到初中原有設計與科技任務。',
      enDesc: 'Return to the original junior design-and-make workflow: problem, sketch, material choice, making, and testing.',
      icon: PenTool,
      color: 'text-[#D5896F]',
      action: () => onNavigate('dashboard'),
    },
    {
      title: '材料與結構挑戰',
      enTitle: 'Materials and Structures Challenge',
      desc: '連接材料資料庫、破壞測試和機械結構活動，保留原有互動學習路徑。',
      enDesc: 'Connect the materials database, testing activities, and mechanism modules without replacing the original flow.',
      icon: Beaker,
      color: 'text-[#6B9080]',
      action: () => onNavigate('materials_db'),
    },
    {
      title: '控制與系統任務',
      enTitle: 'Control and Systems Task',
      desc: '進入系統、邏輯與控制相關活動，支援原有遊戲化學習。',
      enDesc: 'Open the existing systems, logic, and control activities used by the gamified learning flow.',
      icon: Cpu,
      color: 'text-[#CCA068]',
      action: () => onNavigate('systems'),
    },
  ];

  const seniorProjects: ProjectCard[] = [
    {
      title: 'DAT 必修專題連結',
      enTitle: 'DAT Compulsory Project Links',
      desc: '回到高中 DAT 必修部分：設計與創新、科技原理、價值與影響。',
      enDesc: 'Return to the senior DAT compulsory modules: Design and Innovation, Technological Principles, and Value and Impact.',
      icon: Settings,
      color: 'text-[#D5896F]',
      action: () => onNavigate('dashboard'),
    },
    {
      title: 'DAT SBA 支援補充',
      enTitle: 'DAT SBA Support Add-on',
      desc: '新增 SBA 筆記作為補充內容；不取代原有高中 dashboard、模組或評分流程。',
      enDesc: 'Open the new SBA notes as add-on content; this does not replace the existing senior dashboard, modules, or scoring flow.',
      icon: ClipboardList,
      color: 'text-[#6B9080]',
      action: () => onNavigate('hkdse_sba_support'),
    },
    {
      title: 'DAT 主題與個案補充',
      enTitle: 'DAT Themes and Case Add-ons',
      desc: '加入主題式資源及個案研究，作為高中 DAT 課程資源的延伸卡片。',
      enDesc: 'Open thematic resources and case studies as extra cards for the senior DAT resource area.',
      icon: FileSearch,
      color: 'text-[#CCA068]',
      action: () => onNavigate('hkdse_thematic_resources'),
    },
  ];

  const ibProjects: ProjectCard[] = [
    {
      title: 'IB Design Technology 概覽',
      enTitle: 'IB Design Technology Overview',
      desc: '回到原有 IB dashboard，保留 DP/MYP、topic guides、資源及 assessment 支援。',
      enDesc: 'Return to the existing IB dashboard, preserving DP/MYP, topic guides, resources, and assessment support.',
      icon: BookOpen,
      color: 'text-[#6B9080]',
      action: () => onNavigate('dashboard'),
    },
    {
      title: 'IB IA 支援補充',
      enTitle: 'IB IA Support Add-on',
      desc: '新增 IA 支援筆記作為項目補充，不取代原有 IB assessment 內容。',
      enDesc: 'Open IA support notes as project add-on content without replacing the existing IB assessment content.',
      icon: ClipboardList,
      color: 'text-[#D5896F]',
      action: () => onNavigate('ib_ia_support'),
    },
    {
      title: 'IB 課程版本補充',
      enTitle: 'IB Course Version Add-ons',
      desc: '查看 2026 與 2027 課程補充資料，保持與原有 IB topic cards 分開。',
      enDesc: 'View 2026 and 2027 course add-ons while keeping them separate from the original IB topic cards.',
      icon: FileSearch,
      color: 'text-[#CCA068]',
      action: () => onNavigate('ib_current_2026'),
    },
  ];

  const cards = selectedLevel === 'IB' ? ibProjects : selectedLevel === 'S4_S6' ? seniorProjects : juniorProjects;

  return (
    <div className="space-y-8 pb-20">
      <section className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-2">
              {t('專題活動中心', 'Project Hub')}
            </div>
            <h1 className="text-3xl font-bold text-[#2C2A26]">
              {t('保留原有專題入口，加入課程補充資源', 'Original Project Entry Points with Curriculum Add-ons')}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6B665E]">
              {t(
                '此頁保留原有網站的專題、資源、遊戲化學習和課程入口。新的 IB DT / HKDSE DAT 內容只作為補充卡片連結，不取代原有資料或功能。',
                'This page preserves the original project, resource, gamified learning, and curriculum entry points. New IB DT / HKDSE DAT material is linked only as add-on cards and does not replace existing data or functions.'
              )}
            </p>
          </div>
          <button
            onClick={() => onNavigate('source_metadata')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2.5 text-sm font-bold text-[#4A4741] hover:bg-white"
          >
            {t('來源補充', 'Source Add-on')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.title}
              type="button"
              whileHover={{ y: -4 }}
              onClick={card.action}
              className="bg-white rounded-2xl border border-[#E5E0D8] p-6 shadow-sm text-left hover:border-[#D5896F] transition-all"
            >
              <Icon className={`h-6 w-6 mb-4 ${card.color}`} />
              <h2 className="text-lg font-bold text-[#2C2A26]">{isEnglish ? card.enTitle : card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#6B665E]">{isEnglish ? card.enDesc : card.desc}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C857B]">
                {t('開啟', 'Open')} <ArrowRight className="h-4 w-4" />
              </div>
            </motion.button>
          );
        })}
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B]">{t('設計技能中心', 'Design Skills Hub')}</div>
          <h2 className="mt-1 text-2xl font-bold text-[#2C2A26]">{t('共用製圖、CAD、材料與製作技能', 'Shared drawing, CAD, material and making skills')}</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <motion.button
            type="button"
            whileHover={{ y: -4 }}
            onClick={() => onNavigate('orthographic_projection')}
            className="rounded-2xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition-all hover:border-[#D5896F]"
          >
            <Ruler className="mb-4 h-6 w-6 text-[#D5896F]" />
            <h3 className="text-lg font-bold text-[#2C2A26]">{t('正投影圖與基礎 CAD 繪圖', 'Orthographic Projection & Beginner CAD')}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">
              {t('練習平面圖、立面圖、側視圖、等角圖、剖面圖和簡單 2D 到 3D 擠出思維。', 'Practise plan, elevation, side, isometric and section views, plus simple 2D-to-3D extrusion thinking.')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C857B]">{t('開啟技能面板', 'Open Skill Panel')} <ArrowRight className="h-4 w-4" /></div>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -4 }}
            onClick={() => onNavigate('joining_methods')}
            className="rounded-2xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition-all hover:border-[#6B9080]"
          >
            <Box className="mb-4 h-6 w-6 text-[#6B9080]" />
            <h3 className="text-lg font-bold text-[#2C2A26]">{t('接合方法與黏合技術', 'Joining Methods & Adhesives')}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">
              {t('比較木材、紙板、亞加力、金屬和布料的接合方法、黏合劑、強度、安全與製作用途。', 'Compare joining methods, adhesives, strength, safety and making uses for wood, card, acrylic, metal and fabric.')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C857B]">{t('開啟技能面板', 'Open Skill Panel')} <ArrowRight className="h-4 w-4" /></div>
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ y: -4 }}
            onClick={() => onNavigate('finger_joint_box_maker')}
            className="rounded-2xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition-all hover:border-[#D5896F]"
          >
            <Box className="mb-4 h-6 w-6 text-[#D5896F]" />
            <h3 className="text-lg font-bold text-[#2C2A26]">{t('榫接盒與雷射切割外殼產生器', 'Finger Joint Box & Laser Case Maker')}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">
              {t('輸入尺寸、材料厚度、榫接大小與 kerf，產生盒、托盤或專題外殼的 2D SVG 雷射切割版面。', 'Enter dimensions, material thickness, finger size and kerf to generate 2D SVG laser-cut layouts for boxes, trays and project cases.')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8C857B]">{t('開啟工具', 'Open Tool')} <ArrowRight className="h-4 w-4" /></div>
          </motion.button>
        </div>
      </section>

      <section className="bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-6">
        <div className="flex items-start gap-3">
          <Hammer className="mt-0.5 h-5 w-5 text-[#CCA068]" />
          <p className="text-sm leading-6 text-[#6B665E]">
            {t(
              'DAT SBA 與 IB IA 可共用設計技能，例如用戶研究、設計簡介、構思、原型、測試、評鑑與作品集證據；但兩個課程及評估制度仍需分開呈現。',
              'DAT SBA and IB IA can share design skills such as user research, design brief writing, ideation, prototyping, testing, evaluation, and portfolio evidence, but the two curricula and assessment systems must remain separate.'
            )}
          </p>
        </div>
      </section>
    </div>
  );
};

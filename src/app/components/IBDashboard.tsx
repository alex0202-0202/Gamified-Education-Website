import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ExternalLink,
  Wrench,
  Lightbulb,
  Cpu,
  Download,
  CheckCircle2,
  Circle,
  Globe,
  Hammer,
  Microscope,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createIBSubtopicKey, getInternalRoute, ibTopicGuides } from '../data/ibTopics';

type IBDashboardProps = {
  onNavigate: (screen: string, topic?: string) => void;
  activeTopic?: string;
};

type BilingualText = {
  zh: string;
  en: string;
};

const bt = (zh: string, en: string): BilingualText => ({ zh, en });

const pickText = (value: BilingualText, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

const dpSLCriteria = [
  {
    label: bt('分析設計機遇', 'Analysis of a Design Opportunity'),
    desc: bt('識別設計問題、背景研究與需求分析', 'Identify the design problem, background research, and needs analysis'),
  },
  {
    label: bt('概念設計', 'Conceptual Design'),
    desc: bt('提出多個方案構思、草圖與評鑑準則', 'Generate multiple ideas, sketches, and evaluation criteria'),
  },
  {
    label: bt('詳細設計發展', 'Development of a Detailed Design'),
    desc: bt('整理設計文件、材料選擇與製作計劃', 'Build design documentation, material selection, and a making plan'),
  },
  {
    label: bt('測試與評鑑', 'Testing & Evaluation'),
    desc: bt('進行產品測試、蒐集使用者回饋並提出改進', 'Test the product, collect user feedback, and propose refinements'),
  },
];

const dpHLExtraCriteria = [
  {
    label: bt('商業產品詳細發展', 'Detailed development of a commercial product'),
    desc: bt('詳細說明產品商業化方案的發展', 'Expand the design into a commercially viable product plan'),
  },
  {
    label: bt('商業生產方式的選擇', 'Making choices for commercial production'),
    desc: bt('論證生產方法選擇與創新考量', 'Justify production-method choices and innovation considerations'),
  },
];

const mypDesignCycle = [
  {
    id: 'myp_a',
    criterion: bt('準則 A', 'Criterion A'),
    title: bt('探究與分析', 'Inquiring and Analyzing'),
    icon: Microscope,
    color: '#D5896F',
    maxMark: 8,
    deliverable: bt('研究筆記＋設計簡介', 'Research Notes + Design Brief'),
    points: [
      bt('說明問題為何需要被解決，並界定目標用戶／客戶', 'Explain why the problem matters and define the target user or client'),
      bt('識別並排序需要進行的研究', 'Identify and prioritise the research that is needed'),
      bt('分析現有產品、系統或方案的可借鏡之處', 'Analyse what can be learned from existing products, systems, or solutions'),
      bt('撰寫設計簡介，總結研究所得與設計方向', 'Write a design brief summarising the research findings and design direction'),
    ],
  },
  {
    id: 'myp_b',
    criterion: bt('準則 B', 'Criterion B'),
    title: bt('發展設計構思', 'Developing Ideas'),
    icon: Lightbulb,
    color: '#6B9080',
    maxMark: 8,
    deliverable: bt('設計規格＋最終方案', 'Design Specification + Chosen Idea'),
    points: [
      bt('建立清晰而可評估的設計規格', 'Create a clear and measurable design specification'),
      bt('發展多個可行構思，並以圖示或註解清楚表達', 'Develop multiple feasible ideas with clear visuals or annotations'),
      bt('評估不同方案並論證最終選擇', 'Evaluate different ideas and justify the final choice'),
      bt('製作準確圖樣、尺寸、流程或資源規劃', 'Prepare accurate drawings, dimensions, processes, or resource plans'),
    ],
  },
  {
    id: 'myp_c',
    criterion: bt('準則 C', 'Criterion C'),
    title: bt('創建解決方案', 'Creating the Solution'),
    icon: Hammer,
    color: '#CCA068',
    maxMark: 8,
    deliverable: bt('製作規劃記錄＋最終產品／原型', 'Planning Record + Final Product / Prototype'),
    points: [
      bt('依照清晰而有邏輯的計劃運用時間、工具與材料', 'Use time, tools, and materials through a clear and logical plan'),
      bt('在製作過程中展示適當技術與安全操作', 'Demonstrate appropriate techniques and safe practice while making'),
      bt('完成能正常運作的產品或原型', 'Produce a functioning product or prototype'),
      bt('記錄製作中的修改並解釋原因', 'Record modifications during making and explain why they were made'),
    ],
  },
  {
    id: 'myp_d',
    criterion: bt('準則 D', 'Criterion D'),
    title: bt('評鑑', 'Evaluating'),
    icon: CheckCircle2,
    color: '#8A9A5B',
    maxMark: 8,
    deliverable: bt('測試證據＋評鑑報告', 'Testing Evidence + Evaluation Report'),
    points: [
      bt('設計合適測試方法，以量度方案是否達標', 'Design suitable tests to measure whether the solution meets the target'),
      bt('根據設計規格評估成果的成功程度', 'Evaluate the success of the outcome against the specification'),
      bt('蒐集目標用戶／客戶回饋並分析影響', 'Collect target user or client feedback and analyse its impact'),
      bt('提出具體而合理的改進建議', 'Recommend specific and realistic improvements'),
    ],
  },
];

const mypBranches = [
  {
    id: 'myp_digital',
    title: bt('數碼設計', 'Digital Design'),
    icon: Cpu,
    color: '#6B9080',
    desc: bt('運用數碼工具、流程和系統，解決問題並發展解決方案', 'Use digital tools, processes, and systems to solve problems and develop solutions'),
    examples: [
      bt('App／網站設計', 'App / website design'),
      bt('micro:bit 編程', 'micro:bit programming'),
      bt('數碼媒體內容創作', 'digital media content creation'),
      bt('模擬控制系統', 'simulated control systems'),
    ],
  },
  {
    id: 'myp_product',
    title: bt('產品設計', 'Product Design'),
    icon: Wrench,
    color: '#D5896F',
    desc: bt('運用工具、設備及材料，設計、創造和評鑑解決方案', 'Use tools, equipment, and materials to design, create, and evaluate solutions'),
    examples: [
      bt('產品重新設計', 'product redesign'),
      bt('3D 列印原型', '3D-printed prototypes'),
      bt('木材／金屬設計與製作', 'wood / metal design and making'),
      bt('包裝設計', 'packaging design'),
    ],
  },
];

const dpAssessment = {
  sl: [
    { paper: 'Paper 1', detail: bt('多項選擇題（MCQ）', 'multiple-choice questions (MCQ)') },
    { paper: 'Paper 2', detail: bt('核心課題短答及延伸答題', 'short-response and extended-response questions on the core topics') },
    { paper: 'IA Design Project', detail: bt('佔最終分數 40%，Design Folio 最多 20 頁', '40% of the final grade, with a design folio of up to 20 pages') },
  ],
  hl: [
    { paper: 'Paper 1', detail: bt('題目數量較 SL 多', 'includes more questions than the SL paper') },
    { paper: 'Paper 3', detail: bt('3 道 HL 延伸結構題，其中 1 題基於個案研究', 'three HL extension structured questions, including one based on a case study') },
    { paper: 'IA Design Project', detail: bt('佔最終分數 40%，Folio 最多 25 頁，包含創新面向', '40% of the final grade, with a folio of up to 25 pages including an innovation focus') },
  ],
};

const resourceEntries = [
  { title: bt('Command Terms 策略', 'Command Terms Strategy'), topic: 'command-terms' },
  { title: bt('IA 設計項目清單', 'IA Design Project Checklist'), topic: 'ia-checklist' },
  { title: bt('Extended Essay 規劃', 'Extended Essay Planning'), topic: 'ee-planning' },
  { title: bt('原型與工作坊安全', 'Prototype and Workshop Safety'), topic: 'safety-protocols' },
];

const mypDpProgression = [
  {
    myp: bt('準則 A：探究與分析', 'Criterion A: Inquiring and Analyzing'),
    dp: bt('分析設計機遇', 'Analysis of a Design Opportunity'),
    skill: bt('問題定義、研究排序、設計簡介', 'Problem definition, research prioritisation, and the design brief'),
  },
  {
    myp: bt('準則 B：發展設計構思', 'Criterion B: Developing Ideas'),
    dp: bt('概念設計＋詳細設計發展', 'Conceptual Design + Development of a Detailed Design'),
    skill: bt('設計規格、方案比較、最終選擇', 'Design specifications, idea comparison, and final selection'),
  },
  {
    myp: bt('準則 C：創建解決方案', 'Criterion C: Creating the Solution'),
    dp: bt('Folio 內的製作／原型發展', 'Making / Prototype Development in the Folio'),
    skill: bt('計劃執行、技術應用、修改記錄', 'Plan execution, technical application, and modification records'),
  },
  {
    myp: bt('準則 D：評鑑', 'Criterion D: Evaluating'),
    dp: bt('測試與評鑑', 'Testing & Evaluation'),
    skill: bt('測試方法、成功準則、改良建議', 'Testing methods, success criteria, and improvement proposals'),
  },
];

export const IBDashboard = ({ onNavigate, activeTopic }: IBDashboardProps) => {
  const { t, isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dp' | 'myp'>('dp');
  const activeTopicGuide = ibTopicGuides.find((entry) => entry.id === activeTopic);

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  useEffect(() => {
    if (activeTopic?.startsWith('ib_t') && activeTab !== 'dp') {
      setActiveTab('dp');
    }
  }, [activeTab, activeTopic]);

  useEffect(() => {
    if (!activeTopic?.startsWith('ib_t') || activeTab !== 'dp') {
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById(`ib-topic-card-${activeTopic}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeTab, activeTopic]);

  return (
    <div className="space-y-10 pb-20">
      <div
        className="relative overflow-hidden rounded-3xl p-10 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #3D3530 0%, #5A4A3A 50%, #6B705C 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-25 translate-x-1/2 -translate-y-1/2"
          style={{ background: '#CCA068' }}
        />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-25 -translate-x-1/2 translate-y-1/2" style={{ background: '#6B9080' }} />
        <div className="relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-[#E5D9CD] mb-4">
            {t('國際文憑課程 · 設計科技', 'International Baccalaureate · Design Technology')}
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            IB Design Technology
            <span className="block text-2xl lg:text-3xl font-semibold text-[#D4C4B0] mt-1">{t('設計與科技 知識庫', 'Design Technology Knowledge Hub')}</span>
          </h1>
          <p className="text-sm text-[#C8BEB4] max-w-2xl leading-relaxed">
            {t('透過設計周期（分析、發展、綜合、評鑒）培養批判性思維；理論與實踐並重，屬 IB 第四組：科學科組。', 'Design cycle (analysis, development, synthesis, evaluation) · critical thinking · Group 4 Sciences · theory and practice combined.')}
          </p>
          <div className="flex gap-3 mt-6">
            {(['dp', 'myp'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                  activeTab === tab
                    ? 'bg-[#D5896F] border-[#D5896F] text-white'
                    : 'bg-white/10 border-white/20 text-[#D4C4B0] hover:bg-white/20'
                }`}
              >
                {tab === 'dp' ? t('DP 文憑課程', 'DP (Diploma Programme)') : t('MYP 中學課程', 'MYP (Middle Years Programme)')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'dp' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
          <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D5896F]/10 rounded-xl flex-shrink-0">
                <Globe className="w-6 h-6 text-[#D5896F]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#2C2A26] mb-2">{t('IB DP Design Technology — 課程宗旨', 'IB DP Design Technology — Course Aim')}</h2>
                <p className="text-sm text-[#6B665E] leading-relaxed mb-3">
                  {t('DP Design Technology 屬於', 'DP Design Technology belongs to')} <span className="font-bold text-[#2C2A26]">{t('第四組：科學科組', 'Group 4 Sciences')}</span>
                  {t('，透過設計周期培養批判性設計思維，掌握使用新舊科技創造產品、服務與系統的技能。', '. The course builds skills to create products, services, and systems through critical design thinking and the design cycle.')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: t('分析', 'Analysis'), color: '#D5896F' },
                    { label: t('設計發展', 'Development'), color: '#6B9080' },
                    { label: t('綜合', 'Synthesis'), color: '#CCA068' },
                    { label: t('評鑒', 'Evaluation'), color: '#8A9A5B' },
                  ].map((phase) => (
                    <div key={phase.label} className="text-center p-3 rounded-xl border border-[#E5E0D8]" style={{ background: `${phase.color}10` }}>
                      <div className="text-xs font-bold" style={{ color: phase.color }}>{phase.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {activeTopicGuide && (
            <div className="bg-[#FDF9F7] rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                <div className="lg:w-1/3">
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: activeTopicGuide.color }}>
                    {pickText(activeTopicGuide.number, isEnglish)} · {t('目前重點', 'Current Focus')}
                  </div>
                  <h2 className="text-xl font-bold text-[#2C2A26] mb-2">{pickText(activeTopicGuide.title, isEnglish)}</h2>
                  <p className="text-sm text-[#6B665E] leading-relaxed">{pickText(activeTopicGuide.instruction, isEnglish)}</p>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#E5E0D8] bg-white p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('關鍵知識', 'Key Knowledge')}</div>
                    <ul className="space-y-2">
                      {activeTopicGuide.knowledge.map((point, index) => (
                        <li key={index} className="flex items-start text-sm text-[#6B665E]">
                          <Circle className="w-2.5 h-2.5 mr-2 mt-1.5 flex-shrink-0" style={{ color: activeTopicGuide.color, opacity: 0.5 }} />
                          {pickText(point, isEnglish)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-[#E5E0D8] bg-white p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('例子與參考', 'Example and References')}</div>
                    <p className="text-sm text-[#4A4741] mb-3">{pickText(activeTopicGuide.example, isEnglish)}</p>
                    <div className="space-y-2">
                      {activeTopicGuide.references.map((reference) => {
                        const route = getInternalRoute(activeTopicGuide.id, reference);
                        return route ? (
                          <button
                            key={reference.label.en}
                            onClick={() => onNavigate(route.screen, route.key)}
                            className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                          >
                            <span>{pickText(reference.label, isEnglish)}</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#8C857B]" />
                          </button>
                        ) : (
                          <a
                            key={reference.url}
                            href={reference.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                          >
                            <span>{pickText(reference.label, isEnglish)}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#8C857B]" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {activeTopicGuide.subtopics && activeTopicGuide.subtopics.length > 0 && (
                <div className="mt-5 pt-5 border-t border-[#E5E0D8]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('IB 子主題結構', 'IB Subtopic Structure')}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {activeTopicGuide.subtopics.map((subtopic) => (
                      <div key={subtopic.code} className="rounded-xl border border-[#E5E0D8] bg-white p-4 hover:border-[#D5896F] transition-colors">
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: activeTopicGuide.color }}>{subtopic.code}</div>
                        <h3 className="font-bold text-sm text-[#2C2A26] mb-2">{pickText(subtopic.title, isEnglish)}</h3>
                        <p className="text-xs text-[#6B665E] leading-relaxed mb-3">{pickText(subtopic.summary, isEnglish)}</p>
                        <button
                          onClick={() => onNavigate('ib_subtopic', createIBSubtopicKey(activeTopicGuide.id, subtopic.code))}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#D5896F] hover:underline mb-3"
                        >
                          {t('查看子主題詳解', 'Open Subtopic Detail')}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        {subtopic.resources && subtopic.resources.length > 0 && (
                          <div className="space-y-2">
                            {subtopic.resources.map((resource) => {
                              const route = getInternalRoute(activeTopicGuide.id, resource);
                              return route ? (
                                <button
                                  key={resource.label.en}
                                  onClick={() => onNavigate(route.screen, route.key)}
                                  className="flex items-center justify-between text-[11px] px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors w-full"
                                >
                                  <span>{pickText(resource.label, isEnglish)}</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-[#8C857B]" />
                                </button>
                              ) : (
                                <a
                                  key={resource.url}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex items-center justify-between text-[11px] px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                                >
                                  <span>{pickText(resource.label, isEnglish)}</span>
                                  <ExternalLink className="w-3.5 h-3.5 text-[#8C857B]" />
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── IBDP 十大主題 (compact tiles) ─────────────────────────────── */}
          <section>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-1.5 h-8 rounded-full bg-[#6B9080]" />
              <h2 className="text-2xl font-bold text-[#2C2A26]">{t('IBDP 十大主題', 'IBDP 10 Topics')}</h2>
              <span className="text-xs font-bold text-[#6B9080] bg-[#EFF5F3] border border-[#D1DCD0] px-3 py-1 rounded-full">T1–T10</span>
            </div>

            {/* SL + HL shared: T1–T6 */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D5896F]">SL + HL · {t('共同修讀', 'Shared Core')} · Topics 1–6</span>
                <div className="flex-1 h-px bg-[#E5E0D8]" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {ibTopicGuides.slice(0, 6).map((entry) => {
                  const isActive = activeTopic === entry.id;
                  const num = entry.id.replace('ib_t', 'T');
                  return (
                    <motion.button
                      key={entry.id}
                      id={`ib-topic-guide-${entry.id}`}
                      variants={item}
                      whileHover={{ y: -3 }}
                      onClick={() => onNavigate('dashboard', entry.id)}
                      className={`group relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all shadow-sm hover:shadow-md scroll-mt-28 ${isActive ? 'border-[#D5896F] bg-[#FFF5F0]' : 'bg-white border-[#E5E0D8] hover:border-[#D5896F]'}`}
                    >
                      {isActive && <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: entry.color }} />}
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="p-2 rounded-xl" style={{ background: `${entry.color}18`, color: entry.color }}>
                          <entry.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md" style={{ background: `${entry.color}15`, color: entry.color }}>{num}</span>
                      </div>
                      <h3 className="font-bold text-xs text-[#2C2A26] leading-tight mb-0.5 line-clamp-2">{pickText(entry.title, isEnglish)}</h3>
                      <p className="text-[10px] text-[#A8A29A] leading-tight line-clamp-1">{pickText(entry.title, !isEnglish)}</p>
                      {entry.knowledge.slice(0, 2).map((k, ki) => (
                        <div key={ki} className="flex items-start gap-1 mt-1">
                          <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: entry.color }} />
                          <span className="text-[10px] text-[#6B665E] leading-tight line-clamp-1">{pickText(k, isEnglish).split(':')[0]}</span>
                        </div>
                      ))}
                      <div className="mt-3 flex items-center gap-1 text-[10px] font-bold" style={{ color: entry.color }}>
                        {t('詳解', 'Details')} <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* HL Only: T7–T10 */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6B9080]">HL {t('延伸主題', 'Extension')} · Topics 7–10</span>
                <span className="text-[9px] font-bold text-white bg-[#6B9080] px-2 py-0.5 rounded-full">HL Only</span>
                <div className="flex-1 h-px bg-[#E5E0D8]" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {ibTopicGuides.slice(6).map((entry) => {
                  const isActive = activeTopic === entry.id;
                  const num = entry.id.replace('ib_t', 'T');
                  return (
                    <motion.button
                      key={entry.id}
                      id={`ib-topic-guide-${entry.id}`}
                      variants={item}
                      whileHover={{ y: -3 }}
                      onClick={() => onNavigate('dashboard', entry.id)}
                      className={`group relative flex flex-col items-start p-4 rounded-2xl border text-left transition-all shadow-sm hover:shadow-md scroll-mt-28 ${isActive ? 'border-[#6B9080] bg-[#EFF5F3]' : 'bg-white border-[#E5E0D8] hover:border-[#6B9080]'}`}
                    >
                      {isActive && <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: entry.color }} />}
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className="p-2 rounded-xl" style={{ background: `${entry.color}18`, color: entry.color }}>
                          <entry.icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md" style={{ background: `${entry.color}15`, color: entry.color }}>{num}</span>
                      </div>
                      <h3 className="font-bold text-xs text-[#2C2A26] leading-tight mb-0.5 line-clamp-2">{pickText(entry.title, isEnglish)}</h3>
                      <p className="text-[10px] text-[#A8A29A] leading-tight line-clamp-1">{pickText(entry.title, !isEnglish)}</p>
                      {entry.knowledge.slice(0, 2).map((k, ki) => (
                        <div key={ki} className="flex items-start gap-1 mt-1">
                          <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: entry.color }} />
                          <span className="text-[10px] text-[#6B665E] leading-tight line-clamp-1">{pickText(k, isEnglish).split(':')[0]}</span>
                        </div>
                      ))}
                      <div className="mt-3 flex items-center gap-1 text-[10px] font-bold" style={{ color: entry.color }}>
                        {t('詳解', 'Details')} <ArrowRight className="w-3 h-3" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-4 mb-5">
              <div className="w-1.5 h-8 rounded-full bg-[#CCA068]" />
              <h2 className="text-2xl font-bold text-[#2C2A26]">{t('評估結構', 'Assessment')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D5896F]/10 text-[#D5896F]">SL</span>
                  <h3 className="font-bold text-[#2C2A26]">{t('Standard Level 評估', 'Standard Level Assessment')}</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#6B665E]">
                  {dpAssessment.sl.map((entry) => (
                    <li key={entry.paper} className="flex items-start gap-2">
                      <Circle className="w-2.5 h-2.5 mt-1.5 flex-shrink-0 text-[#D5896F]/50" />
                      <span><span className="font-bold text-[#2C2A26]">{entry.paper}</span> — {pickText(entry.detail, isEnglish)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#6B9080]/10 text-[#6B9080]">HL</span>
                  <h3 className="font-bold text-[#2C2A26]">{t('Higher Level 評估（額外考核）', 'Higher Level Assessment')}</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#6B665E]">
                  {dpAssessment.hl.map((entry) => (
                    <li key={entry.paper} className="flex items-start gap-2">
                      <Circle className="w-2.5 h-2.5 mt-1.5 flex-shrink-0 text-[#6B9080]/50" />
                      <span><span className="font-bold text-[#2C2A26]">{entry.paper}</span> — {pickText(entry.detail, isEnglish)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-4 mb-5">
              <div className="w-1.5 h-8 rounded-full bg-[#8A9A5B]" />
              <h2 className="text-2xl font-bold text-[#2C2A26]">{t('Design Project — IA 評估準則', 'Design Project — IA Criteria')}</h2>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6 space-y-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#D5896F] mb-3">{t('SL + HL 共同準則 (4 criteria)', 'Shared SL + HL Criteria (4 criteria)')}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {dpSLCriteria.map((criterion, index) => (
                    <div key={criterion.label.en} className="bg-[#FDF9F7] rounded-xl p-4 border border-[#E5E0D8]">
                      <div className="text-[10px] font-black text-[#D5896F] mb-1">Criterion {index + 1}</div>
                      <div className="font-bold text-sm text-[#2C2A26] mb-1">{pickText(criterion.label, isEnglish)}</div>
                      <div className="text-[11px] text-[#8C857B] italic mb-1">{pickText(criterion.label, !isEnglish)}</div>
                      <div className="text-xs text-[#6B665E]">{pickText(criterion.desc, isEnglish)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#6B9080] mb-3">{t('HL 額外準則 (2 additional criteria)', 'Additional HL Criteria (2 criteria)')}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dpHLExtraCriteria.map((criterion, index) => (
                    <div key={criterion.label.en} className="bg-[#F3F7F5] rounded-xl p-4 border border-[#D1DCD0]">
                      <div className="text-[10px] font-black text-[#6B9080] mb-1">HL Criterion {index + 5}</div>
                      <div className="font-bold text-sm text-[#2C2A26] mb-1">{pickText(criterion.label, isEnglish)}</div>
                      <div className="text-[11px] text-[#8C857B] italic mb-1">{pickText(criterion.label, !isEnglish)}</div>
                      <div className="text-xs text-[#6B665E]">{pickText(criterion.desc, isEnglish)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="bg-[#F2EFE9] rounded-2xl p-8 border border-[#E5E0D8]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-[#2C2A26] mb-2">{t('學習資源', 'Resources')}</h3>
                <p className="text-sm text-[#6B665E]">{t('Command Terms · IA 清單 · EE 規劃 · 安全提醒', 'Command Terms · IA Checklist · EE Planning · Safety Reminders')}</p>
                <p className="text-xs text-[#A8A29A] mt-2 italic">{t('※ 2026 為此版本課程最後評核年；新版課程已於 2025 年 2 月公布。', 'Note: 2026 is the final assessment year for this version of the course. The revised course was published in February 2025.')}</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[280px]">
                {resourceEntries.map((entry) => (
                  <button key={entry.title.en} onClick={() => onNavigate('ib_resources', entry.topic)} className="flex items-center justify-between px-4 py-2.5 bg-white rounded-lg border border-[#E5E0D8] hover:border-[#D5896F] text-sm font-medium text-[#4A4741] transition-colors group">
                    <span className="truncate pr-4">{pickText(entry.title, isEnglish)}</span>
                    <Download className="w-4 h-4 text-[#8C857B] group-hover:text-[#D5896F] flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'myp' && (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
          <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#6B9080]/10 rounded-xl flex-shrink-0">
                <Globe className="w-6 h-6 text-[#6B9080]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#2C2A26] mb-2">{t('IB MYP Design — 課程宗旨', 'IB MYP Design — Course Aim')}</h2>
                <p className="text-sm text-[#6B665E] leading-relaxed mb-3">
                  {t('MYP Design（中學課程設計科）為 MYP 1–5 年（約 11–16 歲）學生提供框架，透過「設計周期」(Design Cycle) 培養解決問題、批判思維與創造能力。課程分兩大分支：', 'MYP Design provides a framework for students in MYP years 1–5 (roughly ages 11–16). Through the design cycle it develops problem solving, critical thinking, and creativity across two main branches:')}
                  <span className="font-bold text-[#2C2A26]">{t('數碼設計', 'Digital Design')}</span> {t('及', 'and')} <span className="font-bold text-[#2C2A26]">{t('產品設計', 'Product Design')}</span>{t('，並與 ATL（學習技能）及全球背景緊密結合。', ', closely linked to ATL skills and global contexts.')}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {mypBranches.map((branch) => (
                    <div key={branch.id} className="rounded-xl border border-[#E5E0D8] p-4" style={{ background: `${branch.color}08` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <branch.icon className="w-4 h-4" style={{ color: branch.color }} />
                        <span className="font-bold text-sm" style={{ color: branch.color }}>{pickText(branch.title, isEnglish)}</span>
                        <span className="text-xs text-[#8C857B]">{pickText(branch.title, !isEnglish)}</span>
                      </div>
                      <p className="text-xs text-[#6B665E] mb-2">{pickText(branch.desc, isEnglish)}</p>
                      <div className="flex flex-wrap gap-1">
                        {branch.examples.map((example) => (
                          <span key={example.en} className="text-[10px] px-1.5 py-0.5 rounded bg-white border border-[#E5E0D8] text-[#6B665E]">{pickText(example, isEnglish)}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-1.5 h-8 rounded-full bg-[#D5896F]" />
              <h2 className="text-2xl font-bold text-[#2C2A26]">{t('MYP 設計周期 / IBO 評估準則', 'MYP Design Cycle / IBO Criteria')}</h2>
              <span className="text-xs font-bold bg-[#D5896F]/10 text-[#D5896F] border border-[#E5E0D8] px-3 py-1 rounded-full">{t('Criteria A-D · 各佔 8 分', 'Criteria A-D · 8 marks each')}</span>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-5 mb-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('IBO 評估框架', 'IBO Standard Fit')}</div>
              <p className="text-sm text-[#6B665E] leading-relaxed">
                {t('在 MYP Design 中，學生並不是只被評核「做出成品」，而是按 IBO 的四個準則進行全面評估：', 'In MYP Design, students are not assessed only on producing a final product. They are assessed across the four IBO criteria:')}
                <span className="font-bold text-[#2C2A26]">{t('A 探究與分析', 'A Inquiring and Analyzing')}</span>、
                <span className="font-bold text-[#2C2A26]">{t('B 發展構思', 'B Developing Ideas')}</span>、
                <span className="font-bold text-[#2C2A26]">{t('C 創建解決方案', 'C Creating the Solution')}</span>、
                <span className="font-bold text-[#2C2A26]">{t('D 評鑑', 'D Evaluating')}</span>。
                {t('每個準則都對應學生應提交的證據，例如設計簡介、設計規格、製作記錄與測試報告。', 'Each criterion is linked to evidence such as a design brief, specification, making record, and testing report.')}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {mypDesignCycle.map((criterion, index) => (
                <motion.div key={criterion.id} variants={item} className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-5 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: criterion.color }}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: criterion.color }}>{pickText(criterion.criterion, isEnglish)}</div>
                      <h3 className="font-bold text-sm text-[#2C2A26] leading-tight">{pickText(criterion.title, isEnglish)}</h3>
                      <span className="text-[11px] text-[#8C857B]">{pickText(criterion.title, !isEnglish)}</span>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {criterion.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start text-xs text-[#6B665E]">
                        <Circle className="w-2 h-2 mr-1.5 mt-1 flex-shrink-0" style={{ color: criterion.color, opacity: 0.5 }} />
                        {pickText(point, isEnglish)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-1">{t('預期證據', 'Expected Evidence')}</div>
                    <div className="text-xs font-medium" style={{ color: criterion.color }}>{pickText(criterion.deliverable, isEnglish)}</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#F2EFE9] text-right">
                    <span className="text-xs font-bold" style={{ color: criterion.color }}>{t('最高', 'Up to')} {criterion.maxMark} {t('分', 'marks')}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center space-x-4 mb-5">
              <div className="w-1.5 h-8 rounded-full bg-[#6B9080]" />
              <h2 className="text-2xl font-bold text-[#2C2A26]">{t('MYP → DP 銜接對照', 'MYP to DP Progression')}</h2>
            </div>
            <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F9F8F6] border-b border-[#E5E0D8]">
                    <th className="text-left px-5 py-3 font-bold text-[#4A4741]">{t('MYP 設計周期', 'MYP Design Cycle')}</th>
                    <th className="text-left px-5 py-3 font-bold text-[#4A4741]">{t('DP Design Project IA 對應', 'Matching DP Design Project IA Stage')}</th>
                    <th className="text-left px-5 py-3 font-bold text-[#4A4741]">{t('核心技能', 'Core Skills')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EFE9]">
                  {mypDpProgression.map((row, index) => (
                    <tr key={index} className="hover:bg-[#FDFCFB] transition-colors">
                      <td className="px-5 py-3 text-[#6B9080] font-medium">{pickText(row.myp, isEnglish)}</td>
                      <td className="px-5 py-3 text-[#D5896F] font-medium">{pickText(row.dp, isEnglish)}</td>
                      <td className="px-5 py-3 text-[#6B665E]">{pickText(row.skill, isEnglish)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </motion.div>
      )}
    </div>
  );
};

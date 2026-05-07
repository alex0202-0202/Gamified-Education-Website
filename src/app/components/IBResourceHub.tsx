import { useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ClipboardCheck, ExternalLink, FileSearch, Lightbulb, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createIBSubtopicKey, getInternalRoute, ibTopicGuides } from '../data/ibTopics';

type IBResourceHubProps = {
  activeTopic?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

type BilingualText = {
  zh: string;
  en: string;
};

const bt = (zh: string, en: string): BilingualText => ({ zh, en });

const pickText = (value: BilingualText, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

const ibResourceSections = [
  {
    id: 'command-terms',
    title: bt('Command Terms 應試策略', 'Command Terms Strategy'),
    summary: bt('專注 IB DP Design Technology 的答題語言、結構與思考深度，不混入 HKDSE DAT 題型。', 'Focused on IB DP Design Technology response language, structure, and depth of thinking without mixing in HKDSE DAT question styles.'),
    icon: Lightbulb,
    color: '#CCA068',
    checklist: [
      bt('先認清 Compare、Describe、Discuss、Explain、Evaluate、Outline 的要求差異。', 'Distinguish clearly between Compare, Describe, Discuss, Explain, Evaluate, and Outline.'),
      bt('把 marks 與 command term 一起看，估算答案要有多少個重點與例子。', 'Read the mark allocation together with the command term to estimate how many ideas and examples are needed.'),
      bt('把答案分成 clusters，每段只處理一個主點，再補上證據或設計情境。', 'Organize answers into clusters, with one main idea per paragraph supported by evidence or design context.'),
      bt('答題時要以設計師和使用者雙重視角分析，不只是背誦定義。', 'Answer from both the designer and user perspective instead of only recalling definitions.'),
    ],
    prompts: [
      bt('練習方向：解釋 injection molding 為何適合某產品。', 'Practice prompt: explain why injection molding suits a particular product.'),
      bt('練習方向：描述百分位如何影響人體工學尺寸。', 'Practice prompt: describe how percentiles affect ergonomic sizing.'),
      bt('練習方向：討論 JIT 為何適合某商業生產情境。', 'Practice prompt: discuss why JIT suits a commercial-production situation.'),
    ],
  },
  {
    id: 'ia-checklist',
    title: bt('IA 設計項目清單', 'IA Design Project Checklist'),
    summary: bt('聚焦 IB IA 的真實設計探究流程，與 DSE 校本專題或 DAT 模組任務分開管理。', 'Focused on the authentic IB IA design inquiry process and managed separately from DSE school-based projects or DAT module tasks.'),
    icon: ClipboardCheck,
    color: '#D5896F',
    checklist: [
      bt('A 分析：設計機遇是否真實、具體，並連到明確用戶或情境？', 'A Analysis: is the design opportunity authentic, specific, and linked to a clear user or context?'),
      bt('B 概念：是否有多個方案、明確設計規格與選擇理由？', 'B Conceptual design: are there multiple ideas, a clear design specification, and justified selection?'),
      bt('C 發展：是否有尺寸、材料、製作方法、技術細節與迭代證據？', 'C Development: do you show dimensions, materials, manufacturing methods, technical detail, and iteration evidence?'),
      bt('D 測試：是否以成功準則驗證原型，而不是只作外觀展示？', 'D Testing: is the prototype evaluated against success criteria rather than displayed only for appearance?'),
      bt('HL E-F：商業生產與市場策略是否有清楚理據與對象？', 'HL E-F: are commercial production and marketing strategies clearly justified and audience-specific?'),
    ],
    prompts: [
      bt('里程碑建議：研究完成前不要急於定稿外觀。', 'Milestone cue: do not finalize the appearance before the research is strong enough.'),
      bt('文件提醒：每一次修改都應寫清楚原因與影響。', 'Documentation cue: every design change should explain why it happened and what it affected.'),
    ],
  },
  {
    id: 'ee-planning',
    title: bt('Extended Essay 規劃', 'Extended Essay Planning'),
    summary: bt('只處理 IB DT Extended Essay 的選題、研究問題與研究方法，不與 HKDSE 評估模式交叉。', 'Handles only IB DT Extended Essay topic choice, research questions, and research method planning without crossing into HKDSE assessment structures.'),
    icon: FileSearch,
    color: '#6B9080',
    checklist: [
      bt('選題要直接對應 DT 內容，並且是你真正有興趣持續研究的問題。', 'Choose a topic that connects directly to DT content and can sustain genuine interest.'),
      bt('Research Question 要夠具體、可研究，並能提供明確分析角度。', 'The research question must be specific, researchable, and framed through a clear analytical lens.'),
      bt('Primary research 不能缺席，可包括產品測試、材料測試、模型測試或專家訪談。', 'Primary research is essential and may include product testing, material testing, model testing, or expert interviews.'),
      bt('避免純歷史回顧、純產品比較、純市場營銷，或與 IA 題目重疊。', 'Avoid purely historical reviews, simple product comparisons, marketing-only topics, or overlap with the IA.'),
    ],
    prompts: [
      bt('題目範圍思考：某種界面、材料或製造選擇如何影響舒適度、效率或可持續性？', 'Question stem idea: how does an interface, material, or manufacturing choice affect comfort, efficiency, or sustainability?'),
      bt('研究方法思考：你可以取得哪些第一手數據，而不只是網上資料？', 'Method cue: what first-hand data can you realistically collect beyond online sources?'),
    ],
  },
  {
    id: 'safety-protocols',
    title: bt('IB 原型與工作坊安全', 'IB Prototype and Workshop Safety'),
    summary: bt('支援 IA 製作、模型測試與工作坊實踐的 IB 專用安全提醒，不引用 DSE 模組內容。', 'Provides IB-specific safety reminders for IA making, model testing, and workshop practice without referencing DSE module content.'),
    icon: ShieldCheck,
    color: '#8A9A5B',
    checklist: [
      bt('任何有切割、夾傷、灼熱或飛濺風險的設備，先確認防護裝置與老師批准。', 'Confirm guards and teacher approval before using any equipment with cutting, pinching, heat, or flying-debris risk.'),
      bt('修改電路或接線前先斷電，核對電壓、極性與元件額定值。', 'De-energize before rewiring and verify voltage, polarity, and component ratings.'),
      bt('激光、加熱、黏合劑、溶劑與 3D 列印都要先確認通風與材料相容性。', 'Check ventilation and material compatibility before laser work, heating, adhesives, solvents, or 3D printing.'),
      bt('User testing 前要先說明限制、控制風險，避免把未驗證原型直接交付長時間使用。', 'Before user testing, explain limitations and control risk; do not release an unvalidated prototype for uncontrolled use.'),
    ],
    prompts: [
      bt('安全原則：真實測試很重要，但要先把風險降到可接受範圍。', 'Safety principle: authentic testing matters, but risk must be reduced to an acceptable level first.'),
    ],
  },
];

export const IBResourceHub = ({ activeTopic, onNavigate }: IBResourceHubProps) => {
  const { t, isEnglish } = useLanguage();

  useEffect(() => {
    if (!activeTopic) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById(`ib-resource-${activeTopic}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    return () => cancelAnimationFrame(frame);
  }, [activeTopic]);

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#F2EFE9] rounded-xl">
            <FileSearch className="w-6 h-6 text-[#D5896F]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-1">IB Resource Library</div>
            <h1 className="text-3xl font-bold text-[#2C2A26]">{t('IB 資源中心', 'IB Resource Library')}</h1>
            <p className="text-sm text-[#6B665E] mt-2 max-w-3xl">
              {t('Command Terms · IA 清單 · EE 規劃 · 安全提醒 · 主題資源連結', 'Command Terms · IA Planning · EE Planning · Safety Reminders · Topic Resource Links')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F2EFE9] rounded-2xl border border-[#E5E0D8] p-5">
        <div className="flex flex-wrap gap-3">
          {ibResourceSections.map((section) => {
            const isActive = activeTopic === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onNavigate('ib_resources', section.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  isActive
                    ? 'bg-white border-[#D5896F] text-[#2C2A26]'
                    : 'bg-[#FAF9F6] border-[#E5E0D8] text-[#6B665E] hover:bg-white'
                }`}
              >
                {pickText(section.title, isEnglish)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('IBDP Topic Guide Jump', 'IBDP Topic Guide Jump')}</div>
        <div className="flex flex-wrap gap-3">
          {ibTopicGuides.map((topic) => {
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => onNavigate('ib_resources', topic.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                  isActive
                    ? 'bg-white border-[#D5896F] text-[#2C2A26]'
                    : 'bg-[#FAF9F6] border-[#E5E0D8] text-[#6B665E] hover:bg-white'
                }`}
              >
                {topic.number.en} · {pickText(topic.title, isEnglish)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {ibResourceSections.map((section) => {
          const Icon = section.icon;
          const isActive = activeTopic === section.id;
          return (
            <section id={`ib-resource-${section.id}`} key={section.id} className={`bg-white rounded-2xl border shadow-sm p-6 scroll-mt-28 ${isActive ? 'border-[#D5896F]' : 'border-[#E5E0D8]'}`}>
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-xl bg-[#F9F8F6]">
                  <Icon className="w-5 h-5" style={{ color: section.color }} />
                </div>
                <div>
                  <h2 className="font-bold text-[#2C2A26] text-lg">{pickText(section.title, isEnglish)}</h2>
                  {isActive && <div className="text-[10px] font-bold uppercase tracking-widest text-[#D5896F] mt-1">{t('目前重點', 'Current Focus')}</div>}
                </div>
              </div>

              <p className="text-sm text-[#6B665E] mb-5">{pickText(section.summary, isEnglish)}</p>

              <div className="space-y-3 mb-5">
                {section.checklist.map((item, index) => (
                  <div key={index} className="flex items-start text-sm text-[#6B665E]">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: section.color }} />
                    {pickText(item, isEnglish)}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#F2EFE9] space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('學生提示', 'Student Cues')}</div>
                {section.prompts.map((prompt, index) => (
                  <div key={index} className="text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741]">
                    {pickText(prompt, isEnglish)}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section>
        <div className="flex items-center space-x-4 mb-5">
          <div className="w-1.5 h-8 rounded-full bg-[#6B9080]" />
          <h2 className="text-2xl font-bold text-[#2C2A26]">{t('IBDP Topic Guide Library', 'IBDP Topic Guide Library')}</h2>
        </div>
        <p className="text-sm text-[#6B665E] mb-5">
          {t('資源中心現在也保留 Topic 1–10 的完整 guidance，方便你在 command terms、IA / EE 支援之外，直接查閱每個 IBDP 主題的 instruction、知識點、例子與參考。', 'The resource library now also keeps the full Topic 1–10 guidance so you can review instructions, key knowledge, examples, and references alongside command terms and IA / EE support.')}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {ibTopicGuides.map((topic) => {
            const isActive = activeTopic === topic.id;
            return (
              <div
                id={`ib-resource-${topic.id}`}
                key={topic.id}
                className={`bg-white rounded-2xl border shadow-sm p-6 scroll-mt-28 ${isActive ? 'border-[#D5896F]' : 'border-[#E5E0D8]'}`}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#F9F8F6]" style={{ color: topic.color }}>
                    <topic.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: topic.color }}>
                      {topic.number.en}
                    </div>
                    <h2 className="font-bold text-[#2C2A26] text-lg">{pickText(topic.title, isEnglish)}</h2>
                    {isActive && <div className="text-[10px] font-bold uppercase tracking-widest text-[#D5896F] mt-1">{t('目前重點', 'Current Focus')}</div>}
                  </div>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('關鍵 Instruction', 'Key Instruction')}</div>
                  <p className="text-sm text-[#4A4741]">{pickText(topic.instruction, isEnglish)}</p>
                </div>

                <div className="mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('關鍵知識', 'Key Knowledge')}</div>
                  <ul className="space-y-2">
                    {topic.knowledge.map((point, index) => (
                      <li key={index} className="flex items-start text-sm text-[#6B665E]">
                        <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: topic.color }} />
                        {pickText(point, isEnglish)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('例子', 'Example')}</div>
                  <p className="text-sm text-[#4A4741]">{pickText(topic.example, isEnglish)}</p>
                </div>

                {topic.subtopics && topic.subtopics.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('IB 子主題', 'IB Subtopics')}</div>
                    <div className="space-y-3">
                      {topic.subtopics.map((subtopic) => (
                        <div
                          key={subtopic.code}
                          className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4 text-left hover:border-[#D5896F] transition-colors"
                        >
                          <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: topic.color }}>{subtopic.code}</div>
                          <h3 className="font-bold text-sm text-[#2C2A26] mb-2">{pickText(subtopic.title, isEnglish)}</h3>
                          <p className="text-sm text-[#6B665E] mb-3">{pickText(subtopic.summary, isEnglish)}</p>
                          <button
                            onClick={() => onNavigate('ib_subtopic', createIBSubtopicKey(topic.id, subtopic.code))}
                            className="inline-flex items-center gap-2 text-xs font-bold text-[#D5896F] hover:underline mb-3"
                          >
                            {t('查看子主題詳解', 'Open Subtopic Detail')}
                          </button>
                          {subtopic.resources && subtopic.resources.length > 0 && (
                            <div className="space-y-2">
                              {subtopic.resources.map((resource) => {
                                const route = getInternalRoute(topic.id, resource);
                                return route ? (
                                  <button
                                    key={resource.label.en}
                                    onClick={() => onNavigate(route.screen, route.key)}
                                    className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors w-full"
                                  >
                                    <span>{pickText(resource.label, isEnglish)}</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-[#8C857B]" />
                                  </button>
                                ) : (
                                  <a
                                    key={resource.url}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-white border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
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

                  <div className="space-y-2 mb-4">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B]">{t('參考連結', 'Reference Links')}</div>
                  {topic.references.map((reference) => {
                    const route = getInternalRoute(topic.id, reference);
                    return route ? (
                      <button
                        key={reference.label.en}
                        onClick={() => onNavigate(route.screen, route.key)}
                        className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                      >
                        <span>{pickText(reference.label, isEnglish)}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#8C857B]" />
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

                <button onClick={() => onNavigate('dashboard', topic.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
                  {t('在 Dashboard 聚焦此主題', 'Focus This Topic in Dashboard')}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex items-center justify-between gap-4 bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-5">
        <div>
          <h2 className="font-bold text-[#2C2A26]">{t('返回 IB 概覽', 'Back to IB Overview')}</h2>
          <p className="text-sm text-[#6B665E] mt-1">{t('回到課程總覽查看核心主題、HL 延伸主題與 MYP 銜接內容。', 'Return to the overview to review core topics, HL extensions, and MYP progression content.')}</p>
        </div>
        <button onClick={() => onNavigate('dashboard')} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
          <ArrowLeft className="w-4 h-4" /> {t('返回 IB Dashboard', 'Back to IB Dashboard')}
        </button>
      </div>
    </div>
  );
};
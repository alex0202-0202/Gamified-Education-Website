import { ArrowLeft, BookOpen, CheckCircle2, ExternalLink, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { createIBSubtopicKey, findIBSubtopicByKey, findIBSubtopicKeyForReference } from '../data/ibTopics';

type IBSubtopicDetailProps = {
  subtopicKey?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

type BilingualText = {
  zh: string;
  en: string;
};

const bt = (zh: string, en: string): BilingualText => ({ zh, en });

const pickText = (value: BilingualText, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

export const IBSubtopicDetail = ({ subtopicKey, onNavigate }: IBSubtopicDetailProps) => {
  const { t, isEnglish } = useLanguage();
  const detailEntry = findIBSubtopicByKey(subtopicKey);

  if (!detailEntry) {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EFE9] rounded-xl">
              <BookOpen className="w-6 h-6 text-[#D5896F]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-1">IB Subtopic</div>
              <h1 className="text-3xl font-bold text-[#2C2A26]">{t('找不到此子主題', 'Subtopic Not Found')}</h1>
              <p className="text-sm text-[#6B665E] mt-2 max-w-3xl">
                {t('這個 IB 子主題頁面目前沒有資料。你可以先回到 IB 資源中心或 Dashboard 選擇其他主題。', 'There is no data for this IB subtopic yet. You can return to the IB resource library or dashboard and choose another topic.')}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-5">
          <button onClick={() => onNavigate('ib_resources')} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
            <ArrowLeft className="w-4 h-4" /> {t('返回 IB 資源中心', 'Back to IB Resource Library')}
          </button>
        </div>
      </div>
    );
  }

  const { topic, subtopic } = detailEntry;
  const fallbackSourceLinks = topic.references
    .filter((reference) => {
      const resolvedTarget = findIBSubtopicKeyForReference(topic.id, reference);
      return resolvedTarget === createIBSubtopicKey(topic.id, subtopic.code) || reference.label.en === topic.references[0]?.label.en;
    })
    .map((reference) => ({
      ...reference,
      internalTarget: findIBSubtopicKeyForReference(topic.id, reference),
    }));

  const fallbackGuidance = [
    bt('先說明這個子主題在整個 topic 中處理甚麼設計問題。', 'Start by explaining what design problem this subtopic addresses within the wider topic.'),
    bt('把答案連到真實產品、服務或系統，而不只是背定義。', 'Connect your answer to a real product, service, or system rather than only defining terms.'),
    bt('比較設計取捨，說明這個子主題如何影響功能、使用者、製造、環境或市場判斷。', 'Compare design trade-offs and explain how this subtopic affects function, users, manufacture, environment, or market judgement.'),
  ];

  const fallbackSections = [
    {
      title: bt('這個子主題在學甚麼', 'What This Subtopic Studies'),
      paragraphs: [
        subtopic.summary,
        bt(
          `${topic.title.zh} 這個 topic 的核心要求，是把概念放回真實設計情境中分析，學生需要解釋它如何影響設計決策，而不只是記住名詞。`,
          `Within ${topic.title.en}, this subtopic should be analysed in real design situations. Students are expected to explain how it shapes design decisions rather than just memorizing terminology.`
        ),
      ],
    },
    {
      title: bt('答題時要連結甚麼', 'What to Connect in IB Responses'),
      bullets: topic.knowledge,
    },
    {
      title: bt('設計應用方向', 'Design Application'),
      paragraphs: [
        bt(
          `你可以把這個子主題放進產品分析、設計規格、IA 發展、比較題或案例研究之中，說明它如何改變使用者體驗、技術可行性或設計策略。`,
          `You can use this subtopic in product analysis, design specifications, IA development, comparison questions, or case studies to explain how it changes user experience, technical feasibility, or design strategy.`
        ),
        topic.example,
      ],
    },
  ];

  const detail = subtopic.detail ?? {
    overview: bt(
      `${subtopic.code} 著重把 ${subtopic.title.zh} 放進真實設計判斷之中，理解它怎樣影響分析、構思、開發與評估。`,
      `${subtopic.code} focuses on placing ${subtopic.title.en} into real design judgement and understanding how it shapes analysis, ideation, development, and evaluation.`
    ),
    essentialIdea: bt(
      `這個子主題的重點不是孤立背誦概念，而是說明 ${subtopic.title.zh} 如何在實際設計情境中產生影響。`,
      `The key idea is not to memorize ${subtopic.title.en} in isolation, but to explain how it operates in practical design contexts.`
    ),
    guidance: fallbackGuidance,
    caseStudies: [topic.example],
    sections: fallbackSections,
    sourceLinks: fallbackSourceLinks,
  };

  const subtopics = topic.subtopics ?? [];
  const currentIndex = subtopics.findIndex((entry) => entry.code === subtopic.code);
  const previousSubtopic = currentIndex > 0 ? subtopics[currentIndex - 1] : undefined;
  const nextSubtopic = currentIndex >= 0 && currentIndex < subtopics.length - 1 ? subtopics[currentIndex + 1] : undefined;

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-[#F2EFE9] rounded-xl" style={{ color: topic.color }}>
            <topic.icon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: topic.color }}>
              {topic.number.en} · {subtopic.code}
            </div>
            <h1 className="text-3xl font-bold text-[#2C2A26]">{pickText(subtopic.title, isEnglish)}</h1>
            <p className="text-sm text-[#6B665E] mt-2 max-w-3xl">
              {pickText(detail?.overview ?? subtopic.summary, isEnglish)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {detail?.essentialIdea && (
            <section className="bg-[#FDF9F7] rounded-2xl border border-[#E5E0D8] p-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('Essential Idea', 'Essential Idea')}</div>
              <p className="text-sm text-[#4A4741] leading-relaxed">{pickText(detail.essentialIdea, isEnglish)}</p>
            </section>
          )}

          {detail?.sections?.map((section) => (
            <section key={section.title.en} className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#2C2A26] mb-3">{pickText(section.title, isEnglish)}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.en} className="text-sm text-[#6B665E] leading-relaxed mb-3 last:mb-0">
                  {pickText(paragraph, isEnglish)}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <div className="space-y-2 mt-3">
                  {section.bullets.map((bullet) => (
                    <div key={bullet.en} className="flex items-start text-sm text-[#6B665E]">
                      <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: topic.color }} />
                      {pickText(bullet, isEnglish)}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-2">{t('Topic Focus', 'Topic Focus')}</div>
            <h2 className="font-bold text-[#2C2A26] mb-2">{pickText(topic.title, isEnglish)}</h2>
            <p className="text-sm text-[#6B665E] leading-relaxed">{pickText(topic.instruction, isEnglish)}</p>
          </section>

          {detail?.guidance && detail.guidance.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('Guidance', 'Guidance')}</div>
              <div className="space-y-2">
                {detail.guidance.map((item) => (
                  <div key={item.en} className="flex items-start text-sm text-[#6B665E]">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: topic.color }} />
                    {pickText(item, isEnglish)}
                  </div>
                ))}
              </div>
            </section>
          )}

          {detail?.caseStudies && detail.caseStudies.length > 0 && (
            <section className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('Concepts and Examples', 'Concepts and Examples')}</div>
              <div className="space-y-2">
                {detail.caseStudies.map((item) => (
                  <div key={item.en} className="text-sm px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741]">
                    {pickText(item, isEnglish)}
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-3">{t('Links and Next Steps', 'Links and Next Steps')}</div>
            <div className="space-y-2 mb-4">
              {subtopic.resources?.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                >
                  <span>{pickText(resource.label, isEnglish)}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C857B]" />
                </a>
              ))}
              {detail?.sourceLinks?.map((link) => (
                link.internalTarget ? (
                  <button
                    key={link.label.en}
                    onClick={() => onNavigate('ib_subtopic', link.internalTarget)}
                    className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                  >
                    <span>{pickText(link.label, isEnglish)}</span>
                    <Layers className="w-3.5 h-3.5 text-[#8C857B]" />
                  </button>
                ) : (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                  >
                    <span>{pickText(link.label, isEnglish)}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8C857B]" />
                  </a>
                )
              ))}
            </div>

            {(previousSubtopic || nextSubtopic) && (
              <div className="pt-4 border-t border-[#F2EFE9] space-y-2 mb-4">
                {previousSubtopic && (
                  <button
                    onClick={() => onNavigate('ib_subtopic', createIBSubtopicKey(topic.id, previousSubtopic.code))}
                    className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                  >
                    <span>{t('上一個子主題', 'Previous Subtopic')} · {pickText(previousSubtopic.title, isEnglish)}</span>
                    <Layers className="w-3.5 h-3.5 text-[#8C857B]" />
                  </button>
                )}
                {nextSubtopic && (
                  <button
                    onClick={() => onNavigate('ib_subtopic', createIBSubtopicKey(topic.id, nextSubtopic.code))}
                    className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-[#F9F8F6] border border-[#E5E0D8] text-[#4A4741] hover:border-[#D5896F] transition-colors"
                  >
                    <span>{t('下一個子主題', 'Next Subtopic')} · {pickText(nextSubtopic.title, isEnglish)}</span>
                    <Layers className="w-3.5 h-3.5 text-[#8C857B]" />
                  </button>
                )}
              </div>
            )}

            <div className="pt-4 border-t border-[#F2EFE9] space-y-2">
              <button onClick={() => onNavigate('ib_resources', topic.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
                <ArrowLeft className="w-4 h-4" /> {t('返回 IB 資源中心', 'Back to IB Resource Library')}
              </button>
              <button onClick={() => onNavigate('dashboard', topic.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
                <ArrowLeft className="w-4 h-4" /> {t('返回 Topic Dashboard', 'Back to Topic Dashboard')}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
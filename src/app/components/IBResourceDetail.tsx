import { ArrowLeft, BookOpen, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { findIBTopicById } from '../data/ibTopics';
import { findIBResourceById } from '../data/ibResources';

type IBResourceDetailProps = {
  resourceId?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

type BilingualText = { zh: string; en: string };
const pickText = (value: BilingualText, isEnglish: boolean) => (isEnglish ? value.en : value.zh);

export const IBResourceDetail = ({ resourceId, onNavigate }: IBResourceDetailProps) => {
  const { t, isEnglish } = useLanguage();
  const page = findIBResourceById(resourceId ?? '');
  const parentTopic = page ? findIBTopicById(page.parentTopicId) : undefined;

  if (!page) {
    return (
      <div className="space-y-6 pb-20">
        <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#F2EFE9] rounded-xl">
              <BookOpen className="w-6 h-6 text-[#D5896F]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B] mb-1">IB Resource</div>
              <h1 className="text-3xl font-bold text-[#2C2A26]">{t('找不到此資源頁面', 'Resource Page Not Found')}</h1>
              <p className="text-sm text-[#6B665E] mt-2">
                {t('這個資源頁面目前沒有資料。請返回 IB Dashboard 或資源中心。', 'No data found for this resource page. Please return to the IB Dashboard or Resource Library.')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-5">
          <button onClick={() => onNavigate('dashboard')} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
            <ArrowLeft className="w-4 h-4" /> {t('返回 IB Dashboard', 'Back to IB Dashboard')}
          </button>
        </div>
      </div>
    );
  }

  const color = page.topicColor;

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl" style={{ backgroundColor: `${color}18` }}>
            <FileText className="w-6 h-6" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            {parentTopic && (
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>
                {pickText(parentTopic.number, isEnglish)} · {pickText(parentTopic.title, isEnglish)}
              </div>
            )}
            <h1 className="text-3xl font-bold text-[#2C2A26] leading-tight">{pickText(page.title, isEnglish)}</h1>
            <p className="text-sm text-[#6B665E] mt-3 max-w-3xl leading-relaxed">{pickText(page.overview, isEnglish)}</p>
          </div>
        </div>
      </div>

      {/* Back nav */}
      <div className="flex flex-wrap items-center gap-3 bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-4">
        <button
          onClick={() => onNavigate('dashboard', page.parentTopicId)}
          className="inline-flex items-center gap-2 text-sm font-bold hover:underline"
          style={{ color }}
        >
          <ArrowLeft className="w-4 h-4" />
          {parentTopic ? `${pickText(parentTopic.number, isEnglish)}: ${pickText(parentTopic.title, isEnglish)}` : t('返回 Dashboard', 'Back to Dashboard')}
        </button>
        <span className="text-[#D5C9BE]">·</span>
        <button onClick={() => onNavigate('ib_resources', page.parentTopicId)} className="text-sm font-bold text-[#8C857B] hover:underline">
          {t('IB 資源中心', 'IB Resource Library')}
        </button>
      </div>

      {/* Content sections */}
      {page.sections.map((section, sIdx) => (
        <div key={sIdx} className="bg-white rounded-2xl border border-[#E5E0D8] shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
            <h2 className="font-bold text-[#2C2A26] text-lg">{pickText(section.title, isEnglish)}</h2>
          </div>

          {section.paragraphs && section.paragraphs.length > 0 && (
            <div className="space-y-3 mb-4">
              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-sm text-[#4A4741] leading-relaxed">
                  {pickText(para, isEnglish)}
                </p>
              ))}
            </div>
          )}

          {section.links && section.links.length > 0 && (
            <div className="space-y-2 mb-4">
              {section.links.map((link, lIdx) => (
                <a
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-sm px-3 py-2.5 rounded-lg border border-[#E5E0D8] hover:border-current transition-colors group"
                  style={{ color }}
                >
                  <span className="font-medium">{pickText(link.label, isEnglish)}</span>
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-60 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          )}

          {section.bullets && section.bullets.length > 0 && (
            <ul className="space-y-3">
              {section.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start gap-3 text-sm text-[#4A4741]">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color, opacity: 0.7 }} />
                  <span className="leading-relaxed">{pickText(bullet, isEnglish)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Source note */}
      <div className="bg-[#F9F8F6] rounded-2xl border border-[#E5E0D8] p-5">
        <div className="flex items-start gap-3">
          <ExternalLink className="w-4 h-4 text-[#8C857B] mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C857B] mb-1">{t('說明', 'Note')}</div>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              {t(
                '此頁面的內容根據 IB Design Technology 課程綱要整理，供學習和備考參考。',
                'Content on this page is compiled from the IB Design Technology curriculum for study and exam preparation purposes.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-4 bg-[#FDFCFB] rounded-2xl border border-[#E5E0D8] p-5">
        <button onClick={() => onNavigate('dashboard', page.parentTopicId)} className="inline-flex items-center gap-2 text-sm font-bold text-[#D5896F] hover:underline">
          <ArrowLeft className="w-4 h-4" /> {t('返回 IB Dashboard', 'Back to IB Dashboard')}
        </button>
        <button onClick={() => onNavigate('ib_resources', page.parentTopicId)} className="inline-flex items-center gap-2 text-sm font-bold text-[#8C857B] hover:underline">
          {t('IB 資源中心', 'IB Resource Library')}
        </button>
      </div>
    </div>
  );
};

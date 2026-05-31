import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Car,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Layers,
  Library,
  ListChecks,
  PlayCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import {
  getFlashcardsForLevel,
  getQuizQuestionsForLevel,
  getStudyCurriculum,
  getStudyLevel,
  getTopicsForLevel,
  makeStudySelection,
  parseStudySelection,
  studyCurricula,
  type StudyCurriculumId,
} from '../../../data/studyCurriculum';
import { useLanguage } from '../../context/LanguageContext';

type StudyCurriculumPageProps = {
  activeTopic?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

const isCurriculumId = (value?: string): value is StudyCurriculumId =>
  value === 'HKDSE_DNT' || value === 'IB_DESIGN' || value === 'A_LEVEL_DT';

export const StudyCurriculumPage = ({ activeTopic, onNavigate }: StudyCurriculumPageProps) => {
  const { t } = useLanguage();
  const parsedSelection = parseStudySelection(activeTopic);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState<StudyCurriculumId | null>(
    parsedSelection?.curriculumId ?? (isCurriculumId(activeTopic) ? activeTopic : null),
  );
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(parsedSelection?.levelId ?? null);

  useEffect(() => {
    const parsed = parseStudySelection(activeTopic);
    if (parsed) {
      setSelectedCurriculumId(parsed.curriculumId);
      setSelectedLevelId(parsed.levelId);
      return;
    }

    if (isCurriculumId(activeTopic)) {
      setSelectedCurriculumId(activeTopic);
      setSelectedLevelId(null);
    }
  }, [activeTopic]);

  const selectedCurriculum = selectedCurriculumId ? getStudyCurriculum(selectedCurriculumId) : undefined;
  const selectedLevel = selectedCurriculumId && selectedLevelId ? getStudyLevel(selectedCurriculumId, selectedLevelId) : undefined;
  const topics = selectedCurriculumId && selectedLevelId ? getTopicsForLevel(selectedCurriculumId, selectedLevelId) : [];
  const questions = selectedCurriculumId && selectedLevelId ? getQuizQuestionsForLevel(selectedCurriculumId, selectedLevelId) : [];
  const flashcards = selectedCurriculumId && selectedLevelId ? getFlashcardsForLevel(selectedCurriculumId, selectedLevelId) : [];

  const dashboardMetrics = useMemo(() => [
    { label: t('主題', 'Topics'), value: topics.length, icon: Layers },
    { label: t('問答題', 'Quiz Qs'), value: questions.length, icon: Brain },
    { label: t('術語卡', 'Terms'), value: flashcards.length, icon: Library },
    { label: t('支援項目', 'Support'), value: selectedLevel?.projectSupport.length ?? 0, icon: ClipboardCheck },
  ], [flashcards.length, questions.length, selectedLevel?.projectSupport.length, t, topics.length]);

  if (!selectedCurriculumId || !selectedCurriculum) {
    return (
      <div className="space-y-8 pb-20">
        <section className="rounded-3xl border border-[#E5E0D8] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#6B665E]">
                <GraduationCap className="h-4 w-4 text-[#D5896F]" />
                {t('學習入口', 'Learning Entry')}
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-[#2C2A26] md:text-5xl">Study Curriculum</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6B665E] md:text-base">
                {t(
                  '先選擇你的課程，然後進入對應年級或級別的知識儀表板。這裡不混合三個課程的內容。',
                  'Choose one curriculum first, then enter the matching year or level dashboard. Content stays separated by curriculum.',
                )}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F9F8F6] px-4 py-3 text-sm font-bold text-[#6B665E]">
              {t('三個清晰路徑', 'Three clear pathways')}
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {studyCurricula.map((curriculum) => (
            <motion.button
              key={curriculum.id}
              type="button"
              whileHover={{ y: -3 }}
              onClick={() => {
                setSelectedCurriculumId(curriculum.id);
                setSelectedLevelId(null);
              }}
              className="group rounded-3xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition-colors hover:border-[#D5896F]/50 hover:bg-[#FFFDFC]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2C2A26] text-sm font-black text-white">
                  {curriculum.icon}
                </div>
                <span className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-black text-[#6B665E] group-hover:bg-[#FFF5F0] group-hover:text-[#D5896F]">
                  {t('Enter', 'Enter')}
                </span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-[#2C2A26]">{curriculum.shortName}</h2>
              <p className="mt-2 text-sm font-bold text-[#D5896F]">{curriculum.subtitle}</p>
              <p className="mt-4 text-sm leading-6 text-[#6B665E]">{curriculum.description}</p>
            </motion.button>
          ))}
        </section>
      </div>
    );
  }

  if (!selectedLevelId || !selectedLevel) {
    return (
      <div className="space-y-6 pb-20">
        <button
          type="button"
          onClick={() => {
            setSelectedCurriculumId(null);
            setSelectedLevelId(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-bold text-[#6B665E] hover:bg-[#F9F8F6]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('返回課程選擇', 'Back to curriculum choices')}
        </button>

        <section className="rounded-3xl border border-[#E5E0D8] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#D5896F]">{selectedCurriculum.shortName}</div>
              <h1 className="mt-2 text-3xl font-black text-[#2C2A26]">{t('Choose Level', 'Choose Level')}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B665E]">{selectedCurriculum.description}</p>
            </div>
            <div className="rounded-2xl bg-[#F9F8F6] px-4 py-3 text-sm font-bold text-[#6B665E]">
              {selectedCurriculum.levels.length} {t('級別', 'levels')}
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedCurriculum.levels.map((level) => (
            <motion.button
              key={level.id}
              type="button"
              whileHover={{ y: -2 }}
              onClick={() => setSelectedLevelId(level.id)}
              className="rounded-2xl border border-[#E5E0D8] bg-white p-5 text-left shadow-sm transition-colors hover:border-[#6B9080]/50 hover:bg-[#FDFCFB]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{level.yearGroup}</div>
                  <h2 className="mt-2 text-xl font-black text-[#2C2A26]">{level.label}</h2>
                </div>
                <PlayCircle className="h-6 w-6 text-[#6B9080]" />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#6B665E]">{level.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {level.keyFocus.slice(0, 4).map((focus) => (
                  <span key={focus} className="rounded-full bg-[#F2EFE9] px-2.5 py-1 text-[11px] font-bold text-[#6B665E]">{focus}</span>
                ))}
              </div>
            </motion.button>
          ))}
        </section>
      </div>
    );
  }

  const selection = makeStudySelection(selectedCurriculumId, selectedLevelId);

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedLevelId(null)}
          className="inline-flex items-center gap-2 rounded-xl border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-bold text-[#6B665E] hover:bg-[#F9F8F6]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('返回級別', 'Back to levels')}
        </button>
        <button
          type="button"
          onClick={() => {
            setSelectedCurriculumId(null);
            setSelectedLevelId(null);
          }}
          className="rounded-xl border border-[#E5E0D8] bg-white px-4 py-2 text-sm font-bold text-[#6B665E] hover:bg-[#F9F8F6]"
        >
          Study Curriculum
        </button>
      </div>

      <section className="relative overflow-hidden rounded-3xl bg-[#2C2A26] p-6 text-white shadow-sm md:p-8">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#D5896F]/30 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#E5E0D8]">
              <Sparkles className="h-4 w-4 text-[#CCA068]" />
              {selectedCurriculum.shortName}
            </div>
            <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{selectedLevel.label}</h1>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-[#E5E0D8] md:text-base">{selectedLevel.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-center">
                <metric.icon className="mx-auto h-5 w-5 text-[#CCA068]" />
                <div className="mt-1 text-2xl font-black">{metric.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {[
          { title: 'Key Knowledge', icon: BookOpen, body: selectedLevel.keyFocus.slice(0, 5).join(', ') },
          { title: 'Core Skills', icon: Target, body: topics.flatMap((topicItem) => topicItem.keySkills).slice(0, 5).join(', ') },
          { title: 'Knowledge Quiz Challenge', icon: Brain, body: `${questions.length} filtered questions for ${selectedLevel.label}.` },
          { title: 'Terminology Flashcards', icon: Library, body: `${flashcards.length} curriculum-matched terms and examples.` },
          { title: 'Project / Coursework Support', icon: ClipboardCheck, body: selectedLevel.projectSupport.join(', ') },
          { title: 'Fun Learning Game', icon: Car, body: 'Driving game uses this selected curriculum and level question bank.' },
          { title: 'Revision Checklist', icon: ListChecks, body: selectedLevel.revisionChecklist.slice(0, 3).join(' ') },
          { title: 'Topic Cards', icon: Layers, body: `${topics.length} topic cards with examples and mini tasks.` },
        ].map((card) => (
          <div key={card.title} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <card.icon className="h-6 w-6 text-[#D5896F]" />
            <h2 className="mt-3 text-base font-black text-[#2C2A26]">{card.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">{card.body}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <button
          type="button"
          onClick={() => onNavigate('fun_learning', makeStudySelection(selectedCurriculumId, selectedLevelId, 'quiz'))}
          className="rounded-2xl bg-[#D5896F] p-5 text-left font-bold text-white shadow-sm hover:bg-[#C4785E]"
        >
          <Brain className="h-7 w-7" />
          <div className="mt-3 text-xl font-black">Start Knowledge Quiz</div>
          <div className="mt-1 text-sm text-white/85">{questions.length} questions filtered to {selectedLevel.label}</div>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('driving_game', selection)}
          className="rounded-2xl bg-[#6B9080] p-5 text-left font-bold text-white shadow-sm hover:bg-[#5D7F71]"
        >
          <Car className="h-7 w-7" />
          <div className="mt-3 text-xl font-black">Play Driving Game</div>
          <div className="mt-1 text-sm text-white/85">Uses this curriculum question bank.</div>
        </button>
        <button
          type="button"
          onClick={() => onNavigate('project_hub')}
          className="rounded-2xl bg-[#2C2A26] p-5 text-left font-bold text-white shadow-sm hover:bg-[#4A4741]"
        >
          <ClipboardCheck className="h-7 w-7" />
          <div className="mt-3 text-xl font-black">Project Support</div>
          <div className="mt-1 text-sm text-white/85">{selectedLevel.projectSupport.length} project tools and evidence prompts.</div>
        </button>
      </section>

      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Topic Cards</div>
            <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">Knowledge Dashboard</h2>
          </div>
          <div className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-black text-[#6B665E]">{topics.length} topics</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {topics.map((topicItem) => (
            <div key={topicItem.id} className="rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-5">
              <h3 className="text-lg font-black text-[#2C2A26]">{topicItem.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B665E]">{topicItem.studentSummary}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#D5896F]">Key knowledge</div>
                  <ul className="mt-2 space-y-1 text-sm text-[#6B665E]">
                    {topicItem.keyKnowledge.slice(0, 4).map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#6B9080]">Mini task</div>
                  <p className="mt-2 text-sm leading-6 text-[#6B665E]">{topicItem.miniActivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-[#D5896F]" />
            <h2 className="text-xl font-black text-[#2C2A26]">Knowledge Quiz Challenge</h2>
          </div>
          <div className="space-y-3">
            {questions.slice(0, 5).map((question) => (
              <div key={question.id} className="rounded-xl bg-[#F9F8F6] p-4">
                <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{question.difficulty} · {question.skillTags[0]}</div>
                <p className="mt-2 text-sm font-bold text-[#2C2A26]">{question.question}</p>
                <p className="mt-2 text-xs leading-5 text-[#6B665E]">{question.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Library className="h-5 w-5 text-[#6B9080]" />
            <h2 className="text-xl font-black text-[#2C2A26]">Terminology Flashcards</h2>
          </div>
          <div className="space-y-3">
            {flashcards.slice(0, 5).map((card) => (
              <div key={card.id} className="rounded-xl bg-[#F9F8F6] p-4">
                <div className="font-black text-[#2C2A26]">{card.term}</div>
                <p className="mt-1 text-sm leading-6 text-[#6B665E]">{card.shortDefinition}</p>
                <p className="mt-2 text-xs font-bold text-[#8C857B]">Example: {card.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-[#6B9080]" />
          <h2 className="text-xl font-black text-[#2C2A26]">Revision Checklist</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {selectedLevel.revisionChecklist.map((item) => (
            <div key={item} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] px-4 py-3 text-sm font-bold text-[#6B665E]">
              □ {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  FileQuestion,
  FileText,
  GraduationCap,
  Search,
} from 'lucide-react';
import {
  checkPastPaperAnswer,
  getPastPaperExercises,
  pastPaperExercises,
  type PastPaperExercise,
  type PastPaperQuestion,
  type PastPaperSyllabus,
} from '../../../data/pastPaperExercises';
import { parseStudySelection } from '../../../data/studyCurriculum';

type Props = {
  activeTopic?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

const syllabusLabels: Record<PastPaperSyllabus, { label: string; subtitle: string }> = {
  hkdse: {
    label: 'HKDSE DAT Sample Paper',
    subtitle: 'Paper 1, Paper 2B and Paper 2C practice',
  },
  '0445': {
    label: 'IGCSE D&T 0445',
    subtitle: 'Question, answer-checking and insert bundles',
  },
  '9705': {
    label: 'A Level D&T 9705',
    subtitle: 'AS/A Level written paper practice bundles',
  },
};

const initialSyllabusFromTopic = (activeTopic?: string): PastPaperSyllabus | 'all' => {
  const selection = parseStudySelection(activeTopic);
  if (selection?.curriculumId === 'HKDSE_DNT') return 'hkdse';
  if (selection?.curriculumId === 'IGCSE_DT') return '0445';
  if (selection?.curriculumId === 'A_LEVEL_DT') return '9705';
  return 'all';
};

const questionSortValue = (question: PastPaperQuestion) => {
  const romanOrder: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9, x: 10 };
  const match = question.label.match(/^([A-Z]|\d+)(?:\(([a-z])\))?(?:\(([ivx]+)\))?/i);
  if (!match) return question.label;
  const main = /^\d+$/.test(match[1]) ? Number(match[1]) : match[1].toUpperCase().charCodeAt(0) + 100;
  const part = match[2] ? match[2].toLowerCase().charCodeAt(0) - 96 : 0;
  const subpart = match[3] ? romanOrder[match[3].toLowerCase()] ?? 0 : 0;
  return [main, part, subpart].map((value) => String(value).padStart(3, '0')).join('-');
};

const getQualificationShortName = (paper: PastPaperExercise) => {
  if (paper.syllabus === 'hkdse') return 'HKDSE DAT';
  return paper.syllabus === '0445' ? 'IGCSE D&T' : 'A Level D&T';
};

const getPaperNumber = (paper: PastPaperExercise) => {
  if (paper.syllabus === 'hkdse') {
    const match = paper.component.match(/^p(\d)([a-z]?)/i);
    if (!match) return paper.component.toUpperCase();
    return `Paper ${match[1]}${match[2] ? match[2].toUpperCase() : ''}`;
  }
  return `Paper ${paper.component.slice(0, 1)}`;
};

const getVariantLabel = (paper: PastPaperExercise) => {
  if (paper.syllabus === 'hkdse') return paper.language ?? 'Sample Paper';
  const variant = paper.component.slice(1);
  return variant ? `Variant ${variant}` : 'Core paper';
};

const getStudentPaperTitle = (paper: PastPaperExercise) =>
  `${paper.series} · ${getQualificationShortName(paper)} · ${paper.paperName} · ${getVariantLabel(paper)}`;

const displayKeyword = (keyword: string) => {
  const fixes: Record<string, string> = {
    acces: 'access',
  };
  return fixes[keyword] ?? keyword;
};

const getDisplayedFocusKeywords = (question: PastPaperQuestion) => {
  const weakKeywords = new Set(['able', 'additional', 'candidate', 'candidates', 'answer', 'question']);
  const cleaned: string[] = [];
  question.acceptedKeywords.forEach((keyword) => {
    const display = displayKeyword(keyword);
    if (weakKeywords.has(display)) return;
    if (!cleaned.includes(display)) cleaned.push(display);
  });
  return cleaned.slice(0, 6);
};

const getQuestionType = (paper: PastPaperExercise, question: PastPaperQuestion) => {
  const lowerPaper = paper.paperName.toLowerCase();
  const lowerKeywords = question.acceptedKeywords.join(' ').toLowerCase();
  const part = question.label.match(/\(([a-g])\)/)?.[1];

  if (paper.syllabus === 'hkdse') {
    if (paper.component.startsWith('p1')) return 'Technology, Design and Society response';
    if (paper.component.startsWith('p2b')) return 'Creative Digital Media response';
    if (paper.component.startsWith('p2c')) {
      if (/塑膠|注塑|mould|injection|plastic/.test(lowerKeywords)) return 'Materials processing response';
      if (/榫|joint|mechanism|運動|motion|handle/.test(lowerKeywords)) return 'Mechanism and joining response';
      if (/金屬|metal|rivet|鉚/.test(lowerKeywords)) return 'Materials and fabrication response';
      return 'Design Practice and Materials Processing response';
    }
    return 'HKDSE DAT response';
  }

  if (lowerPaper.includes('product design')) {
    switch (part) {
      case 'a':
        return 'Specification / product requirement';
      case 'b':
        return 'Construction method or design feature sketch';
      case 'c':
        return 'Initial design ideas';
      case 'd':
        return 'Idea evaluation and selection';
      case 'e':
        return 'Design development and final proposal';
      case 'f':
        return 'Materials, manufacture or construction details';
      case 'g':
        return 'Testing, evaluation or improvement';
      default:
        return 'Product design response';
    }
  }

  if (lowerPaper.includes('graphic')) {
    if (question.label.startsWith('A')) return 'Graphic construction / layout drawing';
    if (question.label.startsWith('B')) return 'Orthographic, projection or presentation drawing';
    return 'Graphic products knowledge';
  }

  if (lowerPaper.includes('resistant')) {
    if (lowerKeywords.includes('injection') || lowerKeywords.includes('vacuum') || lowerKeywords.includes('extrusion')) {
      return 'Materials processing question';
    }
    if (lowerKeywords.includes('timber') || lowerKeywords.includes('steel') || lowerKeywords.includes('acrylic')) {
      return 'Materials and properties question';
    }
    return 'Resistant materials theory';
  }

  if (lowerPaper.includes('systems')) {
    if (lowerKeywords.includes('solar') || lowerKeywords.includes('battery') || lowerKeywords.includes('fossil')) {
      return 'Energy and systems question';
    }
    if (lowerKeywords.includes('triangulation') || lowerKeywords.includes('friction')) {
      return 'Structures, forces or motion question';
    }
    return 'Systems and control theory';
  }

  if (paper.syllabus === '9705' && paper.component.startsWith('1')) return 'AS written theory and application';
  if (paper.syllabus === '9705' && paper.component.startsWith('3')) return 'A Level design, manufacturing and evaluation response';
  return 'Design and Technology response';
};

const getQuestionPrompt = (paper: PastPaperExercise, question: PastPaperQuestion) => {
  const focus = getDisplayedFocusKeywords(question).join(', ');
  if (paper.syllabus === 'hkdse') {
    return `${question.promptSummary} Expected focus: ${focus}.`;
  }
  return `Question ${question.label}: ${getQuestionType(paper, question)}. Use the selected ${paper.paperName} question and answer in your own words. Expected focus: ${focus}.`;
};

export const PastPaperExercisePage = ({ activeTopic, onNavigate }: Props) => {
  const [syllabus, setSyllabus] = useState<PastPaperSyllabus | 'all'>(() => initialSyllabusFromTopic(activeTopic));
  const papers = useMemo(
    () => syllabus === 'all' ? pastPaperExercises : getPastPaperExercises(syllabus),
    [syllabus],
  );
  const [selectedPaperId, setSelectedPaperId] = useState(() => papers[0]?.id ?? pastPaperExercises[0]?.id);
  const selectedPaper = papers.find((paper) => paper.id === selectedPaperId) ?? papers[0] ?? pastPaperExercises[0];
  const sortedQuestions = useMemo(
    () => [...selectedPaper.questions].sort((a, b) => questionSortValue(a).localeCompare(questionSortValue(b))),
    [selectedPaper.questions],
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState(() => sortedQuestions[0]?.id ?? '');
  const selectedQuestion = sortedQuestions.find((question) => question.id === selectedQuestionId) ?? sortedQuestions[0];
  const [answer, setAnswer] = useState('');
  const result = selectedQuestion && answer.trim().length > 0
    ? checkPastPaperAnswer(selectedQuestion, answer)
    : undefined;

  const chooseSyllabus = (next: PastPaperSyllabus | 'all') => {
    const nextPapers = next === 'all' ? pastPaperExercises : getPastPaperExercises(next);
    setSyllabus(next);
    setSelectedPaperId(nextPapers[0]?.id ?? pastPaperExercises[0].id);
    setSelectedQuestionId(nextPapers[0]?.questions[0]?.id ?? '');
    setAnswer('');
  };

  const choosePaper = (paper: PastPaperExercise) => {
    setSelectedPaperId(paper.id);
    setSelectedQuestionId(paper.questions[0]?.id ?? '');
    setAnswer('');
  };

  const chooseQuestion = (question: PastPaperQuestion) => {
    setSelectedQuestionId(question.id);
    setAnswer('');
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#2C2A26] p-6 text-white shadow-sm md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#F4D7C8]">
              <FileQuestion className="h-4 w-4" />
              Past Paper Exercise
            </div>
            <h1 className="mt-4 text-3xl font-black md:text-5xl">Question + Answer Checking Practice</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#E8DED0] md:text-base">
              Choose the paper year and syllabus area, select a question number, then type your answer.
              The selected question focus appears above the answer box and the self-check uses the matching marking-reference ideas.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#2C2A26] hover:bg-[#F2EFE9]"
          >
            Back to Study Curriculum
          </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'All Papers', value: 'all' as const, subtitle: `${pastPaperExercises.length} paper bundles`, icon: ClipboardList },
          { label: syllabusLabels.hkdse.label, value: 'hkdse' as const, subtitle: syllabusLabels.hkdse.subtitle, icon: FileQuestion },
          { label: syllabusLabels['0445'].label, value: '0445' as const, subtitle: syllabusLabels['0445'].subtitle, icon: BookOpenCheck },
          { label: syllabusLabels['9705'].label, value: '9705' as const, subtitle: syllabusLabels['9705'].subtitle, icon: GraduationCap },
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => chooseSyllabus(item.value)}
            className={`rounded-2xl border p-5 text-left shadow-sm transition ${
              syllabus === item.value
                ? 'border-[#D5896F] bg-[#FFF6F0]'
                : 'border-[#E5E0D8] bg-white hover:border-[#D5896F]'
            }`}
          >
            <item.icon className="h-7 w-7 text-[#D5896F]" />
            <div className="mt-3 text-lg font-black text-[#2C2A26]">{item.label}</div>
            <div className="mt-1 text-sm leading-6 text-[#6B665E]">{item.subtitle}</div>
          </button>
        ))}
      </section>

      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Past paper sets</div>
            <h2 className="mt-1 text-2xl font-black text-[#2C2A26]">Choose a Paper</h2>
          </div>
          <div className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-black text-[#6B665E]">{papers.length} paper sets</div>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {papers.map((paper) => (
            <button
              key={paper.id}
              type="button"
              onClick={() => choosePaper(paper)}
              className={`rounded-2xl border p-4 text-left transition ${
                selectedPaper.id === paper.id
                  ? 'border-[#6B9080] bg-[#F5FAF7]'
                  : 'border-[#E5E0D8] bg-[#FDFCFB] hover:border-[#6B9080]'
              }`}
            >
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-5 w-5 flex-shrink-0 text-[#6B9080]" />
                <div className="min-w-0">
                  <div className="text-sm font-black text-[#2C2A26]">{paper.series}</div>
                  <div className="mt-1 text-sm font-bold text-[#6B665E]">{getQualificationShortName(paper)} · {paper.paperName}</div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-[#8C857B]">
                    <span className="rounded-full bg-white px-2 py-1">{getPaperNumber(paper)}</span>
                    <span className="rounded-full bg-white px-2 py-1">{getVariantLabel(paper)}</span>
                    <span className="rounded-full bg-white px-2 py-1">{paper.questions.length} question parts</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#8C857B]">
            <Search className="h-4 w-4" />
            Question reference
          </div>
          <h2 className="mt-2 text-xl font-black text-[#2C2A26]">Select a Question Part</h2>
          <div className="mt-4 max-h-[520px] space-y-2 overflow-y-auto pr-1">
            {sortedQuestions.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => chooseQuestion(question)}
                className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-bold transition ${
                  selectedQuestion?.id === question.id
                    ? 'border-[#D5896F] bg-[#FFF6F0] text-[#2C2A26]'
                    : 'border-[#E5E0D8] text-[#6B665E] hover:border-[#D5896F]'
                }`}
              >
                {question.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="rounded-3xl border border-[#E5E0D8] bg-white p-5 shadow-sm md:p-6">
          {selectedQuestion ? (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">
                  {getStudentPaperTitle(selectedPaper)}
                </div>
                <h2 className="mt-2 text-2xl font-black text-[#2C2A26]">Answer {selectedQuestion.label}</h2>
                <div className="mt-3 rounded-2xl bg-[#FDF7EC] p-4">
                  <div className="text-xs font-black uppercase tracking-widest text-[#D5896F]">Selected question</div>
                  <p className="mt-2 text-base font-bold leading-7 text-[#2C2A26]">{getQuestionPrompt(selectedPaper, selectedQuestion)}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#6B665E]">{getQuestionType(selectedPaper, selectedQuestion)}</span>
                    {getDisplayedFocusKeywords(selectedQuestion).map((keyword) => (
                      <span key={keyword} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#8C857B]">{keyword}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-black text-[#2C2A26]">
                  <AlertTriangle className="h-4 w-4 text-[#CCA068]" />
                  Copyright-safe workflow
                </div>
                <ul className="space-y-1 text-sm leading-6 text-[#6B665E]">
                  {selectedPaper.instructions.map((instruction) => <li key={instruction}>• {instruction}</li>)}
                </ul>
              </div>

              <label className="block">
                <span className="text-sm font-black text-[#2C2A26]">Type your answer</span>
                <textarea
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  rows={8}
                  className="mt-2 w-full rounded-2xl border border-[#D8D1C7] bg-white p-4 text-base leading-7 text-[#2C2A26] outline-none transition focus:border-[#D5896F] focus:ring-4 focus:ring-[#D5896F]/15"
                  placeholder="Write your answer in full sentences, using specific D&T vocabulary..."
                />
              </label>

              <div className="rounded-2xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-sm font-black text-[#2C2A26]">Self-check result</div>
                    <p className="mt-1 text-sm leading-6 text-[#6B665E]">
                      {result ? result.feedback : 'Type an answer to see matched marking-reference keywords.'}
                    </p>
                  </div>
                  {result && (
                    <div className={`rounded-full px-4 py-2 text-sm font-black ${
                      result.likelyCorrect ? 'bg-[#E8EFE6] text-[#3F6658]' : 'bg-[#FFF3D8] text-[#8A6430]'
                    }`}>
                      {Math.round(result.scoreRatio * 100)}% keyword match
                    </div>
                  )}
                </div>

                {result && (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-black text-[#3F6658]">
                        <CheckCircle2 className="h-4 w-4" />
                        Matched
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {result.matchedKeywords.length ? result.matchedKeywords.map((keyword) => (
                          <span key={keyword} className="rounded-full bg-[#E8EFE6] px-3 py-1 text-xs font-bold text-[#3F6658]">{keyword}</span>
                        )) : <span className="text-sm text-[#8C857B]">No key terms matched yet.</span>}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-black text-[#8A6430]">Possible missing focus</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {result.missingKeywords.slice(0, 10).map((keyword) => (
                          <span key={keyword} className="rounded-full bg-[#FFF3D8] px-3 py-1 text-xs font-bold text-[#8A6430]">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-[#2C2A26] p-4 text-white">
                <div className="text-sm font-black">Marking-reference guidance summary</div>
                <p className="mt-2 text-sm leading-7 text-white/80">{selectedQuestion.sampleAnswer}</p>
                <p className="mt-2 text-xs leading-6 text-white/60">{selectedQuestion.guidance}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#FDF7EC] p-6 text-sm font-bold text-[#6B665E]">
              No extracted question parts were found for this paper yet.
            </div>
          )}
        </main>
      </section>
    </div>
  );
};

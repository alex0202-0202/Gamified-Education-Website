import { ArrowRight, BookOpen, ClipboardCheck, Factory, GraduationCap, Lightbulb, Ruler, ShieldCheck, Trophy } from 'lucide-react';
import {
  cambridgeA2LevelTopics,
  cambridgeALevelDTOverview,
  cambridgeASLevelTopics,
  cambridgeAssessmentComponents,
  cambridgeAssessmentObjectives,
  cambridgeCommonMistakes,
  cambridgeCourseworkStages,
  cambridgeHighMarkAdvice,
  cambridgeKeyConcepts,
  type ALevelDTTopic,
} from '../../../data/cambridge-a-level-dt';
import { getPosterResources } from '../../../data/design-skills/posterResources';
import { PosterResourceGrid } from '../PosterResourceGrid';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

const cambridgePosters = getPosterResources([
  'zh-design-process-cycle',
  'zh-scamper-ideation',
  'zh-orthographic-projection',
  'zh-materials-selection',
  'zh-joining-methods-adhesives',
  'zh-laser-cutting-cam',
  'zh-3d-printing-additive-manufacturing',
  'zh-ergonomics-human-factors',
  'zh-sustainability-life-cycle',
  'zh-mechanisms-systems',
  'zh-testing-evaluation',
  'design-process-cycle',
  'orthographic-projection',
  'materials-selection',
  'testing-evaluation',
]);

const SectionTitle = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => (
  <div>
    <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{eyebrow}</div>
    <h2 className="mt-1 text-2xl font-black tracking-tight text-[#2C2A26]">{title}</h2>
    {body && <p className="mt-2 max-w-4xl text-sm leading-6 text-[#6B665E]">{body}</p>}
  </div>
);

const TopicCard = ({ topic, onNavigate }: { topic: ALevelDTTopic; onNavigate: Props['onNavigate'] }) => (
  <article className="flex h-full flex-col rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B]">
          Topic {topic.topicNumber} · {topic.level === 'A2' ? 'A Level' : 'AS + A Level'}
        </div>
        <h3 className="mt-1 text-lg font-black text-[#2C2A26]">{topic.title}</h3>
      </div>
      <span className="rounded-full bg-[#F2EFE9] px-3 py-1 text-xs font-black text-[#6B665E]">{topic.level}</span>
    </div>
    <p className="mt-3 text-sm leading-6 text-[#6B665E]">{topic.studentSummary}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {topic.keyKnowledge.slice(0, 6).map((item) => (
        <span key={item} className="rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-2.5 py-1 text-[10px] font-bold text-[#6B665E]">
          {item}
        </span>
      ))}
    </div>
    <div className="mt-4 rounded-xl bg-[#FDFCFB] p-3 text-xs leading-5 text-[#8C857B]">
      <b>Mini activity:</b> {topic.miniActivities[0]}
    </div>
    <div className="mt-auto flex flex-wrap gap-2 pt-4">
      {topic.relatedTools.slice(0, 2).map((tool) => (
        <button
          key={`${topic.id}-${tool.screen}-${tool.topic ?? 'root'}`}
          type="button"
          onClick={() => onNavigate(tool.screen, tool.topic)}
          className="inline-flex items-center gap-1 rounded-lg bg-[#2C2A26] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#4A4741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
        >
          {tool.label} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  </article>
);

export const CambridgeALevelDTPage = ({ onNavigate }: Props) => {
  const component2 = cambridgeCourseworkStages.filter((stage) => stage.component === 'Component 2');
  const component4 = cambridgeCourseworkStages.filter((stage) => stage.component === 'Component 4');

  return (
    <div className="space-y-8 pb-20">
      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-6 shadow-sm md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#8C857B]">
          <GraduationCap className="h-4 w-4 text-[#D5896F]" />
          Cambridge International 9705
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#2C2A26] md:text-5xl">{cambridgeALevelDTOverview.shortTitle}</h1>
        <p className="mt-3 max-w-5xl text-base leading-7 text-[#6B665E]">{cambridgeALevelDTOverview.studentSummary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {cambridgeALevelDTOverview.identityTags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#E5E0D8] bg-[#FFF5F0] px-3 py-1 text-xs font-black text-[#D5896F]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'AS topics', value: '1-12', icon: BookOpen },
          { label: 'A Level topics', value: '13-18', icon: Factory },
          { label: 'Coursework components', value: '2 + 4', icon: ClipboardCheck },
          { label: 'Assessment objectives', value: 'AO1-AO4', icon: Trophy },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <Icon className="h-6 w-6 text-[#D5896F]" />
              <div className="mt-3 text-3xl font-black text-[#2C2A26]">{item.value}</div>
              <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{item.label}</div>
            </article>
          );
        })}
      </section>

      <section className="space-y-4">
        <SectionTitle eyebrow="Key Concepts" title="Six concepts for product design thinking" body="These cards help students connect coursework and exam revision to the larger ideas of the Cambridge 9705 course." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cambridgeKeyConcepts.map((concept) => (
            <article key={concept.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <Lightbulb className="h-5 w-5 text-[#CCA068]" />
              <h3 className="mt-2 text-lg font-black text-[#2C2A26]">{concept.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B665E]">{concept.meaning}</p>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-[#6B665E]">
                {concept.studentShouldLearn.slice(0, 4).map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle eyebrow="Assessment" title="AS and A Level assessment route" body="AS candidates use Paper 1 and Component 2. Full A Level candidates also complete Paper 3 and Component 4." />
        <div className="overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white shadow-sm">
          <div className="grid grid-cols-4 bg-[#F9F8F6] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#8C857B]">
            <span>Component</span><span>Name</span><span>AS</span><span>A Level</span>
          </div>
          {cambridgeAssessmentComponents.map((component) => (
            <div key={component.component} className="grid grid-cols-4 gap-3 border-t border-[#E5E0D8] px-4 py-3 text-sm text-[#6B665E]">
              <b className="text-[#2C2A26]">{component.component}</b>
              <span>{component.name}<br/><span className="text-xs text-[#8C857B]">{component.timeMarks}</span></span>
              <span>{component.asWeighting}</span>
              <span>{component.aLevelWeighting}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cambridgeAssessmentObjectives.map((ao) => (
            <article key={ao.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <div className="text-2xl font-black text-[#D5896F]">{ao.id}</div>
              <h3 className="text-base font-black text-[#2C2A26]">{ao.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B665E]">{ao.studentSummary}</p>
              <div className="mt-3 rounded-lg bg-[#F9F8F6] p-3 text-xs font-bold text-[#8C857B]">{ao.weighting.asLevel} · {ao.weighting.aLevel}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle eyebrow="AS Content" title="Topics 1-12" body="Core AS topics also support A Level Paper 3 and Component 4." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {cambridgeASLevelTopics.map((topic) => <TopicCard key={topic.id} topic={topic} onNavigate={onNavigate} />)}
        </div>
      </section>

      <section className="space-y-4">
        <SectionTitle eyebrow="A Level Content" title="Topics 13-18" body="A2 topics focus on industrial practice, commercial thinking, quantity production, quality systems and digital technology." />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {cambridgeA2LevelTopics.map((topic) => <TopicCard key={topic.id} topic={topic} onNavigate={onNavigate} />)}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {[
          { title: 'Component 2 Product Analysis and Improvement Project', stages: component2, icon: Ruler },
          { title: 'Component 4 Design, Realisation and Manufacturing Project', stages: component4, icon: Factory },
        ].map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Icon className="h-5 w-5 text-[#D5896F]" />
                <h2 className="text-lg font-black text-[#2C2A26]">{group.title}</h2>
              </div>
              <div className="space-y-3">
                {group.stages.map((stage) => (
                  <div key={`${stage.component}-${stage.stageNumber}`} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-3">
                    <div className="text-xs font-black text-[#D5896F]">Stage {stage.stageNumber} · {stage.marks} marks · {stage.assessmentObjectiveFocus.join('/')}</div>
                    <h3 className="mt-1 font-bold text-[#2C2A26]">{stage.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6B665E]">{stage.studentTask}</p>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#CCA068]" />
            <h2 className="text-lg font-black text-[#2C2A26]">How to Get High Marks</h2>
          </div>
          <ul className="space-y-2 text-sm leading-6 text-[#6B665E]">
            {cambridgeHighMarkAdvice.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
        <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#D5896F]" />
            <h2 className="text-lg font-black text-[#2C2A26]">Common Mistakes</h2>
          </div>
          <ul className="space-y-2 text-sm leading-6 text-[#6B665E]">
            {cambridgeCommonMistakes.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </article>
      </section>

      <PosterResourceGrid
        title="A Level D&T linked visual posters"
        description="These existing visual resources support Cambridge 9705 design process, drawing, materials, CAD/CAM, sustainability, systems, prototyping and evaluation."
        posters={cambridgePosters}
        onNavigate={onNavigate}
        compact
      />
    </div>
  );
};

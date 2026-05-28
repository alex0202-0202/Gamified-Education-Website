import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers,
  Library,
  Search,
  ShieldCheck,
} from 'lucide-react';
import type { DesignTechnologyTopic, SupportModule } from '../../../data/types';
import { hkdseDatLearningAreas } from '../../../data/hkdse-dat/learningAreas';
import { hkdseDatElectives } from '../../../data/hkdse-dat/electives';
import { hkdseDatThematicResources, hkdseDatThematicResourcesIntro } from '../../../data/hkdse-dat/thematicResources';
import { hkdseDatCaseStudies } from '../../../data/hkdse-dat/caseStudies';
import { hkdseDatSbaSupport } from '../../../data/hkdse-dat/sbaSupport';
import { ibDtCommonCore2026 } from '../../../data/ib-design-technology/commonCore';
import { ibDtHlExtension2026 } from '../../../data/ib-design-technology/hlExtension';
import { ibDtCurrent2026Topics } from '../../../data/ib-design-technology/current2026Topics';
import { ibDtNew2027Strands, ibDt2027QuizPrompts } from '../../../data/ib-design-technology/new2027Topics';
import { ibDtIaSupport } from '../../../data/ib-design-technology/iaSupport';
import { ibDtCaseStudies } from '../../../data/ib-design-technology/caseStudies';
import { researchForDesignModules } from '../../../data/ib-design-technology/researchForDesign';
import { ibDtCurriculumVersions } from '../../../data/ib-design-technology/curriculumVersions';
import { ibMypDesignYears } from '../../../data/ib-design/mypYears';
import { ibMypDesignCriteria, mypDrawingFidelity, mypScamperPrompts } from '../../../data/ib-design/mypCriteria';
import { ibDesignCommandTerms } from '../../../data/ib-design/commandTerms';
import { edbS1DesignTechnologyModules } from '../../../data/edb-dt/s1Modules';
import { s1TeachingExamples } from '../../../data/edb-dt/s1TeachingExamples';
import { edbS2DesignTechnologyModules } from '../../../data/edb-dt/s2Modules';
import { edbS3DesignTechnologyModules } from '../../../data/edb-dt/s3Modules';
import { edbJuniorDtCaseStudies } from '../../../data/edb-dt/caseStudies';
import { edbSharedDtDatResources } from '../../../data/edb-dt/sharedResources';
import { officialReferences } from '../../../data/sources/officialReferences';
import { getPosterResources, posterResources } from '../../../data/design-skills/posterResources';
import { PosterResourceGrid } from '../PosterResourceGrid';

type PageProps = {
  activeTopic?: string;
  onNavigate: (screen: string, topic?: string) => void;
};

const hkdseDatPosters = getPosterResources([
  'zh-hkdse-dat-project-guide',
  'zh-design-process-cycle',
  'zh-testing-evaluation',
  'zh-sustainability-life-cycle',
  'zh-laser-cutting-cam',
  'zh-materials-selection',
  'hkdse-dat-sba-project',
  'design-process-cycle',
  'testing-evaluation',
  'sustainability-life-cycle',
  'laser-cutting-cam',
  'materials-selection',
]);

const juniorDtPosters = getPosterResources([
  'zh-design-process-cycle',
  'zh-materials-selection',
  'zh-mechanisms-systems',
  'zh-orthographic-projection',
  'zh-joining-methods-adhesives',
  'zh-scamper-ideation',
  'zh-ergonomics-human-factors',
  'design-process-cycle',
  'materials-selection',
  'mechanisms-systems',
  'orthographic-projection',
  'joining-methods-adhesives',
  'scamper-ideation',
]);

const ibMypPosters = getPosterResources([
  'zh-ib-myp-design-criteria',
  'zh-design-process-cycle',
  'zh-scamper-ideation',
  'zh-testing-evaluation',
  'zh-orthographic-projection',
  'ib-myp-design-criteria',
  'design-process-cycle',
  'scamper-ideation',
  'testing-evaluation',
  'orthographic-projection',
]);

const ibDpOverviewPosters = getPosterResources([
  'zh-ib-dp-design-technology',
  'zh-ergonomics-human-factors',
  'zh-sustainability-life-cycle',
  'zh-materials-selection',
  'zh-3d-printing-additive-manufacturing',
  'zh-laser-cutting-cam',
  'ib-dp-design-technology',
  'ergonomics-human-factors',
  'sustainability-life-cycle',
  'materials-selection',
  '3d-printing-additive-manufacturing',
  'laser-cutting-cam',
]);

const assessmentSupportPosters = getPosterResources([
  'zh-hkdse-dat-project-guide',
  'zh-testing-evaluation',
  'zh-design-process-cycle',
  'zh-sustainability-life-cycle',
  'hkdse-dat-sba-project',
  'testing-evaluation',
  'design-process-cycle',
  'sustainability-life-cycle',
]);

const ibProjectSupportPosters = getPosterResources([
  'zh-ib-myp-design-criteria',
  'zh-testing-evaluation',
  'zh-design-process-cycle',
  'zh-ergonomics-human-factors',
  'zh-sustainability-life-cycle',
  'ib-myp-design-criteria',
  'testing-evaluation',
  'design-process-cycle',
  'ergonomics-human-factors',
  'sustainability-life-cycle',
]);

const SectionHeader = ({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) => (
  <div className="space-y-2">
    <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B]">{eyebrow}</div>
    <h2 className="text-2xl font-bold tracking-tight text-[#2C2A26]">{title}</h2>
    {body && <p className="max-w-3xl text-sm leading-6 text-[#6B665E]">{body}</p>}
  </div>
);

const PillList = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span key={item} className="rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-2.5 py-1 text-[11px] font-bold text-[#6B665E]">
        {item}
      </span>
    ))}
  </div>
);

const TopicCard = ({ topic, onClick }: { topic: DesignTechnologyTopic; onClick?: () => void }) => {
  const content = (
    <>
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C857B]">{topic.category}</div>
          <h3 className="mt-1 text-lg font-bold leading-tight text-[#2C2A26]">
            {topic.titleZh ? `${topic.titleZh} / ${topic.titleEn}` : topic.titleEn}
          </h3>
        </div>
        {topic.version && (
          <span className="shrink-0 rounded-md bg-[#F2EFE9] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[#6B665E]">
            {topic.version}
          </span>
        )}
      </div>
      <p className="mb-4 text-sm leading-6 text-[#6B665E]">{topic.studentSummary}</p>
      <PillList items={topic.designFocus.slice(0, 4)} />
      {topic.studentChallenge && (
        <div className="mt-4 rounded-lg border border-[#E5E0D8] bg-[#FDFCFB] p-3">
          <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#8C857B]">Design Challenge</div>
          <p className="text-sm leading-5 text-[#4A4741]">{topic.studentChallenge}</p>
        </div>
      )}
    </>
  );

  if (!onClick) {
    return <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">{content}</article>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="h-full rounded-2xl border border-[#E5E0D8] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#D5896F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
    >
      {content}
    </button>
  );
};

const TopicDetail = ({ topic }: { topic: DesignTechnologyTopic }) => (
  <article className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
    <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B]">{topic.category}</div>
        <h2 className="mt-1 text-2xl font-bold text-[#2C2A26]">{topic.titleZh ? `${topic.titleZh} / ${topic.titleEn}` : topic.titleEn}</h2>
      </div>
      {topic.version && <span className="rounded-md bg-[#F2EFE9] px-3 py-1 text-xs font-bold text-[#6B665E]">{topic.version}</span>}
    </div>
    <p className="mb-5 max-w-4xl text-sm leading-6 text-[#6B665E]">{topic.studentSummary}</p>
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <InfoBlock title="Key Concepts" items={topic.keyConcepts} />
      <InfoBlock title="Classroom Activities" items={topic.classroomActivities} />
      <InfoBlock title="Assessment Focus" items={topic.assessmentFocus} />
      {topic.relatedLearningAreas && <InfoBlock title="Related Learning Areas" items={topic.relatedLearningAreas} />}
      {topic.relatedElectives && <InfoBlock title="Related Electives" items={topic.relatedElectives} />}
      {topic.portfolioEvidence && <InfoBlock title="Portfolio Evidence" items={topic.portfolioEvidence} />}
    </div>
    {topic.teacherSummary && (
      <div className="mt-5 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4">
        <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#8C857B]">Teacher Notes</div>
        <p className="text-sm leading-6 text-[#4A4741]">{topic.teacherSummary}</p>
      </div>
    )}
    <div className="mt-5 rounded-xl border border-[#E5E0D8] bg-white p-4">
      <div className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#8C857B]">Source Metadata</div>
      <p className="text-sm text-[#4A4741]">{topic.sourceMetadata.sourceName}</p>
      <p className="mt-1 text-xs leading-5 text-[#8C857B]">{topic.sourceMetadata.attributionNote}</p>
    </div>
  </article>
);

const InfoBlock = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
    <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-[#8C857B]">{title}</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-5 text-[#6B665E]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D5896F]" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const SupportGrid = ({ modules }: { modules: SupportModule[] }) => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
    {modules.map((module) => (
      <article key={module.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-[#2C2A26]">{module.title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#6B665E]">{module.goal}</p>
        <div className="mt-4">
          <PillList items={module.modules} />
        </div>
      </article>
    ))}
  </div>
);

export const DesignTechnologyHome = ({ onNavigate }: PageProps) => (
  <div className="space-y-10 pb-20">
    <section className="rounded-3xl border border-[#E5E0D8] bg-white p-8 shadow-sm">
      <div className="max-w-5xl">
        <div className="mb-3 inline-flex rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#8C857B]">
          IB Design Technology + HKDSE DAT
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[#2C2A26] md:text-5xl">Design Technology Lab</h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-[#6B665E]">
          A focused Design Technology learning and teaching platform for IB Design Technology and HKDSE Design and Applied Technology, supporting curriculum learning, design projects, portfolio development, SBA/IA preparation, assessment rubrics and teacher resource planning.
        </p>
      </div>
    </section>

    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <button
        type="button"
        onClick={() => onNavigate('hkdse_dat')}
        className="rounded-2xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition hover:border-[#D5896F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF5F2] text-[#D5896F]">
          <GraduationCap className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#2C2A26]">HKDSE Design and Applied Technology / DAT</h2>
        <p className="mt-3 text-sm leading-6 text-[#6B665E]">For S4-S6 students, DAT teachers, school subject panels, and SBA/project support.</p>
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#D5896F]">Open HKDSE DAT pathway <ArrowRight className="h-4 w-4" /></div>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('ib_design_technology')}
        className="rounded-2xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition hover:border-[#6B9080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B9080]"
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F7F4] text-[#6B9080]">
          <BookOpen className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-[#2C2A26]">IB Design Technology</h2>
        <p className="mt-3 text-sm leading-6 text-[#6B665E]">For IB DP students, IB DT teachers, curriculum coordinators, and IA/design project support.</p>
        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#6B9080]">Open IB DT pathway <ArrowRight className="h-4 w-4" /></div>
      </button>
    </section>

    <section>
      <SectionHeader eyebrow="Shared Support" title="Project, assessment and teacher planning areas" />
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['project_hub', 'Design Project & Portfolio Hub', 'Brief, research, specification, ideation, modelling, CAD, prototyping, testing and evaluation.', ClipboardCheck],
          ['teacher_resource_hub', 'Teacher Resource Hub', 'Lesson planning, topic cards, assessment focus, rubric mapping and copyright-safe source use.', Library],
          ['curriculum_comparison', 'Curriculum Comparison', 'Clear distinction between IB DT and HKDSE DAT with shared design skills.', Layers],
          ['source_metadata', 'Source / Reference Metadata', 'Official source tracking and summary-only copyright notes.', ShieldCheck],
        ].map(([screen, title, body, Icon]) => {
          const IconComponent = Icon as typeof ClipboardCheck;
          return (
            <button
              type="button"
              key={screen as string}
              onClick={() => onNavigate(screen as string)}
              className="rounded-2xl border border-[#E5E0D8] bg-white p-5 text-left shadow-sm transition hover:border-[#D5896F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
            >
              <IconComponent className="mb-3 h-5 w-5 text-[#D5896F]" />
              <h3 className="font-bold text-[#2C2A26]">{title as string}</h3>
              <p className="mt-2 text-sm leading-5 text-[#6B665E]">{body as string}</p>
            </button>
          );
        })}
      </div>
    </section>
  </div>
);

export const HKDSEDATPage = ({ onNavigate }: PageProps) => (
  <div className="space-y-10 pb-20">
    <SectionHeader
      eyebrow="HKDSE DAT Pathway"
      title="HKDSE Design and Applied Technology / DAT"
      body="A dedicated S4-S6 pathway for learning areas, elective modules, thematic resources, case studies and SBA/project support. Automation, electronics, CAD and digital media are framed only as Design Technology / DAT project tools."
    />
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {hkdseDatLearningAreas.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('senior_module', topic.id.replace('dat-la-', '').replace('design-innovation', 'design_innovation').replace('technological-principles', 'technological_principles').replace('value-impact', 'value_impact'))} />)}
    </section>
    <section className="space-y-5">
      <SectionHeader eyebrow="Elective Modules" title="DAT elective modules" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hkdseDatElectives.map((topic) => <TopicCard key={topic.id} topic={topic} />)}
      </div>
    </section>
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <PathButton title="Thematic Learning and Teaching Resources" body="Ten authentic design contexts with challenges, assessment focus and portfolio evidence." icon={Layers} onClick={() => onNavigate('hkdse_thematic_resources')} />
      <PathButton title="DAT Case Studies" body="Retail, OEM-to-ODM, smart security, digital video, game consoles and hydrogen mobility." icon={FileText} onClick={() => onNavigate('hkdse_case_studies')} />
      <PathButton title="SBA Support" body="Problem launch, research, design development, testing and evaluation support." icon={ClipboardCheck} onClick={() => onNavigate('hkdse_sba_support')} />
    </section>
    <PosterResourceGrid
      title="HKDSE DAT visual knowledge posters"
      description="Add-on visual guides for DAT project workflow, SBA evidence, materials, laser cutting, sustainability and testing."
      posters={hkdseDatPosters}
      onNavigate={onNavigate}
      compact
    />
  </div>
);

const PathButton = ({ title, body, icon: Icon, onClick }: { title: string; body: string; icon: typeof Layers; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-2xl border border-[#E5E0D8] bg-white p-5 text-left shadow-sm transition hover:border-[#D5896F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
  >
    <Icon className="mb-3 h-5 w-5 text-[#D5896F]" />
    <h3 className="font-bold text-[#2C2A26]">{title}</h3>
    <p className="mt-2 text-sm leading-5 text-[#6B665E]">{body}</p>
  </button>
);

export const DATThematicResourcesPage = ({ activeTopic, onNavigate }: PageProps) => {
  const selected = hkdseDatThematicResources.find((topic) => topic.id === activeTopic);
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader eyebrow="HKDSE DAT Thematic Resources" title={`${hkdseDatThematicResourcesIntro.titleZh} / ${hkdseDatThematicResourcesIntro.titleEn}`} body={`${hkdseDatThematicResourcesIntro.introZh} ${hkdseDatThematicResourcesIntro.introEn}`} />
      {selected && <TopicDetail topic={selected} />}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hkdseDatThematicResources.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('hkdse_thematic_resources', topic.id)} />)}
      </div>
    </div>
  );
};

export const DATCaseStudiesPage = ({ activeTopic, onNavigate }: PageProps) => {
  const selected = hkdseDatCaseStudies.find((topic) => topic.id === activeTopic);
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader eyebrow="HKDSE DAT Case Studies" title="中四至中六 設計與應用科技 - 個案研究 / Senior Secondary DAT Case Studies" body="Original case-study cards for design inquiry, classroom discussion, SBA reflection and connections to DAT learning areas." />
      {selected && <TopicDetail topic={selected} />}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hkdseDatCaseStudies.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('hkdse_case_studies', topic.id)} />)}
      </div>
    </div>
  );
};

export const DATSbaSupportPage = () => (
  <div className="space-y-8 pb-20">
    <SectionHeader eyebrow="HKDSE DAT SBA Support" title="DAT SBA and Design Project Support" body="Structured support for problem identification, research, design development, testing, evaluation and portfolio evidence. This section does not merge DAT SBA with IB IA." />
    <PosterResourceGrid
      title="SBA workflow and evaluation posters"
      description="Use these as student-facing reminders for SBA stages, evidence, testing, sustainability and project decisions."
      posters={assessmentSupportPosters}
      compact
    />
    <SupportGrid modules={hkdseDatSbaSupport} />
  </div>
);

export const EDBJuniorDesignTechnologyPage = ({ onNavigate }: PageProps) => {
  const groups = [
    { title: 'S1 Design and Technology', modules: edbS1DesignTechnologyModules },
    { title: 'S2 Design and Technology', modules: edbS2DesignTechnologyModules },
    { title: 'S3 Design and Technology', modules: edbS3DesignTechnologyModules },
  ];

  return (
    <div className="space-y-10 pb-20">
      <SectionHeader
        eyebrow="EDB S1-S3 DT Add-on"
        title="S1-S3 Design and Technology summary"
        body="Add-on curriculum data for junior Design and Technology. This page summarises the existing lower-secondary DT pathway and does not replace the original S1-S3 dashboard, modules, resources or games."
      />
      <PosterResourceGrid
        title="S1-S3 Design and Technology poster resources"
        description="Visual guides for junior DT topics: design process, materials, mechanisms, orthographic drawing, joining and ideation."
        posters={juniorDtPosters}
        onNavigate={onNavigate}
        compact
      />
      {groups.map((group) => (
        <section key={group.title} className="space-y-4">
          <SectionHeader eyebrow="Junior DT" title={group.title} />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {group.modules.map((module) => (
              <article key={module.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C857B]">{module.stage} · {module.code}</div>
                <h3 className="mt-1 text-lg font-bold text-[#2C2A26]">{module.topicZh} / {module.topicEn}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6B665E]">{module.websiteSummary}</p>
                <div className="mt-4"><PillList items={module.learningElements.slice(0, 5)} /></div>
                <div className="mt-4 grid grid-cols-1 gap-3">
                  <InfoBlock title="Project Skills" items={module.projectSkills} />
                  <InfoBlock title="Portfolio Evidence" items={module.portfolioEvidence} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-4">
        <SectionHeader
          eyebrow="S1 Design and Technology"
          title="中一設計與科技 teaching examples"
          body="S1-only add-on examples from the latest teaching findings. These cards add classroom tasks, mini projects and practice links without changing S2, S3, DAT or IB content."
        />
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {s1TeachingExamples.map((example) => (
            <article key={example.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C857B]">{example.moduleCode} · {example.topicCategory}</div>
                  <h3 className="mt-1 text-lg font-bold text-[#2C2A26]">{example.titleZh} / {example.titleEn}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('fun_learning', example.relatedQuestionBankIds[0])}
                  className="shrink-0 rounded-full bg-[#2C2A26] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#4A4741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
                >
                  Practice S1 Questions
                </button>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#6B665E]">{example.studentSummary}</p>
              <div className="mt-4"><PillList items={example.keyTerms.slice(0, 8)} /></div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <InfoBlock title="Key Knowledge" items={example.keyKnowledge.slice(0, 5)} />
                <InfoBlock title="Classroom Activity" items={example.classroomActivities} />
              </div>
              <div className="mt-4 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4">
                <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B]">Mini Project</div>
                <p className="mt-1 text-sm font-bold text-[#2C2A26]">{example.miniProjectIdea}</p>
                <p className="mt-1 text-sm leading-6 text-[#6B665E]">{example.designChallenge}</p>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <InfoBlock title="Portfolio Evidence" items={example.portfolioEvidence} />
                <InfoBlock title="Assessment Focus" items={example.assessmentFocus} />
              </div>
              <p className="mt-4 text-xs leading-5 text-[#8C857B]">{example.sourceMetadata.attributionNote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="S1-S3 DT Case Studies" title="Junior case-study add-ons" body="These are summary-only case-study cards for classroom discussion and project reflection." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {edbJuniorDtCaseStudies.map((study) => (
            <article key={study.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#2C2A26]">{study.titleZh}</h3>
              <div className="text-sm font-bold text-[#8C857B]">{study.titleEn}</div>
              <p className="mt-3 text-sm leading-6 text-[#6B665E]">{study.websiteUse}</p>
              <div className="mt-4"><PillList items={study.linkedSkills} /></div>
              <p className="mt-4 rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#6B665E]">{study.discussionPrompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader eyebrow="S1-S6 Shared DT/DAT Resources" title="Shared project-skill resources" body="These resources can support junior DT, senior DAT and shared design project skills without merging assessment systems." />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {edbSharedDtDatResources.map((resource) => (
            <article key={resource.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-[#2C2A26]">{resource.titleZh}</h3>
              <div className="text-sm font-bold text-[#8C857B]">{resource.titleEn}</div>
              <p className="mt-3 text-sm leading-6 text-[#6B665E]">{resource.websiteSummary}</p>
              <div className="mt-4"><PillList items={resource.linkedSkills} /></div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export const IBDesignTechnologyPage = ({ onNavigate }: PageProps) => (
  <div className="space-y-10 pb-20">
    <SectionHeader
      eyebrow="IB Design Technology Pathway"
      title="IB DP Design Technology"
      body="A dedicated IB DT pathway with separated current/last-assessment 2026 topics and new/first-assessment 2027 strands. IA and research-for-design support are kept distinct from HKDSE DAT SBA."
    />
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {ibDtCurriculumVersions.map((version) => (
        <button
          type="button"
          key={version.id}
          onClick={() => onNavigate(version.id === 'current-2026' ? 'ib_current_2026' : 'ib_new_2027')}
          className="rounded-2xl border border-[#E5E0D8] bg-white p-6 text-left shadow-sm transition hover:border-[#6B9080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B9080]"
        >
          <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">{version.id}</div>
          <h3 className="mt-1 text-2xl font-bold text-[#2C2A26]">{version.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#6B665E]">{version.description}</p>
          <p className="mt-3 rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">{version.warning}</p>
        </button>
      ))}
    </section>
    <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <PathButton title="IA Support" body="Project launch, research, development, evaluation and presentation support." icon={ClipboardCheck} onClick={() => onNavigate('ib_ia_support')} />
      <PathButton title="IB Case Studies" body="Original short case cards for ethics, innovation, materials and sustainability discussion." icon={FileText} onClick={() => onNavigate('ib_case_studies')} />
      <PathButton title="Research for Design" body="Ethics, tools, surveys, strategies and source management for IA/SBA inquiry." icon={Search} onClick={() => onNavigate('ib_research_for_design')} />
    </section>
    <PosterResourceGrid
      title="IB DP Design Technology poster resources"
      description="Student-facing posters for IB DT overview, ergonomics, sustainability, materials, CAD/CAM and prototyping."
      posters={ibDpOverviewPosters}
      onNavigate={onNavigate}
      compact
    />
  </div>
);

export const IBMypDesignPage = () => (
  <div className="space-y-10 pb-20">
    <SectionHeader
      eyebrow="IB MYP Design Add-on"
      title="IB MYP Design Y6-Y10 pathway"
      body="Add-on MYP Design summaries for Y6-Y10 learners. This content supports the existing IB dashboard and keeps MYP Design separate from HKDSE/EDB DT/DAT."
    />
    <section className="space-y-4">
      <SectionHeader eyebrow="Year Progression" title="Y6-Y10 progression" body="MYP Design is a framework rather than a fixed year-by-year syllabus, so this is a website planning progression for school use." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
        {ibMypDesignYears.map((year) => (
          <article key={year.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C857B]">{year.ibStage}</div>
            <h3 className="mt-1 text-xl font-bold text-[#2C2A26]">{year.yearGroup}</h3>
            <p className="mt-3 text-sm leading-6 text-[#6B665E]">{year.websiteFocus}</p>
            <p className="mt-4 rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#6B665E]">{year.studentOutcome}</p>
            <div className="mt-4"><PillList items={year.portfolioEvidence.slice(0, 4)} /></div>
          </article>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <SectionHeader eyebrow="Criteria A-D" title="MYP Design criteria" body="The four criteria are shown as project evidence structures, not as official task sheets." />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {ibMypDesignCriteria.map((criterion) => (
          <article key={criterion.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
            <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C857B]">Criterion {criterion.criterion}</div>
            <h3 className="mt-1 text-lg font-bold text-[#2C2A26]">{criterion.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[#6B665E]">{criterion.studentSummary}</p>
            <div className="mt-4"><PillList items={criterion.keyLearningElements.slice(0, 4)} /></div>
            <div className="mt-4"><InfoBlock title="Portfolio Evidence" items={criterion.portfolioEvidence} /></div>
          </article>
        ))}
      </div>
    </section>

    <PosterResourceGrid
      title="MYP Design portfolio and ideation posters"
      description="These posters help students connect MYP criteria, the design cycle, SCAMPER, testing and technical drawing evidence."
      posters={ibMypPosters}
      compact
    />

    <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
      <article className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm xl:col-span-2">
        <SectionHeader eyebrow="Command Terms" title="Design command-term glossary" />
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {ibDesignCommandTerms.map((term) => (
            <div key={term.term} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
              <h3 className="font-bold text-[#2C2A26]">{term.term}</h3>
              <p className="mt-1 text-sm leading-5 text-[#6B665E]">{term.studentAction}</p>
              <p className="mt-2 text-xs leading-5 text-[#8C857B]">{term.designEvidence}</p>
            </div>
          ))}
        </div>
      </article>
      <div className="space-y-5">
        <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <SectionHeader eyebrow="SCAMPER" title="Idea prompts" />
          <div className="mt-4 space-y-3">
            {mypScamperPrompts.map((prompt) => (
              <div key={prompt.prompt} className="rounded-lg bg-[#F9F8F6] p-3">
                <div className="text-sm font-bold text-[#2C2A26]">{prompt.prompt}</div>
                <div className="text-xs leading-5 text-[#6B665E]">{prompt.designQuestion}</div>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <SectionHeader eyebrow="Drawing Fidelity" title="Sketch quality levels" />
          <div className="mt-4 space-y-3">
            {mypDrawingFidelity.map((level) => (
              <div key={level.level} className="rounded-lg bg-[#F9F8F6] p-3">
                <div className="text-sm font-bold text-[#2C2A26]">{level.level}</div>
                <div className="text-xs leading-5 text-[#6B665E]">{level.explanation}</div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  </div>
);

export const IBCurrent2026Page = ({ activeTopic, onNavigate }: PageProps) => {
  const selected = ibDtCurrent2026Topics.find((topic) => topic.id === activeTopic);
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader eyebrow="IB Current / Last-Assessment 2026" title="Common Core Topics 1-6 and HL Extension Topics 7-10" body="This page keeps the current/last-assessment 2026 structure separate from the first-assessment 2027 course." />
      {selected && <TopicDetail topic={selected} />}
      <PosterResourceGrid
        title="IB DP topic revision posters"
        description="Mapped visual support for human factors, sustainability, materials, modelling, CAM and prototyping topics."
        posters={ibDpOverviewPosters}
        onNavigate={onNavigate}
        compact
      />
      <SectionHeader eyebrow="Common Core / SL" title="Topics 1-6" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ibDtCommonCore2026.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('ib_current_2026', topic.id)} />)}
      </div>
      <SectionHeader eyebrow="HL Extension" title="Topics 7-10" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {ibDtHlExtension2026.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('ib_current_2026', topic.id)} />)}
      </div>
    </div>
  );
};

export const IBNew2027Page = ({ activeTopic, onNavigate }: PageProps) => {
  const selected = ibDtNew2027Strands.find((topic) => topic.id === activeTopic);
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader eyebrow="IB New / First-Assessment 2027" title="Design in Theory, Design in Practice and Design in Context" body="This page is for the new IB DP Design Technology course structure and should not be mixed with the last-assessment 2026 topic sequence." />
      {selected && <TopicDetail topic={selected} />}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {ibDtNew2027Strands.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('ib_new_2027', topic.id)} />)}
      </div>
      <section className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
        <SectionHeader eyebrow="Student Check Questions" title="Short quiz prompts for the 2027 pathway" />
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {ibDt2027QuizPrompts.map((prompt) => (
            <div key={prompt} className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4 text-sm text-[#4A4741]">{prompt}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export const IBIASupportPage = () => (
  <div className="space-y-8 pb-20">
    <SectionHeader eyebrow="IB IA / Design Project Support" title="IB Design Technology IA Support" body="Support modules for project launch, research, development, evaluation and presentation. These are designed for IB IA, not DAT SBA, although research skills overlap." />
    <PosterResourceGrid
      title="IA portfolio and evaluation posters"
      description="Use these as quick student references for MYP/DP design evidence, testing, user-centred decisions and sustainability reflection."
      posters={ibProjectSupportPosters}
      compact
    />
    <SupportGrid modules={ibDtIaSupport} />
  </div>
);

export const IBResearchForDesignPage = () => (
  <div className="space-y-8 pb-20">
    <SectionHeader eyebrow="Research for Design" title="Research methods for IB IA and DAT SBA" body="Shared research skills for ethical user inquiry, survey design, observation, source tracking and evidence-to-design decision workflows." />
    <SupportGrid modules={researchForDesignModules} />
  </div>
);

export const IBCaseStudiesPage = ({ activeTopic, onNavigate }: PageProps) => {
  const selected = ibDtCaseStudies.find((topic) => topic.id === activeTopic);
  return (
    <div className="space-y-8 pb-20">
      <SectionHeader eyebrow="IB Design Technology Case Studies" title="Case-study library" body="Original short case cards for design problem analysis, user/context review, innovation, sustainability, materials and ethical discussion." />
      {selected && <TopicDetail topic={selected} />}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {ibDtCaseStudies.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={() => onNavigate('ib_case_studies', topic.id)} />)}
      </div>
    </div>
  );
};

export const CurriculumComparisonPage = () => (
  <div className="space-y-8 pb-20">
    <SectionHeader eyebrow="Curriculum Comparison" title="IB Design Technology vs HKDSE Design and Applied Technology" body="The two curricula are related through design skills, but they are separate pathways with different students, assessment systems and course structures." />
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <article className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#2C2A26]">HKDSE DAT</h3>
        <p className="mt-3 text-sm leading-6 text-[#6B665E]">Senior secondary DAT subject for S4-S6 students, with learning areas, electives, thematic resources, case studies and SBA/project work. Strong focus on applied design, technological principles, value/impact and practical problem-solving.</p>
        <div className="mt-4"><PillList items={['S4-S6', 'learning areas', 'electives', 'SBA/project work', 'applied design']} /></div>
      </article>
      <article className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#2C2A26]">IB Design Technology</h3>
        <p className="mt-3 text-sm leading-6 text-[#6B665E]">IB DP Design Technology for DP students, with design literacy, inquiry, design cycle, analysis, synthesis, testing, evaluation and IA/design project support. Current 2026 and new 2027 pathways must remain distinct.</p>
        <div className="mt-4"><PillList items={['IB DP', 'IA/design project', 'common core', 'HL extension', '2027 strands']} /></div>
      </article>
    </div>
    <article className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold text-[#2C2A26]">Shared design skills</h3>
      <div className="mt-4"><PillList items={['user research', 'design brief', 'ideation', 'prototyping', 'testing', 'evaluation', 'design communication', 'sustainability', 'reflection']} /></div>
    </article>
  </div>
);

export const TeacherResourceHub = ({ onNavigate }: PageProps) => (
  <div className="space-y-8 pb-20">
    <SectionHeader eyebrow="Teacher Resource Hub" title="Teacher planning, curriculum mapping and copyright-safe resource use" body="Professional planning support for Design Technology teachers, panels and curriculum leaders. Content is intentionally summary-only and should not reproduce official documents directly." />
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <PathButton title="Lesson Planning Ideas" body="Use topic cards, activities and assessment focus to build lesson sequences." icon={BookOpen} onClick={() => onNavigate('hkdse_thematic_resources')} />
      <PathButton title="Rubric and Assessment Mapping" body="Connect DAT SBA and IB IA evidence to research, prototyping, testing and reflection." icon={ClipboardCheck} onClick={() => onNavigate('curriculum_comparison')} />
      <PathButton title="Source Metadata" body="Track official references, local summaries and copyright-safe use notes." icon={ShieldCheck} onClick={() => onNavigate('source_metadata')} />
    </div>
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-6 shadow-sm">
      <SectionHeader eyebrow="Content Use Note" title="Do not reproduce official materials directly" body="Use official EDB/IB/source pages as references and metadata. Build original summaries, teacher prompts, activity structures and source links. Do not copy official PDFs, DOCX packages, worksheets, diagrams, images or slide decks unless permission/licence allows it." />
    </section>
  </div>
);

export const SourceMetadataPage = () => (
  <div className="space-y-8 pb-20">
    <SectionHeader eyebrow="Source Metadata" title="Official references and attribution notes" body="Source records are visible so the platform does not hide curriculum references or overclaim official coverage. Content remains summary-only until verified against official documents." />
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {officialReferences.map((source) => (
        <article key={source.id} className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#8C857B]">{source.publisher}</div>
          <h3 className="mt-1 font-bold text-[#2C2A26]">{source.sourceName}</h3>
          <a className="mt-2 block break-words text-sm font-bold text-[#D5896F] hover:underline" href={source.sourceUrl.startsWith('local:') ? undefined : source.sourceUrl} target="_blank" rel="noreferrer">
            {source.sourceUrl}
          </a>
          <p className="mt-3 text-sm leading-6 text-[#6B665E]">{source.notes}</p>
          <p className="mt-3 rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">{source.attributionNote}</p>
        </article>
      ))}
    </div>
  </div>
);

export const PosterLibraryPage = ({ onNavigate }: PageProps) => {
  const [query, setQuery] = useState('');
  const [curriculumFilter, setCurriculumFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');

  const curricula = useMemo(
    () => Array.from(new Set(posterResources.flatMap((poster) => poster.curriculum))).sort(),
    [],
  );
  const knowledgeAreas = useMemo(
    () => Array.from(new Set(posterResources.flatMap((poster) => poster.knowledgeAreas))).sort(),
    [],
  );

  const filteredPosters = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    return posterResources.filter((poster) => {
      const matchesCurriculum = curriculumFilter === 'all' || poster.curriculum.includes(curriculumFilter);
      const matchesArea = areaFilter === 'all' || poster.knowledgeAreas.includes(areaFilter);
      const searchPool = [
        poster.title,
        poster.titleZh,
        poster.alt,
        poster.studentUse,
        poster.teacherUse,
        ...poster.curriculum,
        ...poster.knowledgeAreas,
      ].join(' ').toLowerCase();
      return matchesCurriculum && matchesArea && (!normalisedQuery || searchPool.includes(normalisedQuery));
    });
  }, [areaFilter, curriculumFilter, query]);

  return (
    <div className="space-y-8 pb-20">
      <section className="rounded-3xl border border-[#E5E0D8] bg-white p-6 shadow-sm md:p-8">
        <SectionHeader
          eyebrow="Knowledge Map"
          title="Design Technology Poster Library"
          body="A single visual resource map for design process, SBA/IA evidence, MYP criteria, orthographic drawing, materials, mechanisms, ergonomics, sustainability, laser cutting, 3D printing, joining methods and curved cardboard."
        />
        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_220px_220px]">
          <label className="text-xs font-bold text-[#6B665E]">
            Search poster, concept or skill
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. kerf, ergonomics, SCAMPER, orthographic..."
              className="mt-1 w-full rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-3 text-sm text-[#2C2A26] focus:border-[#D5896F] focus:outline-none"
            />
          </label>
          <label className="text-xs font-bold text-[#6B665E]">
            Curriculum
            <select
              value={curriculumFilter}
              onChange={(event) => setCurriculumFilter(event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-3 text-sm text-[#2C2A26] focus:border-[#D5896F] focus:outline-none"
            >
              <option value="all">All curricula</option>
              {curricula.map((curriculum) => <option key={curriculum} value={curriculum}>{curriculum}</option>)}
            </select>
          </label>
          <label className="text-xs font-bold text-[#6B665E]">
            Knowledge area
            <select
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value)}
              className="mt-1 w-full rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-3 text-sm text-[#2C2A26] focus:border-[#D5896F] focus:outline-none"
            >
              <option value="all">All areas</option>
              {knowledgeAreas.map((area) => <option key={area} value={area}>{area}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#6B665E]">
          <span className="rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1">{filteredPosters.length} / {posterResources.length} posters</span>
          <button type="button" onClick={() => { setQuery(''); setCurriculumFilter('all'); setAreaFilter('all'); }} className="rounded-full border border-[#E5E0D8] bg-white px-3 py-1 hover:bg-[#F9F8F6]">
            Reset filters
          </button>
        </div>
      </section>

      {filteredPosters.length > 0 ? (
        <PosterResourceGrid
          eyebrow="Filtered Posters"
          title="Matched visual learning resources"
          description="Each poster card links back to the most relevant tool, curriculum page or project-support section."
          posters={filteredPosters}
          onNavigate={onNavigate}
          compact
        />
      ) : (
        <section className="rounded-2xl border border-[#E5E0D8] bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#2C2A26]">No matching posters</h2>
          <p className="mt-2 text-sm text-[#6B665E]">Try a wider keyword, another curriculum, or reset the filters.</p>
        </section>
      )}
    </div>
  );
};

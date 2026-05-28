import { Hammer, ShieldCheck } from 'lucide-react';
import { joiningMethods } from '../../data/design-skills/joiningMethods';
import { getPosterResources } from '../../data/design-skills/posterResources';
import { PosterResourceGrid } from '../../app/components/PosterResourceGrid';
import { AdhesiveSelector } from './AdhesiveSelector';
import { JointingMethodCards } from './JointingMethodCards';

type Props = {
  onNavigate: (screen: string, topic?: string) => void;
};

const activities = [
  'Design a small cardboard phone stand using tab-and-slot construction.',
  'Design a laser-cut acrylic box using finger joints.',
  'Compare wood glue and screw joining for a wooden frame.',
  'Choose the best joining method for a mixed-material product.',
  'Create a curved cardboard structure using scoring and layering.',
];

const joiningPosters = getPosterResources([
  'zh-joining-methods-adhesives',
  'zh-finger-joint-box-maker',
  'zh-curved-cardboard-living-hinge',
  'zh-materials-selection',
  'joining-methods-adhesives',
  'finger-joint-box-maker',
  'curved-cardboard-living-hinge',
  'materials-selection',
]);

export const JoiningMethodsPanel = ({ onNavigate }: Props) => (
  <div className="space-y-8 pb-20">
    <section className="rounded-3xl border border-[#E5E0D8] bg-white p-8 shadow-sm">
      <div className="mb-3 inline-flex rounded-full border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1 text-xs font-black uppercase tracking-widest text-[#8C857B]">
        Shared Design Skills
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-[#2C2A26] md:text-4xl">Joining Methods & Adhesives</h1>
      <p className="mt-2 text-xl font-semibold text-[#6B665E]">接合方法與黏合技術</p>
      <p className="mt-4 max-w-4xl text-sm leading-6 text-[#6B665E]">
        Learn how wood, card, acrylic, metal and fabric can be joined safely and appropriately in Design Technology projects. This shared module supports DT/DAT project work, IB MYP making evidence and IB DP prototyping decisions.
      </p>
      <button
        type="button"
        onClick={() => onNavigate('fun_learning', 'design-skill-joining-methods')}
        className="mt-5 rounded-xl bg-[#2C2A26] px-4 py-2 text-sm font-bold text-white hover:bg-[#4A4741] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
      >
        Practice joining questions
      </button>
      <button
        type="button"
        onClick={() => onNavigate('finger_joint_box_maker')}
        className="ml-3 mt-5 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#4A4741] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
      >
        Open finger joint box maker
      </button>
    </section>

    <AdhesiveSelector />

    <PosterResourceGrid
      title="Joining, adhesives and sheet-material posters"
      description="Use these posters to connect practical joining choices with material suitability, 榫接 box design and curved cardboard making."
      posters={joiningPosters}
      onNavigate={onNavigate}
      compact
    />

    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Hammer className="h-5 w-5 text-[#D5896F]" />
        <h2 className="text-lg font-bold text-[#2C2A26]">Method Knowledge Summary</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {joiningMethods.map((method) => (
          <article key={method.id} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B]">{method.category}</div>
            <h3 className="mt-1 text-base font-bold text-[#2C2A26]">{method.name} / {method.nameZh}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B665E]">{method.explanation}</p>
            <p className="mt-2 text-xs text-[#6B665E]"><b>Suitable:</b> {method.suitableMaterial}</p>
            <p className="mt-1 text-xs text-[#6B665E]"><b>Tools:</b> {method.toolsNeeded.join(', ')}</p>
            <p className="mt-2 rounded-lg bg-white p-2 text-xs leading-5 text-[#8C857B]"><b>Project:</b> {method.studentProjectExample}</p>
          </article>
        ))}
      </div>
    </section>

    <JointingMethodCards />

    <section className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-[#6B9080]"><ShieldCheck className="h-5 w-5" /><h2 className="text-lg font-bold text-[#2C2A26]">Important Material Notes</h2></div>
        <ul className="space-y-3 text-sm leading-6 text-[#6B665E]">
          <li>Acrylic usually needs acrylic solvent cement or mechanical fixing, not ordinary PVA wood glue.</li>
          <li>Too much liquid glue can deform thin card and weaken visual quality.</li>
          <li>Metal often needs mechanical fixing or careful surface preparation before adhesive bonding.</li>
          <li>Joining method choice affects strength, appearance, repairability, safety and manufacturing time.</li>
        </ul>
      </article>
      <article className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-[#2C2A26]">Student Activities</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {activities.map((activity, index) => (
            <div key={activity} className="rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4">
              <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Activity {index + 1}</div>
              <p className="mt-2 text-sm leading-6 text-[#4A4741]">{activity}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  </div>
);

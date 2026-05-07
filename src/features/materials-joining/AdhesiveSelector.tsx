import { useMemo, useState } from 'react';
import { adhesiveGuide, materialPairRecommendations } from '../../data/design-skills/joiningMethods';

const materials = ['Wood', 'Cardboard', 'Acrylic', 'Metal', 'Fabric', 'Foam board'];

const pairKey = (a: string, b: string) => [a.toLowerCase(), b.toLowerCase()].sort().join('|');

export const AdhesiveSelector = () => {
  const [materialA, setMaterialA] = useState('Wood');
  const [materialB, setMaterialB] = useState('Wood');

  const recommendation = useMemo(() => {
    const exact = materialPairRecommendations.find((item) => item.key === pairKey(materialA, materialB));
    if (exact) return exact;
    return {
      recommendedMethod: 'Use mechanical fixing, brackets, testing samples, or a material-specific adhesive after teacher approval.',
      recommendedAdhesive: 'Test epoxy or material-specific adhesive where appropriate',
      strength: 'Medium',
      toolsRequired: ['test sample', 'clamps', 'PPE'],
      safetyWarning: 'Mixed-material joining should be tested before final making.',
      exampleUse: 'Mixed-material prototype',
    };
  }, [materialA, materialB]);

  return (
    <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-[#2C2A26]">Interactive Material Selector</h2>
      <p className="mt-1 text-sm text-[#6B665E]">Choose two materials to compare suitable joining and gluing methods.</p>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="text-sm font-bold text-[#4A4741]">
          Choose Material A
          <select value={materialA} onChange={(event) => setMaterialA(event.target.value)} className="mt-1 w-full rounded-lg border border-[#E5E0D8] bg-white px-3 py-2 text-sm">
            {materials.map((material) => <option key={material} value={material}>{material}</option>)}
          </select>
        </label>
        <label className="text-sm font-bold text-[#4A4741]">
          Choose Material B
          <select value={materialB} onChange={(event) => setMaterialB(event.target.value)} className="mt-1 w-full rounded-lg border border-[#E5E0D8] bg-white px-3 py-2 text-sm">
            {materials.map((material) => <option key={material} value={material}>{material}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-5 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6] p-4">
        <div className="text-xs font-black uppercase tracking-widest text-[#8C857B]">Recommendation</div>
        <h3 className="mt-1 text-lg font-bold text-[#2C2A26]">{materialA} + {materialB}</h3>
        <p className="mt-2 text-sm leading-6 text-[#4A4741]"><b>Method:</b> {recommendation.recommendedMethod}</p>
        <p className="text-sm leading-6 text-[#4A4741]"><b>Adhesive:</b> {recommendation.recommendedAdhesive}</p>
        <p className="text-sm leading-6 text-[#4A4741]"><b>Strength:</b> {recommendation.strength}</p>
        <p className="text-sm leading-6 text-[#4A4741]"><b>Tools:</b> {recommendation.toolsRequired.join(', ')}</p>
        <p className="mt-2 rounded-lg bg-white p-3 text-xs leading-5 text-[#8C857B]"><b>Safety:</b> {recommendation.safetyWarning}</p>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adhesiveGuide.map((item) => (
          <article key={item.material} className="rounded-xl border border-[#E5E0D8] bg-white p-4">
            <h3 className="font-bold text-[#2C2A26]">{item.material}</h3>
            <p className="mt-2 text-sm text-[#6B665E]"><b>Suitable:</b> {item.suitableGlue.join(', ')}</p>
            <p className="mt-2 text-sm text-[#6B665E]"><b>Methods:</b> {item.joiningMethods.join(', ')}</p>
            <p className="mt-2 text-xs leading-5 text-[#D5896F]"><b>Warning:</b> {item.unsuitableWarning}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

import { joiningMethods } from '../../data/design-skills/joiningMethods';

export const JointingMethodCards = () => (
  <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-[#2C2A26]">Visual Learning Cards</h2>
    <p className="mt-1 text-sm text-[#6B665E]">Core joints for product design, modelling, prototyping and workshop planning.</p>
    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {joiningMethods.map((method) => (
        <article key={method.id} className="rounded-xl border border-[#E5E0D8] bg-[#FDFCFB] p-4">
          <div className="mb-3 flex h-28 items-center justify-center rounded-lg border border-dashed border-[#D8CFC3] bg-white">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: method.id === 'finger-joint' ? 9 : 6 }).map((_, index) => (
                <span key={index} className={`h-5 w-8 rounded-sm ${index % 2 === 0 ? 'bg-[#D5896F]' : 'bg-[#6B9080]'}`} />
              ))}
            </div>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B]">{method.category}</div>
          <h3 className="mt-1 text-base font-bold text-[#2C2A26]">{method.name} / {method.nameZh}</h3>
          <p className="mt-2 text-sm leading-6 text-[#6B665E]">{method.explanation}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-white p-2"><dt className="font-bold">Strength</dt><dd>{method.strength}</dd></div>
            <div className="rounded-lg bg-white p-2"><dt className="font-bold">Difficulty</dt><dd>{method.difficulty}</dd></div>
          </dl>
          <p className="mt-3 text-xs leading-5 text-[#8C857B]"><b>Common mistake:</b> {method.commonMistake}</p>
        </article>
      ))}
    </div>
  </section>
);

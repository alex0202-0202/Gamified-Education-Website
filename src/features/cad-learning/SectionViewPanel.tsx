type Props = {
  cutPosition: number;
  onCutPositionChange: (value: number) => void;
};

export const SectionViewPanel = ({ cutPosition, onCutPositionChange }: Props) => (
  <section className="rounded-2xl border border-[#E5E0D8] bg-white p-5 shadow-sm">
    <h2 className="text-lg font-bold text-[#2C2A26]">Section / Cut View</h2>
    <p className="mt-1 text-sm leading-6 text-[#6B665E]">
      A section view imagines that the object is cut open. The hatched area shows material that has been cut by the section plane.
    </p>
    <label className="mt-4 block text-sm font-bold text-[#4A4741]" htmlFor="section-cut-slider">
      Cut-plane position
    </label>
    <input
      id="section-cut-slider"
      type="range"
      min="20"
      max="80"
      value={cutPosition}
      onChange={(event) => onCutPositionChange(Number(event.target.value))}
      className="mt-2 w-full"
    />
    <div className="relative mt-4 h-32 rounded-xl border border-[#E5E0D8] bg-[#F9F8F6]">
      <div className="absolute left-8 right-8 top-8 h-16 rounded-md border-2 border-[#2C2A26] bg-white" />
      <div
        className="absolute top-6 h-20 w-1 rounded-full bg-[#D5896F]"
        style={{ left: `${cutPosition}%` }}
      />
      <div
        className="absolute top-8 h-16 rounded-r-md border-l-4 border-[#D5896F] bg-[repeating-linear-gradient(45deg,#F5C9B8_0,#F5C9B8_4px,#FFF4EF_4px,#FFF4EF_8px)]"
        style={{ left: `${cutPosition}%`, right: '2rem' }}
      />
    </div>
  </section>
);

import type { OrthographicViewGuide, OrthographicViewId } from '../../data/design-skills/orthographicProjection';

type Props = {
  views: OrthographicViewGuide[];
  activeView: OrthographicViewId;
  onChange: (view: OrthographicViewId) => void;
};

export const ViewSelector = ({ views, activeView, onChange }: Props) => (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-7">
    {views.map((view) => (
      <button
        key={view.id}
        type="button"
        onClick={() => onChange(view.id)}
        className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F] ${
          activeView === view.id
            ? 'border-[#D5896F] bg-[#FFF4EF] text-[#2C2A26]'
            : 'border-[#E5E0D8] bg-white text-[#6B665E] hover:border-[#D5896F]'
        }`}
      >
        <span className="block">{view.title}</span>
        <span className="mt-0.5 block font-medium text-[#8C857B]">{view.titleZh}</span>
      </button>
    ))}
  </div>
);

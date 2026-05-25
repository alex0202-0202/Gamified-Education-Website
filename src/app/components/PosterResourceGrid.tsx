import { ArrowRight, ExternalLink } from 'lucide-react';
import type { PosterResource } from '../../data/design-skills/posterResources';

type PosterResourceGridProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  posters: PosterResource[];
  onNavigate?: (screen: string, topic?: string) => void;
  compact?: boolean;
};

export const PosterResourceGrid = ({
  eyebrow = 'Visual Learning Posters',
  title,
  description,
  posters,
  onNavigate,
  compact = false,
}: PosterResourceGridProps) => {
  if (posters.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-[#8C857B]">{eyebrow}</div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#2C2A26]">{title}</h2>
        {description && <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6B665E]">{description}</p>}
      </div>
      <div className={`grid grid-cols-1 gap-5 ${compact ? 'md:grid-cols-2 xl:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-4'}`}>
        {posters.map((poster) => (
          <article key={poster.id} className="overflow-hidden rounded-2xl border border-[#E5E0D8] bg-white shadow-sm">
            <a
              href={poster.src}
              target="_blank"
              rel="noreferrer"
              className="block bg-[#F9F8F6] p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5896F]"
              aria-label={`Open full poster: ${poster.title}`}
            >
              <img
                src={poster.src}
                alt={poster.alt}
                loading="lazy"
                className={`${compact ? 'h-56' : 'h-72'} w-full rounded-xl border border-[#E5E0D8] bg-white object-contain`}
              />
            </a>
            <div className="space-y-3 p-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#8C857B]">
                  {poster.curriculum.join(' · ')}
                </div>
                <h3 className="mt-1 text-base font-bold leading-tight text-[#2C2A26]">
                  {poster.titleZh} / {poster.title}
                </h3>
              </div>
              <p className="text-sm leading-6 text-[#6B665E]">{poster.studentUse}</p>
              <div className="rounded-lg bg-[#F9F8F6] p-3 text-xs leading-5 text-[#8C857B]">
                <b>Teacher use:</b> {poster.teacherUse}
              </div>
              <div className="flex flex-wrap gap-2">
                {poster.knowledgeAreas.slice(0, 4).map((area) => (
                  <span key={area} className="rounded-full border border-[#E5E0D8] bg-[#FDFCFB] px-2.5 py-1 text-[10px] font-bold text-[#6B665E]">
                    {area}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={poster.src}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-[#E5E0D8] bg-[#F9F8F6] px-3 py-1.5 text-xs font-bold text-[#4A4741] hover:bg-white"
                >
                  Open poster <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {onNavigate && poster.routeTargets.slice(0, 2).map((target) => (
                  <button
                    key={`${poster.id}-${target.screen}-${target.topic ?? 'root'}`}
                    type="button"
                    onClick={() => onNavigate(target.screen, target.topic)}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#2C2A26] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#4A4741]"
                  >
                    {target.label} <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

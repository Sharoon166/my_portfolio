import { LuArrowUpRight } from "react-icons/lu";

export interface MinorProjectCardProps {
  title: string;
  description: string;
  liveUrl: string;
}

export const MinorProjectCard = ({
  title,
  description,
  liveUrl,
}: MinorProjectCardProps) => (
  <div
    className="group py-3"
    role="listitem"
  >
    <h3>
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-semibold text-white/90 mb-2 group-hover:text-destructive flex items-center before:content-['*'] before:text-2xl before:align-middle before:text-destructive before:mr-1"
        aria-label={`${title} - ${description} (opens in new tab)`}
      >
        <span className="grow">{title}</span>
        <div
          className="relative size-10 rounded-full border border-destructive overflow-hidden" data-mouse-text="Visit"
          aria-hidden="true"
        >
          <div className="absolute inset-0 flex items-center justify-center group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-300">
            <LuArrowUpRight className="text-destructive" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300">
            <LuArrowUpRight className="text-destructive" />
          </div>
        </div>
      </a>
    </h3>
    <p className="text-white/60 text-sm mb-3">{description}</p>
  </div>
);
import { APP_SCREENSHOT_PATHS } from '../data/defaultContent';

export function BrandMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl overflow-hidden bg-[#061124] ring-1 ring-[#0B1F3A]/15 shadow-xs ${className}`}
      aria-hidden="true"
    >
      <img
        src={APP_SCREENSHOT_PATHS.appIcon}
        alt=""
        className="w-full h-full object-cover scale-[1.24]"
      />
    </span>
  );
}

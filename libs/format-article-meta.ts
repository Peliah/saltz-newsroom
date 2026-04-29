const MONTHS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
] as const;

function formatTime12(d: Date): string {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

/** e.g. `PUBLISHED APRIL 25, 2026 · 10:38 PM` */
export function formatPublishedLine(iso?: string | null): string {
  if (!iso?.trim()) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const month = MONTHS[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `PUBLISHED ${month} ${day}, ${year} · ${formatTime12(d)}`;
}

/** e.g. `ABOUT 12 HOURS AGO` from card-relative copy */
export function formatRelativeAboutLine(publishedAgo: string): string {
  const s = publishedAgo.trim();
  if (!s) return '';
  return `ABOUT ${s.toUpperCase()}`;
}

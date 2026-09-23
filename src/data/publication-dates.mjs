export const PUBLICATION_TIME_ZONE = 'Europe/Paris';

export function isPublicationDate(value) {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4}-\d{2}-\d{2})(?:T(\d{2}):(\d{2}):(\d{2})([+-])(\d{2}):(\d{2}))?$/.exec(value);
  if (!match || !Number.isFinite(Date.parse(value))) return false;
  const date = new Date(match[1] + 'T00:00:00Z');
  if (date.toISOString().slice(0, 10) !== match[1]) return false;
  return !match[2] || (+match[2] < 24 && +match[3] < 60 && +match[4] < 60 && +match[6] <= 14 && +match[7] < 60 && (+match[6] < 14 || +match[7] === 0));
}

export function parisTimestamp(now = new Date()) {
  if (!Number.isFinite(now.valueOf())) throw new Error('Instant invalide.');
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: PUBLICATION_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    timeZoneName: 'longOffset',
  }).formatToParts(now).map(p => [p.type, p.value]));
  const offset = parts.timeZoneName.replace('GMT', '') || '+00:00';
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

export function formatDate(value) {
  if (!isPublicationDate(value)) throw new Error('Date éditoriale invalide : ' + value);
  if (value.length === 10) return value.split('-').reverse().join('/');
  const date = new Date(value);
  const day = new Intl.DateTimeFormat('fr-FR', { timeZone: PUBLICATION_TIME_ZONE, day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const time = new Intl.DateTimeFormat('fr-FR', { timeZone: PUBLICATION_TIME_ZONE, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
  return `${day} · ${time.replace(':', ' h ')}`;
}

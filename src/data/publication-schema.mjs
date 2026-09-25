import { z } from 'astro/zod';
import { themes, mechanisms } from './taxonomy.mjs';
import { isPublicationDate, parisTimestamp } from './publication-dates.mjs';

const date = z.string().refine(isPublicationDate, 'Date YYYY-MM-DD ou horodatage ISO avec secondes et décalage UTC explicite requis.');
const common = {
  title: z.string().min(1),
  episodeNumber: z.string().min(1),
  description: z.string().min(1),
  themes: z.array(z.enum(Object.keys(themes))).min(1),
  mechanisms: z.array(z.enum(Object.keys(mechanisms))).min(1),
  mechanismAngle: z.string().trim().min(1).optional(),
  status: z.enum(['draft', 'published']).optional(),
  publishDate: date,
  updatedDate: date.optional(),
};
const validUpdate = data => {
  if (!data.updatedDate) return true;
  if (!isPublicationDate(data.updatedDate) || !isPublicationDate(data.publishDate)) return false;
  if (data.updatedDate.length === 10) {
    const publicationDay = data.publishDate.length === 10 ? data.publishDate : parisTimestamp(new Date(data.publishDate)).slice(0, 10);
    return data.updatedDate >= publicationDay;
  }
  return Date.parse(data.updatedDate) >= Date.parse(data.publishDate);
};
const updateMessage = { message: 'updatedDate ne peut pas précéder publishDate.', path: ['updatedDate'] };
export const noteSchema = z.object({
  ...common,
  // The legacy category remains supported on existing notes.
  category: z.enum(['Cinéma', 'Musique', 'Manga', 'Idées', 'Société', 'Culture']).optional(),
}).refine(validUpdate, updateMessage);
export const dossierSchema = z.object({
  ...common,
  subtitle: z.string(),
  cardDescription: z.string().min(1),
}).refine(validUpdate, updateMessage);

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    episodeNumber: z.string(),
    category: z.enum(['Cinéma', 'Musique', 'Manga', 'Idées', 'Société', 'Culture']),
    mechanism: z.string(),
    publishDate: z.coerce.date(),
    description: z.string(),
  }),
});

const dossiers = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/dossiers' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['Cinéma', 'Musique', 'Manga', 'Idées', 'Société', 'Culture']),
    publishDate: z.coerce.date(),
    description: z.string(),
  }),
});

export const collections = { notes, dossiers };

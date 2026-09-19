import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { markdownDirectoryLoader } from './loaders/markdown-directory';

const notes = defineCollection({
  loader: markdownDirectoryLoader({
    base: './src/content/notes',
  }),
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
  loader: markdownDirectoryLoader({
    base: './src/content/dossiers',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    publishDate: z.coerce.date(),
    description: z.string(),
    cardDescription: z.string(),
  }),
});

const verifications = defineCollection({
  loader: markdownDirectoryLoader({
    base: './src/content/verifications',
  }),
  schema: z.object({ title: z.string() }),
});

export const collections = { notes, dossiers, verifications };

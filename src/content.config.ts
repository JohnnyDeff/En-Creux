import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { markdownDirectoryLoader } from './loaders/markdown-directory';
import { noteSchema, dossierSchema } from './data/publication-schema.mjs';

const notes = defineCollection({
  loader: markdownDirectoryLoader({ base: './src/content/notes', publicationCollection: 'notes' }),
  schema: noteSchema,
});
const dossiers = defineCollection({
  loader: markdownDirectoryLoader({ base: './src/content/dossiers', publicationCollection: 'dossiers' }),
  schema: dossierSchema,
});
const verifications = defineCollection({
  loader: markdownDirectoryLoader({ base: './src/content/verifications' }),
  schema: z.object({ title: z.string() }),
});
export const collections = { notes, dossiers, verifications };

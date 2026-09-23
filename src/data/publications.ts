import { getCollection, type CollectionEntry } from 'astro:content';
export type Publication = CollectionEntry<'notes'> | CollectionEntry<'dossiers'>;
export async function getPublications(): Promise<Publication[]> {
  const [notes, dossiers] = await Promise.all([getCollection('notes'), getCollection('dossiers')]);
  return [...notes, ...dossiers].sort((a, b) => Date.parse(b.data.publishDate) - Date.parse(a.data.publishDate) || b.data.episodeNumber.localeCompare(a.data.episodeNumber));
}
export const publicationUrl = (entry: Publication) => '/' + entry.collection + '/' + entry.id + '/';

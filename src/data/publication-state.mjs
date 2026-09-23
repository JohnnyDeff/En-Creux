// Compatibility is deliberately limited to the three already published articles.
export const historicalPublications = Object.freeze({
  'notes/tapisserie-de-bayeux': '2026-09-10',
  'dossiers/lire-sans-ouvrir': '2026-09-18',
  'notes/street-fighter-ii': '2026-09-23',
});

export function isPublished(collection, id, data) {
  if (data.status !== undefined && !['draft', 'published'].includes(data.status)) {
    throw new Error(`${collection}/${id} : status doit être draft ou published.`);
  }
  if (data.status === 'draft') return false;
  const historicalDate = historicalPublications[`${collection}/${id}`];
  if (historicalDate) {
    if (data.publishDate !== historicalDate) throw new Error(`${collection}/${id} : la date historique doit rester ${historicalDate}.`);
    return true;
  }
  // Missing status is private, even if a date has been copied from another article.
  if (data.status !== 'published') return false;
  if (typeof data.publishDate !== 'string' || data.publishDate.length === 10) {
    throw new Error(`${collection}/${id} : une nouvelle publication exige un horodatage complet.`);
  }
  return true;
}

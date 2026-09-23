import { load, JSON_SCHEMA } from 'js-yaml';

export function readFrontmatter(source) {
  const match = /^(\uFEFF?---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/.exec(source);
  if (!match) throw new Error('En-tête YAML délimité par --- requis.');
  const data = load(match[2], { schema: JSON_SCHEMA });
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Métadonnées YAML invalides.');
  return { data, header: match[2], opening: match[1], closing: match[3], body: source.slice(match[0].length) };
}

export function stampPublication(source, timestamp) {
  const parsed = readFrontmatter(source);
  if (parsed.data.status !== 'draft') throw new Error('La commande exige status: draft.');
  if (Object.hasOwn(parsed.data, 'publishDate')) throw new Error('publishDate existe déjà : aucune date ne sera réécrite.');
  // Restrict mutations to a simple top-level field; preserve all other bytes.
  const statusLine = /^status:[ \t]*(?:draft|'draft'|"draft")[ \t]*(?:#[^\r\n]*)?$/m;
  const normalized = parsed.header.replaceAll('\r\n', '\n');
  if (!statusLine.test(normalized)) throw new Error('Utilisez un champ simple status: draft, sans alias YAML.');
  const eol = parsed.opening.endsWith('\r\n') ? '\r\n' : '\n';
  const header = normalized.replace(statusLine, line => line.replace(/draft/, 'published')) + `\npublishDate: "${timestamp}"`;
  return parsed.opening + header.replaceAll('\n', eol) + parsed.closing + parsed.body;
}

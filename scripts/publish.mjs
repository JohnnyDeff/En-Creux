import { readFile, writeFile, open, rename, unlink, realpath, lstat } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { parseArgs } from 'node:util';
import { readFrontmatter, stampPublication } from '../src/data/frontmatter.mjs';
import { parisTimestamp } from '../src/data/publication-dates.mjs';
import { historicalPublications } from '../src/data/publication-state.mjs';
import { noteSchema, dossierSchema } from '../src/data/publication-schema.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function publish({ type, id, validated = false, check = false, root = projectRoot, now = new Date() }) {
  const collection = { note: 'notes', dossier: 'dossiers' }[type];
  if (!collection) throw new Error('--type doit être note ou dossier.');
  if (typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error('--id doit être un identifiant simple, sans chemin ni extension.');
  if (!check && !validated) throw new Error('Validation éditoriale humaine requise : ajoutez --validated après relecture, ou utilisez --check.');
  if (historicalPublications[`${collection}/${id}`]) throw new Error('Publication historique : sa date ne peut pas être réécrite.');

  const directory = await realpath(resolve(root, 'src/content', collection));
  const target = resolve(directory, id + '.md');
  const resolvedTarget = await realpath(target);
  const subpath = relative(directory, resolvedTarget);
  if (isAbsolute(subpath) || subpath.startsWith('..' + sep) || subpath === '..' || (await lstat(target)).isSymbolicLink()) throw new Error('Le fichier doit appartenir à la collection, sans lien symbolique.');
  const lockPath = target + '.publish-lock';
  const lock = await open(lockPath, 'wx').catch(error => {
    if (error.code === 'EEXIST') throw new Error('Publication déjà en cours (verrou présent).');
    throw error;
  });
  let temporary;
  try {
    const source = await readFile(target, 'utf8');
    const { data } = readFrontmatter(source);
    if (data.slug !== undefined && data.slug !== id) throw new Error('Le slug doit correspondre au nom du fichier et à --id.');
    const timestamp = parisTimestamp(now);
    const next = stampPublication(source, timestamp);
    const schema = type === 'note' ? noteSchema : dossierSchema;
    schema.parse(readFrontmatter(next).data);
    if (check) return { file: target, checked: true };
    temporary = target + '.' + randomUUID() + '.tmp';
    await writeFile(temporary, next, { flag: 'wx' });
    if (await readFile(target, 'utf8') !== source) throw new Error('Le fichier a changé pendant la commande ; publication annulée.');
    await rename(temporary, target);
    temporary = undefined;
    return { file: target, timestamp, checked: false };
  } finally {
    if (temporary) await unlink(temporary);
    await lock.close();
    await unlink(lockPath);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const { values } = parseArgs({ options: {
      type: { type: 'string' }, id: { type: 'string' }, validated: { type: 'boolean' },
      check: { type: 'boolean' }, help: { type: 'boolean' },
    }, allowPositionals: false });
    if (values.help) {
      console.log('npm run publish -- --type note|dossier --id identifiant --check\nnpm run publish -- --type note|dossier --id identifiant --validated\nPrépare uniquement le Markdown local ; aucun commit, push ou déploiement.');
    } else {
      const result = await publish(values);
      console.log(result.checked ? `Métadonnées valides : ${result.file}. Aucun changement.` : `Publication locale préparée : ${result.file}\nDate : ${result.timestamp}\nAucun commit, push ou déploiement effectué.`);
    }
  } catch (error) {
    console.error('Publication refusée : ' + error.message);
    process.exitCode = 1;
  }
}

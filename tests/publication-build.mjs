// End-to-end test: only temporary content and an isolated, never-served output.
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, readdir, rm, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFrontmatter } from '../src/data/frontmatter.mjs';
import { historicalPublications } from '../src/data/publication-state.mjs';
import { formatDate } from '../src/data/publication-dates.mjs';
import { mechanisms } from '../src/data/taxonomy.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = await mkdtemp(join(tmpdir(), 'encreux-build-test-'));
const token = 'test-publication-' + randomUUID();
const created = [];
const baseline = new Map();
for (const path of Object.keys(historicalPublications)) baseline.set(path, await readFile(join(root, 'src/content', path + '.md'), 'utf8'));
function run(args, expected = 0) {
  const result = spawnSync(process.execPath, args, { cwd: root, encoding: 'utf8', timeout: 180000 });
  if (result.error) throw result.error;
  assert.equal(result.status, expected, result.stdout + '\n' + result.stderr);
  return result.stdout;
}
async function build() {
  run(['node_modules/astro/bin/astro.mjs', 'build', '--outDir', out]);
  const files = (await readdir(out, { recursive: true })).filter(p => p.endsWith('.html'));
  return new Map(await Promise.all(files.map(async p => [p.replaceAll('\\', '/'), await readFile(join(out, p), 'utf8')])));
}
try {
  for (const [collection, suffix, status] of [['notes', 'note', 'status: draft\n'], ['dossiers', 'dossier', 'status: draft\n'], ['notes', 'implicit', ''], ['notes', 'alias', 'slug: street-fighter-ii\npublishDate: 2026-09-23\n']]) {
    const id = token + '-' + suffix;
    const file = join(root, 'src/content', collection, id + '.md');
    const extra = collection === 'dossiers' ? 'subtitle: Test\ncardDescription: Test\n' : '';
    const families = suffix === 'note' ? 'signification-involontaire, decontextualisation' : 'signification-involontaire';
    const source = `---\n${status}title: ${id}\nepisodeNumber: "999"\ndescription: ${id}\nthemes: [jeu-video]\nmechanisms: [${families}]\nmechanismAngle: "Angle temporaire de test"\n${extra}---\n\n${id}\n`;
    await writeFile(file, source, { flag: 'wx' });
    created.push(file);
  }
  let pages = await build();
  assert.equal(pages.size, 19);
  assert.ok([...pages.values()].every(html => !html.includes(token)), 'Draft leaked into public HTML');
  const active = ['signification-involontaire', 'histoire-sedimentation', 'trace-indice'];
  for (const id of Object.keys(mechanisms)) {
    assert.equal(pages.has(`mecanismes/${id}/index.html`), active.includes(id));
    assert.equal(pages.get('mecanismes/index.html').includes(`/mecanismes/${id}/`), active.includes(id));
  }
  const redirects = (await readFile(join(out, '_redirects'), 'utf8')).split(/\r?\n/).filter(line => line && !line.startsWith('#'));
  assert.equal(redirects.length, 6);
  const expectedRedirects = { 'appropriation-reecriture': 'histoire-sedimentation', 'revelation-technique': 'trace-indice', 'effets-imprevus': 'signification-involontaire' };
  for (const [oldId, newId] of Object.entries(expectedRedirects)) {
    assert.ok(!pages.has(`mecanismes/${oldId}/index.html`));
    for (const slash of ['', '/']) assert.ok(redirects.includes(`/mecanismes/${oldId}${slash} /mecanismes/${newId}/ 301`));
    assert.ok([...pages.values()].every(html => !html.includes(`/mecanismes/${oldId}/`)));
    assert.ok(pages.has(`mecanismes/${newId}/index.html`));
  }
  assert.ok(!pages.get('index.html').includes('discovery-grid'));
  console.log('OK : brouillons explicites et implicites absents des 19 pages et routes.');
  const stamps = new Map();
  for (const type of ['note', 'dossier']) {
    const id = token + '-' + type;
    const file = created[type === 'note' ? 0 : 1];
    const before = await readFile(file, 'utf8');
    run(['scripts/publish.mjs', '--type', type, '--id', id, '--check']);
    assert.equal(await readFile(file, 'utf8'), before);
    run(['scripts/publish.mjs', '--type', type, '--id', id], 1);
    const earliest = Date.now();
    run(['scripts/publish.mjs', '--type', type, '--id', id, '--validated']);
    const source = await readFile(file, 'utf8');
    const data = readFrontmatter(source).data;
    assert.match(data.publishDate, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/);
    assert.ok(Date.parse(data.publishDate) >= earliest - 1000 && Date.parse(data.publishDate) <= Date.now());
    assert.equal(data.updatedDate, undefined);
    run(['scripts/publish.mjs', '--type', type, '--id', id, '--validated'], 1);
    stamps.set(file, source);
  }
  // An explicit significant correction, independent from publication and builds.
  const noteFile = created[0];
  const noteStamp = readFrontmatter(stamps.get(noteFile)).data.publishDate;
  const corrected = stamps.get(noteFile).replace('status: published', `updatedDate: "${noteStamp}"\nstatus: published`);
  await writeFile(noteFile, corrected);
  stamps.set(noteFile, corrected);
  for (let pass = 0; pass < 2; pass++) {
    pages = await build();
    assert.equal(pages.size, 22);
    assert.ok(pages.get('mecanismes/index.html').includes('/mecanismes/decontextualisation/'));
    assert.ok(pages.get('mecanismes/decontextualisation/index.html').includes(token + '-note'));
    assert.ok(!pages.get('mecanismes/decontextualisation/index.html').includes(token + '-dossier'));
    for (const [file, source] of stamps) {
      assert.equal(await readFile(file, 'utf8'), source, 'Build changed the persisted timestamp');
      const data = readFrontmatter(source).data;
      const type = file.includes(sep + 'notes' + sep) ? 'notes' : 'dossiers';
      const id = token + (type === 'notes' ? '-note' : '-dossier');
      const html = pages.get(`${type}/${id}/index.html`);
      assert.ok(html?.includes(`datetime="${data.publishDate}"`));
      assert.ok(html.includes(formatDate(data.publishDate)));
      if (type === 'notes') assert.ok(html.includes('Mis à jour le'));
      else assert.ok(!html.includes('Deux mille ans après l’éruption'));
      for (const route of ['index.html', type + '/index.html', 'themes/jeu-video/index.html', 'mecanismes/signification-involontaire/index.html']) assert.ok(pages.get(route).includes(id));
    }
    assert.ok([...pages.values()].every(html => !html.includes(token + '-implicit')));
  }
  for (const [path, source] of baseline) {
    assert.equal(await readFile(join(root, 'src/content', path + '.md'), 'utf8'), source);
    assert.equal(readFrontmatter(source).data.publishDate, historicalPublications[path]);
  }
  console.log('OK : Note et Dossier publiés par la CLI, refus de répétition, dates persistées après deux builds, updatedDate visible, historique intact.');
} finally {
  for (const file of created) await unlink(file);
  assert.ok(resolve(out).startsWith(resolve(tmpdir()) + sep));
  assert.ok(out.includes('encreux-build-test-'));
  await rm(out, { recursive: true, force: true });
}

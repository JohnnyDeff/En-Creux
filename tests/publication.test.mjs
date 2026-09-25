import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { publish } from '../scripts/publish.mjs';
import { parisTimestamp, formatDate, isPublicationDate } from '../src/data/publication-dates.mjs';
import { isPublished } from '../src/data/publication-state.mjs';
import { readFrontmatter } from '../src/data/frontmatter.mjs';
import { mechanisms } from '../src/data/taxonomy.mjs';
import { noteSchema, dossierSchema } from '../src/data/publication-schema.mjs';

test('Neuf familles canoniques, angles facultatifs et associations multiples', () => {
  assert.deepEqual(Object.keys(mechanisms), ['intention', 'forme', 'signification-involontaire', 'reception', 'histoire-sedimentation', 'decontextualisation', 'trace-indice', 'convention-attente', 'traduction-passage']);
  const data = { title: 'Essai', episodeNumber: '999', description: 'Essai', themes: ['jeu-video'], mechanisms: ['signification-involontaire', 'forme'], publishDate: '2026-09-24T10:00:00+02:00' };
  for (const schema of [noteSchema, dossierSchema]) {
    const input = { ...data, subtitle: 'Essai', cardDescription: 'Essai' };
    assert.equal(schema.parse(input).mechanismAngle, undefined);
    assert.equal(schema.parse({ ...input, mechanismAngle: 'Angle particulier' }).mechanismAngle, 'Angle particulier');
    assert.throws(() => schema.parse({ ...input, mechanismAngle: ' ' }));
    for (const id of ['appropriation-reecriture', 'revelation-technique', 'effets-imprevus']) assert.throws(() => schema.parse({ ...input, mechanisms: [id] }));
  }
});

test('Paris : hiver, été, minuit et transitions été/hiver', () => {
  const cases = [
    ['2026-01-15T12:00:00Z', '2026-01-15T13:00:00+01:00'],
    ['2026-09-23T16:42:18Z', '2026-09-23T18:42:18+02:00'],
    ['2026-09-23T22:01:00Z', '2026-09-24T00:01:00+02:00'],
    ['2026-03-29T00:59:59Z', '2026-03-29T01:59:59+01:00'],
    ['2026-03-29T01:00:00Z', '2026-03-29T03:00:00+02:00'],
    ['2026-10-25T00:30:00Z', '2026-10-25T02:30:00+02:00'],
    ['2026-10-25T01:30:00Z', '2026-10-25T02:30:00+01:00'],
  ];
  for (const [instant, expected] of cases) {
    assert.equal(parisTimestamp(new Date(instant)), expected);
    assert.equal(Date.parse(expected), Date.parse(instant));
  }
});

test('Affichage sans heure fictive et validation stricte des dates', () => {
  assert.equal(formatDate('2026-09-23'), '23/09/2026');
  assert.equal(formatDate('2026-09-23T18:42:18+02:00'), '23 septembre 2026 · 18 h 42');
  assert.equal(formatDate('2026-09-23T23:42:00-04:00'), '24 septembre 2026 · 05 h 42');
  for (const value of ['2026-02-30', '2026-09-23T18:42:00', '2026-09-23T24:00:00+02:00', '2026-09-23T18:42:00+14:30', new Date()]) assert.equal(isPublicationDate(value), false);
  assert.equal(isPublicationDate('2028-02-29'), true);
});

test('Brouillons privés par défaut, historique limité aux trois articles', () => {
  assert.equal(isPublished('notes', 'nouveau', {}), false);
  assert.equal(isPublished('notes', 'nouveau', { publishDate: '2026-09-23' }), false);
  assert.equal(isPublished('notes', 'nouveau', { status: 'draft', publishDate: '2026-09-23' }), false);
  assert.equal(isPublished('notes', 'street-fighter-ii', { publishDate: '2026-09-23' }), true);
  assert.throws(() => isPublished('notes', 'street-fighter-ii', { publishDate: '2026-09-20' }));
  assert.throws(() => isPublished('notes', 'nouveau', { status: 'publised' }));
  assert.throws(() => isPublished('notes', 'nouveau', { status: 'published', publishDate: '2026-09-23' }));
});

async function fixture(t, type = 'note', changes = '') {
  const root = await mkdtemp(join(tmpdir(), 'encreux-publication-'));
  t.after(async () => {
    assert.ok(resolve(root).startsWith(resolve(tmpdir()) + sep));
    assert.ok(root.includes('encreux-publication-'));
    await rm(root, { recursive: true, force: true });
  });
  const collection = type === 'note' ? 'notes' : 'dossiers';
  const directory = join(root, 'src', 'content', collection);
  await mkdir(directory, { recursive: true });
  const file = join(directory, 'test-publication.md');
  const source = `---\nstatus: draft # validé plus tard\ntitle: "Essai"\nepisodeNumber: "900"\ndescription: "Essai privé"\nthemes: [jeu-video]\nmechanisms: [signification-involontaire]\n${type === 'dossier' ? 'subtitle: "Sous-titre"\ncardDescription: "Description"\n' : ''}${changes}---\n\nTexte **inchangé**.\n`;
  await writeFile(file, source);
  return { root, file, source, directory, args: { type, id: 'test-publication', root, validated: true, now: new Date('2026-09-23T16:42:18Z') } };
}

for (const type of ['note', 'dossier']) {
  test(`${type} : publication persistée, corps intact et répétition refusée`, async t => {
    const f = await fixture(t, type);
    const result = await publish(f.args);
    assert.equal(result.timestamp, '2026-09-23T18:42:18+02:00');
    const after = await readFile(f.file, 'utf8');
    assert.equal(readFrontmatter(after).data.status, 'published');
    assert.equal(readFrontmatter(after).body, readFrontmatter(f.source).body);
    assert.ok(after.includes('# validé plus tard'));
    await assert.rejects(publish(f.args), /status: draft/);
    assert.equal(await readFile(f.file, 'utf8'), after);
    assert.deepEqual(await readdir(f.directory), ['test-publication.md']);
  });
}

test('Validation humaine obligatoire et --check sans modification', async t => {
  const f = await fixture(t);
  await assert.rejects(publish({ ...f.args, validated: false }), /Validation éditoriale/);
  await publish({ ...f.args, validated: false, check: true });
  assert.equal(await readFile(f.file, 'utf8'), f.source);
});

test('Date existante, même dans un brouillon, jamais écrasée', async t => {
  const f = await fixture(t, 'note', 'publishDate: "2026-09-01T10:00:00+02:00"\n');
  await assert.rejects(publish(f.args), /publishDate existe/);
  assert.equal(await readFile(f.file, 'utf8'), f.source);
});

test('Taxonomie invalide et correction antérieure bloquent la publication', async t => {
  const f = await fixture(t);
  await writeFile(f.file, f.source.replace('[jeu-video]', '[inconnu]'));
  await assert.rejects(publish(f.args));
  await writeFile(f.file, f.source.replace('status: draft', 'updatedDate: "2020-01-01"\nstatus: draft'));
  await assert.rejects(publish(f.args), /updatedDate/);
});

test('updatedDate facultative acceptée, aucun ajout automatique', async t => {
  const f = await fixture(t, 'note', 'updatedDate: "2026-09-24T12:00:00+02:00"\n');
  await publish(f.args);
  assert.equal(readFrontmatter(await readFile(f.file, 'utf8')).data.updatedDate, '2026-09-24T12:00:00+02:00');
});

test('CRLF conservés et refus des doublons YAML', async t => {
  const f = await fixture(t);
  await writeFile(f.file, f.source.replaceAll('\n', '\r\n'));
  await publish(f.args);
  assert.equal((await readFile(f.file, 'utf8')).replaceAll('\r\n', '').includes('\n'), false);
  assert.throws(() => readFrontmatter('---\nstatus: draft\nstatus: published\n---\n'), /duplicated/);
});

test('Chemins, historique et verrou existant protégés', async t => {
  const f = await fixture(t);
  await assert.rejects(publish({ ...f.args, id: '../sortie' }), /identifiant/);
  await assert.rejects(publish({ ...f.args, id: 'street-fighter-ii' }), /historique/);
  await writeFile(f.file + '.publish-lock', 'autre processus');
  await assert.rejects(publish(f.args), /en cours/);
  assert.equal(await readFile(f.file, 'utf8'), f.source);
  assert.equal(await readFile(f.file + '.publish-lock', 'utf8'), 'autre processus');
});

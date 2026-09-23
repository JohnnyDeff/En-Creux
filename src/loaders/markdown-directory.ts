import { promises as fs } from 'node:fs';
import { extname, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Loader } from 'astro/loaders';
import { readFrontmatter } from '../data/frontmatter.mjs';
import { isPublished } from '../data/publication-state.mjs';

interface MarkdownDirectoryLoaderOptions {
  base: string;
  publicationCollection?: 'notes' | 'dossiers';
}

async function findMarkdownFiles(directory: string): Promise<string[]> {
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }

    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      if (entry.name.startsWith('_')) {
        return [];
      }

      const path = resolve(directory, entry.name);

      if (entry.isDirectory()) {
        return findMarkdownFiles(path);
      }

      return entry.isFile() && extname(entry.name).toLowerCase() === '.md' ? [path] : [];
    }),
  );

  return files.flat();
}

function slugify(segment: string): string {
  return segment
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function createId(relativePath: string, frontmatter: Record<string, unknown>): string {
  if (typeof frontmatter.slug === 'string' && frontmatter.slug) {
    return frontmatter.slug;
  }

  const segments = relativePath
    .slice(0, -extname(relativePath).length)
    .split(sep)
    .map(slugify);

  if (segments.at(-1) === 'index') {
    segments.pop();
  }

  return segments.join('/');
}

export function markdownDirectoryLoader({ base, publicationCollection }: MarkdownDirectoryLoaderOptions): Loader {
  return {
    name: 'markdown-directory-loader',
    async load({ config, generateDigest, parseData, renderMarkdown, store }) {
      const root = fileURLToPath(config.root);
      const directory = resolve(root, base);
      const files = (await findMarkdownFiles(directory)).sort();

      store.clear();

      for (const filePath of files) {
        const source = await fs.readFile(filePath, 'utf-8');
        // Parse dates as strings and exclude private content before rendering/assets.
        const frontmatter = readFrontmatter(source).data;
        const relativePath = relative(directory, filePath);
        const id = createId(relativePath, frontmatter);
        const sourceId = relativePath.slice(0, -extname(relativePath).length).split(sep).join('/');
        if (publicationCollection && !isPublished(publicationCollection, sourceId, frontmatter)) continue;
        const data = await parseData({ id, data: frontmatter, filePath });
        const rendered = await renderMarkdown(source, { fileURL: pathToFileURL(filePath) });

        store.set({
          id,
          data,
          filePath: relative(root, filePath).split(sep).join('/'),
          digest: generateDigest(source),
          rendered,
          assetImports: rendered.metadata?.imagePaths,
        });
      }
    },
  };
}

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const body = await req.json();
  const { title, excerpt, tags, slug, content, jsonld } = body;

  const indent = (str, spaces = 2) =>
    str
      .split('\n')
      .map(line => ' '.repeat(spaces) + line)
      .join('\n');

  const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${new Date().toISOString()}"
tags:
${tags.map((t) => `  - ${t}`).join('\n')}
jsonld:
${indent(jsonld, 2)}
---\n\n`;

  const fileContent = frontmatter + content;

  const dir = path.join(process.cwd(), 'src/content/blogs');
  const filePath = path.join(dir, `${slug}.md`);

  console.log('⛳ Saving blog to:', filePath);

  try {
    await mkdir(dir, { recursive: true });
    await writeFile(filePath, fileContent, 'utf8');
    return new Response(JSON.stringify({ ok: true, path: filePath }), { status: 200 });
  } catch (err) {
    console.error('❌ Failed to save file:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
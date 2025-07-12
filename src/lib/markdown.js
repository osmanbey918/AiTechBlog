import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/content/blogs');
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => filename.replace(/\.md$/, '')); // ✅ just string
}


export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    meta: {
      ...data,
      slug,
    },
    contentHtml,
  };
}

export async function getAllAiPrompts() {
  const promptsDirectory = path.join(process.cwd(), 'src/content/ai-prompts');
  const fileNames = fs.readdirSync(promptsDirectory);

  const prompts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(promptsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: meta } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: meta.title,
        excerpt: meta.excerpt,
        date: meta.date,
        tags: meta.tags,
        rating: meta.rating,
        uses: meta.uses,
        category: meta.category,
        coverImage: meta.coverImage,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return prompts;
}

export async function getPromptBySlug(slug) {
  const promptsDirectory = path.join(process.cwd(), 'src/content/ai-prompts');
  const fullPath = path.join(promptsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: meta, content } = matter(fileContents);

    // Process the markdown content
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(content);
    
    const contentHtml = processedContent.toString();

    // Extract usage tips section
    const usageTipsMatch = content.match(/## 💡 Usage Tips\s+([\s\S]*?)(?=\s*##|$)/);
    const usageTips = usageTipsMatch ? usageTipsMatch[1]
      .split('\n')
      .filter(line => line.trim().startsWith('- ') || line.trim().startsWith('1.'))
      .map(line => line.replace(/^-\s+|^\d+\.\s+/, '').trim())
      .filter(Boolean) : [];

    // Extract expected results section
    const resultsMatch = content.match(/## 📈 Expected Results\s+([\s\S]*?)(?=\s*##|$)/);
    const expectedResults = {};
    
    if (resultsMatch) {
      const resultsLines = resultsMatch[1].split('\n');
      resultsLines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('- ')) {
          const [key, value] = trimmed.substring(2).split(/:\s*/);
          if (key && value) {
            expectedResults[key] = value.replace(/^\*\*|\*\*$/g, '');
          }
        }
      });
    }

    // Extract the main prompt template
    const promptTemplate = content
      .split('```')
      .filter((_, index) => index % 2 === 1)[0]
      ?.trim() || '';

    return {
      ...meta,
      slug,
      content: promptTemplate,
      contentHtml,
      usageTips: usageTips.length > 0 ? usageTips : null,
      expectedResults: Object.keys(expectedResults).length > 0 ? expectedResults : null
    };
  } catch (err) {
    console.error(`Error reading prompt file ${slug}:`, err);
    return null;
  }
}

'use client';
import yaml from 'js-yaml';
import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import { Markdown } from 'tiptap-markdown';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // You can choose other styles too
import Image from '@tiptap/extension-image';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [slug, setSlug] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlock,
      Link.configure({ openOnClick: false }),
      Markdown.configure({
        html: false,
        transformers: [
          {
            extensions: [Image],
            markdown: {
              match: node => node.type.name === 'image',
              runner: (state, node) => {
                const alt = node.attrs.alt || '';
                const src = node.attrs.src || '';
                state.write(`![${alt}](${src})`);
              },
            },
          },
        ],
      }),
      Image.configure({
        allowBase64: true, // enables base64 or external URLs
      }),
    ],
    onUpdate({ editor }) {
      const md = editor.storage.markdown.getMarkdown();
      setMarkdown(md);
    },
    content: '',
    // 👇 Add this line to avoid SSR hydration mismatch
    editorProps: {
      attributes: {
        class: 'focus:outline-none prose dark:prose-invert', // Optional styling
      },
    },
    // 👇 This is the fix!
    immediatelyRender: false,
  });


  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);
    setMessage('');
    const dateNow = new Date().toISOString(); // ✅ Moved up here

    const jsonld = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "image": "https://yourdomain.com/default-cover.jpg", // Optional: Replace or make dynamic
      "author": {
        "@type": "Person",
        "name": "Muhammad Usman"
      },
      "publisher": {
        "@type": "Organization",
        "name": "YourSiteName",
        "logo": {
          "@type": "ImageObject",
          "url": "https://yourdomain.com/logo.png"
        }
      },
      "datePublished": dateNow,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://yourdomain.com/blog/${slug}`
      },
      "description": excerpt
    };

    // Convert JS object to YAML
    const frontmatter = yaml.dump(jsonld, {
      lineWidth: -1,
      forceQuotes: true,
      quotingType: '"',
    });

  const payload = {
    title,
    excerpt,
    tags: tags.split(',').map((t) => t.trim()),
    slug,
    content: markdown,
    jsonld: frontmatter,
  };

  const res = await fetch('/api/save-md', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  setSaving(false);
  setMessage(res.ok ? '✅ Blog saved as markdown!' : '❌ Error saving blog.');
};
const addImage = () => {
  const url = prompt('Enter image URL');
  if (url) {
    editor?.chain().focus().setImage({ src: url }).run();
  }
};

const addLink = () => {
  const previousUrl = editor?.getAttributes('link').href;
  const url = prompt('Enter URL', previousUrl);

  if (url === null) return;

  if (url === '') {
    editor?.chain().focus().unsetLink().run();
    return;
  }

  editor?.chain().focus().setLink({ href: url }).run();

  // 🔒 Optional: Remove link mark activation so typing doesn't stay in link mode
  editor?.commands.unsetLink();
};


// Convert markdown to HTML with syntax highlighting
const getPreviewHtml = () => {
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlightAuto(code, [lang]).value;
    },
  });
  return marked.parse(markdown || '');
};

return (
  <div className="max-w-6xl mx-auto py-10 px-4">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Write a New Blog</h1>

    <div className="grid md:grid-cols-2 gap-6">
      {/* Left column: inputs and editor */}
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 bg-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Slug (e.g. ai-revolution)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mt-4">
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} label="Bold" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} label="Italic" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} label="H1" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} label="H2" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} label="H3" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} label="Bullet List" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} label="Numbered List" />
          <ToolbarButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()} label="Code Block" />
          <ToolbarButton onClick={addLink} label="Link 🔗" />
          <ToolbarButton onClick={addImage} label="🖼️ Image" />

        </div>

        <div className="border border-gray-300 text-white p-4 rounded bg-black min-h-[300px]  max-w-none shadow-sm">
          <EditorContent editor={editor} />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {saving ? 'Saving...' : '💾 Save as Markdown'}
        </button>

        {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
      </div>

      {/* Right column: preview */}
      <div className="bg-white border border-gray-200 rounded p-4 overflow-y-auto prose max-w-none min-h-[600px]">
        <h2 className="text-xl font-semibold mb-3 text-white">📄 Live Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: getPreviewHtml() }} />
      </div>
    </div>
  </div>
);
}

function ToolbarButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 text-sm bg-black border border-gray-300 rounded hover:bg-gray-200 transition"
    >
      {label}
    </button>
  );
}



























// 'use client';

// import yaml from 'js-yaml';
// import { useState, useEffect } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Link from '@tiptap/extension-link';
// import CodeBlock from '@tiptap/extension-code-block';
// import { Markdown } from 'tiptap-markdown';
// import { marked } from 'marked';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/github.css'; // You can choose other styles too
// import Image from '@tiptap/extension-image';

// export default function WritePage() {
//   const [title, setTitle] = useState('');
//   const [excerpt, setExcerpt] = useState('');
//   const [tags, setTags] = useState('');
//   const [slug, setSlug] = useState('');
//   const [markdown, setMarkdown] = useState('');
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState('');

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({ codeBlock: false }),
//       CodeBlock,
//       Link.configure({ openOnClick: false }),
//       Markdown.configure({
//         html: false,
//         transformers: [
//           {
//             extensions: [Image],
//             markdown: {
//               match: node => node.type.name === 'image',
//               runner: (state, node) => {
//                 const alt = node.attrs.alt || '';
//                 const src = node.attrs.src || '';
//                 state.write(`![${alt}](${src})`);
//               },
//             },
//           },
//         ],
//       }),
//       Image.configure({
//         allowBase64: true, // enables base64 or external URLs
//       }),
//     ],
//     onUpdate({ editor }) {
//       const md = editor.storage.markdown.getMarkdown();
//       setMarkdown(md);
//     },
//     content: '',
//     // 👇 Add this line to avoid SSR hydration mismatch
//     editorProps: {
//       attributes: {
//         class: 'focus:outline-none prose dark:prose-invert', // Optional styling
//       },
//     },
//     // 👇 This is the fix!
//     immediatelyRender: false,
//   });



// const handleSave = async () => {
//   if (!editor) return;
//   setSaving(true);
//   setMessage('');

//   const dateNow = new Date().toISOString();

//   const jsonld = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     "headline": title,
//     "image": "https://yourdomain.com/default-cover.jpg", // Optional: Replace or make dynamic
//     "author": {
//       "@type": "Person",
//       "name": "Muhammad Usman"
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "YourSiteName",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://yourdomain.com/logo.png"
//       }
//     },
//     "datePublished": dateNow,
//     "mainEntityOfPage": {
//       "@type": "WebPage",
//       "@id": `https://yourdomain.com/blog/${slug}`
//     },
//     "description": excerpt
//   };

//   // Build frontmatter safely
//   const frontmatterObject = {
//     title,
//     excerpt,
//     date: dateNow,
//     slug,
//     tags: tags.split(',').map((t) => t.trim()),
//     jsonld,
//   };

//   // Convert JS object to YAML
//   const frontmatter = yaml.dump(frontmatterObject);

//   // Combine frontmatter + markdown body
//   const mdContent = `---\n${frontmatter}---\n\n${markdown}`;

//   // Send it to your API for saving
//   const res = await fetch('/api/save-md', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       filename: `${slug}.md`,
//       content: mdContent,
//     }),
//   });

//   setSaving(false);
//   setMessage(res.ok ? '✅ Blog saved as markdown!' : '❌ Error saving blog.');
// };

//   const addImage = () => {
//     const url = prompt('Enter image URL');
//     if (url) {
//       editor?.chain().focus().setImage({ src: url }).run();
//     }
//   };

//   const addLink = () => {
//     const previousUrl = editor?.getAttributes('link').href;
//     const url = prompt('Enter URL', previousUrl);

//     if (url === null) return;

//     if (url === '') {
//       editor?.chain().focus().unsetLink().run();
//       return;
//     }

//     editor?.chain().focus().setLink({ href: url }).run();

//     // 🔒 Optional: Remove link mark activation so typing doesn't stay in link mode
//     editor?.commands.unsetLink();
//   };


//   // Convert markdown to HTML with syntax highlighting
//   const getPreviewHtml = () => {
//     marked.setOptions({
//       highlight: function (code, lang) {
//         return hljs.highlightAuto(code, [lang]).value;
//       },
//     });
//     return marked.parse(markdown || '');
//   };

//   return (
//     <div className="max-w-6xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">📝 Write a New Blog</h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Left column: inputs and editor */}
//         <div className="space-y-4">
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 bg-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Slug (e.g. ai-revolution)"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//           />
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Excerpt"
//             value={excerpt}
//             onChange={(e) => setExcerpt(e.target.value)}
//           />
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Tags (comma separated)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//           />

//           {/* Toolbar */}
//           <div className="flex flex-wrap gap-2 mt-4">
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} label="Bold" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} label="Italic" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} label="H1" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} label="H2" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} label="H3" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} label="Bullet List" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} label="Numbered List" />
//             <ToolbarButton onClick={() => editor?.chain().focus().toggleCodeBlock().run()} label="Code Block" />
//             <ToolbarButton onClick={addLink} label="Link 🔗" />
//             <ToolbarButton onClick={addImage} label="🖼️ Image" />

//           </div>

//           <div className="border border-gray-300 text-white p-4 rounded bg-black min-h-[300px]  max-w-none shadow-sm">
//             <EditorContent editor={editor} />
//           </div>

//           <button
//             onClick={handleSave}
//             disabled={saving}
//             className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           >
//             {saving ? 'Saving...' : '💾 Save as Markdown'}
//           </button>

//           {message && <p className="text-sm text-green-600 mt-2">{message}</p>}
//         </div>

//         {/* Right column: preview */}
//         <div className="bg-white border border-gray-200 rounded p-4 overflow-y-auto prose max-w-none min-h-[600px]">
//           <h2 className="text-xl font-semibold mb-3 text-white">📄 Live Preview</h2>
//           <div dangerouslySetInnerHTML={{ __html: getPreviewHtml() }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ToolbarButton({ onClick, label }) {
//   return (
//     <button
//       onClick={onClick}
//       className="px-3 py-1 text-sm bg-black border border-gray-300 rounded hover:bg-gray-200 transition"
//     >
//       {label}
//     </button>
//   );
// }

//   const jsonld = {
//     "@context": "https://schema.org",
//     "@type": "Article",
//     "headline": title,
//     "image": "https://yourdomain.com/default-cover.jpg", // Optional: Replace or make dynamic
//     "author": {
//       "@type": "Person",
//       "name": "Muhammad Usman"
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "YourSiteName",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://yourdomain.com/logo.png"
//       }
//     },
//     "datePublished": dateNow,
//     "mainEntityOfPage": {
//       "@type": "WebPage",
//       "@id": `https://yourdomain.com/blog/${slug}`
//     },
//     "description": excerpt
//   };

//   // Build frontmatter safely
//   const frontmatterObject = {
//     title,
//     excerpt,
//     date: dateNow,
//     slug,
//     tags: tags.split(',').map((t) => t.trim()),
//     jsonld,
//   };

//   // Convert JS object to YAML
//   const frontmatter = yaml.dump(frontmatterObject);

'use client';
import { EditorContent } from '@tiptap/react';


import { useState, useCallback } from 'react';
import yaml from 'js-yaml';
import { marked } from 'marked';
import { createPost} from './actions';
import InputFields from '@/components/write/InputFields';
import EditorToolbar from '@/components/write/EditorToolbar';
import { useEditorSetup } from '@/components/write/useEditorSetup';
import LivePreview from '@/components/write/LivePreview';

const CATEGORIES = ['Technology', 'AI', 'Programming', 'Science', 'Other'];
export default function Page() {
  // ... inside your component
  const [formData, setFormData] = useState({
    title: '',
    // 'excerpt' will be used as the 'description' in the meta object
    excerpt: '',
    tags: [],
    slug: '',
    // 'image' will be used as 'imageUrl'
    coverImage: '',
    category: CATEGORIES[0],
    authorName: ''
  });
  const [markdown, setMarkdown] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // To display success/error messages

  const { editor, editorLoaded } = useEditorSetup(setMarkdown);

  const handleSave = async () => {
    // Basic validation
    if (!formData.title || !formData.authorName || !markdown) {
      setMessage({ text: 'Title, Author Name, and Content are required.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const dateNow = new Date().toISOString();

      // Sanitize the slug from either the slug field or the title
      const cleanSlug = (formData.slug || formData.title)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars
        .replace(/\s+/g, '-');      // Replace spaces with -

      // 1. Construct the JSON-LD object (as a plain object)
      const jsonldObject = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": formData.title,
        "image": formData.image || "https://yourdomain.com/default-cover.jpg",
        "author": {
          "@type": "Person",
          "name": formData.authorName
        },
        "publisher": {
          "@type": "Organization",
          "name": "YourAppName", // Replace with your app's name
          "logo": {
            "@type": "ImageObject",
            "url": "https://yourdomain.com/logo.png"
          }
        },
        "datePublished": dateNow,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https:yourdomain.com/blog/${cleanSlug}"
        },
        "description": formData.excerpt,
        "articleSection": formData.category
      };

      // 2. Construct the payload matching the server action's expectation
      const payload = {
        mdxContent: markdown,
        jsonLd: jsonldObject, // Pass it as an object
        meta: {
          title: formData.title,
          description: formData.excerpt,
          slug: cleanSlug,
          author: formData.authorName,
          // Convert the tags array to a comma-separated string
          keywords: formData.tags.join(', '),
          imageUrl: formData.coverImage,
        }
      };

      // 3. Call the server action with the correctly structured payload
      const result = await createPost(payload);

      // 4. Handle the response from the server action
      if (result.success) {
        setMessage({ text: result.message, type: 'success' });
        // Optionally, you can reset the form here
      } else {
        setMessage({ text: result.error || 'An unknown error occurred.', type: 'error' });
      }

    } catch (error) {
      setMessage({ text: error.message || 'Error saving the post.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };


  const handleInputChange = field => e => setFormData(prev => ({ ...prev, [field]: e.target.value }));
  const handleTagsChange = e => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }));

  const addImage = () => {
    const url = prompt('Enter image URL');
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt('Enter URL', editor?.getAttributes('link').href);
    if (url === null) return;
    if (url === '') editor?.chain().focus().unsetLink().run();
    else editor?.chain().focus().setLink({ href: url }).run();
  };

  const getPreviewHtml = md => {
    try {
      return marked.parse(md || '');
    } catch {
      return '<p>Error rendering preview</p>';
    }
  };
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">📝 Write a New Blog</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputFields formData={formData} handleInputChange={handleInputChange} handleTagsChange={handleTagsChange} categories={CATEGORIES} />
          <EditorToolbar editor={editor} addImage={addImage} addLink={addLink} />
          {editorLoaded && (
            <div className="border border-gray-300 dark:border-gray-700 p-4 rounded bg-white dark:bg-gray-900 min-h-[300px] max-w-none shadow-sm">
              {editorLoaded && (
                <div className="border ...">
                  <EditorContent editor={editor} />
                </div>
              )}

            </div>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !formData.title || !formData.authorName}
            className={`mt-4 px-6 py-2 rounded flex items-center justify-center ${saving || !formData.title || !formData.authorName ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
          >
            {saving ? 'Saving...' : '💾 Save Blog'}
          </button>
          {message && (
            <p className={`text-sm mt-2 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {message.type === 'success' ? '✅ ' : '❌ '}{message.text}
            </p>
          )}
        </div>
        <LivePreview markdown={markdown} getPreviewHtml={getPreviewHtml} />
      </div>
    </div>
  );
}

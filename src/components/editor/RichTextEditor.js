'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import React from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex gap-2 p-4 border-b border-neutral-800 bg-zinc-900 rounded-t-lg">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded ${
          editor.isActive('bold') ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-white'
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded ${
          editor.isActive('italic') ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-white'
        }`}
      >
        Italic
      </button>
      <button
        onClick={addLink}
        className={`px-3 py-1 rounded ${
          editor.isActive('link') ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-white'
        }`}
      >
        Link
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`px-3 py-1 rounded ${
          editor.isActive('highlight') ? 'bg-yellow-500 text-black' : 'bg-neutral-800 text-white'
        }`}
      >
        Highlight
      </button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-yellow-500 underline hover:text-yellow-600 transition-colors',
        },
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: 'bg-yellow-200 text-black rounded px-1',
        },
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none',
      },
    },
  });

  return (
    <div className="border border-neutral-800 rounded-lg bg-zinc-900/50 overflow-hidden">
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor;

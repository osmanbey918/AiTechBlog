'use client';
import { useEffect, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import { Markdown } from 'tiptap-markdown';
import Image from '@tiptap/extension-image';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import Underline from '@tiptap/extension-underline';

export function useEditorSetup(setMarkdown) {
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        marked.setOptions({
            highlight: (code, lang) => {
                try {
                    return hljs.highlightAuto(code, [lang]).value;
                } catch (error) {
                    console.error('Highlight error:', error);
                    return code;
                }
            }
        });
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ codeBlock: false }),
            CodeBlock,
            Link.configure({ openOnClick: false }),
            Underline, // ✅ Added Underline extension properly
            Markdown.configure({
                html: false,
                transformers: [{
                    extensions: [Image],
                    markdown: {
                        match: node => node.type.name === 'image',
                        runner: (state, node) => {
                            const alt = node.attrs.alt || '';
                            const src = node.attrs.src || '';
                            state.write(`![${alt}](${src})`);
                        }
                    }
                }]
            }),
            Image.configure({ allowBase64: true }),
        ],
        onUpdate: ({ editor }) => {
            setMarkdown(editor.storage.markdown.getMarkdown());
        },
        editorProps: {
            attributes: { class: 'focus:outline-none prose dark:prose-invert' },
            immediatelyRender: false,
        }
    });

    return { editor, editorLoaded };
}

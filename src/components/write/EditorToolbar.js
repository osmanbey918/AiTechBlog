'use client';
export default function EditorToolbar({ editor, addImage, addLink }) {
  const buttons = [
    { label: 'Bold', action: () => editor?.chain().focus().toggleBold().run() },
    { label: 'Underline', action: () => editor?.chain().focus().toggleUnderline().run() },
    { label: 'Italic', action: () => editor?.chain().focus().toggleItalic().run() },
    { label: 'H1', action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'H2', action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'H3', action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: 'Bullet List', action: () => editor?.chain().focus().toggleBulletList().run() },
    { label: 'Numbered List', action: () => editor?.chain().focus().toggleOrderedList().run() },
    { label: 'Code Block', action: () => editor?.chain().focus().toggleCodeBlock().run() },
    { label: '🔗 Link', action: addLink },
    { label: '🖼️ Image', action: addImage }
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {buttons.map(btn => (
        <button key={btn.label} onClick={btn.action} className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-yellow-500 transition-colors">
          {btn.label}
        </button>
      ))}
    </div>
  );
}

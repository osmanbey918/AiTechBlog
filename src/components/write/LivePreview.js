'use client';
export default function LivePreview({ markdown, getPreviewHtml }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-4 overflow-y-auto prose prose-yellow max-w-none min-h-[600px] sticky top-10">
      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">📄 Live Preview</h2>
      <div dangerouslySetInnerHTML={{ __html: getPreviewHtml(markdown) }} />
    </div>
  );
}

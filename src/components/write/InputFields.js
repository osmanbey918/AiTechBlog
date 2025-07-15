'use client';

export default function InputFields({ formData, handleInputChange, handleTagsChange, categories }) {
  return (
    <div className="space-y-4">
      <input
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange('title')}
        className="inputStyle"
      />
      <div className="grid grid-cols-2 gap-4">
        <select
          value={formData.category}
          onChange={handleInputChange('category')}
          className="inputStyle"
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          placeholder="Author Name"
          value={formData.authorName}
          onChange={handleInputChange('authorName')}
          className="inputStyle"
        />
      </div>
      <input
        placeholder="Slug"
        value={formData.slug}
        onChange={handleInputChange('slug')}
        className="inputStyle"
      />
      <input
        placeholder="Cover Image URL"
        value={formData.coverImage}
        onChange={handleInputChange('coverImage')}
        className="inputStyle"
      />
      <textarea
        placeholder="Excerpt"
        value={formData.excerpt}
        onChange={handleInputChange('excerpt')}
        rows={3}
        className="inputStyle"
      />
      <input
        placeholder="Tags (comma separated)"
        value={formData.tags.join(', ')}
        onChange={handleTagsChange}
        className="inputStyle"
      />
    </div>
  );
}

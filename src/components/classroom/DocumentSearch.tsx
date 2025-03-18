import React, { useState } from 'react';
import { FaSearch, FaTag, FaTimes } from 'react-icons/fa';

interface DocumentSearchProps {
  onSearch: (query: string, tags: string[]) => void;
  availableTags: string[];
}

const DocumentSearch = ({ onSearch, availableTags }: DocumentSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(searchQuery, selectedTags);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <FaSearch />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {availableTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full flex items-center gap-2 ${
              selectedTags.includes(tag)
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <FaTag className="text-sm" />
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DocumentSearch;
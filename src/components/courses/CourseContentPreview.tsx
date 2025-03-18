import React, { useState } from 'react';
import { FaPlay, FaLock, FaFile, FaQuestionCircle } from 'react-icons/fa';

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  duration?: number;
  isPreviewable: boolean;
}

interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

interface CourseContentPreviewProps {
  sections: Section[];
  onPreviewContent: (contentId: string) => void;
}

const CourseContentPreview = ({ sections, onPreviewContent }: CourseContentPreviewProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0]?.id]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <FaPlay className="text-blue-500" />;
      case 'document': return <FaFile className="text-green-500" />;
      case 'quiz': return <FaQuestionCircle className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {sections.map(section => (
        <div key={section.id} className="border rounded-lg">
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full p-4 text-left font-medium flex justify-between items-center"
          >
            <span>{section.title}</span>
            <span className="text-sm text-gray-500">
              {section.content.length} lessons
            </span>
          </button>

          {expandedSections.includes(section.id) && (
            <div className="border-t divide-y">
              {section.content.map(item => (
                <div
                  key={item.id}
                  className="p-4 flex items-center justify-between hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    {getContentIcon(item.type)}
                    <span className="ml-3">{item.title}</span>
                  </div>
                  <div className="flex items-center">
                    {item.duration && (
                      <span className="text-sm text-gray-500 mr-4">
                        {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                    {item.isPreviewable ? (
                      <button
                        onClick={() => onPreviewContent(item.id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Preview
                      </button>
                    ) : (
                      <FaLock className="text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContentPreview;
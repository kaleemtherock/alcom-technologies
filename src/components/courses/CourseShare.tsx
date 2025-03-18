import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaLink, FaCheck } from 'react-icons/fa';

interface CourseShareProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}

const CourseShare = ({ course }: CourseShareProps) => {
  const [copied, setCopied] = useState(false);
  const courseUrl = `${window.location.origin}/courses/${course.id}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(courseUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(courseUrl)}&text=${encodeURIComponent(`Check out this course: ${course.title}`)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Share This Course</h3>
      
      <div className="flex space-x-4 mb-6">
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          <FaFacebook className="text-xl" />
        </a>
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500"
        >
          <FaTwitter className="text-xl" />
        </a>
        <a
          href={shareUrls.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white rounded-full hover:bg-blue-900"
        >
          <FaLinkedin className="text-xl" />
        </a>
      </div>

      <div className="relative">
        <input
          type="text"
          value={courseUrl}
          readOnly
          className="w-full p-3 pr-24 border rounded bg-gray-50"
        />
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
        >
          {copied ? (
            <>
              <FaCheck className="mr-1" /> Copied
            </>
          ) : (
            <>
              <FaLink className="mr-1" /> Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseShare;
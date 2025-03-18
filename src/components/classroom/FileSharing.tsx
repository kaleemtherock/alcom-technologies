import React, { useState, useRef } from 'react';
import { FaFile, FaDownload, FaTimes, FaUpload } from 'react-icons/fa';

interface SharedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedBy: string;
  timestamp: Date;
}

interface FileSharingProps {
  onClose: () => void;
  onFileShare: (file: File) => void;
}

const FileSharing = ({ onClose, onFileShare }: FileSharingProps) => {
  const [files, setFiles] = useState<SharedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFiles = (fileList: File[]) => {
    fileList.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const newFile: SharedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
          uploadedBy: 'Current User',
          timestamp: new Date()
        };
        setFiles(prev => [...prev, newFile]);
        onFileShare(file);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px]">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Shared Files</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>

        <div
          className={`p-6 border-2 border-dashed rounded-lg m-4 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <FaUpload className="mx-auto text-gray-400 text-3xl mb-4" />
            <p className="text-gray-600">
              Drag and drop files here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700"
              >
                browse
              </button>
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(Array.from(e.target.files || []))}
            />
          </div>
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 border rounded-lg mb-2"
            >
              <div className="flex items-center">
                <FaFile className="text-gray-400 mr-3" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB • {file.uploadedBy}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                download={file.name}
                className="text-blue-600 hover:text-blue-700"
              >
                <FaDownload />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileSharing;
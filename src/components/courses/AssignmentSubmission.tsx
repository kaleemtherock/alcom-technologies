import React, { useState } from 'react';
import { FaUpload, FaFile, FaCheck, FaClock } from 'react-icons/fa';

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  maxPoints: number;
}

interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  files: { name: string; url: string }[];
  submittedAt: Date;
  status: 'submitted' | 'late' | 'graded';
  grade?: number;
  feedback?: string;
}

interface AssignmentSubmissionProps {
  assignment: Assignment;
  submission?: Submission;
  onSubmit: (files: File[]) => Promise<void>;
}

const AssignmentSubmission = ({ assignment, submission, onSubmit }: AssignmentSubmissionProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    setUploading(true);
    try {
      await onSubmit(files);
      setFiles([]);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{assignment.title}</h2>
        <p className="text-gray-600 mt-2">{assignment.description}</p>
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <FaClock className="mr-2" />
          <span>Due: {new Date(assignment.dueDate).toLocaleString()}</span>
        </div>
      </div>

      {submission ? (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaCheck className="text-green-500 mr-2" />
              <span className="font-medium">Submitted</span>
            </div>
            <span className="text-sm text-gray-500">
              {new Date(submission.submittedAt).toLocaleString()}
            </span>
          </div>
          <div className="space-y-2">
            {submission.files.map(file => (
              <a
                key={file.name}
                href={file.url}
                className="flex items-center p-2 hover:bg-gray-50 rounded"
              >
                <FaFile className="mr-2 text-blue-500" />
                {file.name}
              </a>
            ))}
          </div>
          {submission.grade !== undefined && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="font-medium">Grade: {submission.grade}/{assignment.maxPoints}</p>
              {submission.feedback && (
                <p className="mt-2 text-gray-600">{submission.feedback}</p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <FaUpload className="text-3xl text-gray-400 mb-2" />
            <p className="text-gray-600">Drop files here or click to upload</p>
          </label>
          {files.length > 0 && (
            <div className="mt-4">
              <div className="text-left space-y-2">
                {files.map(file => (
                  <div key={file.name} className="flex items-center">
                    <FaFile className="mr-2 text-blue-500" />
                    {file.name}
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
              >
                {uploading ? 'Submitting...' : 'Submit Assignment'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmission;
import React, { useState } from 'react';
import { FaSearch, FaSort, FaDownload } from 'react-icons/fa';

interface GradeEntry {
  studentId: string;
  studentName: string;
  assignments: {
    id: string;
    title: string;
    grade: number;
    maxPoints: number;
    submittedAt: Date;
  }[];
  totalGrade: number;
  averageGrade: number;
}

interface GradeManagementProps {
  courseId: string;
  grades: GradeEntry[];
  onUpdateGrade: (studentId: string, assignmentId: string, grade: number) => Promise<void>;
  onExportGrades: () => void;
}

const GradeManagement = ({ courseId, grades, onUpdateGrade, onExportGrades }: GradeManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'totalGrade' | 'averageGrade'>('name');
  const [sortAsc, setSortAsc] = useState(true);

  const sortedGrades = [...grades].sort((a, b) => {
    if (sortField === 'name') {
      return sortAsc ? 
        a.studentName.localeCompare(b.studentName) :
        b.studentName.localeCompare(a.studentName);
    }
    return sortAsc ?
      a[sortField] - b[sortField] :
      b[sortField] - a[sortField];
  });

  const filteredGrades = sortedGrades.filter(grade =>
    grade.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              onChange={(e) => setSortField(e.target.value as 'name' | 'totalGrade' | 'averageGrade')}
              className="p-2 border rounded-lg"
            >
              <option value="name">Name</option>
              <option value="totalGrade">Total Grade</option>
              <option value="averageGrade">Average Grade</option>
            </select>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-2 border rounded-lg"
            >
              <FaSort />
            </button>
          </div>
          <button
            onClick={onExportGrades}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center"
          >
            <FaDownload className="mr-2" /> Export Grades
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Student</th>
              {grades[0]?.assignments.map(assignment => (
                <th key={assignment.id} className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                  {assignment.title}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Total</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Average</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGrades.map(grade => (
              <tr key={grade.studentId}>
                <td className="px-6 py-4 whitespace-nowrap">{grade.studentName}</td>
                {grade.assignments.map(assignment => (
                  <td key={assignment.id} className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      value={assignment.grade}
                      onChange={(e) => onUpdateGrade(grade.studentId, assignment.id, Number(e.target.value))}
                      className="w-20 p-1 border rounded"
                      min="0"
                      max={assignment.maxPoints}
                    />
                    /{assignment.maxPoints}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap font-medium">{grade.totalGrade}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {grade.averageGrade.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeManagement;
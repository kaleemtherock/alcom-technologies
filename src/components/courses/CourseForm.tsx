import React, { useState } from 'react';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';
import { Course } from '../../services/CourseService';

interface CourseFormProps {
  onSubmit: (courseData: Omit<Course, 'id'>) => Promise<void>;
  initialData?: Partial<Course>;
}

const CourseForm = ({ onSubmit, initialData }: CourseFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || new Date(),
    capacity: initialData?.capacity || 30,
    syllabus: initialData?.syllabus || { weeks: [] },
    status: initialData?.status || 'draft' as Course['status'],
    thumbnail: initialData?.thumbnail || ''
  });

  const [weeks, setWeeks] = useState(formData.syllabus.weeks);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
        ...formData, syllabus: { weeks },
        instructor: '',
        enrolled: 0
    });
  };

  const addWeek = () => {
    setWeeks([...weeks, { title: '', topics: [], assignments: [] }]);
  };

  const removeWeek = (index: number) => {
    setWeeks(weeks.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Course Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            value={formData.startDate.toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, startDate: new Date(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            value={formData.endDate.toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, endDate: new Date(e.target.value) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Capacity</label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Thumbnail</label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 rounded flex items-center space-x-2"
          >
            <FaUpload /> <span>Upload Image</span>
          </button>
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Course thumbnail"
              className="h-20 w-20 object-cover rounded"
            />
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Syllabus</h3>
          <button
            type="button"
            onClick={addWeek}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center space-x-2"
          >
            <FaPlus /> <span>Add Week</span>
          </button>
        </div>
        
        {weeks.map((week, index) => (
          <div key={index} className="border p-4 rounded mb-4">
            <div className="flex justify-between items-start mb-4">
              <input
                type="text"
                placeholder="Week Title"
                value={week.title}
                onChange={(e) => {
                  const newWeeks = [...weeks];
                  newWeeks[index].title = e.target.value;
                  setWeeks(newWeeks);
                }}
                className="w-full p-2 border rounded mr-4"
              />
              <button
                type="button"
                onClick={() => removeWeek(index)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
            {/* Week content editor will be added here */}
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          Save Course
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
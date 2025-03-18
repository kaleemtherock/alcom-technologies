import React, { useState } from 'react';
import { FaFilter, FaCalendar, FaUser, FaTags } from 'react-icons/fa';

interface FilterOptions {
  users: string[];
  tags: string[];
  dateRange: [Date | null, Date | null];
  types: string[];
}

interface DataFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableUsers: string[];
  availableTags: string[];
}

const DataFilter = ({ onFilterChange, availableUsers, availableTags }: DataFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    users: [],
    tags: [],
    dateRange: [null, null],
    types: []
  });

  const updateFilters = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Users</label>
          <select
            multiple
            className="w-full p-2 border rounded"
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              updateFilters('users', selected);
            }}
          >
            {availableUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <select
            multiple
            className="w-full p-2 border rounded"
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              updateFilters('tags', selected);
            }}
          >
            {availableTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 p-2 border rounded"
              onChange={(e) => {
                const [start, end] = filters.dateRange;
                updateFilters('dateRange', [new Date(e.target.value), end]);
              }}
            />
            <input
              type="date"
              className="flex-1 p-2 border rounded"
              onChange={(e) => {
                const [start] = filters.dateRange;
                updateFilters('dateRange', [start, new Date(e.target.value)]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFilter;

'use client';

import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { mockMentors } from '@/lib/mock-mentors';

interface FilterBarProps {
  setSearchTerm: (term: string) => void;
  setSkills: (skills: string[]) => void;
  setAvailableNow: (available: boolean) => void;
  setSortBy: (sort: string) => void;
}

const allSkills = Array.from(new Set(mockMentors.flatMap(m => m.expertise)));

const FilterBar: React.FC<FilterBarProps> = ({ setSearchTerm, setSkills, setAvailableNow, setSortBy }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or keyword"
            className="w-full p-2 pl-10 border rounded-lg bg-gray-50"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select 
            className="w-full p-2 border rounded-lg bg-white"
            onChange={(e) => setSkills(e.target.value ? [e.target.value] : [])}
          >
            <option value="">Filter by Skill</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="availableNow" 
            className="mr-2 h-4 w-4"
            onChange={(e) => setAvailableNow(e.target.checked)} 
          />
          <label htmlFor="availableNow">Available Now</label>
        </div>
        <div>
          <select 
            className="w-full p-2 border rounded-lg bg-white border"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Recommended</option>
            <option>Highest Rated</option>
            <option>Most Sessions Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

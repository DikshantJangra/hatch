
'use client';

import React, { useState, useMemo } from 'react';
import MentorCard from '@/components/find-mentor/MentorCard';
import FilterBar from '@/components/find-mentor/FilterBar';
import { mockMentors } from '@/lib/mock-mentors';
import { Mentor } from '@/types/mentor';

const ITEMS_PER_PAGE = 6;

const FindMentorPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [availableNow, setAvailableNow] = useState(false);
  const [sortBy, setSortBy] = useState('Recommended');
  const [currentPage, setCurrentPage] = useState(1);

  const clearFilters = () => {
    setSearchTerm('');
    setSkills([]);
    setAvailableNow(false);
    setSortBy('Recommended');
    setCurrentPage(1);
  };

  const filteredMentors = useMemo(() => {
    let mentors = mockMentors;

    if (availableNow) {
      mentors = mentors.filter((mentor) => mentor.status === 'Available');
    }

    if (searchTerm) {
      mentors = mentors.filter(
        (mentor) =>
          mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.expertise.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (skills.length > 0) {
      mentors = mentors.filter((mentor) =>
        skills.every((skill) => mentor.expertise.includes(skill))
      );
    }

    switch (sortBy) {
      case 'Highest Rated':
        mentors.sort((a, b) => b.rating - a.rating);
        break;
      case 'Most Sessions Completed':
        mentors.sort((a, b) => b.sessionsCompleted - a.sessionsCompleted);
        break;
      default:
        // Recommended logic would go here
        break;
    }

    return mentors;
  }, [searchTerm, skills, availableNow, sortBy]);

  const paginatedMentors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMentors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMentors, currentPage]);

  const totalPages = Math.ceil(filteredMentors.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Find Your Mentor</h1>
        <p className="mt-2 text-lg text-gray-600">
          Connect with experienced developers ready to help you on your open-source journey.
        </p>
      </div>

      <FilterBar 
        setSearchTerm={setSearchTerm}
        setSkills={setSkills}
        setAvailableNow={setAvailableNow}
        setSortBy={setSortBy}
      />

      {paginatedMentors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl">No mentors found. Try adjusting your filters!</p>
          <button 
            onClick={clearFilters} 
            className="mt-4 px-4 py-2 border rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Clear Filters
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-white text-gray-700 border' : 'bg-white text-gray-700 border'}`}>
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default FindMentorPage;

// src/app/mentor/profile/page.tsx
'use client';

import React from 'react';
// import { useParams } from 'next/navigation'; // Not needed for static profile page
import { mockMentors } from '@/lib/mock-mentors';

const MentorProfilePage = () => {
  // For a static mentor's own profile page, we'd typically fetch the logged-in mentor's data.
  // For now, we'll display a generic or the first mock mentor's profile to copy the design.
  const mentor = mockMentors[0]; // Display the first mock mentor

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{mentor.name}</h1>
      <p>{mentor.title}</p>
      {/* More profile details would go here, copied from the old design */}
      {/* For now, this is just a placeholder to show the structure */}
      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="mt-4 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="list-disc list-inside">
          {mentor.expertise.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MentorProfilePage;

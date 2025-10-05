
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { mockMentors } from '@/lib/mock-mentors';

const MentorProfilePage = () => {
  const params = useParams();
  const id = params.id as string;

  const mentor = mockMentors.find(m => m.id === id);

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{mentor.name}</h1>
      <p>{mentor.title}</p>
      {/* More profile details would go here */}
    </div>
  );
};

export default MentorProfilePage;

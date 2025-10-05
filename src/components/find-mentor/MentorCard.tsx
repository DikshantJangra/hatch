
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mentor } from '@/types/mentor';
import { FiStar } from 'react-icons/fi';

interface MentorCardProps {
  mentor: Mentor;
}

const statusClasses = {
  Available: 'bg-green-500',
  Busy: 'bg-amber-500',
  Offline: 'bg-gray-400',
};

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col">
      <div className="relative w-24 h-24 mx-auto">
        <Image
          src={mentor.avatarUrl}
          alt={`${mentor.name}'s avatar`}
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
        <span
          className={`absolute bottom-1 right-1 block h-4 w-4 rounded-full border-2 border-white ${statusClasses[mentor.status]}`}
          aria-label={mentor.status}
        />
      </div>
      <div className="text-center mt-4">
        <h3 className="text-xl font-bold">{mentor.name}</h3>
        <p className="text-sm text-gray-500">{mentor.title}</p>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {mentor.expertise.slice(0, 4).map((skill) => (
          <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <FiStar className="text-amber-400" />
          <span>{mentor.rating.toFixed(1)}</span>
        </div>
        <span>{mentor.sessionsCompleted} sessions</span>
      </div>
      <Link href={`/contributor/mentor-profile/${mentor.id}`} passHref className="mt-auto">
        <button className="w-full mt-4 bg-[#007BFF] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default MentorCard;

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaUsers, FaStar, FaClock, FaTimes } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Mock data for scheduled sessions
const scheduledSessions = {
  '2025-10-14': ['10:00 AM', '2:00 PM'],
  '2025-10-16': ['4:00 PM'],
  '2025-10-21': ['11:00 AM', '3:00 PM', '5:00 PM'],
  '2025-10-22': ['10:00 AM'],
};

const mockMentor = {
  profilePicture: '/hatch.png',
  name: 'Alex Doe',
  title: 'Senior Software Engineer at Google | 10 yrs',
  social: {
    github: 'https://github.com/alexdoe',
    linkedin: 'https://linkedin.com/in/alexdoe',
    website: 'https://alexdoe.com',
  },
  longBio: `As a seasoned software engineer with a decade of experience at top tech companies, I'm passionate about building scalable systems and mentoring the next generation of developers. My expertise lies in distributed systems, cloud computing, and performance optimization. I believe in a hands-on, collaborative approach to mentorship and enjoy guiding contributors through complex technical challenges. Whether it's architecting a new feature, debugging a tricky issue, or navigating career growth, I'm here to help.`,
  technicalSkills: ['React', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'GCP'],
  mentorshipFocusAreas: [
    'Code reviews and feedback',
    'System design and architecture',
    'Navigating large open-source codebases',
    'Career planning and growth',
    'Preparing for technical interviews',
  ],
  impactStats: {
    totalMentorships: 124,
    avgRating: 4.9,
    responseTime: 'Within 4 hours',
  },
  availability: {
    status: 'Available Now',
    nextSlot: 'Tuesday, Oct 8th @ 2:00 PM IST (1-on-1)',
  },
  latestReview: {
    snippet: `"Alex is an incredible mentor. His guidance on our system architecture was invaluable and helped us avoid major pitfalls. Highly recommended!"`,
    author: '- A grateful mentee',
  },
};

// Calendar Modal Component
const ScheduleModal = ({ isOpen, onClose, sessions }) => {
  if (!isOpen) return null;

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6 max-w-2xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Schedule</h2>
        <div className="calendar-container">
          <Calendar
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const dateString = formatDate(date);
                if (sessions[dateString]) {
                  return (
                    <div className="flex justify-center items-center h-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" title={`${sessions[dateString].length} sessions`}></div>
                    </div>
                  );
                }
              }
              return null;
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">Dates marked with a dot have available mentorship slots.</p>
      </div>
    </div>
  );
};

const MentorPublicProfile = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handleMentorshipRequest = async () => {
    setIsRequesting(true);
    try {
      const response = await fetch('/api/create-meeting', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }
      const data = await response.json();
      if (data.meetingUrl) {
        window.open(data.meetingUrl, '_blank');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <>
      <div className="bg-[#F4F7F9] min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header & Bio */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Image
                  src={mockMentor.profilePicture}
                  alt={mockMentor.name}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-[#007BFF]"
                />
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-800">{mockMentor.name}</h1>
                  <p className="text-gray-500 mt-1">{mockMentor.title}</p>
                  <div className="flex justify-center sm:justify-start space-x-4 mt-3">
                    <Link href={mockMentor.social.github} passHref>
                      <FaGithub className="text-gray-400 hover:text-gray-600" />
                    </Link>
                    <Link href={mockMentor.social.linkedin} passHref>
                      <FaLinkedin className="text-gray-400 hover:text-gray-600" />
                    </Link>
                    <Link href={mockMentor.social.website} passHref>
                      <FaGlobe className="text-gray-400 hover:text-gray-600" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-700 mb-2">About Me</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {mockMentor.longBio}
                </p>
              </div>
            </div>

            {/* Expertise & Experience */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Areas of Expertise</h2>
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {mockMentor.technicalSkills.map((skill) => (
                    <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">I Can Help With:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {mockMentor.mentorshipFocusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>

            {/* Impact Stats */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Impact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <FaUsers className="mx-auto text-[#007BFF] mb-2" size={28} />
                  <p className="text-2xl font-bold text-gray-800">{mockMentor.impactStats.totalMentorships}</p>
                  <p className="text-sm text-gray-500">Total Mentorships</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <FaStar className="mx-auto text-[#007BFF] mb-2" size={28} />
                  <p className="text-2xl font-bold text-[#007BFF]">{mockMentor.impactStats.avgRating}/5</p>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <FaClock className="mx-auto text-[#007BFF] mb-2" size={28} />
                  <p className="text-lg font-semibold text-gray-800">{mockMentor.impactStats.responseTime}</p>
                  <p className="text-sm text-gray-500">Response Time</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sticky) */}
          <div className="lg:sticky top-8 h-fit">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="ml-3 font-semibold text-lg text-gray-800">{mockMentor.availability.status}</p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-500">Next Available Slot</p>
                <p className="font-semibold text-gray-700">{mockMentor.availability.nextSlot}</p>
              </div>
              <button 
                onClick={handleMentorshipRequest}
                disabled={isRequesting}
                className="w-full bg-[#007BFF] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isRequesting ? 'Scheduling...' : 'Send Mentorship Request'}
              </button>
              <button 
                onClick={() => setCalendarOpen(true)}
                className="w-full mt-3 bg-transparent text-[#007BFF] font-semibold py-2 px-4 rounded-lg border border-[#007BFF] hover:bg-blue-50">
                View Full Schedule
              </button>
              <div className="mt-8 border-t pt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Latest Review Snapshot</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 italic">{mockMentor.latestReview.snippet}</p>
                  <p className="text-right text-sm text-gray-500 mt-2">{mockMentor.latestReview.author}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScheduleModal isOpen={isCalendarOpen} onClose={() => setCalendarOpen(false)} sessions={scheduledSessions} />
    </>
  );
};

export default MentorPublicProfile;
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaUsers, FaStar, FaClock, FaChevronRight } from 'react-icons/fa';

const mockMentor = {
  name: 'Dr. Evelyn Reed',
  title: 'Lead AI Researcher @ OpenAI',
  avatar: '/hatch.png',
  stats: {
    mentorships: 212,
    rating: '4.9/5',
    response: 'Avg. 2 hours',
  },
};

const communityFeed = [
  {
    type: 'Resource',
    title: 'Deep Dive into Large Language Models',
    summary: 'I\'ve published a comprehensive guide on the architecture and training processes of modern LLMs. It covers everything from the Transformer architecture to fine-tuning techniques. Hope you find it useful!',
    date: 'October 3, 2025',
    tags: ['#LLM', '#AI', '#DeepLearning'],
    link: '#',
  },
  {
    type: 'Update',
    title: 'New Office Hours Schedule',
    summary: 'Starting next week, my office hours will be shifting to Wednesdays from 4 PM to 6 PM EST. Please update your calendars accordingly. Looking forward to our sessions!',
    date: 'October 1, 2025',
    tags: ['#Schedule', '#OfficeHours'],
    link: '#',
  },
  {
    type: 'Q&A',
    title: 'Q&A: How to get started with Reinforcement Learning?',
    summary: 'A common question I get is about breaking into RL. I\'ve compiled a list of my favorite resources, from foundational papers to hands-on projects, to help you start your journey.',
    date: 'September 28, 2025',
    tags: ['#RL', '#Beginners', '#Q&A'],
    link: '#',
  },
    {
    type: 'Resource',
    title: 'The Ultimate Guide to Acing System Design Interviews',
    summary: 'I have put together a list of resources and my personal tips on how to approach system design interviews. This guide includes common patterns, case studies, and mock problems.',
    date: 'September 25, 2025',
    tags: ['#Interviews', '#SystemDesign', '#Career'],
    link: '#',
  },
];

const PostTypeBadge = ({ type }: { type: string }) => {
  const baseStyle = 'text-xs font-semibold px-3 py-1 rounded-full text-white';
  let colorClass = '';
  switch (type) {
    case 'Resource':
      colorClass = 'bg-[#007BFF]'; // primary_color
      break;
    case 'Update':
      colorClass = 'bg-[#4F46E5]'; // secondary_color
      break;
    case 'Q&A':
      colorClass = 'bg-[#28A745]'; // success_color
      break;
    default:
      colorClass = 'bg-gray-500';
  }
  return <span className={`${baseStyle} ${colorClass}`}>{type}</span>;
};

const MentorCommunityHub = () => {
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);

  const handleRequestSession = async () => {
    setIsCreatingMeeting(true);
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
      // Optionally, show an error message to the user
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  return (
    <div className="bg-[#F4F7F9] min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Global Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {mockMentor.name}'s Community Hub
          </h1>
          {/* Navigation Tabs */}
          <div className="mt-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <Link href="/mentor/profile" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Profile
              </Link>
              <Link href="/mentor/community" className="border-[#007BFF] text-[#007BFF] whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" aria-current="page">
                Community Feed
              </Link>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Latest Resources & Updates</h2>
            {communityFeed.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <PostTypeBadge type={post.type} />
                    <p className="text-sm text-gray-500">{post.date}</p>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-800">{post.title}</h3>
                  <p className="mt-2 text-gray-600">{post.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href={post.link} className="font-semibold text-[#007BFF] hover:text-blue-600 flex items-center">
                      Read Full Post <FaChevronRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:sticky top-8 h-fit space-y-8">
            {/* Mentor Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <Image src={mockMentor.avatar} alt={mockMentor.name} width={64} height={64} className="rounded-full border-2 border-[#007BFF]" />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{mockMentor.name}</h2>
                  <p className="text-sm text-gray-500">{mockMentor.title}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-3 text-gray-400" size={20}/>
                  <strong>{mockMentor.stats.mentorships}</strong><span className="ml-1">Total Mentorships</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaStar className="mr-3 text-[#007BFF]" size={20}/>
                  <strong>{mockMentor.stats.rating}</strong><span className="ml-1">Avg. Rating</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-3 text-gray-400" size={20}/>
                  <strong>{mockMentor.stats.response}</strong><span className="ml-1">Response Time</span>
                </div>
              </div>
              <Link href="/mentor/profile?tab=schedule" className="block text-center w-full mt-6 bg-transparent text-[#007BFF] font-semibold py-2 px-4 rounded-lg border border-[#007BFF] hover:bg-blue-50 transition-colors">
                View Schedule & Profile
              </Link>
            </div>

            {/* Direct CTA Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-gray-800">Need Direct Help?</h3>
              <p className="mt-2 text-sm text-gray-600">Can\'t find what you\'re looking for in the feed? Request a private 1-on-1 session to get personalized guidance.</p>
              <button 
                onClick={handleRequestSession}
                disabled={isCreatingMeeting}
                className="w-full mt-4 bg-[#28A745] text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCreatingMeeting ? 'Creating Session...' : 'Request 1-on-1 Session'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorCommunityHub;

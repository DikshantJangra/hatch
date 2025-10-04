"use client";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiTwitter, FiStar, FiEdit, FiPlus } from "react-icons/fi";

const mentorData = {
  name: "Jane Doe",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
  tagline: "Senior Software Engineer @ DCODE | Open Source Contributor",
  social: {
    github: "#",
    linkedin: "#",
    twitter: "#",
  },
  about: "I am a passionate software engineer with over 10 years of experience in building scalable web applications. I love open source and enjoy helping others grow in their careers.",
  expertise: ["React", "Node.js", "Docker", "Kubernetes", "Python", "Project Management"],
  mentorshipStyle: [
    "I enjoy live code pairing and debugging sessions.",
    "Best for high-level architectural questions.",
    "Happy to provide career advice and resume feedback.",
  ],
  stats: {
    sessionsCompleted: 58,
    averageRating: 4.9,
    avgResponseTime: "~5 minutes",
  },
  feedback: [
    {
      rating: 5,
      comment: "Jane was incredibly helpful in debugging a complex issue I was facing. Highly recommended!",
      date: "2025-09-15",
    },
    {
      rating: 5,
      comment: "Excellent mentor! Provided great career advice.",
      date: "2025-08-22",
    },
  ],
};

const pendingRequests = [
  {
    name: "Alex Smith",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    message: "Hi Jane, I'd love to get your advice on my project architecture.",
  },
];

export default function MentorProfilePage() {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow">
          {/* Profile Header */}
          <div className="flex items-center mb-6">
            <img src={mentorData.avatar} alt={mentorData.name} className="h-24 w-24 rounded-full mr-6" />
            <div>
              <h1 className="text-3xl font-bold">{mentorData.name}</h1>
              <p className="text-gray-600">{mentorData.tagline}</p>
              <div className="flex space-x-4 mt-2">
                <a href={mentorData.social.github}><FiGithub className="text-gray-500 hover:text-gray-800" /></a>
                <a href={mentorData.social.linkedin}><FiLinkedin className="text-gray-500 hover:text-gray-800" /></a>
                <a href={mentorData.social.twitter}><FiTwitter className="text-gray-500 hover:text-gray-800" /></a>
              </div>
            </div>
            <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center">
              <FiEdit className="mr-2" /> Edit Profile
            </button>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700 leading-relaxed">{mentorData.about}</p>
          </div>

          {/* Expertise Tags */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Areas of Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {mentorData.expertise.map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Mentorship Style */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">My Mentorship Style</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {mentorData.mentorshipStyle.map(style => <li key={style}>{style}</li>)}
            </ul>
          </div>

          {/* Feedback & Ratings */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Feedback from Mentees</h2>
            <div className="space-y-4">
              {mentorData.feedback.map((fb, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => <FiStar key={i} className={`${i < fb.rating ? 'text-yellow-400' : 'text-gray-300'}`} />)}
                  </div>
                  <p className="text-gray-700 italic">"{fb.comment}"</p>
                  <p className="text-right text-sm text-gray-500 mt-1">- {fb.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Status & Availability Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Availability Status</h3>
              <div className="flex items-center">
                <span className={`mr-2 h-3 w-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-gray-600'}`}>
                  {isAvailable ? 'Available' : 'Offline'}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-4">
              <span>Set your status</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" checked={isAvailable} onChange={() => setIsAvailable(!isAvailable)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Sessions Completed: {mentorData.stats.sessionsCompleted}</li>
              <li>Average Rating: {mentorData.stats.averageRating}/5 ★</li>
              <li>Avg. Response Time: {mentorData.stats.avgResponseTime}</li>
            </ul>
          </div>

          {/* Pending Requests */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Mentorship Requests</h3>
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map((req, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <img src={req.avatar} alt={req.name} className="h-10 w-10 rounded-full mr-3" />
                      <div>
                        <p className="font-semibold">{req.name}</p>
                        <p className="text-sm text-gray-600 truncate">{req.message}</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg text-sm">Decline</button>
                      <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm">Accept</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No pending requests.</p>
            )}
          </div>

          {/* Scheduled Group Sessions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">My Group Sessions</h3>
            <div className="text-center text-gray-500 mb-4">
              <p>No upcoming sessions.</p>
            </div>
            <button className="w-full bg-blue-100 text-blue-800 px-4 py-2 rounded-lg flex items-center justify-center">
              <FiPlus className="mr-2" /> Schedule New Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

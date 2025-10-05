"use client";
import { mockMentors } from "@/lib/mock-mentors";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Globe,
  Users,
  Star,
  Handshake,
  Calendar,
} from "lucide-react";
import { notFound } from "next/navigation";

type MentorProfilePageProps = {
  params: {
    id: string;
  };
};

const MentorPublicProfilePage = ({ params }: MentorProfilePageProps) => {
  const mentor = mockMentors.find((m) => m.id === params.id);

  if (!mentor) {
    notFound();
  }

  const {
    name,
    title,
    avatarUrl,
    expertise,
    rating,
    sessionsCompleted,
  } = mentor;

  const socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  };

  const mentorshipFocusAreas = [
    "Code review best practices",
    "Navigating large OSS codebases",
    "Career growth in tech",
  ];

  const latestReview = {
    snippet:
      "An amazing and patient mentor! Helped me understand complex topics.",
    student: "Alex Doe",
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Header & Bio */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row items-start">
              <Image
                src={avatarUrl}
                alt={name}
                width={128}
                height={128}
                className="rounded-full mr-8 mb-4 md:mb-0"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
                <p className="text-xl text-gray-600 mt-1">{title}</p>
                <div className="flex space-x-4 mt-4 text-gray-500">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#007BFF]"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#007BFF]"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#007BFF]"
                  >
                    <Globe size={24} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                eget risus eget massa laboriosam, nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>

          {/* Expertise and Experience */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Areas of Expertise
            </h2>
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {expertise.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Mentorship Focus Areas
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {mentorshipFocusAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mentor Impact Stats */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Impact
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-3xl font-bold text-gray-900">
                  {sessionsCompleted}
                </p>
                <p className="text-gray-600">Total Mentorships</p>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-[#007BFF] mb-2" />
                <p className="text-3xl font-bold text-gray-900">{rating}/5</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="flex flex-col items-center">
                <Handshake className="w-8 h-8 text-gray-500 mb-2" />
                <p className="text-3xl font-bold text-gray-900">Yes</p>
                <p className="text-gray-600">Beginner Friendly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Action Panel) */}
        <div className="lg:sticky top-8 h-fit">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <span
                className={`w-4 h-4 rounded-full mr-3 ${mentor.status === "Available" ? "bg-green-500" : "bg-gray-400"}`}
              ></span>
              <p className="text-lg font-semibold text-gray-800">
                {mentor.status}
              </p>
            </div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Next Available Session
              </h3>
              <p className="text-gray-600">
                Tuesday, Oct 8th @ 2:00 PM IST (1-on-1)
              </p>
            </div>
            <button className="w-full bg-[#007BFF] text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out mb-4">
              Send Mentorship Request
            </button>
            <button className="w-full bg-transparent text-[#007BFF] font-semibold py-2 px-4 rounded-lg border border-[#007BFF] hover:bg-blue-50 transition duration-300">
              <Calendar size={16} className="inline mr-2" />
              Schedule Group Session Reminder
            </button>
            <hr className="my-6" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">
                Review Snapshot
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">
                    {latestReview.snippet}
                  </p>
                <p className="text-right text-gray-600 mt-2 font-medium">
                  - {latestReview.student}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPublicProfilePage;
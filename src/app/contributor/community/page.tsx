"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiMessageCircle, FiEye, FiCheckCircle } from "react-icons/fi";
import { mockQuestions } from "@/lib/mock-questions";

// Modal Component
const AskQuestionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Ask the Community</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Question Title</label>
            <input type="text" id="title" className="w-full border-gray-300 rounded-md shadow-sm" placeholder="Summarize your problem in one sentence." />
          </div>
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Details / Code</label>
            <textarea id="details" rows="6" className="w-full border-gray-300 rounded-md shadow-sm" placeholder="Describe your issue, including error messages and code snippets. Use markdown for code blocks."></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input type="text" id="tags" className="w-full border-gray-300 rounded-md shadow-sm" placeholder="Add relevant topics (e.g., React, Git, deployment)" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Post Question</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Question Card Component
const QuestionCard = ({ question }) => {
    const statusConfig = {
        unanswered: { text: "Unanswered", color: "bg-yellow-100 text-yellow-800", icon: null },
        solved: { text: "Solved", color: "bg-green-100 text-green-800", icon: <FiCheckCircle className="mr-1" /> },
    };

    const currentStatus = statusConfig[question.status];

    return (
        <Link href={`/contributor/community/${question.id}`} className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-grow">
                    <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {currentStatus.text}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{question.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">
                        Asked by {question.author} • {question.time}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {question.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="flex-shrink-0 ml-6 text-right">
                    <div className="flex items-center justify-end text-sm text-gray-500 mb-2">
                        <FiMessageCircle className="mr-1.5" />
                        <span>{question.replies} Replies</span>
                    </div>
                    <div className="flex items-center justify-end text-sm text-gray-500">
                        <FiEye className="mr-1.5" />
                        <span>{question.views} Views</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};


export default function CommunityPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <AskQuestionModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="mb-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">Community Q&A</h1>
                    <p className="mt-2 text-lg text-gray-600">Get help from mentors and peers, share what you've learned, and explore technical discussions.</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg">
                    Ask a Question
                </button>
            </div>
          </header>

          {/* Filter and Sort Bar */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-grow">
                <div className="relative flex-grow">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="Search titles, tags, or content..." className="w-full border-gray-300 rounded-md shadow-sm pl-10 py-2" />
                </div>
                <div>
                    <label htmlFor="status" className="sr-only">Status</label>
                    <select id="status" className="border-gray-300 rounded-md shadow-sm">
                        <option>All Threads</option>
                        <option>Unanswered</option>
                        <option>Solved</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="topic" className="sr-only">Topic</label>
                    <select id="topic" className="border-gray-300 rounded-md shadow-sm">
                        <option>All Topics</option>
                        <option>React</option>
                        <option>Git</option>
                        <option>First-Issue</option>
                    </select>
                </div>
            </div>
            <div className="ml-4">
                <label htmlFor="sort" className="sr-only">Sort By</label>
                <select id="sort" className="border-gray-300 rounded-md shadow-sm">
                    <option>Most Recent</option>
                    <option>Most Replies</option>
                    <option>Most Views</option>
                </select>
            </div>
          </div>

          {/* Question List */}
          <main className="space-y-4">
            {mockQuestions.length > 0 ? (
                mockQuestions.map(q => <QuestionCard key={q.id} question={q} />)
            ) : (
                <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
                    <p className="text-gray-600 mb-4">No questions match your current filters.</p>
                    <button onClick={() => setModalOpen(true)} className="text-blue-600 font-semibold hover:underline">
                        Be the first to ask!
                    </button>
                </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
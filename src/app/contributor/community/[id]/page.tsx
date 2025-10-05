"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockQuestions } from '@/lib/mock-questions';
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

// Answer Card Component
const AnswerCard = ({ answer }) => (
    <div className="flex items-start space-x-4 py-6 border-b border-gray-200">
        <FaUserCircle className="w-10 h-10 text-gray-400 flex-shrink-0" />
        <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">{answer.author}</p>
                <p className="text-sm text-gray-500">{answer.time}</p>
            </div>
            <div className="prose max-w-none text-gray-700">
                <p>{answer.content}</p>
            </div>
        </div>
    </div>
);

export default function QuestionDetailPage() {
    const params = useParams();
    const questionId = params.id;
    const question = mockQuestions.find(q => q.id.toString() === questionId);

    if (!question) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Question not found</h2>
                <Link href="/community" className="text-blue-600 hover:underline">
                    Return to Community
                </Link>
            </div>
        );
    }

    const statusConfig = {
        unanswered: { text: "Unanswered", color: "bg-yellow-100 text-yellow-800" },
        solved: { text: "Solved", color: "bg-green-100 text-green-800", icon: <FiCheckCircle className="mr-1.5" /> },
    };

    const currentStatus = statusConfig[question.status];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Link href="/contributor/community" className="inline-flex items-center text-blue-600 hover:underline mb-6">
                    <FiArrowLeft className="mr-2" />
                    Back to all questions
                </Link>

                {/* Question Header */}
                <header className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus.color}`}>
                            {currentStatus.icon}
                            {currentStatus.text}
                        </span>
                        {/* Mentor/Author Actions */}
                        <button className="border border-green-500 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-50">
                            Mark as Solved
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{question.title}</h1>
                    <p className="text-sm text-gray-500">
                        Asked by <span className="font-semibold">{question.author}</span> • {question.time}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {question.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                </header>

                {/* Question Body */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                    <div className="prose max-w-none text-gray-800">
                        <p>{question.content}</p>
                    </div>
                </div>

                {/* Answers Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-3">
                        {question.answers.length} {question.answers.length === 1 ? 'Answer' : 'Answers'}
                    </h2>
                    <div className="space-y-0 divide-y divide-gray-200">
                        {question.answers.map(answer => (
                            <AnswerCard key={answer.id} answer={answer} />
                        ))}
                    </div>
                </section>

                {/* Reply Form */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Add a Reply</h2>
                    <form className="bg-white border border-gray-200 rounded-lg p-6">
                        <textarea 
                            rows="5" 
                            className="w-full border-gray-300 rounded-md shadow-sm p-3"
                            placeholder="Share your solution or insights. Use markdown for formatting."
                        ></textarea>
                        <div className="mt-4 flex justify-end">
                            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                Post Reply
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

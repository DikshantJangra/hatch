// src/components/landing-sections/DashboardPreviewSection.js
'use client';
import React, { useState } from 'react';
import { UserCheckIcon, BriefcaseIcon, topMentors, newRequests } from './UtilityIcons'; 

export default function DashboardPreviewSection({ onLoginClick }) {
    const [activeTab, setActiveTab] = useState('student');

    return (
        <div id="dashboard-preview-content" className="bg-white text-gray-900 font-sans py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Your Personalized Dashboard
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Whether you're learning or leading, your journey is managed here.
                </p>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex justify-center p-1.5 bg-gray-100 rounded-xl border border-gray-300">
                    <button
                        onClick={() => setActiveTab('student')}
                        className={`group w-1/2 flex items-center justify-center py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-300 ${activeTab === 'student' ? 'bg-teal-600 text-white shadow-lg shadow-teal-300/40' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        <UserCheckIcon className={activeTab === 'student' ? 'text-white' : 'text-gray-600'}/> Newcomer View
                    </button>
                    <button
                        onClick={() => setActiveTab('mentor')}
                        className={`group w-1/2 flex items-center justify-center py-3 px-4 rounded-lg text-lg font-semibold transition-all duration-300 ${activeTab === 'mentor' ? 'bg-teal-600 text-white shadow-lg shadow-teal-300/40' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        <BriefcaseIcon className={activeTab === 'mentor' ? 'text-white' : 'text-gray-600'}/> Mentor View
                    </button>
                </div>

                <div className="bg-white border border-gray-300 rounded-2xl p-6 sm:p-10 min-h-[480px] shadow-2xl shadow-gray-300/50">
                    {activeTab === 'student' && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Top 5 Mentor Matches</h3>
                            <div className="space-y-4">
                                {topMentors.map(mentor => (
                                    <div key={mentor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 transition duration-200 hover:border-teal-400">
                                        <div className="flex items-center">
                                            <img className="h-12 w-12 rounded-full object-cover" src={mentor.avatar} alt={mentor.name} />
                                            <div className="ml-4">
                                                <p className="font-bold text-gray-900">{mentor.name}</p>
                                                <p className="text-sm text-teal-600 font-medium">{mentor.match}% Match</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">View Profile</button>
                                            <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">Request Session</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'mentor' && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">New Mentee Requests</h3>
                            <div className="space-y-4">
                                {newRequests.map(request => (
                                    <div key={request.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 transition duration-200 hover:border-teal-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img className="h-12 w-12 rounded-full object-cover" src={request.avatar} alt={request.name} />
                                                <div className="ml-4">
                                                    <p className="font-bold text-gray-900">{request.name}</p>
                                                    <p className="text-sm text-gray-500 italic">"{request.message}"</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors">Schedule</button>
                                                <button className="px-4 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors">Accept 15min</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
}
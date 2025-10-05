// src/components/landing-sections/ChatFeatureSection.js
'use client';
import React from 'react';
import { MessageSquareIcon, UsersSmallIcon, SendIcon } from './UtilityIcons'; 

export default function ChatFeatureSection({onLoginClick}) {
    return (
        <div id="chat-feature-content" className="bg-white text-gray-900 font-sans py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Connect & Collaborate
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                    Seamless communication is at the heart of mentorship.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                
                <div className="space-y-12">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-200">
                                <MessageSquareIcon />
                            </div>
                        </div>
                        <div className="ml-6">
                            <h3 className="text-2xl font-bold text-gray-900">Direct 1-on-1 Chat</h3>
                            <p className="mt-2 text-gray-600 leading-7">
                                Once matched, instantly start a private conversation with your mentor or student. Ask questions, get code reviews, and build a personal connection, all within your dashboard.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gray-200">
                                <UsersSmallIcon />
                            </div>
                        </div>
                        <div className="ml-6">
                            <h3 className="text-2xl font-bold text-gray-900">Group Mentorship Rooms</h3>
                            <p className="mt-2 text-gray-600 leading-7">
                                Join themed discussion rooms to learn from multiple mentors and peers. Perfect for project-based collaboration, topic-specific Q&A sessions, or just connecting with the community.
                            </p>
                        </div>
                        
                    </div>
                </div>
                
                <div className="space-y-8">
                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-300 transition duration-300 hover:border-teal-400">
                        <div className="flex items-center pb-3 border-b border-gray-300">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://placehold.co/100x100/374151/e5e7eb?text=SC" alt="Sarah Chen"/>
                            <div className="ml-3">
                                <p className="font-bold text-gray-900">Sarah Chen (Mentor)</p>
                                <p className="text-sm text-green-600">Online</p>
                            </div>
                        </div>
                        <div className="py-4 space-y-4 text-sm">
                            <div className="flex justify-end">
                                <p className="bg-teal-600 text-white p-3 rounded-lg max-w-[80%]">Hey Sarah, I'm stuck on this async issue in my project.</p>
                            </div>
                            <div className="flex justify-start">
                                <p className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-[80%]">Of course! Send over the code snippet when you can.</p>
                            </div>
                        </div>
                        <div className="flex items-center pt-3 border-t border-gray-300">
                            <input type="text" placeholder="Type your message..." className="w-full bg-gray-100 text-gray-900 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 border-none placeholder-gray-500"/>
                            <button onClick={onLoginClick} className="ml-3 bg-teal-600 p-3 rounded-lg hover:bg-teal-700">
                                <SendIcon />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-300 transition duration-300 hover:border-teal-400">
                        <h4 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-300">Group Rooms</h4>
                        <div className="py-4 space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                                <div>
                                    <p className="font-semibold text-gray-900">#react-help</p>
                                    <p className="text-sm text-gray-600">Discussion on hooks and state management</p>
                                </div>
                                <span className="text-sm font-medium text-teal-700 bg-teal-100/50 px-2 py-1 rounded-full">12 Online</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer">
                                <div>
                                    <p className="font-semibold text-gray-900">#devops-CI-CD</p>
                                    <p className="text-sm text-gray-600">Pipelines, Docker, and deployment strategies</p>
                                </div>
                                <span className="text-sm font-medium text-teal-700 bg-teal-100/50 px-2 py-1 rounded-full">8 Online</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-20 text-center">
                    <button onClick={onLoginClick} className="px-8 py-4 text-xl font-bold rounded-full transition duration-300 bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 shadow-xl shadow-teal-300/40">
                        Jump into a Group Session Now
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}
// src/components/landing-sections/RoleDiscoverySection.js
import React from 'react';
import { GitHubIcon, CpuIcon, MentorIcon, StudentIcon } from './UtilityIcons';

export default function RoleDiscoverySection() {
    return (
        <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                
                <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Find Your Role, <span className="text-teal-600">Effortlessly</span>
                    </h2>
                    <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-gray-600 leading-8">
                        Forget filling out long profiles. Our Smart Role Assignment analyzes your public GitHub activity to instantly identify where you'll shine—as a **Verified Mentor** or a **Newcomer** ready to contribute.
                    </p>
                    <div className="mt-8 flex gap-4 justify-center lg:justify-start">
                        <span className="inline-flex items-center rounded-full bg-teal-100/50 px-4 py-1.5 text-sm font-medium text-teal-700 ring-1 ring-inset ring-teal-500/30">Mentor Discovery</span>
                        <span className="inline-flex items-center rounded-full bg-sky-100/50 px-4 py-1.5 text-sm font-medium text-sky-700 ring-1 ring-inset ring-sky-500/30">Newcomer Matching</span>
                    </div>
                </div>

                <div className="relative flex justify-center items-center p-4 sm:p-8">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col items-center space-y-6">
                            
                            <div className="flex flex-col items-center text-center">
                                <GitHubIcon className="text-gray-900 w-12 h-12" />
                                <p className="font-semibold mt-2 text-gray-700">Your GitHub Profile</p>
                            </div>

                            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400"><path d="M12 0V38M12 38L18 32M12 38L6 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>

                            <div className="flex flex-col items-center text-center">
                               <CpuIcon />
                               <p className="font-semibold mt-2 text-gray-700">Smart Role Assignment</p>
                               <p className="text-sm text-gray-500">Analyzing contributions...</p>
                            </div>
                            
                            <div className="relative w-full h-10">
                                <svg className="absolute w-full h-full text-gray-400" viewBox="0 0 200 40">
                                    <path d="M 100 0 V 20 C 100 30, 80 30, 60 40" stroke="currentColor" strokeWidth="2" fill="none" />
                                    <path d="M 100 0 V 20 C 100 30, 120 30, 140 40" stroke="currentColor" strokeWidth="2" fill="none" />
                                </svg>
                            </div>

                            <div className="flex justify-between w-full mt-2">
                                <div className="w-[48%] flex flex-col items-center text-center p-4 bg-white border border-teal-500/40 rounded-xl shadow-lg shadow-gray-200 hover:shadow-teal-500/50 transition duration-300 transform hover:scale-[1.05]">
                                    <MentorIcon />
                                    <h3 className="font-bold text-lg mt-2 text-teal-600">Mentor</h3>
                                    <ul className="text-xs text-teal-500 mt-2 list-disc list-inside text-left space-y-1">
                                        <li>High PR merge rate</li>
                                        <li>Active in issues</li>
                                        <li>Multiple repos</li>
                                    </ul>
                                </div>
                                <div className="w-[48%] flex flex-col items-center text-center p-4 bg-white border border-sky-500/40 rounded-xl shadow-lg shadow-gray-200 hover:shadow-sky-500/50 transition duration-300 transform hover:scale-[1.05]">
                                    <StudentIcon />
                                    <h3 className="font-bold text-lg mt-2 text-sky-600">Newcomer</h3>
                                    <ul className="text-xs text-sky-500 mt-2 list-disc list-inside text-left space-y-1">
                                        <li>Eager to contribute</li>
                                        <li>Learning new tech</li>
                                        <li>Fewer merged PRs</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

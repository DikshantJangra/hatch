// src/components/landing-sections/HeroSection.js
'use client';
import React from 'react';
import { GitHubIcon, ImageTag, getImageUrl } from './UtilityIcons'; // Correct relative import path

export default function HeroSection({ handleLogin, loading }) {
    return (
        <div className="pt-8">
            <nav className="flex justify-between items-center mb-20">
                <div className="text-3xl font-extrabold text-teal-600 flex items-center">
                    <span className="text-4xl mr-2 font-black text-gray-900 drop-shadow-[0_0_5px_#f3f3f3]">H</span>
                    <span className="text-gray-900 font-bold">atch</span>
                </div>
                <div className="flex items-center space-x-6">
                    <a href="#" className="px-4 py-2 text-sm font-semibold rounded-full bg-teal-600 text-white transition duration-200 hover:bg-teal-700">Home</a>
                    <a href="#role-discovery" className="text-sm text-gray-600 hover:text-gray-900 transition duration-200">Role</a>
                    <a href="#process" className="text-sm text-gray-600 hover:text-gray-900 transition duration-200">Process</a>
                    <a href="#dashboard-preview" className="text-sm text-gray-600 hover:text-gray-900 transition duration-200">Dashboard</a>
                    <a href="#chat-feature" className="text-sm text-gray-600 hover:text-gray-900 transition duration-200">Chat</a>
                </div>
                <ImageTag src={getImageUrl('profile')} alt="Profile" className="w-8 h-8 rounded-full ring-2 ring-teal-400/50 hover:ring-teal-400 transition duration-300" />
            </nav>

            <div className="flex flex-col items-center justify-center text-center py-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tighter">
                    Meet Your Open Source Mentor.
                    <br />
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-sky-600">Start Building Today.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-600">
                    Fast-track your open source growth with our smart, GitHub-integrated onboarding. Connect with experienced mentors in minutes.
                </p>
                <div className="mt-10">
                    <button onClick={handleLogin} disabled={loading} className="inline-flex items-center justify-center bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 ease-in-out transform hover:scale-105">
                        <GitHubIcon className="mr-3 h-6 w-6 text-white"/>
                        Login with GitHub
                    </button>
                </div>
            </div>
        </div>
    );
}
// src/components/landing-sections/Footer.js
import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full bg-white pt-10 border-t border-gray-300 text-gray-600 mt-20">
            <div className="w-full max-w-7xl px-6 mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-8">
                    
                    <div className="col-span-2 lg:col-span-2">
                        <div className="text-xl font-extrabold text-teal-600 flex items-center mb-3">
                            <span className="text-2xl mr-2 font-black text-gray-900 drop-shadow-[0_0_5px_#f3f3f3]">H</span>
                            <span className="text-gray-900 font-bold">atch</span>
                        </div>
                        <p className="text-sm">
                            Hatching the next generation of Open Source contributors, one 15-minute session at a time. Built with ⚡ for the DCODE Hackathon.
                        </p>
                        <p className="text-xs mt-4 text-gray-500">&copy; {new Date().getFullYear()} Hatch. All rights reserved.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Platform</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#role-discovery" className="hover:text-teal-600 transition duration-200">Role Discovery</a></li>
                            <li><a href="#process" className="hover:text-teal-600 transition duration-200">How It Works</a></li>
                            <li><a href="#dashboard-preview" className="hover:text-teal-600 transition duration-200">Dashboard</a></li>
                            <li><a href="#chat-feature" className="hover:text-teal-600 transition duration-200">Chat Features</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Resources</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">GitHub Docs</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">Hackathon Brief</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">Developer API</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">Tech Stack Used</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">Contact Us</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-teal-600 transition duration-200">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="flex justify-center border-t border-gray-300 pt-6 mt-4">
                    <p className="text-gray-500 text-xs">Follow our journey: Twitter | LinkedIn | GitHub</p>
                </div>
            </div>
        </footer>
    );
}
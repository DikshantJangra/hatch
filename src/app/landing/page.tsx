'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// =========================================================
// --- I. ICON AND UTILITY COMPONENTS ---
// (Icons are kept as SVGs, their colors will be driven by Tailwind classes)
// =========================================================

const GitHubIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>);
const UserCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 transition-colors"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>);
const BriefcaseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 transition-colors"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>);
const CpuIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>);
const MentorIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M15.06 18.06a7.5 7.5 0 1 0-10.12-10.12A7.5 7.5 0 0 0 15.06 18.06Z"></path><path d="M12 18a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2a2 2 0 0 0-4 0v2Z"></path><path d="M8.5 10.5h7"></path><path d="M12 7.5v7"></path><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path></svg>);
const StudentIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>);
const MessageSquareIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const UsersSmallIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-sky-600"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>);
const SendIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
const QuoteIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-gray-400"><path d="M6.5 10c-1.28 0-2.5.4-3.5 1.2-1 .8-1.5 1.9-1.5 3.1 0 1.2.5 2.3 1.5 3.1.9.8 2.1 1.2 3.5 1.2 2.78 0 5-2.22 5-5s-2.22-5-5-5zm11 0c-1.28 0-2.5.4-3.5 1.2-1 .8-1.5 1.9-1.5 3.1 0 1.2.5 2.3 1.5 3.1.9.8 2.1 1.2 3.5 1.2 2.78 0 5-2.22 5-5s-2.22-5-5-5z"></path></svg>);
const GithubBadgeIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-600"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>);


const ImageTag = ({ src, alt, className }) => (<img src={src} alt={alt} className={className + " object-cover"} />);
const getImageUrl = (type) => {
    const urls = {
        profile: "https://i.pravatar.cc/150?img=60", main_large: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        main_grid_large: "https://images.unsplash.com/photo-1628157795079-6a3f2b6e1b10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        face1: "https://i.pravatar.cc/150?img=1", face2: "https://i.pravatar.cc/150?img=2", face3: "https://i.pravatar.cc/150?img=3", face4: "https://i.pravatar.cc/150?img=4", face5: "https://i.pravatar.cc/150?img=5",
        mission_side: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        steps_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };
    return urls[type];
};

// --- MOCK DATA ---
const topMentors = [ { id: 1, name: 'Sarah Chen (React Expert)', match: 98, avatar: getImageUrl('face3') }, { id: 2, name: 'David Lee (Node Expert)', match: 95, avatar: getImageUrl('face2') }];
const newRequests = [ { id: 1, name: 'Alex Johnson', message: 'Looking for help with React hooks...', avatar: getImageUrl('face5') }, { id: 2, name: 'Priya Patel', message: 'Interested in learning about CI/CD pipelines.', avatar: getImageUrl('face4') }];


// =========================================================
// --- III. MAIN APPLICATION EXPORT (Components defined inside) ---
// =========================================================

export default function HatchLandingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Core Login Logic
    const handleGitHubLogin = () => {
        setLoading(true);
        const mockUsername = "VarunStudentSharma"; 
        const assignedRole = mockUsername.toLowerCase().includes('mentor') ? 'mentor' : 'student';

        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('userRole', assignedRole);
            localStorage.setItem('username', mockUsername);

            if (assignedRole === 'mentor') {
                router.push('/onboarding/mentor');
            } else {
                router.push('/onboarding/student');
            }
        }, 1000); 
    };

    // --- Components defined INSIDE the main function (FIXES SYNTAX ERROR) ---

    const RoleDiscoverySection = () => {
        return (
            <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Find Your Role, <span className="text-teal-600">Effortlessly</span>
                        </h2>
                        <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-gray-600 leading-8">
                            Forget filling out long profiles. Our Smart Role Assignment analyzes your public GitHub activity to instantly identify where you&apos;ll shine—as a **Verified Mentor** or a **Newcomer** ready to contribute.
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
    };

    const DashboardPreviewSection: React.FC<{onLoginClick: () => void}> = ({ onLoginClick }) => {
        const [activeTab, setActiveTab] = useState('student');

        return (
            <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
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
    };

    const ChatFeatureSection: React.FC<{onLoginClick: () => void}> = ({onLoginClick}) => {
        return (
            <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
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
                    
                    {/* Column 1: Feature Descriptions */}
                    <div className="space-y-12">
                        {/* 1-on-1 Chat Feature */}
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
                        {/* Group Chat Feature */}
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
                    
                    {/* Column 2: Visual Mockups (Using High Contrast Aesthetic) */}
                    <div className="space-y-8">
                        {/* 1-on-1 Chat Mockup */}
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
                                    <p className="bg-teal-600 text-white p-3 rounded-lg max-w-[80%]">Hey Sarah, I&apos;m stuck on this async issue in my project.</p>
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

                        {/* Group Rooms Mockup */}
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
                </div>
                
                <div className="mt-20 text-center">
                    <button onClick={onLoginClick} className="px-8 py-4 text-xl font-bold rounded-full transition duration-300 bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 shadow-xl shadow-teal-300/40">
                        Jump into a Group Session Now
                    </button>
                </div>
            </div>
            </div>
        );
    };

    const TestimonialsSection: React.FC = () => {
        const testimonials = [
            { quote: "Finding a mentor here was a game-changer. I went from struggling with pull requests to becoming a core contributor on a project I love.", name: "Alex Johnson", role: "Mentee", avatar: getImageUrl('face5') },
            { quote: "The platform's smart matching is brilliant. It connected me with a student who was passionate about the exact technologies I specialize in. It's been incredibly rewarding.", name: "Samantha Lee", role: "Mentor", avatar: getImageUrl('face3') },
            { quote: "As someone new to open source, the guidance I received was invaluable. The group sessions are fantastic for learning from different perspectives.", name: "David Chen", role: "Mentee", avatar: getImageUrl('face4') }
        ];

        return (
            <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Real Stories, Real Growth
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        See how our community is making an impact in open source.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-between transition duration-300 hover:border-teal-500 hover:shadow-teal-300/50">
                            <div>
                                <QuoteIcon />
                                <blockquote className="mt-6 text-gray-700 text-lg">
                                    "{testimonial.quote}"
                                </blockquote>
                            </div>
                            <div className="mt-8 flex items-center">
                                <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center justify-center bg-gray-100 border border-gray-300 rounded-full py-3 px-6 transition duration-300 hover:border-gray-900">
                        <GithubBadgeIcon className="text-gray-600 w-6 h-6" />
                        <span className="ml-3 text-md font-semibold text-gray-700">Secured with GitHub Sign-In</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
                        We use your GitHub profile for smart matching and never request access to your code. Your privacy is our priority.
                    </p>
                </div>
            </div>
            </div>
        );
    };


    const FAQSection: React.FC = () => {
        const faqs = [
            { question: "How is my role (Mentor or Student) assigned?", answer: "Your role is automatically suggested based on your GitHub activity. We analyze factors like your contribution history, repository ownership, and issue/PR interactions. You can always review and finalize your role during onboarding." },
            { question: "How does the matching process work?", answer: "Our smart matching algorithm connects students with mentors based on shared technical skills, learning goals, and language preferences. We analyze your GitHub profile to find the most relevant and impactful match for you." },
            { question: "How are mentorship sessions scheduled?", answer: "Once a mentorship request is accepted, you and your mentor/student can coordinate a suitable time directly through our 1-on-1 chat feature. Mentors can also post availability for group sessions in the relevant discussion rooms." },
            { question: "Is my data secure?", answer: "Absolutely. We use GitHub for authentication only and never request access to your private repositories or code. Your privacy and data security are our top priorities." }
        ];

        return (
            <div className="bg-white text-gray-900 font-sans py-20 sm:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Have questions? We've got answers.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 bg-gray-50 border border-gray-200 rounded-lg transition duration-300 hover:border-teal-400 hover:shadow-teal-300/20">
                                <dt className="text-xl font-semibold text-gray-900">
                                    {faq.question}
                                </dt>
                                <dd className="mt-3 text-base text-gray-600">
                                    {faq.answer}
                                </dd>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        );
    };

    // --- RENDER FUNCTION ---
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col items-center">
            
            <div className="w-full max-w-7xl px-6">

                {/* 1. Navbar and Hero Section */}
                <div className="pt-8">
                    <nav className="flex justify-between items-center mb-20">
                        <div className="text-3xl font-extrabold text-teal-600 flex items-center">
                            <span className="text-4xl mr-2 font-black text-gray-900 drop-shadow-[0_0_5px_#f3f3f3]">H</span>
                            <span className="text-gray-900 font-bold">atch</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <a href="#" className="px-4 py-2 text-sm font-semibold rounded-full bg-teal-600 text-white transition duration-200 hover:bg-teal-700">Home</a>
                            {['Mentors', 'Launchpad', 'Process', 'Search'].map(link => (
                                <a key={link} href="#" className="text-sm text-gray-600 hover:text-gray-900 transition duration-200">
                                    {link}
                                </a>
                            ))}
                            <ImageTag src={getImageUrl('profile')} alt="Profile" className="w-8 h-8 rounded-full ring-2 ring-teal-400/50 hover:ring-teal-400 transition duration-300" />
                        </div>
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
                            <button onClick={handleGitHubLogin} className="inline-flex items-center justify-center bg-teal-600 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 ease-in-out transform hover:scale-105">
                                <GitHubIcon className="mr-3 h-6 w-6 text-white"/>
                                Login with GitHub
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Role Discovery Infographic */}
                <section className="mt-20">
                    <RoleDiscoverySection />
                </section>
                
                {/* 3. How It Works - 3 Step Process (Micro-Match logic) */}
                <section className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <div className="text-center mb-16">
                        <p className="text-teal-600 text-sm font-semibold mb-2">THE HATCH PROCESS</p>
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                            Your Hyper-Efficient 3-Step Mentorship System
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        
                        <div className="p-8 bg-white rounded-xl border border-gray-200 relative transition duration-300 hover:bg-gray-50 hover:border-teal-400 hover:shadow-xl hover:scale-[1.02]">
                            <span className="text-8xl font-black absolute top-[-30px] left-[-10px] text-gray-200 z-0">01</span>
                            <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Insta-Verify</h3>
                            <p className="text-gray-600 text-base mb-4">
                                Login with GitHub. Our system instantly verifies your contribution level to assign your role—**Newcomer** or **Verified Mentor**—so you skip the forms.
                            </p>
                            <p className="text-teal-600 font-semibold">Focus: Smart Role Assignment.</p>
                        </div>
                        
                        <div className="p-8 bg-white rounded-xl border border-gray-200 relative transition duration-300 hover:bg-gray-50 hover:border-teal-400 hover:shadow-xl hover:scale-[1.02]">
                            <span className="text-8xl font-black absolute top-[-30px] left-[-10px] text-gray-200 z-0">02</span>
                            <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Micro-Match (15min)</h3>
                            <p className="text-gray-600 text-base mb-4">
                                    We match Newcomers with **First-Time Guide** Mentors. Submit one specific question for a **15-minute focused session**. No long-term commitments required.
                                </p>
                            <p className="text-teal-600 font-semibold">Focus: High-Quality, Quick Resolution.</p>
                        </div>
                        
                        <div className="p-8 bg-white rounded-xl border border-gray-200 relative transition duration-300 hover:bg-gray-50 hover:border-teal-400 hover:shadow-xl hover:scale-[1.02]">
                            <span className="text-8xl font-black absolute top-[-30px] left-[-10px] text-gray-200 z-0">03</span>
                            <h3 className="text-3xl font-bold text-gray-900 mb-3 relative z-10">Launch Your PR</h3>
                            <p className="text-gray-600 text-base mb-4">
                                Mentor accepts. Contact info is shared. Get your blocker solved, confidently push your first contribution, and accelerate your growth in the Open Source world.
                            </p>
                            <p className="text-teal-600 font-semibold">Focus: Successful Contribution.</p>
                        </div>
                    </div>
                    
                    <div className="mt-16 w-full h-[400px] rounded-xl overflow-hidden shadow-2xl border border-gray-300 transition duration-300 hover:shadow-teal-400/40">
                        <ImageTag src={getImageUrl('steps_image')} alt="Workflow Image" className="w-full h-full" />
                    </div>
                </section>


                {/* 4. Dashboard Preview */}
                <section className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <DashboardPreviewSection onLoginClick={handleGitHubLogin}/>
                </section>

                {/* 5. Chat Feature Showcase */}
                <section className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <ChatFeatureSection onLoginClick={handleGitHubLogin} />
                </section>

                {/* 6. Testimonials */}
                <section className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <TestimonialsSection />
                </section>

                {/* 7. FAQ */}
                <section className="mt-32 pt-12 border-t border-gray-200 w-full">
                    <FAQSection />
                </section>
                
                {/* 8. Final CTA and Footer */}
                <div className="mt-20 text-center p-10 bg-gray-50 rounded-xl border border-teal-300 transition duration-300 hover:shadow-teal-300/50 hover:border-teal-400">
                    <h3 className="text-4xl font-bold text-gray-900 mb-6">Ready to **Hatch** your first contribution?</h3>
                    <button
                        onClick={handleGitHubLogin}
                        className="px-8 py-4 text-xl font-bold rounded-full transition duration-300 bg-teal-600 text-white hover:bg-teal-700 hover:scale-105 shadow-xl shadow-teal-500/40"
                    >
                        Start Your Open Source Journey Today!
                    </button>
                </div>
                
                {/* 9. Expanded Footer */}
                <footer className="mt-20 pt-10 border-t border-gray-300 w-full text-gray-600">
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
                                <li><a href="#" className="hover:text-teal-600 transition duration-200">Find Mentors</a></li>
                                <li><a href="#" className="hover:text-teal-600 transition duration-200">How It Works</a></li>
                                <li><a href="#" className="hover:text-teal-600 transition duration-200">Community Hub</a></li>
                                <li><a href="#" className="hover:text-teal-600 transition duration-200">Session Dashboard</a></li>
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
                </footer>

            </div>
        </div>
    );
}
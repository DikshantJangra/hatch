"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiVideo, FiUsers, FiMessageSquare, FiMic, FiMicOff, FiVideoOff, FiShare, FiMoreVertical } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const Participant = ({ name, isMuted }) => (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700">
        <div className="flex items-center">
            <FaUserCircle className="w-8 h-8 text-gray-500 mr-3" />
            <span className="text-sm">{name}</span>
        </div>
        {isMuted ? <FiMicOff className="text-red-500" /> : <FiMic className="text-gray-400" />}
    </div>
);

const ChatMessage = ({ name, message }) => (
    <div className="text-sm mb-3">
        <span className="font-bold mr-2">{name}:</span>
        <span>{message}</span>
    </div>
);

export default function GroupSessionPage() {
    const params = useParams();
    const sessionId = params.id;
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);

    // In a real app, you would fetch session data based on the sessionId
    const mockSession = {
        id: sessionId,
        topic: "Workshop: Debugging Node.js",
        mentor: {
            name: "Sam Wilson",
        },
        participants: [
            { id: 1, name: "Alice", isMuted: false },
            { id: 2, name: "Bob", isMuted: true },
            { id: 3, name: "Charlie", isMuted: false },
            { id: 4, name: "David", isMuted: false },
        ],
        chatMessages: [
            { name: "Alice", message: "This is really helpful!" },
            { name: "Bob", message: "Can you explain that last part again?" },
        ]
    }

    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-700 p-3 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center">
                    <Link href="/contributor/sessions" className="p-2 rounded-full hover:bg-gray-700 mr-3">
                        <FiArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-md font-bold">{mockSession.topic}</h1>
                        <p className="text-xs text-gray-400">Hosted by {mockSession.mentor.name}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm">
                        <FiUsers className="mr-2" />
                        <span>{mockSession.participants.length + 1}</span>
                    </div>
                    <button className="bg-red-600 px-4 py-2 text-sm rounded-lg hover:bg-red-700">Leave</button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Participants Sidebar */}
                <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 flex items-center"><FiUsers className="mr-2"/> Participants</h2>
                    <div className="space-y-2 overflow-y-auto">
                        <Participant name={`${mockSession.mentor.name} (Host)`} isMuted={false} />
                        {mockSession.participants.map(p => <Participant key={p.id} name={p.name} isMuted={p.isMuted} />)}
                    </div>
                </aside>

                {/* Main Content (Video Player) */}
                <main className="flex-1 flex flex-col items-center justify-center p-4 bg-black">
                    <div className="w-full h-full flex items-center justify-center relative">
                        {/* Main speaker view */}
                        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                             <FaUserCircle className="w-24 h-24 text-gray-600" />
                        </div>
                        {/* My own video preview */}
                        <div className="absolute bottom-4 right-4 w-48 h-28 bg-gray-700 rounded-lg border-2 border-gray-600 flex items-center justify-center">
                            {isCameraOff ? <FiVideoOff className="text-2xl" /> : <p className="text-xs">Your video</p>}
                        </div>
                    </div>
                </main>

                {/* Chat Sidebar */}
                <aside className="w-80 bg-gray-800 border-l border-gray-700 p-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-4 flex items-center"><FiMessageSquare className="mr-2"/> Chat</h2>
                    <div className="flex-1 overflow-y-auto mb-4">
                        {mockSession.chatMessages.map((msg, i) => <ChatMessage key={i} name={msg.name} message={msg.message} />)}
                    </div>
                    <div className="flex">
                        <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-700 rounded-l-md p-2 text-sm focus:outline-none"/>
                        <button className="bg-blue-600 px-4 rounded-r-md hover:bg-blue-700">Send</button>
                    </div>
                </aside>
            </div>

            {/* Footer Controls */}
            <footer className="bg-gray-900 border-t border-gray-700 p-3 flex items-center justify-center space-x-4 sticky bottom-0 z-20">
                <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'}`}>
                    {isMuted ? <FiMicOff /> : <FiMic />}
                </button>
                <button onClick={() => setIsCameraOff(!isCameraOff)} className={`p-3 rounded-full ${isCameraOff ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'}`}>
                    {isCameraOff ? <FiVideoOff /> : <FiVideo />}
                </button>
                <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500">
                    <FiShare />
                </button>
                <button className="p-3 rounded-full bg-gray-600 hover:bg-gray-500">
                    <FiMoreVertical />
                </button>
            </footer>
        </div>
    );
}

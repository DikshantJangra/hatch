"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiSend } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

export default function ChatPage() {
    const params = useParams();
    const sessionId = params.id;

    // In a real app, you would fetch session and message data based on the sessionId
    const mockChat = {
        mentorName: "John Doe",
        messages: [
            { sender: "John Doe", text: "Hey, how are you doing with that PR?", time: "10:00 AM" },
            { sender: "You", text: "I'm a bit stuck on the last part.", time: "10:02 AM" },
            { sender: "John Doe", text: "No worries, let's walk through it. Can you share the code?", time: "10:03 AM" },
        ]
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center">
                    <Link href="/contributor/sessions" className="p-2 rounded-full hover:bg-gray-100 mr-4">
                        <FiArrowLeft className="text-gray-600" />
                    </Link>
                    <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">{mockChat.mentorName}</h1>
                        <p className="text-sm text-green-500">Online</p>
                    </div>
                </div>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                    {mockChat.messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-10 h-10 rounded-full ${msg.sender === 'You' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <div className={`max-w-md p-3 rounded-lg ${msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-white border'}`}>
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs mt-1 opacity-75 text-right">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Message Input */}
            <footer className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
                <div className="flex items-center space-x-4">
                    <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1 border-gray-300 rounded-full py-3 px-5 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                        <FiSend size={20} />
                    </button>
                </div>
            </footer>
        </div>
    );
}

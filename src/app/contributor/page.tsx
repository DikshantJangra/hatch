"use client";
import { useState } from "react";
import { FiSearch, FiPaperclip, FiCode, FiSend, FiMoreVertical } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const conversations = [
  {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    lastMessage: "Hey, how are you?",
    timestamp: "10:45 AM",
    unread: 2,
  },
  {
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    lastMessage: "Let's catch up later.",
    timestamp: "Yesterday",
    unread: 0,
  },
];

const messages = [
  {
    type: "received",
    content: "Hey, how are you?",
    timestamp: "10:45 AM",
  },
  {
    type: "sent",
    content: "I am good, thanks! How about you?",
    timestamp: "10:46 AM",
  },
  {
    type: "code",
    language: "javascript",
    content: `const greeting = "Hello, World!";
console.log(greeting);`,
    timestamp: "10:47 AM",
  },
  {
    type: "system",
    content: "You are now connected with John Doe.",
  },
];

export default function ContributorPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied!');
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-96 flex flex-col border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo, index) => (
            <div
              key={index}
              className={`flex items-center p-4 cursor-pointer ${
                selectedConversation.name === convo.name ? "bg-gray-200" : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedConversation(convo)}
            >
              <img src={convo.avatar} alt={convo.name} className="h-12 w-12 rounded-full" />
              <div className="ml-4 flex-1">
                <p className="font-semibold">{convo.name}</p>
                <p className="text-sm text-gray-600 truncate">{convo.lastMessage}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{convo.timestamp}</p>
                {convo.unread > 0 && (
                  <span className="mt-1 inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                    {convo.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center">
            <img src={selectedConversation.avatar} alt={selectedConversation.name} className="h-10 w-10 rounded-full" />
            <div className="ml-4">
              <p className="font-semibold">{selectedConversation.name}</p>
              <p className="text-sm text-green-500">Available</p>
            </div>
          </div>
          <FiMoreVertical size={24} className="text-gray-500 cursor-pointer" />
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${
              msg.type === 'sent' ? 'justify-end' : 'justify-start'
            } mb-4`}>
              {msg.type === 'system' ? (
                <div className="w-full text-center text-sm text-gray-500">{msg.content}</div>
              ) : msg.type === 'code' ? (
                <div className="w-full max-w-lg bg-gray-800 text-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{msg.language}</span>
                    <button className="text-sm hover:underline" onClick={() => handleCopy(msg.content)}>Copy Code</button>
                  </div>
                  <SyntaxHighlighter language={msg.language} style={atomDark}>
                    {msg.content}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <div className={`p-3 rounded-lg max-w-lg ${
                  msg.type === 'sent' ? 'bg-blue-500 text-white' : 'bg-white'
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.type === 'sent' ? 'text-blue-200' : 'text-gray-500'
                  }`}>{msg.timestamp}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center">
            <textarea
              placeholder="Type your message or drop a file..."
              className="flex-1 p-2 border border-gray-300 rounded-lg resize-none"
              rows={1}
            ></textarea>
            <button className="ml-2 p-2 rounded-lg hover:bg-gray-100">
              <FiPaperclip size={20} className="text-gray-600" />
            </button>
            <button className="ml-2 p-2 rounded-lg hover:bg-gray-100">
              <FiCode size={20} className="text-gray-600" />
            </button>
            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
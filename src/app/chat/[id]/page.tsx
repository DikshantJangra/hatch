"use client";

import React from 'react';
import ChatWindow from '@/components/chat/ChatWindow';
import { useParams } from 'next/navigation';

const ChatPage = () => {
  const params = useParams();
  const roomId = params.id as string;

  // Mock data for the other user. In a real application, you would fetch this based on roomId or other logic.
  const mockOtherUser = {
    id: 'mentor-1', // This should ideally be dynamic based on the chat room
    name: 'Mentor John Doe',
    avatar: 'https://www.gravatar.com/avatar/?d=mp', // Placeholder avatar
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for chat list - Placeholder for now */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Chats</h3>
        {/* Example chat item */}
        <div className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <img src={mockOtherUser.avatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
          <span className="font-medium">{mockOtherUser.name}</span>
        </div>
        {/* More chat items would go here */}
      </div>

      {/* Main Chat Panel */}
      <div className="flex-1 flex flex-col">
        <ChatWindow
          roomId={roomId}
          otherUserId={mockOtherUser.id}
          otherUserName={mockOtherUser.name}
          otherUserAvatar={mockOtherUser.avatar}
        />
      </div>
    </div>
  );
};

export default ChatPage;
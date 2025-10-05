"use client";

import ChatWindow from "@/components/chat/ChatWindow";
import { useUser } from "@/hooks/useUser";

export default function ChatPage() {
  const { user } = useUser();

  // For demonstration, we'll use mock data for the other user.
  // In a real application, this would come from dynamic routing (e.g., /sessions/[id])
  // or from a list of active chat partners.
  const mockOtherUserId = "mentor-1";
  const mockOtherUserName = "Dr. Evelyn Reed";
  const mockOtherUserAvatar = "https://www.gravatar.com/avatar/?d=mp"; // Placeholder

  // Determine the current user's ID for the chat room. Fallback for testing.
  const currentUserId = user?.id || "contributor-1";

  // A simple way to create a consistent room ID between two users.
  // In a real app, this would be managed by the backend.
  const roomId = [currentUserId, mockOtherUserId].sort().join('-');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-3xl h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
          <ChatWindow
            roomId={roomId}
            otherUserId={mockOtherUserId}
            otherUserName={mockOtherUserName}
            otherUserAvatar={mockOtherUserAvatar}
          />
        </div>
      </div>
    </div>
  );
}

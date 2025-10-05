"use client";

import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react';

import { FiSend, FiCode, FiPaperclip, FiSmile } from 'react-icons/fi';
import { useUser } from '@/hooks/useUser'; // Assuming useUser hook exists for current user info

// --- 1. Chat State Management (using React hooks instead of Zustand) ---
interface Message {
  id: string;
  roomId: string;
  senderId: string;
  content: { type: 'text' | 'code' | 'image' | 'system'; body: string };
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  usersInRoom: string[];
  isTyping: { [userId: string]: boolean };
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_USERS_IN_ROOM'; payload: string[] }
  | { type: 'SET_TYPING_STATUS'; payload: { userId: string; typing: boolean } };

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_USERS_IN_ROOM':
      return { ...state, usersInRoom: action.payload };
    case 'SET_TYPING_STATUS':
      return {
        ...state,
        isTyping: {
          ...state.isTyping,
          [action.payload.userId]: action.payload.typing,
        },
      };
    default:
      return state;
  }
};

// --- 2. Mock WebSocket Service (for demonstration) ---
// In a real app, this would connect to a backend WebSocket server.
// For now, it simulates sending/receiving messages and user events.
class MockWebSocket {
  private listeners: { [event: string]: Function[] } = {};
  private roomId: string | null = null;
  private userId: string | null = null;

  constructor() {
    console.log("MockWebSocket initialized.");
  }

  connect(roomId: string, userId: string) {
    this.roomId = roomId;
    this.userId = userId;
    console.log(`MockWebSocket connected to room ${roomId} for user ${userId}`);
    // Simulate joining room and receiving initial messages/users
    setTimeout(() => {
      this.emit('server:user_joined', { userId: 'mentor-1' });
      this.emit('server:user_joined', { userId: 'contributor-1' });
      this.emit('server:receive_message', {
        id: 'msg1',
        roomId,
        senderId: 'mentor-1',
        content: { type: 'text', body: 'Hello there! How can I help you today?' },
        timestamp: new Date().toISOString(),
      });
      this.emit('server:receive_message', {
        id: 'msg2',
        roomId,
        senderId: 'contributor-1',
        content: { type: 'text', body: 'Hi! I need some help with my React project.' },
        timestamp: new Date().toISOString(),
      });
    }, 1000);
  }

  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event: string, data: any) {
    console.log(`MockWebSocket emitting: ${event}`, data);
    this.listeners[event]?.forEach((callback) => callback(data));
  }

  send(event: string, data: any) {
    console.log(`MockWebSocket sending: ${event}`, data);
    // Simulate server response
    if (event === 'client:send_message') {
      setTimeout(() => {
        this.emit('server:receive_message', {
          ...data.messageObject,
          id: `mock-msg-${Date.now()}`,
          timestamp: new Date().toISOString(),
        });
      }, 200);
    }
    if (event === 'client:typing_indicator') {
      // Simulate other user typing status
      setTimeout(() => {
        const otherUserId = data.userId === 'mentor-1' ? 'contributor-1' : 'mentor-1';
        this.emit('server:typing_indicator', { userId: otherUserId, isTyping: data.isTyping });
      }, 500);
    }
  }

  disconnect() {
    console.log("MockWebSocket disconnected.");
    this.listeners = {};
    this.roomId = null;
    this.userId = null;
  }
}

const mockWs = new MockWebSocket();

// --- 3. Individual Chat Components ---

// ChatHeader
interface ChatHeaderProps {
  otherUserName: string;
  otherUserStatus: string; // e.g., 'Online', 'Typing...'
  otherUserAvatar: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ otherUserName, otherUserStatus, otherUserAvatar }) => (
  <div className="flex items-center p-4 border-b border-gray-200 bg-white">
    <img src={otherUserAvatar} alt={otherUserName} className="w-10 h-10 rounded-full mr-3" />
    <div>
      <h2 className="font-semibold text-lg text-gray-800">{otherUserName}</h2>
      <p className="text-sm text-gray-500">{otherUserStatus}</p>
    </div>
    {/* Add actions like View Profile, End Session here */}
  </div>
);

// CodeSnippet (using a simple pre/code block for now, would integrate react-syntax-highlighter)
interface CodeSnippetProps {
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code }) => (
  <pre className="bg-gray-800 text-white p-3 rounded-md text-sm overflow-x-auto my-2">
    <code>{code}</code>
  </pre>
);

// MessageBubble
interface MessageBubbleProps {
  message: Message;
  isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
  const bubbleClass = isSender
    ? 'bg-blue-500 text-white rounded-br-none ml-auto'
    : 'bg-gray-200 text-gray-800 rounded-bl-none mr-auto';
  const alignmentClass = isSender ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${alignmentClass} mb-3`}>
      <div className={`max-w-[70%] p-3 rounded-lg shadow-sm ${bubbleClass}`}>
        {message.content.type === 'text' ? (
          <p className="text-sm">{message.content.body}</p>
        ) : (
          <CodeSnippet code={message.content.body} />
        )}
        <p className="text-xs opacity-75 mt-1 text-right">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

// MessageList
interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser(); // Get current user to determine isSender

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} isSender={msg.senderId === user?.id} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

// ChatInput
interface ChatInputProps {
  onSendMessage: (content: { type: 'text' | 'code'; body: string }) => void;
  onTyping: (isTyping: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onTyping }) => {
  const [message, setMessage] = useState('');
  const [isCodeMode, setIsCodeMode] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000); // Debounce typing indicator
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage({ type: isCodeMode ? 'code' : 'text', body: message.trim() });
      setMessage('');
      onTyping(false); // Stop typing after sending
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white flex items-end">
      <button
        type="button"
        onClick={() => setIsCodeMode(!isCodeMode)}
        className={`p-2 rounded-full ${isCodeMode ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
        title={isCodeMode ? 'Switch to Text Mode' : 'Switch to Code Mode'}
      >
        <FiCode size={20} />
      </button>
      <textarea
        value={message}
        onChange={handleInputChange}
        placeholder={isCodeMode ? 'Write your code here...' : 'Type your message...'}
        className="flex-1 mx-3 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
        <FiSend size={20} />
      </button>
    </form>
  );
};

// --- 4. Main ChatWindow Component ---
interface ChatWindowProps {
  roomId: string;
  otherUserId: string; // ID of the other participant
  otherUserName: string;
  otherUserAvatar: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ roomId, otherUserId, otherUserName, otherUserAvatar }) => {
  const { user } = useUser(); // Current logged-in user
  const [chatState, dispatch] = useReducer(chatReducer, {
    messages: [],
    usersInRoom: [],
    isTyping: {},
  });
  const { messages, isTyping } = chatState;
  const currentUserId = user?.id || 'contributor-1'; // Fallback for testing

  useEffect(() => {
    if (!currentUserId) return;

    mockWs.connect(roomId, currentUserId);

    mockWs.on('server:receive_message', (msg: Message) => {
      dispatch({ type: 'ADD_MESSAGE', payload: msg });
      dispatch({ type: 'SET_TYPING_STATUS', payload: { userId: msg.senderId, typing: false } });
    });

    mockWs.on('server:user_joined', (data: { userId: string }) => {
      console.log(`${data.userId} joined the room.`);
      // In a real app, you'd update usersInRoom state
    });

    mockWs.on('server:typing_indicator', (data: { userId: string; isTyping: boolean }) => {
      if (data.userId !== currentUserId) {
        dispatch({ type: 'SET_TYPING_STATUS', payload: { userId: data.userId, typing: data.isTyping } });
      }
    });

    return () => {
      mockWs.disconnect();
    };
  }, [roomId, currentUserId, dispatch]);

  const handleSendMessage = useCallback((content: { type: 'text' | 'code'; body: string }) => {
    const newMessage: Message = {
      id: `temp-${Date.now()}`, // Temp ID, real ID from server
      roomId,
      senderId: currentUserId,
      content,
      timestamp: new Date().toISOString(),
    };
    mockWs.send('client:send_message', { messageObject: newMessage });
  }, [roomId, currentUserId]);

  const handleTyping = useCallback((typing: boolean) => {
    mockWs.send('client:typing_indicator', { userId: currentUserId, isTyping: typing });
  }, [currentUserId]);

  const otherUserTyping = isTyping[otherUserId] ? 'Typing...' : 'Online';

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      <ChatHeader
        otherUserName={otherUserName}
        otherUserStatus={otherUserTyping}
        otherUserAvatar={otherUserAvatar}
      />
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
};

export default ChatWindow;

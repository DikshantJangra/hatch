// src/app/mentor/page.tsx
'use client'; // This is a Client Component

import React, { useState } from 'react';
import MentorNavbar from '@/components/layout/MentorNavbar';
import WelcomeAvailabilityWidget from '@/components/mentor/WelcomeAvailabilityWidget';
import StatisticsSummaryWidget from '@/components/mentor/StatisticsSummaryWidget';
import MentorshipRequestsWidget from '@/components/mentor/MentorshipRequestsWidget';
import ActiveSessionsWidget from '@/components/mentor/ActiveSessionsWidget';
import ScheduledGroupSessionsWidget from '@/components/mentor/ScheduledGroupSessionsWidget';
import RecentFeedbackWidget from '@/components/mentor/RecentFeedbackWidget';

// Mock Data (will eventually come from API)
const MOCK_MENTOR_NAME = "Dr. Alex Smith";

const MOCK_MENTORSHIP_REQUESTS = [
  {
    id: 'req1',
    studentName: 'Alice Johnson',
    messageSnippet: 'Looking for guidance on React hooks...',
    skillTags: ['React', 'Frontend', 'JavaScript'],
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 'req2',
    studentName: 'Bob Williams',
    messageSnippet: 'Need help with Python backend development.',
    skillTags: ['Python', 'Backend', 'Django'],
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
];

const MOCK_ACTIVE_SESSIONS = [
  {
    id: 'sess1',
    studentName: 'Charlie Brown',
    lastMessageSnippet: 'Thanks for the advice on algorithms!',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    hasUnreadMessages: true,
  },
  {
    id: 'sess2',
    studentName: 'Diana Prince',
    lastMessageSnippet: 'I\'ll review the PR by tomorrow.',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    hasUnreadMessages: false,
  },
];

const MOCK_SCHEDULED_SESSIONS = [
  {
    id: 'group1',
    title: 'Advanced React Patterns',
    dateTime: 'Oct 26, 2025 - 10:00 AM',
    attendees: 12,
  },
  {
    id: 'group2',
    title: 'Intro to Cloud Computing',
    dateTime: 'Nov 01, 2025 - 02:00 PM',
    attendees: 8,
  },
];

const MOCK_RECENT_FEEDBACK = [
  {
    id: 'fb1',
    rating: 5,
    comment: 'Dr. Smith was incredibly helpful and clear!',
  },
  {
    id: 'fb2',
    rating: 4,
    comment: 'Good session, learned a lot about debugging.',
  },
];


export default function MentorDashboardPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [mentorshipRequests, setMentorshipRequests] = useState(MOCK_MENTORSHIP_REQUESTS);
  const [activeSessions, setActiveSessions] = useState(MOCK_ACTIVE_SESSIONS);
  const [scheduledSessions, setScheduledSessions] = useState(MOCK_SCHEDULED_SESSIONS);
  const [recentFeedback, setRecentFeedback] = useState(MOCK_RECENT_FEEDBACK);

  const handleToggleAvailability = () => {
    setIsAvailable((prev) => !prev);
    // In a real app, this would trigger an API call to update mentor's status
    console.log("Toggling availability to:", !isAvailable);
  };

  const handleAcceptRequest = (id: string) => {
    const acceptedRequest = mentorshipRequests.find(req => req.id === id);
    if (acceptedRequest) {
      setMentorshipRequests(prev => prev.filter(req => req.id !== id));
      // Simulate moving to active sessions and navigating to chat
      setActiveSessions(prev => [
        ...prev,
        {
          id: acceptedRequest.id, // Reusing ID for simplicity
          studentName: acceptedRequest.studentName,
          lastMessageSnippet: 'Session started!',
          avatarUrl: acceptedRequest.avatarUrl,
          hasUnreadMessages: true,
        },
      ]);
      console.log(`Accepted request ${id}. Navigating to chat with ${acceptedRequest.studentName}`);
      // In a real app, navigate to chat page: router.push(`/mentor/chat/${id}`);
    }
  };

  const handleDeclineRequest = (id: string) => {
    setMentorshipRequests(prev => prev.filter(req => req.id !== id));
    console.log(`Declined request ${id}`);
    // In a real app, this would trigger an API call to decline the request
  };

  const handleContinueChat = (id: string) => {
    console.log(`Continuing chat with session ${id}`);
    // In a real app, navigate to chat page: router.push(`/mentor/chat/${id}`);
  };

  const handleScheduleNewGroupSession = () => {
    console.log("Opening modal to schedule new group session.");
    // In a real app, open a modal or navigate to a scheduling page
  };

  const handleViewAllFeedback = () => {
    console.log("Navigating to detailed feedback page.");
    // In a real app, navigate to feedback page: router.push('/mentor/feedback');
  };


  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <MentorNavbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#111827] mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area (2 columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <WelcomeAvailabilityWidget
              mentorName={MOCK_MENTOR_NAME}
              isAvailable={isAvailable}
              onToggleAvailability={handleToggleAvailability}
            />

            <MentorshipRequestsWidget
              requests={mentorshipRequests}
              onAccept={handleAcceptRequest}
              onDecline={handleDeclineRequest}
            />

            <ActiveSessionsWidget
              sessions={activeSessions}
              onContinueChat={handleContinueChat}
            />
          </div>

          {/* Sidebar (1 column on desktop) */}
          <div className="lg:col-span-1 space-y-6">
            <StatisticsSummaryWidget
              pendingRequests={mentorshipRequests.length}
              sessionsThisWeek={MOCK_ACTIVE_SESSIONS.length} // Using mock for now
              avgRating={4.9} // Using mock for now
              totalMentees={58} // Using mock for now
            />

            <ScheduledGroupSessionsWidget
              sessions={scheduledSessions}
              onScheduleNew={handleScheduleNewGroupSession}
            />

            <RecentFeedbackWidget
              feedback={recentFeedback}
              onViewAll={handleViewAllFeedback}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
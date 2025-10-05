"use client";
import { useState, useEffect } from 'react';
import { FiGithub, FiEdit, FiPlus } from 'react-icons/fi';
import { useUser } from '@/hooks/useUser';
import Loading from '@/components/ui/Loading';

export default function ProfileInformationCard() {
  const { user, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.user_name || user.user_metadata?.full_name || 'No Name');
      setAvatarUrl(user.user_metadata?.avatar_url || '');
      setGithubUrl(user.user_metadata?.html_url || `https://github.com/${user.user_metadata?.user_name}`);
      setJoinDate(new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }));
      // Assuming goal and interests might be stored in user_metadata or a separate profile table
      // For now, keeping them as static or empty if not available
      setGoal(user.user_metadata?.goal || '');
      setInterests(user.user_metadata?.interests || ['React', 'Node.js', 'UI/UX', 'TypeScript']);
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">Please log in to view your profile.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Avatar Section */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <img src={avatarUrl} alt="User Avatar" className="rounded-full w-full h-full object-cover" />
        <button className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 text-xs">
          Change
        </button>
      </div>

      {/* User Details */}
      <div className="text-center mb-6">
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-2xl font-bold text-center bg-gray-100 rounded-md p-1"
          />
        ) : (
          <h2 className="text-2xl font-bold">{name}</h2>
        )}
        <p className="text-sm text-gray-500">Joined Hatch! {joinDate}</p>
        <button
          onClick={handleEditToggle}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </div>

      {/* Goal Statement */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">My Learning Goal</h3>
        {isEditing ? (
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full text-sm bg-gray-100 rounded-md p-2"
            rows={3}
          />
        ) : (
          <p className="text-sm text-gray-700">
            {goal || "e.g., 'To successfully merge my first pull request into an open-source project.'"}
          </p>
        )}
      </div>

      {/* Interests Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">My Interests</h3>
          <button className="text-gray-500 hover:text-gray-800">
            <FiPlus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <span key={interest} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* External Links */}
      <div>
        <h3 className="font-semibold text-lg mb-2">My Links</h3>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <FiGithub size={20} className="mr-3 text-gray-800" />
          <span className="text-sm font-medium text-gray-800">View GitHub Profile</span>
        </a>
      </div>
    </div>
  );
}
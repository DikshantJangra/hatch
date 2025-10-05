import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FaGithub } from 'react-icons/fa';

interface GithubButtonProps {
  text: string;
}

export default function GithubButton({ text }: GithubButtonProps) {
  const supabase = createClientComponentClient();
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full px-4 py-3 font-semibold bg-transparent border border-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-gray-800 flex items-center justify-center"
    >
      <FaGithub className="mr-2" />
      {text}
    </button>
  );
}
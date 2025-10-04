import { supabase } from '@/lib/supabase';

export default function GithubButton() {
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full px-4 py-3 font-semibold text-white bg-[#2da44e] border border-transparent rounded-md shadow-sm hover:bg-[#2c974b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800"
    >
      Login with GitHub
    </button>
  );
}

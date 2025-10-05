'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GithubButton from '@/components/auth/GithubButton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push('/contributor');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"#171717\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"/%3E%3C/g%3E%3C/svg%3E')" }}>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <Image src="/file.svg" alt="Orion Logo" width={28} height={28} />
            <span className="ml-3 text-2xl font-bold">Hatch</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">Welcome back</h1>
          <p className="text-gray-400 mb-8">Log in to continue to your account.</p>
          
          <form className="space-y-4 mt-8" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 mt-1 bg-[#1F1F1F] border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 mt-1 bg-[#1F1F1F] border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm placeholder-gray-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold text-gray-900 bg-[#90EE90] border border-transparent rounded-md shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0A0A0A] text-gray-400">Or</span>
            </div>
          </div>

          <GithubButton text="Login with GitHub" />

          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Don&apos;t have an account?</p>
              <Link href="/signup" className="px-6 py-2 border border-gray-600 rounded-md text-sm font-medium hover:bg-gray-800">
                Sign up
              </Link>
            </div>
          </div>

        </div>
      </div>
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/hatch.png"
          alt="Hatch"
          layout="fill"
          objectFit="cover"
        />
         <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
    </div>
  );
}
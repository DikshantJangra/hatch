import Link from 'next/link';
import Image from 'next/image';

export default function PasswordPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"#171717\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"/%3E%3C/g%3E%3C/svg%3E')" }}>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <Image src="/file.svg" alt="Orion Logo" width={28} height={28} />
            <span className="ml-3 text-2xl font-bold">Orion</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">Create your password</h1>
          <p className="text-gray-400 mb-8">You'll use this to log in to your account.</p>
          
          <form className="space-y-4 mt-8">
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Your password"
                className="w-full px-4 py-3 mt-1 bg-[#1F1F1F] border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm placeholder-gray-500"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-400">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm your password"
                className="w-full px-4 py-3 mt-1 bg-[#1F1F1F] border border-gray-700 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm placeholder-gray-500"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold text-gray-900 bg-[#90EE90] border border-transparent rounded-md shadow-sm hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800"
              >
                Create account
              </button>
            </div>
          </form>

        </div>
      </div>
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/signup.png"
          alt="Galaxy"
          layout="fill"
          objectFit="cover"
        />
         <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
    </div>
  );
}
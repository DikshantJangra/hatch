import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"#171717\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M0 40L40 0H20L0 20M40 40V20L20 40\"/%3E%3C/g%3E%3C/svg%3E')" }}>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <Image src="/file.svg" alt="Orion Logo" width={28} height={28} />
            <span className="ml-3 text-2xl font-bold">Orion</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">Welcome to Hatch</h1>
          <p className="text-gray-400 mb-8">
            Connect, Learn, and Grow with Open Source Mentors.
            <br />
            Sign up to start your journey in open source contribution and mentorship.
          </p>
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-[#2da44e] border border-transparent rounded-md shadow-sm hover:bg-[#2c974b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 focus:ring-offset-gray-800"
            >
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/login.png"
          alt="Galaxy"
          layout="fill"
          objectFit="cover"
        />
         <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
    </div>
  );
}

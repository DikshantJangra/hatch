"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuBell,
  LuUser,
  LuSettings,
  LuLogOut,
  LuMenu,
  LuX,
  LuToggleRight,
  LuToggleLeft,
} from "react-icons/lu";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/ui/Loading";

const MentorNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const pathname = usePathname();
  const { user, loading, logout } = useUser();

  const navLinks = [
    { href: "/mentor", text: "Dashboard" },
    { href: "/mentor/sessions", text: "Sessions" },
    { href: "/mentor/community", text: "Community" },
    { href: "/sessions", text: "Chat" },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <Link href="/mentor" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-gray-800 font-sans">Hatch</h1>
            </Link>
          </div>

          {/* Center Section */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <LuBell className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.user_metadata?.avatar_url || "https://www.gravatar.com/avatar/?d=mp"}
                      alt=""
                    />
                  </button>
                </div>
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      href="/mentor/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LuUser className="mr-3 h-4 w-4" />
                      My Profile
                    </Link>
                    <button
                      onClick={() => setIsAvailable(!isAvailable)}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {isAvailable ? (
                        <LuToggleRight className="mr-3 h-4 w-4" />
                      ) : (
                        <LuToggleLeft className="mr-3 h-4 w-4" />
                      )}
                      Availability
                    </button>
                    <Link
                      href="/mentor/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LuSettings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                  <button
                    onClick={logout}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <LuLogOut className="mr-3 h-4 w-4" />
                    Sign out
                  </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <LuX className="block h-6 w-6" />
              ) : (
                <LuMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.user_metadata?.avatar_url || "https://www.gravatar.com/avatar/?d=mp"}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-gray-800">
                  {user?.user_metadata?.user_name || user?.user_metadata?.full_name || "Guest"}
                </div>
                <div className="text-sm font-medium leading-none text-gray-500">
                  {user?.email || ""}
                </div>
              </div>
              <button className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">View notifications</span>
                <LuBell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/mentor/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                {isAvailable ? "Set to Unavailable" : "Set to Available"}
              </button>
              <Link
                href="/mentor/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full text-left"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MentorNavbar;
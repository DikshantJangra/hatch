"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import { FaFeather } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import Loading from "@/components/ui/Loading";

const ContributorNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useUser();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/contributor/find-mentor", text: "Find a Mentor" },
    { href: "/contributor/sessions", text: "My Sessions" },
    { href: "/contributor/community", text: "Community" },
    { href: "/chat/general", icon: FiMessageSquare, text: "Chat" },
  ];

  const NavLink = ({ href, text, icon: Icon }: { href: string; text: string; icon?: React.ElementType }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive
            ? "text-gray-900"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        } ${
          Icon ? "flex items-center justify-center" : ""
        }`}
      >
        {Icon ? <Icon size={20} /> : text}
        {isActive && (
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-black rounded-full"></span>
        )}
      </Link>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-white z-[1000] border-b border-gray-200">
        <nav className="flex items-center justify-between h-full px-4 md:px-6">
          {/* Left Section & Mobile Hamburger */}
          <div className="flex items-center space-x-2">
            <Link href="/discover" className="flex items-center space-x-2">
              <FaFeather className="w-6 h-6 text-gray-900" />
              <span className="font-semibold text-lg text-gray-900">
                Hatch
              </span>
            </Link>
            {/* Hamburger Menu Button - Appears on mobile */}
            <div className="md:hidden pl-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open main menu"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>

          {/* Center Section - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} text={link.text} icon={link.icon} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <FiBell size={20} />
              {/* Example of a notification dot - logic would be needed to show this */}
              {/* <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-red-500 rounded-full"></span> */}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
              >
                <img
                  src={user?.user_metadata?.avatar_url || "https://www.gravatar.com/avatar/?d=mp"}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <span className="hidden md:block text-sm font-medium text-gray-800">
                  {user?.user_metadata?.user_name || user?.user_metadata?.full_name || "Guest"}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                  <Link
                    href="/profile/me"
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiUser size={16} className="mr-3" />
                    My Profile & Progress
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiSettings size={16} className="mr-3" />
                    Account Settings
                  </Link>
                  <div className="my-1 h-px bg-gray-100"></div>
                  <button onClick={logout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <FiLogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-16 left-0 z-[999] w-full h-[calc(100%-4rem)] bg-white/80 backdrop-blur-sm md:hidden transition-opacity duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <nav className="flex flex-col space-y-2 p-4 bg-white border-b border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-base font-medium ${
                pathname === link.href
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              } ${
                link.icon ? "flex items-center space-x-2" : ""
              }`}
            >
              {link.icon && <link.icon size={20} />}
              <span>{link.text}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default ContributorNavbar;
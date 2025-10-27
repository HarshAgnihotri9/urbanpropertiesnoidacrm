"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBars } from "react-icons/fa";

interface AdminNavbarProps {
  toggleSidebar: () => void;
}

export default function AdminNavbar({ toggleSidebar }: AdminNavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/"); // Redirect to home/login page
  };

  return (
    <div className="bg-gray-800 text-white shadow-md fixed top-0 left-0 right-0 z-20">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Brand Name */}
        <div className="text-2xl font-bold">
          <Link href="/admin-dashboard" className="text-white">
            Admin Dashboard
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-white text-2xl">
            <FaBars />
          </button>
        </div>

        {/* Logout Button */}
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

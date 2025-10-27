"use client";

import Link from "next/link";
import { 
  FaTachometerAlt, 
  FaUser, 
  FaClipboardList, 
  FaPhone, 
  FaHistory, 
  FaSignOutAlt, 
  FaCog 
} from "react-icons/fa";

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function AdminSidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
  return (
    <div
      className={`z-20 fixed top-0 left-0 h-full bg-gray-800 text-white shadow-xl transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        {/* Mobile Close Button */}
        <button
          onClick={toggleSidebar}
          className="text-white text-3xl md:hidden"
        >
          X
        </button>
      </div>

      {/* Sidebar Menu Items */}
      <nav className="mt-6">
        <Link
          href="/admin-dashboard"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaTachometerAlt className="mr-4 text-2xl" /> <span>Dashboard</span>
        </Link>
        <Link
          href="/admin/create-agent"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaUser className="mr-4 text-2xl" /> <span>Add Agents</span>
        </Link>
        <Link
          href="/admin/call-details"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaPhone className="mr-4 text-2xl" /> <span>Call Details</span>
        </Link>
        <Link
          href="/admin/call-metrics"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaHistory className="mr-4 text-2xl" /> <span>Metrics</span>
        </Link>
        <Link
          href="/admin/createLeads"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaCog className="mr-4 text-2xl" /> <span>Create Leads</span>
        </Link>
        <Link
          href="/admin/getLeads"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaSignOutAlt className="mr-4 text-2xl" /> <span>Leads List</span>
        </Link>
        <Link
          href="/admin/uploadLeads"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaSignOutAlt className="mr-4 text-2xl" /> <span>Upload Multiple Leads</span>
        </Link>
        <Link
          href="/admin/uploadownerleads"
          className="flex items-center px-6 py-3 mb-4 rounded-xl text-lg font-medium hover:bg-gray-700 transition-all duration-300"
        >
          <FaSignOutAlt className="mr-4 text-2xl" /> <span>Upload Owners Leads</span>
        </Link>
      </nav>
    </div>
  );
}

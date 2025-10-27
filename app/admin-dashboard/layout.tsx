"use client";

import { ReactNode, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { AgentProvider } from "./context/agent-context"; // ✅ import context provider

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AgentProvider>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col ml-0 md:ml-64">
          {/* Navbar */}
          <AdminNavbar toggleSidebar={toggleSidebar} />

          {/* Page Content */}
          <div className="flex-1 overflow-auto p-4 pt-20">{children}</div>
        </div>
      </div>
    </AgentProvider>
  );
}

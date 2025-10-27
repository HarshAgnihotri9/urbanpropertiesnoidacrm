"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "../Components/baseUrl";
import { useAgent } from "./context/agent-context"; // ✅ import context

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export default function AdminDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setSelectedAgent } = useAgent(); // ✅ access context function

  useEffect(() => {
    fetchAgents();
  }, []);

  // ✅ Fetch agents
  const fetchAgents = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/dashboard/agents`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await response.json();
      if (response.ok) {
        setAgents(data.agents);
      } else {
        setError("Error fetching agents.");
      }
    } catch  {
      setError("Server error. Please try again.");
    }
  };

  // ✅ Delete agent instantly

  // ✅ Go to update agent page using contex t
  const handleUpdate = (agent: Agent) => {
    setSelectedAgent(agent); // store agent globally
    router.push("/admin-dashboard/update-agent");
  };

  // ✅ Go to delete confirmation page using context
  const handleDeletePage = (agent: Agent) => {
    setSelectedAgent(agent); // store agent globally
    router.push("/admin-dashboard/delete-agent");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar and Navbar come from AdminLayout */}

      <div className="flex-1 p-8 sm:p-12 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8 text-center">
            Admin Dashboard
          </h2>

          {/* Error */}
          {error && <p className="text-red-600 text-center mb-6">{error}</p>}

          {/* Agents Table */}
          <div className="agents-section mt-12">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
              Manage Agents
            </h3>

            <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
              <table className="min-w-full table-auto">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base">
                      Name
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base">
                      Email
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base">
                      Phone
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm sm:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 sm:px-6 py-4 text-center text-gray-500"
                      >
                        No agents available
                      </td>
                    </tr>
                  ) : (
                    agents.map((agent) => (
                      <tr
                        key={agent._id}
                        className="hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="px-4 sm:px-6 py-4 text-gray-700">{agent.name}</td>
                        <td className="px-4 sm:px-6 py-4 text-gray-700">{agent.email}</td>
                        <td className="px-4 sm:px-6 py-4 text-gray-700">{agent.phone}</td>
                        <td className="px-4 sm:px-6 py-4 text-gray-700 flex flex-wrap gap-2">
                          <button
                            onClick={() => handleUpdate(agent)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeletePage(agent)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Agent */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => router.push("/admin/create-agent")}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
            >
              Add New Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

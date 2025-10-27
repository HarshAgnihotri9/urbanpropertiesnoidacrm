"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/Components/baseUrl";
import { useAgent } from "../context/agent-context";

const UpdateAgentPage = () => {
  const { selectedAgent, setSelectedAgent } = useAgent();
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Load selected agent data from context
  useEffect(() => {
    console.log(selectedAgent);
    
    if (selectedAgent) {
      setAgent({
        name: selectedAgent.name,
        email: selectedAgent.email,
        phone: selectedAgent.phone,
      });
    } else {
      // If no agent selected, redirect back
      router.push("/admin-dashboard");
    }
  }, [selectedAgent, router]);

  // ✅ Handle update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedAgent) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${baseUrl}/api/admin/dashboard/agents/${selectedAgent._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(agent),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSelectedAgent(null); // clear selected agent
        router.push("/admin-dashboard");
      } else {
        setError(data.message || "Error updating agent.");
      }
    } catch{
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Update Agent
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={agent.name}
          onChange={(e) => setAgent({ ...agent, name: e.target.value })}
          placeholder="Agent Name"
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-black text-black"
          required
        />
        <input
          type="email"
          value={agent.email}
          onChange={(e) => setAgent({ ...agent, email: e.target.value })}
          placeholder="Agent Email"
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-black text-black"
          required
        />
        <input
          type="tel"
          value={agent.phone}
          onChange={(e) => setAgent({ ...agent, phone: e.target.value })}
          placeholder="Agent Phone"
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-black text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Update Agent
        </button>
      </form>
    </div>
  );
};

export default UpdateAgentPage;

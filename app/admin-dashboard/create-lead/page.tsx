"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/Components/baseUrl";

interface Agent {
  _id: string;
  name: string;
}

interface Lead {
  name: string;
  phone: string;
  email: string;
  source: string;
  assignedTo: string;
  notes: string;
}

export default function CreateLead() {
  const [lead, setLead] = useState<Lead>({
    name: "",
    phone: "",
    email: "",
    source: "",
    assignedTo: "",
    notes: "",
  });
  const [agents, setAgents] = useState<Agent[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Fetch agents
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/admin/dashboard/agents`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        if (response.ok) {
          setAgents(data.agents);
        } else {
          setError(data.message || "Error fetching agents");
        }
      } catch {
        setError("Server error. Please try again.");
      }
    };

    fetchAgents();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit Lead
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/admin/dashboard/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(lead),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Lead created successfully!");
        router.push("/admin-dashboard");
      } else {
        setError(data.message || "Error creating lead");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="bg-white min-h-[90vh] ">

    <div className="max-w-xl mx-auto pt-20 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Create New Lead
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={lead.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-black"
            placeholder="Enter lead name"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={lead.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-black"
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={lead.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-black"
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Source */}
        <div>
          <label htmlFor="source" className="block text-gray-700 font-medium mb-2">
            Lead Source
          </label>
          <select
            id="source"
            name="source"
            value={lead.source}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
            required
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Cold Call">Cold Call</option>
            <option value="Advertisement">Advertisement</option>
          </select>
        </div>

        {/* Assigned To */}
        <div>
          <label htmlFor="assignedTo" className="block text-gray-700 font-medium mb-2">
            Assign To Agent
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            value={lead.assignedTo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
            required
          >
            <option value="">Select an Agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={lead.notes}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 placeholder-gray-500 text-black"
            placeholder="Enter additional notes..."
          />
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md"
          >
            Create Lead
          </button>
        </div>
      </form>
    </div>
    </div>

  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAgent } from "../context/agent-context";
import { baseUrl } from "@/app/Components/baseUrl";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  assignedTo?: { _id: string; name: string };
}

export default function AssignLeadPage() {
  const router = useRouter();
  const params = useSearchParams();
  const leadId = params.get("id"); // Get lead ID from URL

  // Context for agents
  const { agents, setAgents, selectedAgent, setSelectedAgent } = useAgent();

  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch agents **once** if context is empty
  useEffect(() => {
    const fetchAgents = async () => {
      if (agents.length > 0) return; // Already in context
      try {
        const res = await fetch(`${baseUrl}/api/admin/dashboard/agents`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching agents");
        setAgents(data.agents);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error occurred");
      }
    };
    fetchAgents();
  }, [agents, setAgents]);

  // Fetch lead details
  useEffect(() => {
    const fetchLead = async () => {
      if (!leadId) return;
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/api/admin/leads/leadbyId/${leadId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error fetching lead");
        setLead(data.lead);
        setError("");
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Unknown error occurred");
      }
    finally {
        setIsLoading(false);
      }
    };
    fetchLead();
  }, [leadId]);

  // Handle lead assignment
  const handleAssign = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAgent) {
      setError("Please select an agent.");
      return;
    }
    try {
      const res = await fetch(`${baseUrl}/api/admin/leads/leads/${leadId}/assign`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ agentId: selectedAgent._id }),
      });
      const data: { message?: string } = await res.json();
      if (!res.ok) throw new Error(data.message || "Error assigning lead");

      setSuccess(true);
      setError("");
      setTimeout(() => router.push("/admin-dashboard"), 2000);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred");
    }
  };


  return (
    <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Assign Lead</h2>

      {success && <p className="text-green-500 text-center mb-4">Lead successfully assigned!</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {isLoading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          {/* Lead Details */}
          {lead && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50 text-gray-500">
              <h3 className="text-lg font-semibold">Lead Details</h3>
              <p><strong>Name:</strong> {lead.name}</p>
              <p><strong>Email:</strong> {lead.email}</p>
              <p><strong>Phone:</strong> {lead.phone}</p>
              <p><strong>Source:</strong> {lead.source}</p>
              <p><strong>Status:</strong> {lead.status}</p>
            </div>
          )}

          {/* Assignment Form */}
          <form onSubmit={handleAssign} className="space-y-4 bg-white">
            <div>
              <label className="block text-lg font-semibold text-black">Assign Agent</label>
              <select
                value={selectedAgent?._id || ""}
                onChange={(e) => {
                  const agent = agents.find(a => a._id === e.target.value) || null;
                  setSelectedAgent(agent);
                }}
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
              >
                <option value="">Select an Agent</option>
                {agents.map(agent => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                Assign Lead
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

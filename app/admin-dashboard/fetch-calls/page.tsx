"use client";

import { useState, useEffect } from "react";
import { baseUrl } from "@/app/Components/baseUrl"; // make sure constant exports BASE_URL

interface Call {
  _id: string;
  agent: { name: string };
  customerPhone: string;
  personSaid: string;
  status: string;
  feedback: string;
  // callStartedAt?: string;
  // callEndedAt?: string;
}

const Calls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/admin/dashboard/calls`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (response.ok) {
        setCalls(data.calls);
      } else {
        setError(data.message || "Error fetching calls.");
      }
    } catch  {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg min-h-[90vh]">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Call Logs</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500 mb-4">Loading...</p>}

      <div className="overflow-x-auto mt-4 bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Agent Name</th>
              <th className="px-4 py-2 text-left">Customer Phone</th>
              <th className="px-4 py-2 text-left">Person Said</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {calls.length === 0 && !loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                  No calls available.
                </td>
              </tr>
            ) : (
              calls.map((call) => (
                <tr key={call._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{call.agent.name}</td>
                  <td className="px-4 py-2">{call.customerPhone}</td>
                  <td className="px-4 py-2">{call.personSaid}</td>
                  <td className="px-4 py-2">{call.status}</td>
                  <td className="px-4 py-2">{call.feedback}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calls;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/Components/baseUrl";

export default function CreateAgentPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/admin/dashboard/agents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, phone, password }),
      });
      const data = await response.json();
      if (response.ok) {
        router.push("/admin-dashboard");
      } else {
        setError(data.message || "Error creating agent.");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl p-10 rounded-2xl shadow-2xl border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Create New Agent
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-6 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/** Name Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Agent Name"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-gray-600"
            required
          />

          {/** Email Input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Agent Email"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300  text-gray-600"
            required
          />

          {/** Phone Input */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Agent Phone"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-gray-600"
            required
          />

          {/** Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Agent Password"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-gray-600"
            required
          />

          {/** Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
}

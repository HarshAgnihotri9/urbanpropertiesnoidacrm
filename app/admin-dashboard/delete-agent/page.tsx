"use client";
import { useRouter } from "next/navigation";
import { useAgent } from "../context/agent-context";
import { baseUrl } from "@/app/Components/baseUrl";

export default function DeleteAgent() {
  const { selectedAgent, setSelectedAgent } = useAgent();
  const router = useRouter();
console.log(selectedAgent);

  const handleDelete = async () => {
    if (!selectedAgent) return alert("No agent selected");

    try {
      const response = await fetch(
        `${baseUrl}/api/admin/dashboard/agents/${selectedAgent._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.ok) {
        setSelectedAgent(null);
        router.push("/admin-dashboard");
      } else {
        alert("Failed to delete agent");
      }
    } catch {
      alert("Server error, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4 text-black">Delete Agent</h2>
        <p className="text-lg mb-6 text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-bold text-red-600">{selectedAgent?.name}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
          >
            Confirm Delete
          </button>
          <button
            onClick={() => router.push("/admin-dashboard")}
            className="bg-gray-500 px-6 py-2 rounded-md hover:bg-gray-400 "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

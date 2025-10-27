"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/app/Components/baseUrl";
import { useAgent } from "../context/agent-context";

interface Lead {
    _id: string;
    name: string;
    status: string;
    assignedTo?: { _id: string; name: string };
    source: string;
    priority?: string;
}

interface Agent {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
}

interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

export default function LeadsList() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [agents, setAgents] = useState<Agent[]>([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [assignedToFilter, setAssignedToFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { setSelectedAgent } = useAgent(); // ✅ access context function


    const router = useRouter();

    // Fetch leads with filters and pagination
    useEffect(() => {
        const fetchLeads = async () => {
            try {
                let url = `${baseUrl}/api/admin/leads/leads?page=${page}&limit=20`;
                if (statusFilter) url += `&status=${statusFilter}`;
                if (assignedToFilter) url += `&assignedTo=${assignedToFilter}`;
                if (priorityFilter) url += `&priority=${priorityFilter}`;

                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Error fetching leads");

                setLeads(data.data);
                setTotalPages(data.pagination.pages);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Server error");
                }
            }
        };

        fetchLeads();
    }, [statusFilter, assignedToFilter, priorityFilter, page]);

    // Fetch agents
    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/admin/dashboard/agents`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Error fetching agents");
                setAgents(data.agents);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Server error");
                }
            }
        };

        fetchAgents();
    }, []);

    // Pagination
    const nextPage = () => page < totalPages && setPage(page + 1);
    const prevPage = () => page > 1 && setPage(page - 1);

    // Handlers for Lead actions
    const handleUpdate = (lead: Lead) => {
        setSelectedAgent(lead); // store agent globally

        // store lead temporarily in localStorage
        // localStorage.setItem("selectedLead", JSON.stringify(lead));
        router.push(`/admin-dashboard/update-lead?id=${lead._id}`);
    };

    const handleAssign = (lead: Lead) => {
        // localStorage.setItem("selectedLead", JSON.stringify(lead));
        localStorage.setItem("selectedLead", JSON.stringify(lead));
        router.push(`/admin-dashboard/assign-lead?id=${lead._id}`);
    };

    const handleDeleteLead = async (leadId: string) => {
        try {
            const response = await fetch(`${baseUrl}/api/admin/leads/leads/${leadId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setLeads(leads.filter((lead) => lead._id !== leadId));
                // setIsDeleteModalOpen(false); // Close the modal after successful deletion
            } else {
                setError(data.message || "Error deleting lead");
            }
        } catch {
            setError("Server error. Please try again.");
        }
    };



    return (
        <div className="max-w-7xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Leads List</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Filters */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <select
                    className="p-2 border border-gray-300 rounded-lg text-black"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Closed">Closed</option>
                    <option value="Not Picked">Not Picked</option>
                    <option value="Follow-up">Follow-up</option>
                </select>

                <select
                    className="p-2 border border-gray-300 rounded-lg text-black"
                    value={assignedToFilter}
                    onChange={(e) => setAssignedToFilter(e.target.value)}
                >
                    <option value="">All Agents</option>
                    {agents.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                            {agent.name}
                        </option>
                    ))}
                </select>

                <select
                    className="p-2 border border-gray-300 rounded-lg text-black"
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                >
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse text-black">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Assigned To</th>
                            <th className="border px-4 py-2">Source</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead._id} className="hover:bg-gray-50 text-black">
                                <td className="border px-4 py-2">{lead.name}</td>
                                <td className="border px-4 py-2">{lead.status}</td>
                                <td className="border px-4 py-2">{lead.assignedTo?.name || "N/A"}</td>
                                <td className="border px-4 py-2">{lead.source}</td>
                                <td className="border px-4 py-2 flex flex-col gap-2">
                                    <button
                                        onClick={() => handleUpdate(lead)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                                    >
                                        Update Lead
                                    </button>
                                    <button
                                        onClick={() => handleAssign(lead)}
                                        className="px-3 py-1 bg-green-500 text-white rounded-lg"
                                    >
                                        Assign Lead
                                    </button>
                                    {lead && (
                                        <button
                                            onClick={() => handleDeleteLead(lead._id)} // ✅ pass the ID instead of the whole object
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg"
                                        >
                                            Delete Lead
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={prevPage}
                    disabled={page <= 1}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                    Previous
                </button>
                <span className="self-center">Page {page} of {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

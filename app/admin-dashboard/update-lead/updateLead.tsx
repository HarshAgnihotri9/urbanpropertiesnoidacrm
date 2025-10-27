"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { baseUrl } from "@/app/Components/baseUrl";

// ✅ Define Lead type
interface BudgetRange {
  min: string;
  max: string;
}

interface PropertyRequirements {
  propertyType: string;
  locationPreference: string;
  budgetRange: BudgetRange;
  bhkPreference?: string;
  furnishing?: string;
  possessionTimeline?: string;
}

interface Lead {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  status?: string;
  assignedTo?: string;
  lockedBy?: string | null;
  followUpTime?: string;
  notes?: string;
  priority?: string;
  propertyRequirements: PropertyRequirements;
}

// ✅ Helper to format date for input type="datetime-local"
const formatDateForInput = (dateString: string | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
};

export default function UpdateLeadPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [lead, setLead] = useState<Lead | null>(null);

  const [formData, setFormData] = useState<Lead>({
    name: "",
    phone: "",
    email: "",
    source: "",
    status: "",
    assignedTo: "",
    lockedBy: null,
    followUpTime: "",
    notes: "",
    priority: "",
    propertyRequirements: {
      propertyType: "",
      locationPreference: "",
      budgetRange: { min: "", max: "" },
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // ✅ Fetch lead data
  const fetchLead = async () => {
    if (!id) return;
    try {
      const res = await fetch(`${baseUrl}/api/admin/leads/leadbyId/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLead(data.lead);
        setFormData({
          name: data.lead.name || "",
          phone: data.lead.phone || "",
          email: data.lead.email || "",
          source: data.lead.source || "",
          status: data.lead.status || "",
          assignedTo: data.lead.assignedTo || "",
          lockedBy: data.lead.lockedBy || null,
          followUpTime: formatDateForInput(data.lead.followUpTime),
          notes: data.lead.notes || "",
          priority: data.lead.priority || "",
          propertyRequirements: {
            propertyType: data.lead.propertyRequirements?.propertyType || "",
            locationPreference:
              data.lead.propertyRequirements?.locationPreference || "",
            budgetRange: {
              min: data.lead.propertyRequirements?.budgetRange?.min || "",
              max: data.lead.propertyRequirements?.budgetRange?.max || "",
            },
            bhkPreference: data.lead.propertyRequirements?.bhkPreference || "",
            furnishing: data.lead.propertyRequirements?.furnishing || "",
            possessionTimeline:
              data.lead.propertyRequirements?.possessionTimeline || "",
          },
        });
        setError("");
      } else {
        setError(data.message || "Error fetching lead");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Server error. Please try again.");
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id,fetchLead]); // ✅ Correct dependency

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePropertyChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      propertyRequirements: { ...prev.propertyRequirements, [name]: value },
    }));
  };

  // const handleBudgetRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     propertyRequirements: {
  //       ...prev.propertyRequirements,
  //       budgetRange: { ...prev.propertyRequirements.budgetRange, [name]: value },
  //     },
  //   }));
  // };

  // ✅ Submit updated lead
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/api/admin/leads/leads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Lead updated successfully!");
        setError("");
        setTimeout(() => router.push("/admin-dashboard"), 1500);
      } else {
        setError(data.message || "Error updating lead");
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Server error. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Update Lead</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">{success}</p>}

      {lead ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-black">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-black">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-black">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-black">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select source</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
              </select>
            </div>
          </div>

          {/* Property Requirements */}
          <h3 className="text-xl font-semibold text-black">Property Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-black">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyRequirements.propertyType}
                onChange={handlePropertyChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select type</option>
                <option value="Flat">Flat</option>
                <option value="Villa">Villa</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
                <option value="PG">PG</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-black">Location Preference</label>
              <input
                type="text"
                name="locationPreference"
                value={formData.propertyRequirements.locationPreference}
                onChange={handlePropertyChange}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Update Lead
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-gray-600">Loading lead details...</p>
      )}
    </div>
  );
}

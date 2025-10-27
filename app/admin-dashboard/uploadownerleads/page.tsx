"use client";
import React, { useState } from "react";
import { baseUrl } from "@/app/Components/baseUrl";

export default function UploadOwnerLeads() {
  const [file, setFile] = useState<File | null>(null);
  const [propertyName, setPropertyName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage("");
    }
  };

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyName(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }
    if (!propertyName.trim()) {
      setMessage("Please enter a property name!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("propertyName", propertyName);

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/admin/dashboard/uploadownerleads`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ ${data.message}. Number of saved owners: ${data.savedOwners}`);
      } else {
        setMessage(`❌ Upload failed: ${data.error || data.message}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`❌ Upload failed: ${error.message}`);
      } else {
        setMessage("❌ Upload failed: Unknown error");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Upload Owner Leads</h2>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-gray-50 border-l-4 border-indigo-600 rounded text-black">
        <h3 className="font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-gray-700 space-y-1 text-sm">
          <li>Prepare an Excel file (.xlsx or .xls) with at least one sheet.</li>
          <li>
            Include the following columns (exact names):
            <ul className="list-disc list-inside ml-5">
              <li><strong>Tower/Flat no</strong></li>
              <li><strong>Owner name</strong></li>
              <li><strong>Contact no</strong></li>
            </ul>
          </li>
          <li>Enter the <strong>Property Name</strong> in the input below.</li>
          <li>Click <strong>Upload</strong> to process the Excel file.</li>
          <li>The system automatically sets status to `&quot;`New`&quot;` and fills timestamps.</li>
          <li>Rows missing required data will be ignored.</li>
        </ol>
        <div className="mt-2">
          <a
            href="/OwnerLeadsSample.xlsx"
            download
            className="text-indigo-600 hover:underline font-medium text-sm"
          >
            📥 Download Sample Excel File
          </a>
        </div>
      </div>

      {/* Input Fields */}
      <input
        type="text"
        placeholder="Enter Property Name"
        value={propertyName}
        onChange={handlePropertyChange}
        className="mb-3 p-2 border rounded w-full text-black"
      />

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-3 p-2 border rounded w-full text-black"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className="mt-3 text-center text-gray-700">{message}</p>}
    </div>
  );
}

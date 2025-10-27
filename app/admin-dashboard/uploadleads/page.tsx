"use client";

import React, { useState } from "react";
import { baseUrl } from "@/app/Components/baseUrl";

const LeadUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage("");
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token not found. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${baseUrl}/api/admin/dashboard/uploadleads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      
      setLoading(false);

      if (response.ok) {
        setMessage(
          `✅ File uploaded successfully! Total Processed: ${data.totalProcessed}, Successful: ${data.successful}`
        );
        setError("");
        setFile(null);
      } else {
        setError(data.message || "Error uploading file.");
        setMessage("");
      }
    } catch (err) {
      setError("An error occurred while uploading the file.");
      setMessage("");
      setLoading(false);
      console.log(err);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Upload Leads
        </h1>

        {/* Sample File Download */}
        <div className="mb-4 text-center">
          <a
            href="/sample-leads.xlsx"
            download
            className="text-blue-600 font-medium underline hover:text-blue-800"
          >
            📄 Download Sample File
          </a>
          <p className="text-gray-500 text-sm mt-1">Use this file as a template for your upload</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag and Drop Styled Input */}
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition-colors"
          >
            {file ? (
              <span className="text-gray-700 font-medium">{file.name}</span>
            ) : (
              <span className="text-gray-400">
                Click or drag your Excel file here (.xlsx or .xls)
              </span>
            )}
            <input
              type="file"
              id="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        {/* Feedback Messages */}
        {message && <p className="mt-4 text-green-600 text-center font-medium">{message}</p>}
        {error && <p className="mt-4 text-red-600 text-center font-medium">{error}</p>}
      </div>
    </div>
  );
};

export default LeadUpload;

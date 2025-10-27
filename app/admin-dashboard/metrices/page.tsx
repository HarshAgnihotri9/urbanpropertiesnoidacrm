"use client";

import { useState, useEffect } from "react";
import { baseUrl } from "@/app/Components/baseUrl"; // make sure you export BASE_URL from your constants

interface Metric {
  _id: string;
  name: string;
  assignedLeadsCount?: number;
  positive?: number;
  negative?: number;
  neutral?: number;
}

const Metrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseUrl}/api/admin/dashboard/metrics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMetrics(data.metrics);
        setError("");
      } else {
        setError(data.message || "Error fetching metrics.");
      }
    } catch  {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          Performance Metrics
        </h2>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="text-center text-red-600 bg-red-100 py-3 px-4 rounded-lg mb-6 shadow"
          >
            {error}
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading ? (
          <div className="text-center mt-10">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-700 mt-4">Loading metrics...</p>
          </div>
        ) : metrics.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.map((metric) => {
              const totalCalls =
                (metric.positive || 0) +
                (metric.negative || 0) +
                (metric.neutral || 0);

              return (
                <div
                  key={metric._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                      {metric.name}
                    </h3>

                    <div className="space-y-3">
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium text-gray-800">
                          Assigned Leads:
                        </span>{" "}
                        {metric.assignedLeadsCount || 0}
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium text-gray-800">
                          Total Calls:
                        </span>{" "}
                        {totalCalls}
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium text-gray-800">
                          Positive Calls:
                        </span>{" "}
                        {metric.positive || 0}
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium text-gray-800">
                          Negative Calls:
                        </span>{" "}
                        {metric.negative || 0}
                      </p>
                      <p className="text-gray-600 text-lg">
                        <span className="font-medium text-gray-800">
                          Neutral Calls:
                        </span>{" "}
                        {metric.neutral || 0}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 border-t border-gray-200">
                    <button
                      className="w-full text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition duration-300"
                      onClick={() => alert(`Viewing details for ${metric.name}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-600">
            <p>No metrics data available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metrics;

"use client";

import { motion } from "framer-motion";
import { Building2, Users, Target, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold"
        >
          About <span className="text-yellow-300">UrbanProperties CRM</span>
        </motion.h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-100">
          Simplifying real estate management through technology and innovation.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At <strong>UrbanProperties CRM</strong>, our goal is to empower real
            estate businesses with tools that streamline communication, automate
            workflows, and enhance productivity. We believe that managing
            clients, leads, and calls should be effortless and efficient.
          </p>
        </div>
      </section>

      {/* Core Values / Features */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10 text-center">
            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <Building2 className="mx-auto text-blue-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Smart Property Tools</h3>
              <p className="text-gray-600 text-sm">
                Manage listings, tenants, and agents with a single powerful
                dashboard.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <Users className="mx-auto text-blue-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Team Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Keep your entire team connected with seamless communication and
                shared data.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <Target className="mx-auto text-blue-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Goal Tracking</h3>
              <p className="text-gray-600 text-sm">
                Set targets, track sales, and measure success in real-time.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-md transition">
              <Shield className="mx-auto text-blue-600 w-10 h-10 mb-4" />
              <h3 className="font-semibold text-xl mb-2">Data Security</h3>
              <p className="text-gray-600 text-sm">
                Your client and business data is encrypted and securely stored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 px-6 text-center bg-gray-100">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Building the Future of Real Estate CRM
        </motion.h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-8">
          We’re constantly improving UrbanProperties CRM to give you the tools
          you need to manage your business efficiently, connect with your
          clients, and close deals faster.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition">
          Get Started Today
        </button>
      </section>
    </main>
  );
}

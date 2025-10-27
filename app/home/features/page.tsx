"use client";

import { motion } from "framer-motion";
import {
  Building,
  PhoneCall,
  Users,
  ClipboardList,
  Bell,
  BarChart3,
  Database,
  Globe,
  ShieldCheck,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Building className="w-10 h-10 text-blue-600 mx-auto" />,
      title: "Property Management",
      desc: "Easily store, organize, and update all property details — including photos, pricing, status, and owner information — in one centralized dashboard.",
    },
    {
      icon: <PhoneCall className="w-10 h-10 text-green-600 mx-auto" />,
      title: "Smart Calling System",
      desc: "Make and track customer calls directly from the CRM. Log every conversation, set reminders for follow-ups, and automate missed-call messages via WhatsApp.",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-yellow-600 mx-auto" />,
      title: "Lead Tracking & Management",
      desc: "Capture new leads automatically, assign them to agents, and follow up with smart reminders until they convert into clients.",
    },
    {
      icon: <Users className="w-10 h-10 text-purple-600 mx-auto" />,
      title: "Agent Performance Analytics",
      desc: "Monitor your team’s daily call logs, lead conversions, and response time with a detailed performance dashboard.",
    },
    {
      icon: <Bell className="w-10 h-10 text-red-600 mx-auto" />,
      title: "Reminders & Notifications",
      desc: "Never miss an opportunity — get instant reminders for follow-ups, pending calls, rent renewals, and client meetings.",
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-indigo-600 mx-auto" />,
      title: "Real-Time Analytics",
      desc: "View daily, weekly, or monthly insights on calls, leads, and property sales with visually appealing charts and reports.",
    },
    {
      icon: <Database className="w-10 h-10 text-orange-600 mx-auto" />,
      title: "Cloud Data Storage",
      desc: "All your client and property data is securely stored in the cloud — accessible anytime, from any device.",
    },
    {
      icon: <Globe className="w-10 h-10 text-teal-600 mx-auto" />,
      title: "Multi-Platform Access",
      desc: "Use UrbanProperties CRM from desktop, tablet, or mobile — your data stays synced and updated everywhere.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-emerald-600 mx-auto" />,
      title: "Data Security & Privacy",
      desc: "Enterprise-level encryption ensures that your client and property data remain protected at all times.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
        >
          Everything You Need in One <span className="text-blue-700">CRM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-16"
        >
          UrbanProperties CRM brings together all the tools real estate
          professionals need — from property listings and calling automation to
          team tracking and analytics — all under one clean, powerful platform.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border-t-4 border-blue-600"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 bg-blue-700 text-white py-14 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-4">
            Manage. Connect. Grow — All with UrbanProperties CRM
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-200">
            Whether you’re a single agent or a large property firm, streamline
            your workflow and focus on what truly matters — closing deals.
          </p>
          <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </main>
  );
}

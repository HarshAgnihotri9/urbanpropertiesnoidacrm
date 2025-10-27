"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "₹499",
      description: "Ideal for individual agents",
      features: [
        "Add up to 50 properties",
        "Manage up to 100 leads",
        "Basic call tracking",
        "Email support",
      ],
      color: "bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Pro",
      price: "₹999",
      description: "Perfect for small teams",
      features: [
        "Unlimited properties",
        "Unlimited leads",
        "Smart calling system",
        "Team performance analytics",
        "Priority support",
      ],
      color: "bg-indigo-50",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      name: "Enterprise",
      price: "₹1999",
      description: "Full CRM suite for large agencies",
      features: [
        "Custom workflows & dashboards",
        "Dedicated account manager",
        "Advanced analytics & reports",
        "Automation & reminders",
        "Multi-platform access",
        "Premium support",
      ],
      color: "bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-800"
        >
          Pricing Plans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
        >
          Choose a plan that fits your business size and growth needs. Upgrade or change plans anytime as your agency grows.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`rounded-2xl shadow-xl p-8 flex flex-col justify-between ${plan.color}`}
          >
            {/* Plan Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <p className="text-4xl font-extrabold text-gray-900 mb-2">
                {plan.price} <span className="text-base text-gray-600">/month</span>
              </p>
            </div>

            {/* Features List */}
            <ul className="mb-6 space-y-3 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${plan.buttonColor}`}
            >
              Choose Plan
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20 bg-blue-700 text-white py-14 rounded-2xl shadow-xl text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to streamline your real estate business?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-gray-200">
          Start using UrbanProperties CRM today and manage properties, leads, and calls efficiently — all in one place.
        </p>
        <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition">
          Get Started Now
        </button>
      </motion.div>
    </main>
  );
}

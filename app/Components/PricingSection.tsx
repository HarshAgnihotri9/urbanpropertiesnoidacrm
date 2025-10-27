'use client';

import { useState } from 'react';

const pricingPlans = [
  {
    name: "Basic",
    price: "₹499/month",
    features: ["1 Admin User", "Add & Manage Leads", "Follow-Up Tracking"],
  },
  {
    name: "Team",
    price: "₹1499/month",
    features: [
      "Up to 5 Users",
      "Employee Assignment",
      "Reports & Analytics",
      "Site Visit Scheduler",
    ],
  },
  {
    name: "Pro",
    price: "₹2999/month",
    features: [
      "Unlimited Users",
      "Full CRM Access",
      "Custom Status & Sources",
      "Priority Support",
    ],
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelect = (planName: string) => {
    setSelectedPlan(planName === selectedPlan ? null : planName);
  };

  return (
    <section className="bg-gray-50 py-20 px-6" id="pricing">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Pricing
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-16 text-sm md:text-base">
          Choose the plan that best fits your business needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => {
            const isSelected = selectedPlan === plan.name;

            return (
              <div
                key={index}
                onClick={() => handleSelect(plan.name)}
                className={`cursor-pointer border rounded-xl p-8 text-left transition-all duration-300
                  ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  }
                  hover:shadow-md`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-2xl font-semibold text-blue-600 mb-4">{plan.price}</p>
                <ul className="text-sm text-gray-700 mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 px-4 rounded-md font-medium transition ${
                    isSelected
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Choose Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {selectedPlan && (
          <p className="mt-10 text-sm text-gray-600">
            You have selected the <strong>{selectedPlan}</strong> plan.
          </p>
        )}
      </div>
    </section>
  );
}

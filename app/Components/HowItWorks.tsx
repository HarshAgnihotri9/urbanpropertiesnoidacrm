const steps = [
    {
      title: "Add Buyer & Seller Leads",
      description: "Quickly add leads manually or through integrations with forms or import tools.",
      icon: "📥",
    },
    {
      title: "Assign to Employees",
      description: "Distribute leads to your team members and track who is responsible.",
      icon: "👨‍💼",
    },
    {
      title: "Track Progress & Site Visits",
      description: "Get follow-up reminders, schedule site visits, and keep communication organized.",
      icon: "📍",
    },
    {
      title: "Close Deals & Analyze",
      description: "View analytics on conversions, lead sources, and employee performance.",
      icon: "📈",
    },
  ];
  
  export default function HowItWorksSection() {
    return (
      <section className="bg-gray-50 py-20 px-6" id="how-it-works">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-16 text-sm md:text-base">
            UrbanPropertiesNoidaCRM streamlines your lead management process from start to finish.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
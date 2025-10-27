const targetUsers = [
    {
      title: "Real Estate Agencies",
      description: "Streamline team operations and manage every buyer and seller lead in one place.",
    },
    {
      title: "Independent Agents",
      description: "Stay organized and never miss a follow-up with built-in reminders and notes.",
    },
    {
      title: "Builders & Developers",
      description: "Track project-based inquiries, assign sales reps, and improve response times.",
    },
    {
      title: "Property Dealers",
      description: "Local agents can manage lead inventory, site visits, and conversions easily.",
    },
  ];
  
  export default function WhoItsForSection() {
    return (
      <section className="bg-gray-50 py-20 px-6" id="who-its-for">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who It’s For
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-16 text-sm md:text-base">
            UrbanPropertiesNoidaCRM is built specifically for professionals in the real estate ecosystem.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {targetUsers.map((user, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.title}</h3>
                <p className="text-sm text-gray-600">{user.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
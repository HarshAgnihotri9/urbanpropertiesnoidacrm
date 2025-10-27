'use client';

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-24 bg-gray-50">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900">Everything You Need in a Real Estate CRM</h2>
        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Save time, close more deals, and build lasting client relationships with tools made for real estate pros.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Lead Capture</h3>
          <p className="text-gray-600">
            Automatically collect and organize leads from your website, social media, and offline sources.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Client Tracking</h3>
          <p className="text-gray-600">
            View full client profiles, log interactions, and track their journey through the sales pipeline.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Follow-Up Reminders</h3>
          <p className="text-gray-600">
            Never miss a follow-up — get smart reminders and alerts for every stage of the deal.
          </p>
        </div>
      </div>
    </section>
  );
}

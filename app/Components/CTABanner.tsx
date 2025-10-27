export default function CTABanner() {
    return (
      <section className="bg-blue-600 text-white py-14 px-6" id="cta">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to simplify your real estate lead management?
          </h2>
          <p className="text-sm md:text-base mb-6">
            Try UrbanPropertiesNoidaCRM now and see how fast your team can convert leads into deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="bg-blue-500 text-white border border-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    );
  }
  
const testimonials = [
    {
      name: "Rajiv Sharma",
      role: "Owner, Sharma Properties",
      feedback:
        "UrbanPropertiesNoidaCRM has completely transformed how we manage our leads. My team now never misses a follow-up.",
    },
    {
      name: "Pooja Mehta",
      role: "Real Estate Agent, Noida Sector 62",
      feedback:
        "I used to manage everything on WhatsApp and Excel — this CRM made everything organized, fast, and trackable.",
    },
    {
      name: "Amit Verma",
      role: "Team Lead, Urban Realtors",
      feedback:
        "I can finally see what my employees are working on, assign leads easily, and track performance in one dashboard.",
    },
  ];
  
  export default function TestimonialsSection() {
    return (
      <section className="bg-gray-50 py-20 px-6" id="testimonials">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-16 text-sm md:text-base">
            Hear from real estate professionals who use UrbanPropertiesNoidaCRM to manage their business daily.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border border-gray-200 p-6 rounded-xl bg-gray-50 text-left"
              >
                <p className="text-sm text-gray-700 mb-4 italic">"{testimonial.feedback}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
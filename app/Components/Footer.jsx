export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-between gap-8">
            {/* About Section */}
            <div className="flex-1 min-w-[250px]">
              <h3 className="text-white text-xl font-semibold mb-4">
                Urban Properties Noida CRM
              </h3>
              <p>
                Your trusted partner for real estate in Noida. Manage properties and clients effortlessly.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="flex-1 min-w-[200px]">
              <h4 className="text-white text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/dashboard"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/properties"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Properties
                  </a>
                </li>
                <li>
                  <a
                    href="/clients"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Clients
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-cyan-400 transition-colors duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div className="flex-1 min-w-[250px]">
              <h4 className="text-white text-lg font-semibold mb-4">Contact Info</h4>
              <p>Email: support@urbanpropertiesnoida.com</p>
              <p>Phone: +91 12345 67890</p>
              <p>Address: Sector 62, Noida, India</p>
            </div>
          </div>
  
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
            © 2025 Urban Properties Noida CRM. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }
  
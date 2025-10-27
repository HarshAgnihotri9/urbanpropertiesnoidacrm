'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="bg-gray-50 w-full py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Left content */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Streamline Your <span className="text-blue-600">Real Estate</span> Sales
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            UrbanPropertiesNoidaCRM is a powerful CRM built for agents and builders to manage leads, track client progress, and close deals — faster and smarter.
          </p>
          
          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 relative w-full h-[300px] sm:h-[400px] lg:h-[480px]">
          <Image
            src="/girl.png" // Replace with your actual image
            alt="CRM dashboard"
            fill
            className="object-contain drop-shadow-xl rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}

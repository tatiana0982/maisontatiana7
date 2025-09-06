'use client';
import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Returns = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800" style={{fontFamily: "'Inter', sans-serif"}}>
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />
      
    <main className="flex-grow">
  <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">Legal Terms</h1>
          <p className="mt-4 text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Terms of Use</h2>
              <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. All materials on this site are the property of maisontatiana7 and are protected by copyright and intellectual property laws.
              </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Intellectual Property</h2>
              <p>
                  The content, logos, graphics, and other intellectual property are the exclusive property of maisontatiana7. Unauthorized use is prohibited and may result in legal action.
              </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Limitation of Liability</h2>
              <p>
                  This website and its components are offered for informational purposes only; this site shall not be responsible or liable for the accuracy, usefulness or availability of any information transmitted or made available via the site, and shall not be responsible or liable for any error or omissions in that information.
              </p>
          </div>

           <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Governing Law</h2>
              <p>
                 Any claim relating to this website shall be governed by the laws of the jurisdiction of the website owner's location without regard to its conflict of law provisions.
              </p>
          </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            For any questions regarding these legal terms, please contact us.
        </p>
        <a href="mailto:maisontatiana7@outlook.com" className="mt-6 inline-block bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            maisontatiana7@outlook.com
        </a>
      </div>
  </div>
</main>

      <Footer />
    </div>
  );
};

export default Returns;

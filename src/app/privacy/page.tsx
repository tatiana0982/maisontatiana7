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

const Privacy = () => {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Introduction</h2>
              <p>
                  At maisontatiana7 ("we," "our," "us"), we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
              </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Information We Collect</h2>
              <p>
                  We may collect personal information that you voluntarily provide to us when you make a purchase, such as your name, shipping address, email address, and phone number. We also collect non-personal information, such as browser type and pages visited, to improve your experience.
              </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">How We Use Your Information</h2>
              <p>
                  Your information is used to process your orders, communicate with you about your purchase, and improve our website and services. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted partners who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.
              </p>
          </div>

           <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Data Security</h2>
              <p>
                 We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
              </p>
          </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            If you have any questions or concerns regarding this Privacy Policy, you may contact us using the information below.
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

export default Privacy;

















<main className="flex-grow">
  <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Introduction</h2>
              <p>
                  At maisontatiana7 ("we," "our," "us"), we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
              </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Information We Collect</h2>
              <p>
                  We may collect personal information that you voluntarily provide to us when you make a purchase, such as your name, shipping address, email address, and phone number. We also collect non-personal information, such as browser type and pages visited, to improve your experience.
              </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">How We Use Your Information</h2>
              <p>
                  Your information is used to process your orders, communicate with you about your purchase, and improve our website and services. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted partners who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential.
              </p>
          </div>

           <div className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-semibold text-black mb-3">Data Security</h2>
              <p>
                 We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
              </p>
          </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-black">Contact Us</h2>
        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            If you have any questions or concerns regarding this Privacy Policy, you may contact us using the information below.
        </p>
        <a href="mailto:maisontatiana7@outlook.com" className="mt-6 inline-block bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            maisontatiana7@outlook.com
        </a>
      </div>
  </div>
</main>

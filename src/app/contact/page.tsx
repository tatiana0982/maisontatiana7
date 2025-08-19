'use client';
import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';
import Image from 'next/image';
import EditText from '@/components/ui/EditText';
import Button from '@/components/ui/Button';

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const ContactPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />
      
      <main className="flex-grow pt-20">
        <div className="w-full max-w-screen-xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-atacama tracking-wider">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We are at your disposal for any inquiries. Our team will respond to your message within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <EditText variant="outline" label="Name" placeholder="Your first name" />
                <EditText variant="outline" label="Surname" placeholder="Your last name" />
              </div>
              <EditText variant="outline" label="Email" type="email" placeholder="your.email@example.com" />
              
              {/* Country Selector would go here - for now, a simple input */}
              <EditText variant="outline" label="Country/Region of Residence" placeholder="e.g., United Arab Emirates" />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  rows={8}
                  placeholder="How can we help you?"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black transition-shadow duration-300"
                ></textarea>
              </div>

              <Button size="lg" className="w-full bg-black text-white hover:bg-gray-800">
                Submit
              </Button>
            </form>

            {/* Image/Map Section */}
            <div className="w-full h-full min-h-[400px] lg:min-h-0">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231268.3036283553!2d55.08832551942787!3d25.07575844436214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1724073351988!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

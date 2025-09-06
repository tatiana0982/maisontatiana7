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
        <div className="container mx-auto max-w-2xl px-4 mt-12 py-12 sm:py-20">
            <div className="bg-gray-40 p-8 sm:p-10 rounded-lg shadow-sm">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Refund Policy</h1>
                </div>

                <div className="space-y-5 text-base text-gray-700 leading-relaxed">
                    <p>
                        At <strong>maisontatiana7</strong>, we are committed to ensuring the health and safety of our customers. Due to the nature of our products, all sales are final.
                    </p>
                    
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">No Returns or Exchanges</h2>
                        <p>
                            For hygiene reasons, we do not offer refunds, exchanges, or returns on any products. This policy guarantees that every item you receive is new and unused.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-1">Damaged or Incorrect Items</h2>
                        <p>
                            If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with your order number and a photo of the issue. We will gladly assist with a replacement.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                    <h2 className="text-lg font-semibold text-gray-900">Questions?</h2>
                    <p className="mt-1 text-gray-600">
                        For any concerns, please reach out to our support team.
                    </p>
                    <a href="mailto:maisontatiana7@outlook.com" className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                        maisontatiana7@outlook.com
                    </a>
                </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;


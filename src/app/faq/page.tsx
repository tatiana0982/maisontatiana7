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

const faqData = [
    {
        question: "Do you ship worldwide?",
        answer: "Yes, we proudly offer international shipping so you can experience our artisanal French fragrances anywhere in the world. Shipping times may vary depending on your location."
    },
    {
        question: "What makes your fragrances unique?",
        answer: "Our fragrances are born in France, blending traditional craftsmanship with the richness of Arabic olfactory artistry. Each scent is made with noble ingredients, designed to be a lasting, signature experience."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number on the carrier's website to check the status of your delivery."
    },
    {
        question: "Are your products cruelty-free?",
        answer: "We are committed to ethical practices. None of our products or the ingredients we use are tested on animals, and we ensure our suppliers adhere to the same principles."
    }
];

const FaqPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
            <div className="text-center mt-12 mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold text-black tracking-tight">Frequently Asked Questions</h1>
                <p className="mt-4 text-lg text-gray-600">Can't find the answer you're looking for? Reach out to our customer support team.</p>
            </div>

            <div className="border-t border-gray-200">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 py-6">
                  <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center text-left text-lg font-medium text-black focus:outline-none hover:text-gray-700">
                    <span className="flex-1 pr-2">{faq.question}</span>
                    <span className={`text-2xl text-gray-500 transform transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 pt-4' : 'max-h-0'}`}>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold text-black">Still have questions?</h2>
              <p className="mt-2 text-gray-600 max-w-xl mx-auto">
                  If you cannot find an answer to your question in our FAQ, you can always contact us. We will answer you shortly!
              </p>
              <a href="mailto:maisontatiana7@outlook.com" className="mt-6 inline-block bg-black text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                  Contact Support
              </a>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;


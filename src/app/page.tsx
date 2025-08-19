'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import MobileMenu from '@/components/common/MobileMenu';
import Hero from '@/components/pageSections/Hero';
import LArtDuParfum from '@/components/pageSections/LArtDuParfum';
import FragrantGetaway from '@/components/pageSections/FragrantGetaway';
import ModernRoyalty from '@/components/pageSections/ModernRoyalty';
import ProductGrid from '@/components/pageSections/ProductGrid';
import SignatureFragrances from '@/components/pageSections/SignatureFragrances';
import Collection from '@/components/pageSections/Collection';
import Marketing from '@/components/pageSections/Marketing';
import WebsiteLink from '@/components/pageSections/WebsiteLink';
import FinalImage from '@/components/pageSections/FinalImage';
import Footer from '@/components/common/Footer';

// CORRECTED: The href values now point to the correct pages.
const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const MaisonTatianaPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll animation logic for page sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />
      
      <main>
        <Hero />
        <LArtDuParfum />
        <FragrantGetaway />
        <ModernRoyalty />
        <ProductGrid />
        <SignatureFragrances />
        <Collection />
        <Marketing />
        <WebsiteLink />
        <FinalImage />
      </main>
      <Footer />
    </div>
  );
};

export default MaisonTatianaPage;
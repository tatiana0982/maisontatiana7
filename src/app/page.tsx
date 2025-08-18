'use client';
import React, { useEffect } from 'react';
import Header from '@/components/common/Header';
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

const MaisonTatianaPage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      <Header />
      <main>
        {/* This div pushes the content down to prevent overlap with the fixed header */}
        <div style={{ height: '136px' }} /> 
        
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
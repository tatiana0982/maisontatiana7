'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const products = [
    { name: 'The 7 Lucky Roses', slug: 'the-7-lucky-roses', image: '/images/img_img_20250811_wa0020.png', price: '120.00 €' },
    { name: 'The Garden of Tatiana', slug: 'the-garden-of-tatiana', image: '/images/img_img_20250811_wa0016.png', price: '120.00 €' },
    { name: 'King of Burn Bridge', slug: 'king-of-burn-bridge', image: '/images/img_img_20250811_wa0019.png', price: '120.00 €' },
    { name: 'Covenant of Kings', slug: 'covenant-of-kings', image: '/images/img_img_20250811_wa0017.png', price: '120.00 €' },
    { name: 'Divine Armor', slug: 'divine-armor', image: '/images/img_img_20250811_wa0018.png', price: '120.00 €' },
    { name: 'Le Ciel de Tatiana', slug: 'le-ciel-de-tatiana', image: '/images/img_img_0043.png', price: '120.00 €' },
];

const ProductsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
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
    <div className="flex flex-col min-h-screen bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />
      
      <main className="flex-grow pt-20">
        <div className="w-full max-w-screen-xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="animate-on-scroll text-left mb-12">
            <h1 className="text-3xl lg:text-4xl font-atacama">La Collection Privée</h1>
          </div>
          <div className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {products.map(product => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="group block">
                <div className="overflow-hidden bg-gray-50">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400} 
                    height={400} 
                    className="w-full h-auto object-cover aspect-square transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
                  />
                </div>
                {/* CORRECTED: Flexbox layout for name and price */}
                <div className="mt-4 flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-black hover-underline-wipe inline-block pr-4">
                    {product.name}
                  </h2>
                  <p className="text-md text-brand-gold flex-shrink-0">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <section 
          className="animate-on-scroll w-full mt-16 lg:mt-24 py-16 lg:py-24" 
          style={{ backgroundColor: '#F5F1ED' }}
        >
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-12">
            <div className="group overflow-hidden">
                <Image 
                    src="/images/img_luxury_perfume.png"
                    width={800}
                    height={600}
                    alt="Close up of a luxury perfume bottle"
                    className="w-full h-auto object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
                />
            </div>
            <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-atacama">Timeless Fragrances</h3>
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                    Each scent is a masterpiece, a symphony of rare ingredients designed to evoke emotion and create lasting memories. Our commitment to quality ensures a fragrance that doesn't just speak, but whispers tales of elegance.
                </p>
            </div>
          </div>
        </section>

        {/* CORRECTED: New Luxury Story Section with refined styling */}
        <section className="animate-on-scroll w-full mt-16 lg:mt-24 py-24 lg:py-32 bg-gray-900 text-white">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <blockquote className="luxury-quote">
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                        A perfume is a <i className="font-serif">story in odor</i>, sometimes <b className="font-semibold text-brand-gold">poetry in memory.</b> We do not just sell bottles of fragrance; we offer a key to moments you'll cherish forever. It is an invisible accessory, a final touch of humor and luxury that announces your arrival and prolongs your departure.
                    </p>
                </blockquote>
            </div>
        </section>

        {/* CORRECTED: Full-width landscape image with responsive height */}
        <section className="animate-on-scroll w-full mt-16 lg:mt-24 h-[60vh] lg:h-auto">
          <div className="group overflow-hidden h-full">
            <Image
              src="/images/img_untitled_design_2_1.png"
              width={1920}
              height={960}
              alt="A collection of five Maison Tatiana 7 perfume bottles"
              className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
            />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
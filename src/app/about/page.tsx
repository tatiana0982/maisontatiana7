'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';
import Image from 'next/image';

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const AboutPage = () => {
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
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#F5F1ED' }}>
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />
      
      <main className="flex-grow pt-20">
        {/* --- Hero Section --- */}
        <section className="relative h-[60vh] lg:h-[80vh] w-full flex items-center justify-center text-center text-white bg-black">
          <Image
            src="/images/5_bottles.png"
            alt="The Soul of Scent"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="relative z-10 p-4 animate-on-scroll">
            <h1 className="text-4xl md:text-6xl font-atacama tracking-wider">The Soul of Scent</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">A journey from the rose fields of Grasse to the spice markets of Dubai.</p>
          </div>
        </section>

        {/* --- Our Heritage Section --- */}
        <section className="animate-on-scroll w-full max-w-screen-lg mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-atacama text-brand-gold">Our Heritage</h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Maison Tatiana 7 was founded on a paradox: the union of timeless French elegance and the bold, opulent spirit of Arabic perfumery. Our story didn't begin in a boardroom, but in a memory the scent of rain on desert sand, the aroma of a Parisian flower market at dawn. We are a new house, but our soul is old, built on generations of olfactory artistry. We believe a fragrance is not just worn, but lived. It is an invisible signature, a final touch of luxury that announces your presence and lingers in your absence.
            </p>
          </div>
        </section>

        {/* --- The Maison Tatiana 7 Difference --- */}
        <section className="animate-on-scroll w-full max-w-screen-xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-2xl font-atacama text-black">Unforgettable Scents</h3>
              <p className="mt-2 text-gray-600">Our fragrances are complex narratives, designed to evolve on the skin and create a lasting impression that is uniquely yours.</p>
            </div>
            <div>
              <h3 className="text-2xl font-atacama text-black">Meticulous Craftsmanship</h3>
              <p className="mt-2 text-gray-600">From the hand-picked petals in Grasse to the final bottling in Dubai, every step is a testament to our dedication to quality.</p>
            </div>
            <div>
              <h3 className="text-2xl font-atacama text-black">Sustainable Luxury</h3>
              <p className="mt-2 text-gray-600">We are committed to ethical sourcing and sustainable practices, ensuring our creations are as kind to the earth as they are to your skin.</p>
            </div>
          </div>
        </section>

        {/* --- Founder's Quote Section --- */}
        <section className="animate-on-scroll w-full py-24 bg-gray-900 text-white">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <blockquote className="luxury-quote">
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                        "We don't create perfumes; we craft <b className="font-semibold text-brand-gold">liquid poetry</b>. Each bottle holds a narrative, a bridge between two worlds. It is the whisper of a <i className="font-serif">French love affair</i> and the echo of an <i className="font-serif">Arabian night</i>."
                    </p>
                    <cite className="block mt-8 text-md text-gray-400 not-italic">~ Tatiana, Founder</cite>
                </blockquote>
            </div>
        </section>
        
        {/* --- The Process: France to Dubai --- */}
        <section className="animate-on-scroll w-full py-16 lg:py-24">
          <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-12">
            <div className="order-2 lg:order-1 text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-atacama">Made in France, Inspired by Dubai</h3>
                <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                    Our process begins in the heart of Grasse, the world's perfume capital. Here, our master perfumers select the most noble and rare ingredients Centifolia Rose, Tuscan Iris, and Calabrian Bergamot. These classic elements are then transported to our atelier in Dubai, where they are artfully blended with the rich, warm notes of the East: Cambodian Oud, Somalian Frankincense, and sweet Amber. This fusion creates a unique olfactory signature that is both powerful and refined.
                </p>
            </div>
            <div className="order-1 lg:order-2 group overflow-hidden">
                <Image 
                    src="/images/the_garden_of_tatiana_model.jpeg"
                    width={800}
                    height={600}
                    alt="Vibrant, abstract representation of perfume creation"
                    className="w-full h-auto object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
                />
            </div>
          </div>
        </section>

        {/* --- Autoplaying Video Section --- */}
        <section className="animate-on-scroll relative w-full h-[70vh] lg:h-[90vh] mt-16 lg:mt-24 overflow-hidden bg-black">
          <video
            src="/videos/hero_video1.mp4"
            className="w-full h-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-3xl md:text-5xl font-atacama">Our Vision</h2>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              To create fragrances that transcend borders and time, becoming a cherished part of your personal story.
            </p>
          </div>
        </section>

        {/* --- Mission & Values Section (White Background) --- */}
        <section 
          className="animate-on-scroll w-full mt-16 lg:mt-24 py-16 lg:py-24 bg-white" 
        >
          <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-atacama text-brand-gold">Our Commitment</h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Our house is built on three pillars: <b className="font-semibold">Dignity</b> in our craft, <b className="font-semibold">Respect</b> for our ingredients and our planet, and a deep <b className="font-semibold">Connection</b> with our cherished clientele. We are committed to ethical practices and the relentless pursuit of olfactory perfection.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

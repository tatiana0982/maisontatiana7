'use client';
import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const NotFoundPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col mt-12 min-h-screen bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />
      
      <main className="flex-grow flex flex-col items-center justify-center text-center pt-20 px-4">
        <h1 className="text-6xl lg:text-9xl font-atacama text-brand-gold">404</h1>
        <h2 className="mt-4 text-2xl lg:text-4xl font-atacama text-black">Page Not Found</h2>
        <p className="mt-4 max-w-md text-lg text-gray-600">
          We're sorry, the page you are looking for does not exist or may have been moved.
        </p>
        <Link href="/" passHref>
          <Button size="lg" className="mt-8 bg-black text-white hover:bg-gray-800">
            Return to Homepage
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;

'use client';
import React, { useEffect, useState } from 'react';
import MobileMenu from './MobileMenu';

const navLinks = [
  { name: 'Shop', href: '#' },
  { name: 'Collections', href: '#' },
  { name: 'Our Story', href: '#' },
  { name: 'Contact', href: '#' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar if scrolling up or near the top of the page
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />

      <nav 
        className={`w-full bg-white shadow-sm transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left: Mobile Menu Button */}
            <div className="w-1/3 flex justify-start">
              <button onClick={() => setIsMenuOpen(true)} className="menu-button p-2" aria-label="Open menu">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Center: Logo */}
            <div className="w-1/3 flex justify-center">
              <a href="/" aria-label="Go to homepage">
                <h1 className="text-2xl lg:text-3xl font-normal tracking-wider text-black">
                  MAISON TATIANA 7
                </h1>
              </a>
            </div>

            {/* Right: Empty Spacer for balance */}
            <div className="w-1/3"></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
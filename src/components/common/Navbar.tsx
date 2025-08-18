'use client';
import React from 'react';
import Logo from './Logo'; // The Logo component remains

// The Navbar's only job is to display the navigation and trigger the menu to open.
// It no longer knows about or renders the MobileMenu component directly.
interface NavbarProps {
  onMenuOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuOpen }) => {
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Mobile Menu Button */}
          <div className="w-1/3 flex justify-start">
            <button onClick={onMenuOpen} className="menu-button p-2" aria-label="Open menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Center: Logo Component */}
          <div className="w-1/3 flex justify-center">
            <Logo />
          </div>

          {/* Right: Empty Spacer for balance */}
          <div className="w-1/3"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
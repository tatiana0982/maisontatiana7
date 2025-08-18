'use client';
import React, { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navLinks }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Glassmorphism Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Menu Panel */}
      <div 
        className={`relative w-full max-w-md h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header with Close Button */}
          <div className="flex items-center p-5 border-b border-gray-200">
            <button onClick={onClose} aria-label="Close menu" className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.55528 17.4447C6.28186 17.1714 6.28183 16.7282 6.55519 16.4549L16.4547 6.55535C16.7281 6.28198 17.1713 6.28198 17.4447 6.55528C17.7182 6.82857 17.7182 7.27179 17.4448 7.54516L7.54531 17.4446C7.27194 17.718 6.8287 17.718 6.55528 17.4447Z"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.49506 6.49487C6.76848 6.22155 7.21173 6.2216 7.4851 6.49496L17.3846 16.3945C17.658 16.6678 17.658 17.111 17.3845 17.3843C17.1111 17.6576 16.6679 17.6576 16.3945 17.3843L6.49498 7.48474C6.22161 7.21137 6.22165 6.7682 6.49506 6.49487Z"></path>
              </svg>
            </button>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col p-8 space-y-6">
            {navLinks.map((link, index) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-black text-2xl font-light font-atacama tracking-wider hover:opacity-70 transition-opacity duration-300"
                style={{ animation: `fadeInUp 0.6s ${0.1 * index}s ease forwards`, opacity: 0 }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
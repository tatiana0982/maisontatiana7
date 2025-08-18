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
    <div className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className={`relative w-3/4 max-w-sm h-full bg-white transform transition-transform duration-500 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-5 border-b">
            <span className="font-semibold text-lg">MAISON TATIANA 7</span>
            <button onClick={onClose} aria-label="Close menu" className="p-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
          <nav className="flex flex-col p-5 space-y-5">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-black text-xl font-hellix hover:opacity-70 transition-opacity duration-300">{link.name}</a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
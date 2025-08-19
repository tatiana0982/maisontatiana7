'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import NotificationBanner from './NotificationBanner';
import Navbar from './Navbar';

interface HeaderProps {
  onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const pathname = usePathname(); // Get the current URL path
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // This state will now be used inside the NotificationBanner
  const [isBannerManuallyClosed, setIsBannerManuallyClosed] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setIsAtTop(currentScrollY === 0);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  // The banner should only be visible on the homepage ('/'), at the top, and not manually closed.
  const isBannerVisible = pathname === '/' && isAtTop && !isBannerManuallyClosed;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <NotificationBanner isVisible={isBannerVisible} onClose={() => setIsBannerManuallyClosed(true)} />
      <Navbar onMenuOpen={onMenuOpen} />
    </header>
  );
};

export default Header;
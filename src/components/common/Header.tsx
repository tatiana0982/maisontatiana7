'use client';
import React, { useEffect, useState } from 'react';
import NotificationBanner from './NotificationBanner';
import Navbar from './Navbar';

interface HeaderProps {
  onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isBannerManuallyClosed, setIsBannerManuallyClosed] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Logic to show/hide the entire header block
      setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      
      // Logic to determine if we are at the very top of the page
      setIsAtTop(currentScrollY === 0);

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleBannerClose = () => {
    setIsBannerManuallyClosed(true);
  };

  // The banner is only shown if it hasn't been manually closed AND the user is at the top
  const isBannerVisible = isAtTop && !isBannerManuallyClosed;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <NotificationBanner isVisible={isBannerVisible} onClose={handleBannerClose} />
      <Navbar onMenuOpen={onMenuOpen} />
    </header>
  );
};

export default Header;
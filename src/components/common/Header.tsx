import React from 'react';
import NotificationBanner from './NotificationBanner';
import Navbar from './Navbar';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <NotificationBanner />
      <Navbar />
    </header>
  );
};

export default Header;
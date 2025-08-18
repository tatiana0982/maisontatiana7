'use client';
import React, { useState, useEffect } from 'react';

const notifications = [
  { message: 'Receive a surprise gift with every order.', link: { text: 'Discover', href: '#' } },
  { message: 'Follow @maisontatiana7 for exclusive updates.', link: { text: 'Follow Us', href: 'https://www.instagram.com/maisontatiana7/' } },
  { message: 'Limited Edition: The exclusive collection has arrived.', link: { text: 'Shop Now', href: '#' } },
  { message: 'Discover our new handcrafted fragrances from France.', link: { text: 'Explore', href: '#' } },
  { message: 'A scent for every moment curated sets now available.', link: { text: 'Select Samples', href: '#' } },
  { message: 'Experience the essence of luxury with our new arrivals.', link: { text: 'View Collection', href: '#' } },
  { message: 'Join our fragrance community for exclusive offers.', link: { text: 'Join Now', href: '#' } },
  { message: 'Explore our artisanal perfumes crafted in France.', link: { text: 'Shop Artisanal', href: '#' } },
  { message: 'Discover the art of gifting with personalized scents.', link: { text: 'Explore Gifts', href: '#' } },
  { message: 'Experience the essence of luxury with our new arrivals.', link: { text: 'View Collection', href: '#' } },
  { message: 'Discover the perfect scent for every occasion.', link: { text: 'Find Your Scent', href: '#' } },
  { message: 'Join our fragrance journey and explore new horizons.', link: { text: 'Join Journey', href: '#' } },
];

interface NotificationBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ isVisible, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex, isVisible]);

  return (
    // The banner now animates its height and opacity based on the isVisible prop
    <div 
      className={`w-full bg-black text-white relative flex items-center justify-center overflow-hidden transition-all duration-300 ease-luxury ${isVisible ? 'h-14 opacity-100' : 'h-0 opacity-0'}`}
    >
      <div className="relative h-full w-full overflow-hidden">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-transform duration-700 ease-luxury"
            style={{ transform: `translateY(${(index - currentIndex) * 100}%)` }}
          >
            <span className="text-xs sm:text-sm tracking-wide text-center px-12">
              {notification.message}
              <a href={notification.link.href} className="font-semibold underline ml-2 whitespace-nowrap">
                {notification.link.text}
              </a>
            </span>
          </div>
        ))}
      </div>
      <button 
        onClick={onClose} 
        aria-label="Close promo banner" 
        className="absolute right-0 top-0 h-full px-4 flex items-center justify-center"
      >
        <svg className="r-icon-close w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M6.55528 17.4447C6.28186 17.1714 6.28183 16.7282 6.55519 16.4549L16.4547 6.55535C16.7281 6.28198 17.1713 6.28198 17.4447 6.55528C17.7182 6.82857 17.7182 7.27179 17.4448 7.54516L7.54531 17.4446C7.27194 17.718 6.8287 17.718 6.55528 17.4447Z"></path>
          <path fillRule="evenodd" clipRule="evenodd" d="M6.49506 6.49487C6.76848 6.22155 7.21173 6.2216 7.4851 6.49496L17.3846 16.3945C17.658 16.6678 17.658 17.111 17.3845 17.3843C17.1111 17.6576 16.6679 17.6576 16.3945 17.3843L6.49498 7.48474C6.22161 7.21137 6.22165 6.7682 6.49506 6.49487Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default NotificationBanner;
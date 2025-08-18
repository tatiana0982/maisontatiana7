'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '@/components/common/Footer';

const MaisonTatianaPage: React.FC = () => {
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const notifications = [
    'Receive a surprise gift with all orders',
    'Free shipping on orders over 100 euros',
    'Handcrafted fragrances from France',
    'Limited edition bottles available now',
    'Join our exclusive fragrance club',
    'Discover our new signature collection'
  ];

  useEffect(() => {
    // Add intersection observer for smooth animations on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-smooth-in');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu') && !(event.target as Element).closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-[57px] w-full bg-global-2 border border-global-1">
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="mobile-menu fixed left-0 top-0 w-1/2 h-full bg-black transform transition-transform duration-300 ease-in-out z-60">
            <div className="flex flex-col h-full">
              <div className="flex justify-end p-4">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#010101] hover:opacity-80 transition-opacity"
                  aria-label="Close menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col px-6 py-4 space-y-6">
                <a href="#" className="text-[#010101] text-lg font-hellix hover:opacity-80 transition-opacity">test1</a>
                <a href="#" className="text-[#010101] text-lg font-hellix hover:opacity-80 transition-opacity">test2</a>
                <a href="#" className="text-[#010101] text-lg font-hellix hover:opacity-80 transition-opacity">test3</a>
                <a href="#" className="text-[#010101] text-lg font-hellix hover:opacity-80 transition-opacity">test4</a>
                <a href="#" className="text-[#010101] text-lg font-hellix hover:opacity-80 transition-opacity">test5</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col justify-start items-center w-full">
        {/* Top Banner - Fixed height with centered notifications and backward rolling animation */}
        <div className="flex flex-row justify-center items-center w-full bg-global-1 px-2 py-3 sm:px-4 sm:py-4 md:px-6 md:py-4 lg:px-8 lg:py-4 xl:px-[16px] xl:py-[16px] animate-on-scroll h-[50px] sm:h-[56px] md:h-[60px] lg:h-[64px] xl:h-[68px] relative">
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            <div className="flex animate-roll-backward">
              {notifications.map((notification, index) => (
                <p key={index} className="text-xs sm:text-sm md:text-base lg:text-base xl:text-[14px] font-hellix font-normal leading-3 sm:leading-4 md:leading-5 lg:leading-6 xl:leading-[17px] text-center text-global-3 whitespace-nowrap px-[50px]">
                  {notification}
                </p>
              ))}
            </div>
          </div>
          <button className="absolute right-2 sm:right-4 touch-target p-2 z-10" aria-label="Close banner">
            <Image 
              src="/images/img_nej8hpcprzjmeceqjch.svg" 
              width={20} 
              height={20} 
              alt="close" 
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
          </button>
        </div>

        {/* Navigation Header - Enhanced mobile layout */}
        <div className="flex flex-row justify-between items-center w-full mt-3 sm:mt-4 lg:mt-[16px] px-4 sm:px-6 md:px-8 lg:px-12 xl:mx-[28px] animate-on-scroll">
          <button 
            className="menu-button touch-target p-2" 
            aria-label="Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Image 
              src="/images/img_frame.svg" 
              width={32} 
              height={32} 
              alt="menu" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 xl:w-[40px] xl:h-[40px]"
            />
          </button>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[36px] font-girassol font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-8 xl:leading-[43px] text-center text-global-1 flex-1 px-4">
            MAISON TATIANA 7
          </h1>
          <div className="w-6 sm:w-8 md:w-10 xl:w-[40px]"></div> {/* Spacer for balance */}
        </div>

        {/* Hero Image - Optimized for all screens */}
        <div className="w-full mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-[28px] animate-on-scroll">
          <video
            src="/videos/hero_video.mp4" 
            width={1440} 
            height={762} 
            autoPlay
            loop
            muted  
            className="w-full h-auto object-cover"
            playsInline
            poster="/images/hero_image_poster.png"
            aria-label="Hero video"
          />
        </div>

        {/* L'ART DU PARFUM Section - Center-aligned with respect to image and section */}
        <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[92px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-4 animate-on-scroll">
          <div className="w-full lg:w-[48%] xl:w-[42%] mb-6 lg:mb-0 flex flex-col justify-center">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-atacama leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-center lg:text-left text-global-1">
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] font-atacama font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] tracking-[0.5px] xl:tracking-[1px] text-center lg:text-left text-global-1 block mb-4">
                L&apos;ART DU PARFUM
              </span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-center lg:text-left text-global-1 block mb-4">
                Born in France, guided by tradition, and touched by Arabic olfactory artistry every fragrance is a world of its own, crafted for those who move in quiet confidence.
              </span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-center lg:text-left text-[#7b8487] block">
                Made in France with noble ingredients<br />
                Inspired by Eastern elegance<br />
                Five signature eaux de parfum<br />
                Designed to linger, not fade
              </span>
            </div>
          </div>
          <div className="w-full lg:w-[48%] xl:w-[44%] flex justify-center">
            <Image 
              src="/images/img_img_0444_1.png" 
              width={600} 
              height={728} 
              alt="perfume bottle" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* A Fragrant Getaway Section - Bottom positioned with padding to image */}
        <div 
          className="flex flex-row justify-center items-end w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] bg-cover bg-center bg-no-repeat animate-on-scroll min-h-[400px] sm:min-h-[480px] md:min-h-[560px] lg:min-h-[640px] xl:min-h-[720px]"
          style={{ backgroundImage: "url('/images/img_untitled_design_2_1.png')" }}
        >
          <div className="w-full text-left pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-[120px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[50px]">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-hellix font-semibold leading-5 sm:leading-6 md:leading-7 xl:leading-[21px] text-left capitalize text-global-3 mb-2">
              A Fragrant Getaway
            </p>
            <button className="touch-target text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-hellix font-semibold leading-5 sm:leading-6 md:leading-7 xl:leading-[21px] text-left underline capitalize text-global-3 hover:opacity-80 transition-opacity">
              Discover
            </button>
          </div>
        </div>

        {/* Modern Royalty Section - Enhanced mobile layout */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[28px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-10 xl:leading-[43px] text-left text-global-1 self-start px-4 sm:px-6 md:px-8 lg:px-12 xl:ml-[50px] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] animate-on-scroll">
          Modern Royalty, Captured in Scent
        </h2>
        
        {/* A bottle. A legacy. A presence. Section - Centered text, left image with no padding */}
        <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] animate-on-scroll">
          <div className="w-full lg:w-[54%] xl:w-[56%] mb-6 lg:mb-0 lg:pl-0">
            <Image 
              src="/images/img_luxury_perfume_video_creation.png" 
              width={800} 
              height={796} 
              alt="luxury perfume" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-[42%] xl:w-[38%] lg:pl-8 px-4 sm:px-6 md:px-8 lg:px-0">
            <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-center lg:text-left text-global-1">
              <span className="block mb-4">A bottle. A legacy. A presence.</span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-center lg:text-left text-global-1 block mb-4">
                Hand-poured in France, each creation is a tribute to elegance that lingers long after you have gone.
              </span>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[18px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-center lg:text-left text-[#c1ab84] block">
                Refined. Mysterious. Unmistakably yours.
              </span>
            </div>
          </div>
        </div>

        {/* Product Grid 1 - Mobile responsive grid */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] animate-on-scroll">
          <div className="w-full sm:w-1/2">
            <Image 
              src="/images/img_img_0037.png" 
              width={720} 
              height={720} 
              alt="product 1" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <Image 
              src="/images/img_img_0043.png" 
              width={720} 
              height={720} 
              alt="product 2" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Grid 2 - Mobile responsive grid */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 w-full animate-on-scroll">
          <div className="w-full sm:w-1/2">
            <Image 
              src="/images/img_img_0034.png" 
              width={720} 
              height={720} 
              alt="product 3" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <Image 
              src="/images/img_img_0036.png" 
              width={720} 
              height={720} 
              alt="product 4" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Signature Fragrances Section */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[24px] font-atacama font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[36px] text-left text-global-1 self-start px-4 sm:px-6 md:px-8 lg:px-12 xl:ml-[50px] mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] animate-on-scroll">
          Discover the Signature Fragrances
        </h2>

        {/* Fragrance Images - Enhanced mobile grid */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-[40px] w-full max-w-7xl mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[79px] animate-on-scroll">
          <div className="w-full sm:w-1/3 max-w-xs">
            <Image 
              src="/images/img_img_20250811_wa0020.png" 
              width={400} 
              height={400} 
              alt="fragrance 1" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full sm:w-1/3 max-w-xs">
            <Image 
              src="/images/img_img_20250811_wa0016.png" 
              width={400} 
              height={400} 
              alt="fragrance 2" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full sm:w-1/3 max-w-xs">
            <Image 
              src="/images/img_img_20250811_wa0019.png" 
              width={400} 
              height={400} 
              alt="fragrance 3" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Fragrance Names - Mobile optimized layout */}
        <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-7xl mx-auto mt-4 sm:mt-6 lg:mt-[32px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[78px] gap-4 lg:gap-0 animate-on-scroll">
          <div className="flex flex-col items-center text-center lg:text-left lg:w-1/3">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[25px] font-hellix font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[31px] capitalize text-global-1 mb-2">
              The 7 Lucky Roses
            </p>
            <button className="touch-target text-sm sm:text-base md:text-lg lg:text-lg xl:text-[18px] font-inria font-normal leading-5 sm:leading-6 md:leading-7 xl:leading-[22px] underline capitalize text-global-1 hover:opacity-80 transition-opacity">
              Discover
            </button>
          </div>

          <div className="flex flex-col items-center text-center lg:w-1/3">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[25px] font-hellix font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[31px] capitalize text-global-1 mb-2">
              The Garden of Tatiana
            </p>
            <button className="touch-target text-sm sm:text-base md:text-lg lg:text-lg xl:text-[18px] font-inria font-normal leading-5 sm:leading-6 md:leading-7 xl:leading-[22px] underline capitalize text-global-1 hover:opacity-80 transition-opacity">
              Discover
            </button>
          </div>

          <div className="flex flex-col items-center text-center lg:w-1/3">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[25px] font-hellix font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-9 xl:leading-[31px] capitalize text-global-1 mb-2">
              King of Burn Bridge
            </p>
            <button className="touch-target text-sm sm:text-base md:text-lg lg:text-lg xl:text-[18px] font-inria font-normal leading-5 sm:leading-6 md:leading-7 xl:leading-[22px] underline capitalize text-global-1 hover:opacity-80 transition-opacity">
              Discover
            </button>
          </div>
        </div>

        {/* Collection Section - Enhanced mobile layout */}
        <div className="flex flex-col lg:flex-row justify-start items-start w-full mt-8 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-[114px] animate-on-scroll">
          <div className="w-full lg:w-[38%] mb-6 lg:mb-0">
            <Image 
              src="/images/img_ebd184ad_1661_4.png" 
              width={550} 
              height={964} 
              alt="collection" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="w-full lg:w-[24%] px-4 sm:px-6 lg:px-8 xl:ml-[22px] mb-6 lg:mb-0">
            <p className="text-xs sm:text-sm lg:text-xs xl:text-[12px] font-hellix font-normal leading-4 sm:leading-5 xl:leading-[21px] text-left capitalize text-[#7b8487] mb-2">
              Maison Tatiana 7 Collection
            </p>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-[32px] font-atacama font-normal leading-5 sm:leading-6 lg:leading-6 xl:leading-[21px] text-left capitalize text-global-1">
              Fragrance Collection
            </p>
          </div>
          
          <div className="flex flex-col justify-start items-center w-full lg:flex-1 px-4 sm:px-6 lg:px-8 xl:ml-[12px]">
            {/* Horizontal Scrolling Products - Mobile optimized */}
            <div className="flex flex-row sm:flex-row justify-center sm:justify-start items-center w-full overflow-x-auto lg:overflow-x-visible scrollbar-thin gap-4 sm:gap-6 lg:gap-11 xl:gap-[44px] pb-4">
              <div className="flex-shrink-0">
                <Image 
                  src="/images/img_img_20250811_wa0017.png" 
                  width={300} 
                  height={372} 
                  alt="covenant of kings" 
                  className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-[300px] h-auto object-cover"
                />
              </div>
              <div className="flex-shrink-0">
                <Image 
                  src="/images/img_img_20250811_wa0018.png" 
                  width={300} 
                  height={372} 
                  alt="divine armor" 
                  className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-[300px] h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Product Names - Mobile responsive */}
            <div className="flex flex-row justify-between items-center w-full max-w-lg mx-auto mt-2 sm:mt-3 xl:mt-[10px] px-2">
              <p className="text-xs sm:text-sm lg:text-sm xl:text-[14px] font-hellix font-normal leading-4 sm:leading-5 xl:leading-[17px] text-left capitalize text-global-1">
                Covenant of kings
              </p>
              <p className="text-xs sm:text-sm lg:text-sm xl:text-[14px] font-hellix font-normal leading-4 sm:leading-5 xl:leading-[17px] text-center capitalize text-global-1">
                Divine Armor
              </p>
            </div>
            
            {/* Prices - Mobile responsive */}
            <div className="flex flex-row justify-between items-center w-full max-w-lg mx-auto mt-1 xl:mt-[4px] px-2">
              <p className="text-xs sm:text-sm lg:text-sm xl:text-[14px] font-hellix font-normal leading-4 sm:leading-5 xl:leading-[17px] text-left capitalize text-global-1">
                120.00 €
              </p>
              <p className="text-xs sm:text-sm lg:text-sm xl:text-[14px] font-hellix font-normal leading-4 sm:leading-5 xl:leading-[17px] text-left capitalize text-global-1">
                120.00 €
              </p>
            </div>
            
            {/* Navigation - Enhanced touch targets */}
            <div className="flex flex-row justify-center items-center gap-4 w-full mt-4 sm:mt-5 xl:mt-[22px]">
              <button className="touch-target p-2" aria-label="Previous">
                <Image 
                  src="/images/left_arrow.svg" 
                  width={24} 
                  height={24} 
                  alt="previous" 
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </button>
              <p className="text-xs sm:text-sm lg:text-sm xl:text-[14px] font-hellix font-normal leading-4 sm:leading-5 xl:leading-[17px] text-center capitalize text-global-2 px-2">
                1 / 2
              </p>
              <button className="touch-target p-2" aria-label="Next">
                <Image 
                  src="/images/img_arrow_right.svg" 
                  width={24} 
                  height={24} 
                  alt="next" 
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Marketing Image - Optimized for all screens */}
        <div className="w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-[118px] animate-on-scroll">
          <Image 
            src="/images/insta_section.png" 
            width={1440} 
            height={810} 
            alt="marketing" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Website Link - Mobile responsive typography */}
        <div className="text-center px-4 mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-[122px] animate-on-scroll">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] font-atacama font-normal leading-8 sm:leading-10 md:leading-12 lg:leading-14 xl:leading-[52px] text-center text-global-1">
            <span className="text-global-1">Exclusively on </span>
            <span className="text-[#7b8487] break-all sm:break-normal">maisontatiana7worldwide.com</span>
          </p>
        </div>

        {/* Final Image - Optimized for all screens */}
        <div className="w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-[124px] animate-on-scroll">
          <Image 
            src="/images/img_luxury_perfume.png" 
            width={1440} 
            height={810} 
            alt="luxury perfume final" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MaisonTatianaPage;
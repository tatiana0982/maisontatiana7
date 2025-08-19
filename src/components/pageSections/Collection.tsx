'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const carouselProducts = [
  { src: "/images/convenant_of_kings_1.png", alt: "Covenant of Kings perfume", name: "Covenant of Kings", price: "120.00 €", href: "/products/covenant-of-kings" },
  { src: "/images/divine_armor.png", alt: "Divine Armor perfume", name: "Divine Armor", price: "120.00 €", href: "/products/divine-armor" },
  { src: "/images/the_garden_of_tatiana_simple.png", alt: "The Garden of Tatiana perfume", name: "The Garden of Tatiana", price: "120.00 €", href: "/products/the-garden-of-tatiana" },
  { src: "/images/king_of_burn_bridge_simple.png", alt: "King of Burn Bridge perfume", name: "King of Burn Bridge", price: "120.00 €", href: "/products/king-of-burn-bridge" },
  { src: "/images/7_lucky_roses_simple.png", alt: "The 7 Lucky Roses perfume", name: "The 7 Lucky Roses", price: "120.00 €", href: "/products/the-7-lucky-roses" },
];

const Collection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const prevTranslateRef = useRef(0);
  const wasDragging = useRef(false);

  const getTrackWidth = () => trackRef.current?.scrollWidth ?? 0;
  const getVisibleWidth = () => trackRef.current?.clientWidth ?? 0;

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    wasDragging.current = false;
    setStartX(clientX);
    setStartTranslate(currentTranslate);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
      trackRef.current.style.transition = 'none';
    }
  };

  const handleInteractionMove = (clientX: number) => {
    if (!isDragging) return;
    wasDragging.current = true;
    const dragDistance = clientX - startX;
    const newTranslate = startTranslate + dragDistance;
    const maxTranslate = 0;
    const minTranslate = -(getTrackWidth() - getVisibleWidth());
    setCurrentTranslate(Math.max(minTranslate, Math.min(newTranslate, maxTranslate)));
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grab';
      trackRef.current.style.transition = 'transform 0.5s ease-out';
    }
    prevTranslateRef.current = currentTranslate;
  };

  const handleMouseDown = (e: React.MouseEvent) => handleInteractionStart(e.pageX);
  const handleMouseMove = (e: React.MouseEvent) => handleInteractionMove(e.pageX);
  const handleTouchStart = (e: React.TouchEvent) => handleInteractionStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleInteractionMove(e.touches[0].clientX);

  const handleArrowClick = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const scrollAmount = getVisibleWidth() * 0.8;
    const newTranslate = currentTranslate + (direction === 'prev' ? scrollAmount : -scrollAmount);
    const maxTranslate = 0;
    const minTranslate = -(getTrackWidth() - getVisibleWidth());
    const clampedTranslate = Math.max(minTranslate, Math.min(newTranslate, maxTranslate));
    setCurrentTranslate(clampedTranslate);
    prevTranslateRef.current = clampedTranslate;
  };

  return (
    <section className="animate-on-scroll flex flex-col lg:flex-row w-full mt-12 lg:mt-24">
      <div className="w-full max-w-md mx-auto lg:w-1/3 lg:max-w-none lg:mx-0">
        <Image 
          src="/images/the_garden_of_tatiana_model.jpeg" 
          width={550} 
          height={964} 
          alt="Model with The Garden of Tatiana perfume" 
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="w-full lg:w-2/3 flex flex-col justify-center p-8 lg:p-16">
        <div className="w-full max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-2">Maison Tatiana 7 Collection</p>
          <h2 className="text-3xl lg:text-5xl font-atacama mb-12">Fragrance Collection</h2>
          
          <div 
            className="relative overflow-hidden cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseUp={handleInteractionEnd}
            onMouseLeave={handleInteractionEnd}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleInteractionEnd}
            onTouchMove={handleTouchMove}
          >
            <div
              ref={trackRef}
              className="flex"
              style={{ transform: `translateX(${currentTranslate}px)`, transition: isDragging ? 'none' : 'transform 0.5s ease-out' }}
            >
              {carouselProducts.map((product, index) => (
                <div key={index} className="flex-shrink-0 w-1/2 md:w-[45%] lg:w-[40%] px-4 select-none">
                  <Link 
                    href={product.href} 
                    onClick={(e) => {
                      if (wasDragging.current) e.preventDefault();
                    }}
                    className="block h-full"
                  >
                    <div className="flex flex-col h-full">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                        <Image 
                          src={product.src}
                          width={400} 
                          height={400} 
                          alt={product.alt}
                          className="w-full h-full object-cover"
                          draggable="false"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <p className="font-hellix text-black text-xl">{product.name}</p>
                        <p className="text-gray-600 mt-1">{product.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => handleArrowClick('prev')}
              aria-label="Previous Products" 
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => handleArrowClick('next')}
              aria-label="Next Products" 
              className="p-2 border rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;

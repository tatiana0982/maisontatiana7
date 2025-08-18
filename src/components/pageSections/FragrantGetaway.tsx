import React from 'react';
import Image from 'next/image';

const FragrantGetaway: React.FC = () => {
  return (
    <section className="animate-on-scroll group relative w-full mt-16 lg:mt-24 overflow-hidden">
      <div className="transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105">
        <Image
          src="/images/img_untitled_design_2_1.png"
          width={1920}
          height={960}
          alt="A collection of five Maison Tatiana 7 perfume bottles"
          className="w-full h-auto"
        />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/50 to-transparent p-6 pb-10 sm:pb-14 lg:pb-16">
        <h3 className="text-base lg:text-lg font-light text-white/90 mb-2 tracking-widest uppercase">
          A Fragrant Getaway
        </h3>
        {/* The new animation class is applied here */}
        <a href="#" className="text-sm lg:text-base font-normal text-white hover-underline-wipe">
          Discover
        </a>
      </div>
    </section>
  );
};

export default FragrantGetaway;
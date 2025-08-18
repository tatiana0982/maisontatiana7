import React from 'react';
import Image from 'next/image';

const FragrantGetaway: React.FC = () => {
  return (
    <section 
      // The section now has a defined height (50vh on mobile, up to 70vh on desktop)
      className="animate-on-scroll group relative w-full mt-16 lg:mt-24 overflow-hidden h-[50vh] md:h-[60vh] lg:h-[70vh]"
    >
      <div className="transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105 h-full">
        <Image
          src="/images/img_untitled_design_2_1.png"
          width={1920}
          height={960}
          alt="A collection of five Maison Tatiana 7 perfume bottles"
          // The image now fills the taller container, using object-cover to maintain its aspect ratio
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/50 to-transparent p-6 pb-10 sm:pb-14 lg:pb-16">
        <h3 className="text-base lg:text-lg font-light text-white/90 mb-2 tracking-widest uppercase">
          A Fragrant Getaway
        </h3>
        <a href="#" className="text-sm lg:text-base font-normal text-white hover-underline-wipe">
          Discover
        </a>
      </div>
    </section>
  );
};

export default FragrantGetaway;
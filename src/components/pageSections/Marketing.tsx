import React from 'react';
import Image from 'next/image';

const Marketing: React.FC = () => {
  return (
    <section className="animate-on-scroll relative w-full py-24 lg:py-32 bg-black text-white overflow-hidden">
      <h2 
        className="absolute inset-0 w-full h-full flex items-center justify-center text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] opacity-10 whitespace-nowrap"
        aria-hidden="true"
      >
        MAISON TATIANA
      </h2>
      <div className="relative z-10">
        <Image 
          src="/images/insta_section.png"
          width={960}
          height={540}
          alt="Maison Tatiana 7 Instagram post"
          className="w-full max-w-lg mx-auto h-auto"
        />
      </div>
    </section>
  );
};

export default Marketing;
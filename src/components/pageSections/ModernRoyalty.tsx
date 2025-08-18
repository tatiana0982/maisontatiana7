import React from 'react';
import Image from 'next/image';

const ModernRoyalty: React.FC = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="animate-on-scroll">
        <h2 className="text-3xl lg:text-4xl font-atacama mb-12 text-left">
          Modern Royalty, Captured in Scent
        </h2>
      </div>
      
      <section className="animate-on-scroll flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 group overflow-hidden">
          <Image 
            src="/images/img_luxury_perfume_video_creation.png" 
            width={800} 
            height={796} 
            alt="Luxury perfume with pink roses" 
            className="w-full h-auto object-cover group-hover-zoom"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h3 className="text-2xl lg:text-3xl font-atacama mb-4">A bottle. A legacy. A presence.</h3>
          <p className="text-base lg:text-lg text-gray-800 mb-4">
            Hand-poured in France, each creation is a tribute to elegance that lingers long after you have gone.
          </p>
          <p className="text-base lg:text-lg text-[#c1ab84]">
            Refined. Mysterious. Unmistakably yours.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ModernRoyalty;
import React from 'react';
import Image from 'next/image';

const ModernRoyalty: React.FC = () => {
  return (
    <div className="animate-on-scroll w-full mt-16 lg:mt-24 overflow-hidden">
      {/* Section Title */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl lg:text-4xl font-atacama text-left tracking-wide">
          Modern Royalty, Captured in Scent
        </h2>
      </div>
      
      {/* Main Section Layout */}
      <section className="lg:grid lg:grid-cols-2 lg:items-center">
        {/* Image Container - Now constrained on smaller screens */}
        <div className="group overflow-hidden px-4 sm:px-8 lg:px-0">
          <Image 
            src="/images/7_lucky_roses.png" 
            width={800} 
            height={796} 
            alt="Luxury perfume with pink roses" 
            // On small screens, it's centered with a max-width. On large screens, it fills its grid column.
            className="w-full h-auto object-cover mx-auto max-w-xl lg:max-w-none transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
          />
        </div>

        {/* Text Container */}
        <div className="px-4 py-12 sm:p-16 lg:p-24">
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <h3 className="text-2xl lg:text-3xl font-atacama mb-4 leading-snug">
              A bottle. A legacy. A presence.
            </h3>
            <p className="text-base lg:text-lg text-gray-700 mb-4 leading-relaxed">
              Hand-poured in France, each creation is a tribute to elegance that lingers long after you have gone.
            </p>
            <p className="text-base lg:text-lg text-[#c1ab84]">
              Refined. Mysterious. Unmistakably yours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernRoyalty;
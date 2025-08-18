import React from 'react';
import Image from 'next/image';

const fragrances = [
  { src: "/images/img_img_20250811_wa0020.png", alt: "The 7 Lucky Roses perfume", name: "The 7 Lucky Roses" },
  { src: "/images/img_img_20250811_wa0016.png", alt: "The Garden of Tatiana perfume", name: "The Garden of Tatiana" },
  { src: "/images/img_img_20250811_wa0019.png", alt: "King of Burn Bridge perfume", name: "King of Burn Bridge" },
];

const SignatureFragrances: React.FC = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="animate-on-scroll text-left mb-12 lg:mb-16">
        <h2 className="text-3xl lg:text-4xl font-atacama tracking-wide">
          Discover the Signature Fragrances
        </h2>
      </div>
      
      <section className="animate-on-scroll grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
        {fragrances.map((fragrance) => (
          <div key={fragrance.name} className="text-center group">
            {/* Image with subtle, luxury hover animation */}
            <div className="overflow-hidden mb-4">
              <Image 
                src={fragrance.src}
                width={400} 
                height={400} 
                alt={fragrance.alt}
                className="w-full h-auto object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
              />
            </div>
            
            {/* Fragrance name */}
            <h3 className="text-xl lg:text-2xl font-hellix mb-2 text-black">
              {fragrance.name}
            </h3>
            
            {/* "Discover" link with the correct underline wipe animation */}
            <a href="#" className="text-base lg:text-lg font-inria text-black hover-underline-wipe">
              Discover
            </a>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SignatureFragrances;
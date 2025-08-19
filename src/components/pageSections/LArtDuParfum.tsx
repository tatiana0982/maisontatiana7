import React from 'react';
import Image from 'next/image';

const LArtDuParfum: React.FC = () => {
  return (
    <section className="animate-on-scroll bg-white mt-16 lg:mt-24">
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        {/* Text Container */}
        <div className="order-2 lg:order-1 px-4 py-12 sm:p-16 lg:p-24">
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-0 text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-atacama mb-6 tracking-wide">
              L'ART DU PARFUM
            </h2>
            <p className="text-base lg:text-lg font-atacama text-gray-700 mb-8 leading-relaxed">
              Born in France, guided by tradition, and enriched with Arabic olfactory artistry, each fragrance is a world of its own crafted for those who move with quiet confidence.
            </p>
            <div className="text-base font-atacama text-gray-500 space-y-3 inline-block text-left">
              <p>• Made in France with noble ingredients</p>
              <p>• Inspired by Eastern elegance</p>
              <p>• Five signature Eau de Parfum</p>
              <p>• Designed to linger, not fade</p>
            </div>
          </div>
        </div>

        {/* Image Container with Responsive Sizing */}
        <div className="order-1 lg:order-2 px-4 sm:px-6 lg:p-0">
          <div className="group overflow-hidden max-w-sm mx-auto sm:max-w-md lg:max-w-none lg:mx-0">
            <Image 
              src="/images/divine_armor_model.png" 
              width={800} 
              height={970} 
              alt="Perfume bottle with a model" 
              className="w-full h-auto object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LArtDuParfum;
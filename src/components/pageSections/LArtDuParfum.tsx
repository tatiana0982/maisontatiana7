import React from 'react';
import Image from 'next/image';

const LArtDuParfum: React.FC = () => {
  return (
    <section className="animate-on-scroll bg-white mt-16 lg:mt-24">
      <div className="lg:grid lg:grid-cols-2 lg:items-center">
        {/* Text Container - Updated with your new content */}
        <div className="order-2 lg:order-1 px-4 py-12 sm:p-16 lg:p-24">
          <div className="max-w-xl mx-auto lg:ml-auto lg:mr-0 text-center lg:text-left">
            <p className="text-xl lg:text-2xl font-atacama text-gray-800 mb-8 leading-relaxed">
              A unique and versatile perfume, carefully crafted to be hypoallergenic and gentle on the skin.
            </p>
            <div className="text-base lg:text-lg font-atacama text-gray-600 space-y-3 inline-block text-left">
              <p className="font-semibold text-gray-700 mb-3">Enjoy it in many ways:</p>
              <ul className="list-none space-y-2">
                <li>• On your skin and hair, for an elegant personal aura.</li>
                <li>• On your clothes and favorite linens, for a lasting touch of freshness.</li>
                <li>• In your living spaces, to create an atmosphere of refinement and luxury.</li>
              </ul>
            </div>
            <p className="mt-10 text-2xl lg:text-3xl font-atacama tracking-wide">
              One perfume. Endless ways to indulge.
            </p>
          </div>
        </div>

        {/* Image Container with Responsive Sizing - Unchanged */}
        <div className="order-1 lg:order-2 px-4 sm:px-6 lg:p-0">
          <div className="group overflow-hidden max-w-sm mx-auto sm:max-w-md lg:max-w-none lg:mx-0">
            <Image 
              src="/images/divine_armor_model.jpeg" 
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
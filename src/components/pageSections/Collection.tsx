import React from 'react';
import Image from 'next/image';

const Collection: React.FC = () => {
  return (
    <section className="animate-on-scroll flex flex-col lg:flex-row w-full mt-12 lg:mt-24">
      <div className="w-full lg:w-2/5">
        <Image 
          src="/images/img_ebd184ad_1661_4.png" 
          width={550} 
          height={964} 
          alt="Model with The Garden of Tatiana perfume" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="w-full lg:w-3/5 flex flex-col justify-center p-8 lg:p-16">
        <div className="lg:max-w-xl">
          <p className="text-sm text-gray-500 mb-2">Maison Tatiana 7 Collection</p>
          <h2 className="text-3xl lg:text-5xl font-atacama mb-12">Fragrance Collection</h2>
          
          <div className="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-4">
            {/* Product 1 */}
            <div className="snap-center flex-shrink-0 w-2/3 sm:w-1/2 lg:w-auto">
              <div className="group overflow-hidden">
                <Image 
                  src="/images/img_img_20250811_wa0017.png" 
                  width={300} 
                  height={372} 
                  alt="Covenant of Kings perfume" 
                  className="w-full h-auto object-cover group-hover-zoom"
                />
              </div>
              <div className="mt-3 text-left">
                <p className="font-hellix">Covenant of Kings</p>
                <p className="text-gray-600">120.00 €</p>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="snap-center flex-shrink-0 w-2/3 sm:w-1/2 lg:w-auto">
              <div className="group overflow-hidden">
                <Image 
                  src="/images/img_img_20250811_wa0018.png" 
                  width={300} 
                  height={372} 
                  alt="Divine Armor perfume" 
                  className="w-full h-auto object-cover group-hover-zoom"
                />
              </div>
              <div className="mt-3 text-left">
                <p className="font-hellix">Divine Armor</p>
                <p className="text-gray-600">120.00 €</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <button aria-label="Previous Product" className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <span className="font-hellix text-gray-500">1 / 2</span>
            <button aria-label="Next Product" className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
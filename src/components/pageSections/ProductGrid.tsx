import React from 'react';
import Image from 'next/image';

const products = [
  { src: "/images/img_img_0037.png", alt: "Perfume bottle in a black box" },
  { src: "/images/img_img_0043.png", alt: "Covenant of Kings perfume on a marble background" },
  { src: "/images/img_img_0034.png", alt: "Covenant of Kings perfume on a white cloth background" },
  { src: "/images/img_img_0036.png", alt: "The Garden of Tatiana perfume with a floral background" },
];

const ProductGrid: React.FC = () => {
  return (
    // 1. Added margin-top for spacing from the previous section.
    // 2. Removed the gray background and vertical padding to make it seamless.
    <section className="animate-on-scroll w-full mt-16 lg:mt-24">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {products.map((product, index) => (
          <div key={index} className="group overflow-hidden">
            <Image 
              src={product.src}
              width={720} 
              height={720} 
              alt={product.alt}
              // 3. Added refined animation classes for a smooth, luxury feel.
              className="w-full h-auto object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
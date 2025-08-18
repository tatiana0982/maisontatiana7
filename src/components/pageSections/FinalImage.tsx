import React from 'react';
import Image from 'next/image';

const FinalImage: React.FC = () => {
  return (
    <section className="animate-on-scroll w-full h-[60vh] lg:h-[80vh] relative">
      <Image
        src="/images/img_luxury_perfume.png"
        alt="A luxury perfume bottle from Maison Tatiana 7"
        fill={true} // Updated from layout="fill"
        className="object-cover" // Updated from objectFit="cover"
      />
    </section>
  );
};

export default FinalImage;
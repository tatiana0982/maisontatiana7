import React from 'react';
import Image from 'next/image';

const Marketing: React.FC = () => {
  return (
    <section 
      // On mobile, the section has a height of 60vh. On large screens (lg and up), the height is set to 'auto'.
      className="animate-on-scroll w-full mt-16 lg:mt-24 h-[60vh] lg:h-auto"
    >
      <div className="group overflow-hidden h-full">
        <Image 
          src="/images/insta_section.png"
          width={1440}
          height={810}
          alt="Maison Tatiana 7 Instagram post"
          // The image fills the container's height on all screens, and we use object-cover to prevent stretching.
          className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
        />
      </div>
    </section>
  );
};

export default Marketing;
import React from 'react';

const FinalImage: React.FC = () => {
  return (
    <section 
      // Added top margin for spacing and set responsive height
      className="animate-on-scroll w-full h-[60vh] lg:h-auto"
    >
      <div className="group overflow-hidden h-full">
        <video
          src="/videos/hero_video1.mp4"
          // Using a poster image is good practice for video load time
          poster="/images/img_luxury_perfume.png"
          className="w-full h-full object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline // Essential for autoplay on iOS devices
        />
      </div>
    </section>
  );
};

export default FinalImage;
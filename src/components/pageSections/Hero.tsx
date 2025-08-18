import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      // CORRECTED: Height is now 90% of the viewport height on mobile, which is much larger.
      // It still transitions to a full 100% height on large screens.
      className="relative w-full h-[90vh] lg:h-screen overflow-hidden bg-white"
    >
      <video
        src="/videos/hero_video1.mp4"
        className="w-full h-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/img_whatsapp_video_2025_08_15.png" // Fallback image while video loads
      />
    </section>
  );
};

export default Hero;
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      // On mobile (default), height is 75% of the viewport. On large screens, it becomes full-screen.
      className="relative w-full h-[75vh] lg:h-screen overflow-hidden"
    >
      <video
        src="/videos/hero_video1.mp4"
        className="w-full h-full object-cover brightness-75"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/img_whatsapp_video_2025_08_15.png" // Fallback image while video loads
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        {/* Content can be added here if needed in the future */}
      </div>
    </section>
  );
};

export default Hero;
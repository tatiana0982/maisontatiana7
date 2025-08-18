import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      // Changed the background to white to ensure any empty space is blank
      className="relative w-full h-[75vh] lg:h-screen overflow-hidden bg-white"
    >
      <video
        src="/videos/hero_video1.mp4"
        // Changed from object-cover to object-contain to prevent any cutting
        className="w-full h-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/img_whatsapp_video_2025_08_15.png" // This poster will show while the video loads
      />
    </section>
  );
};

export default Hero;
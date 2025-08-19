import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize(); // initial check
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const videoSrc = isMobile
    ? '/videos/hero_video2.mp4'
    : '/videos/hero_video1.mp4';

  return (
    <section className="relative w-full h-screen overflow-hidden bg-white">
      <video
      src={videoSrc}
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={isMobile ? "/images/bg_poster_mobile.png" : "/images/bg_poster.png"}
      />
    </section>
  );
};

export default Hero;

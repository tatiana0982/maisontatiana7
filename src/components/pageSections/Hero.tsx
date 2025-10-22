import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [imageSrc, setImageSrc] = useState('/images/heroimg.jpg'); // Image source for both screen sizes

  // Effect to listen to window resizing
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)'); // Example for small screen size

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setImageSrc('/images/heroimg.jpg'); // Always use the same image
    };

    // Set the initial image source
    handleResize(mediaQuery);

    // Listen for changes in screen size
    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener on component unmount
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Image Display */}
      <img
        src={imageSrc}
        alt="Hero Image"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
    </section>
  );
};

export default Hero;

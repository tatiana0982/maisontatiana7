import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <a href="/" aria-label="Go to homepage">
      {/* This uses two different images or SVGs for different screen sizes.
        - The 'lg:hidden' class shows the short logo on mobile.
        - The 'hidden lg:block' class shows the long logo on desktops.
        - You should replace 'logo-short.svg' and 'logo-long.svg' with your actual file names.
      */}
      
      {/* For this example, I'll use a single scalable SVG. */}
      <Image
        src="/images/logo.svg" // Assuming this is your new SVG logo file
        alt="Maison Tatiana 7 Logo"
        width={180} // The width will be controlled by CSS classes below
        height={40}
        className="h-8 w-auto lg:h-10" // h-8 for mobile, h-10 for desktop
      />
    </a>
  );
};

export default Logo;
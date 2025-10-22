import React from 'react';

const Hero: React.FC = () => {
  const imageSrc = '/images/heroimg.png';

  return (
    <section className="w-full overflow-hidden bg-white pt-24">
      <img
        src={imageSrc}
        alt="Hero Image"
        className="w-full h-auto"
      />
    </section>
  );
};

export default Hero;
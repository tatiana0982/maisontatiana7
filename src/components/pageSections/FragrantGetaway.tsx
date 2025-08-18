import React from 'react';

const FragrantGetaway: React.FC = () => {
  return (
    <section 
      className="animate-on-scroll relative flex items-end w-full bg-cover bg-center mt-12 lg:mt-20 h-[60vh] lg:h-[80vh]"
      style={{ backgroundImage: "url('/images/img_untitled_design_2_1.png')" }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative w-full max-w-screen-xl mx-auto p-8 lg:p-12 text-white">
        <h3 className="text-xl lg:text-2xl font-semibold mb-2">A Fragrant Getaway</h3>
        <button className="text-lg lg:text-xl font-semibold underline hover-underline-animation-white">
          Discover
        </button>
      </div>
    </section>
  );
};

export default FragrantGetaway;
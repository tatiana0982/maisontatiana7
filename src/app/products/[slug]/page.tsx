'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';
import Image from 'next/image';
import Button from '@/components/ui/Button';

// --- Updated Mock Product Data with Sale Pricing ---
const allProducts = [
    { 
        name: 'The 7 Lucky Roses', 
        slug: 'the-7-lucky-roses', 
        images: [
            '/images/img_img_20250811_wa0020.png', 
            '/images/img_luxury_perfume_video_creation.png',
            '/images/img_img_0036.png'
        ],
        price: 120.00,
        originalPrice: 180.00,
        description: 'A radiant floral composition, The 7 Lucky Roses is a tribute to the queen of flowers. A vibrant heart of Grasse Rose Absolute is woven with fresh, verdant notes, creating a scent that is both timeless and audaciously modern. It is an olfactory masterpiece that captures the essence of a thousand blooming roses in a single drop.'
    },
    { 
        name: 'The Garden of Tatiana', 
        slug: 'the-garden-of-tatiana', 
        images: [
            '/images/img_img_20250811_wa0016.png',
            '/images/img_ebd184ad_1661_4.png',
            '/images/img_img_0036.png'
        ],
        price: 200.00,
        originalPrice: 250.00,
        description: 'Step into an enchanted garden where rare blossoms and exotic spices intertwine. The Garden of Tatiana is a complex, sophisticated fragrance that unfolds in layers, revealing notes of jasmine, oud, and a hint of saffron. It is a scent for the confident soul who leaves a memorable trail.'
    },
    // Add other products here with price and originalPrice...
];

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  const product = allProducts.find(p => p.slug === params.slug);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  // Dynamic price calculation
  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} navLinks={navLinks} />
      
      <main className="flex-grow pt-20">
        <div className="w-full max-w-screen-xl mx-auto py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square overflow-hidden group">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <div 
                    key={index} 
                    className={`relative aspect-square cursor-pointer overflow-hidden transition-opacity duration-300 ${activeImage === img ? 'border-2 border-brand-gold' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image src={img} alt={`${product.name} thumbnail ${index + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:pt-8">
              <p className="text-sm uppercase tracking-widest text-gray-500">Eau de Parfum</p>
              <h1 className="text-4xl lg:text-5xl font-atacama my-3 text-black">{product.name}</h1>
              
              {/* Corrected Price Display */}
              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-3xl text-brand-gold">{totalPrice} €</p>
                {product.originalPrice && (
                  <p className="text-xl text-gray-400 line-through">{product.originalPrice.toFixed(2)} €</p>
                )}
              </div>
              
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="my-8 space-y-4 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gold" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                  <span>Estimated Delivery: 2-3 Business Days</span>
                </div>
                 <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-gold" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2-2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                  <span>Complimentary samples with every order</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-3 text-lg transition-colors hover:bg-gray-100">-</button>
                  <span className="px-6 text-lg tabular-nums">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-3 text-lg transition-colors hover:bg-gray-100">+</button>
                </div>
                <Button size="lg" className="flex-grow bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                  Add to Cart
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.705 11A8 8 0 0018.295 11M12 20.945A8 8 0 0012 5.055M12 20.945A8 8 0 0112 5.055" /></svg>
                    <span>Worldwide Shipping</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <span>Secure Payments</span>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
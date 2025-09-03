'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileMenu from '@/components/common/MobileMenu';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

const navLinks = [
  { name: 'Shop', href: '/products' },
  { name: 'Collections', href: '/products' },
  { name: 'Our Story', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

type SingleImage = {
  id: number;
  image_path: string;
};

type MultipleImage = {
  id: number;
  image_path: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  meta_title: string;
  keywords: string;
  meta_description: string;
  price: string;
  quantity: number;
  status: 'published';
  created_at: string;
  updated_at: string;
  single_image: SingleImage;
  multiple_images: MultipleImage[];
};

const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://admin.maisontatiana7worldwide.com/api/product/${params.slug}`
        );
        if (!res.ok) throw new Error('Failed to load product');
        const data: Product = await res.json();
        setProduct(data);
        setActiveImage(data.single_image.image_path);
      } catch (err) {
        console.error(err);
        setError('Unable to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error || 'Product not found.'}</p>
      </div>
    );
  }

  const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);

  
const router = useRouter();

const handleBuyNow = () => {
  router.push(`/checkout?productId=${product.id}&quantity=1`);
};

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />

      <main className="flex-grow pt-20">
        <div className="w-full max-w-screen-xl mx-auto py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square overflow-hidden group">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className="object-cover transform-gpu transition-transform duration-500 ease-luxury group-hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.multiple_images.map((img) => (
                  <div
                    key={img.id}
                    className={`relative aspect-square cursor-pointer overflow-hidden transition-opacity duration-300 ${
                      activeImage === img.image_path
                        ? 'border-2 border-brand-gold'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setActiveImage(img.image_path)}
                  >
                    <Image
                      src={img.image_path}
                      alt={`${product.title} thumbnail`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="lg:pt-8">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Eau de Parfum
              </p>
              <h1 className="text-4xl lg:text-5xl font-atacama my-3 text-black">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <p className="text-3xl text-brand-gold">{totalPrice} €</p>
              </div>

              <div className="prose prose-lg text-gray-600 leading-relaxed">
                <p>{product.description}</p>
              </div>

              <div className="my-8 space-y-4 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-brand-gold"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Estimated Delivery: 7‑14 Business Days</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-brand-gold"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 7h12v3H4V7zm0 4h5v6H4v-6zm7 0h5v6h-5v-6zM7 3a1 1 0 000 2h1v2h2V5h1a1 1 0 100-2c-.5 0-1 .5-2 2-1-1.5-1.5-2-2-2z" />
                  </svg>
                  <span>Receive a surprise gift with every order</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-lg transition-colors hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-6 text-lg tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 text-lg transition-colors hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <Button className="flex-grow bg-black text-white hover:bg-gray-800" size="lg" onClick={handleBuyNow}>
                  Add to Cart
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.705 11A8 8 0 0018.295 11M12 20.945A8 8 0 0012 5.055M12 20.945A8 8 0 0112 5.055"
                    />
                  </svg>
                  <span>Worldwide Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
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

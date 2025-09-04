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
  router.push(`/checkout?productId=${product.id}&quantity=${quantity}`);
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
  viewBox="0 0 512 512"
  fill="currentColor"
>
  <path d="M493.489,160.246c-1.715-4.249-6.55-6.302-10.795-4.587c-4.247,1.714-6.302,6.824-4.587,11.072 c10.455,25.906,16.2,52.776,17.148,81.527h-62.977c-1.064-49.762-11.529-95.846-30.131-135.64 c9.404-6.556,18.415-13.915,26.972-21.776c13.061,13.632,24.607,28.826,34.268,45.526c2.294,3.963,7.369,5.283,11.333,2.991 c3.964-2.293,5.32-7.385,3.027-11.35c-22.106-38.213-53.894-70.27-91.93-92.691C346.627,12.217,301.737,0.002,256,0.002 c-68.38,0-132.668,26.626-181.019,74.979S0,187.619,0,255.999s26.628,132.667,74.981,181.019 c48.352,48.352,112.639,74.98,181.019,74.98s132.668-26.628,181.019-74.981S512,324.378,512,255.998 C512,222.897,505.772,190.682,493.489,160.246z M415.686,248.257h-47.997c-0.766,0-1.504-0.164-2.208,0.03l-3.895-54.668 c-0.164-2.296-1.274-4.49-3.065-5.934s-4.099-2.115-6.381-1.789l-19.695,2.797c-1.077-13.447-2.55-27.19-4.432-40.813 c21.072-6.156,41.254-14.748,60.097-26.129C404.598,157.979,414.619,200.706,415.686,248.257z M366.638,264.496 c0.345,0.044,0.693,0.351,1.051,0.351h47.997c-1.067,46.445-11.097,89.768-27.597,126.007 c-18.812-11.337-39.002-20.473-60.051-26.649c2.727-19.87,4.704-40.981,5.851-62.822l22.406,22.407 c2.448,2.448,6.159,3.116,9.309,1.68c3.149-1.439,5.075-4.681,4.828-8.134L366.638,264.496z M417.224,79.115 c-7.214,6.579-14.769,12.677-22.626,18.269c-4.001-7.352-8.289-14.435-12.88-21.199c-11.61-17.109-24.596-31.534-38.601-43.08 C370.355,43.789,395.509,59.385,417.224,79.115z M380.733,106.539c-17.316,10.595-35.862,18.894-55.227,24.752 C318.238,87.2,306.507,46.07,289.757,21.978C326.259,33.788,358.158,64.331,380.733,106.539z M225.193,218.877l36.082,21.649 c-2.114,2.589-4.242,5.413-6.38,7.938c-0.867-0.307-1.795-0.207-2.767-0.207h-58.565c0.316-34.281,2.551-66.327,6.527-95.986 c18.18,4.046,36.907,5.999,55.91,5.999c18.994,0,37.71-2.155,55.878-6.196c1.652,12.285,3.04,25.269,4.114,38.985l-87.703,12.511 c-3.476,0.497-6.262,3.118-6.957,6.561C220.635,213.573,222.183,217.07,225.193,218.877z M240.689,264.844 c-14.742,15.482-29.967,30.583-45.592,43.51c-0.876-14.264-1.396-29.134-1.536-43.51H240.689z M256,16.585 c18.733,0,41.18,43.48,53.439,118.959c-17.36,3.953-35.263,6-53.439,6c-18.188,0-36.104-2.051-53.48-6.012 c3.071-18.972,6.892-36.595,11.411-52.411C227.947,34.065,244.853,16.585,256,16.585z M186.532,131.299 c-19.378-5.859-37.936-14.164-55.263-24.764c22.613-42.277,54.579-72.851,91.157-84.616 C206.203,45.141,194.143,84.828,186.532,131.299z M184.044,148.299c-4.348,31.742-6.729,65.678-7.064,99.958H96.313 c1.066-47.551,11.088-90.281,27.574-126.51C142.748,133.136,162.952,142.142,184.044,148.299z M169.14,32.897 c-14.104,11.581-27.177,26.074-38.859,43.288c-4.588,6.762-8.876,13.845-12.876,21.194c-7.848-5.586-15.393-11.675-22.6-18.244 C116.36,59.473,141.511,43.691,169.14,32.897z M82.926,91.019c8.543,7.845,17.537,15.192,26.926,21.736 c-18.601,39.794-29.067,85.74-30.131,135.502H16.747C18.827,187.436,43.631,132.156,82.926,91.019z M16.747,264.844h62.968 c0.761,35.387,6.425,69.357,16.862,101.274c-18.101,6.645-33.9,10.492-46.343,12.548C30.207,345.087,18.168,305.76,16.747,264.844 z M60.011,393.338c22.246-4.356,52.453-13.407,86.404-32.12c4.012-2.211,5.472-7.255,3.26-11.266 c-2.211-4.012-7.258-5.472-11.266-3.26c-9.13,5.033-17.959,9.593-26.407,13.253c-9.683-29.965-14.945-61.925-15.693-95.1h80.663 c0.177,18.799,0.966,37.449,2.344,55.651c-4.444,3.315-8.915,6.375-13.416,9.434c-3.789,2.574-4.772,7.665-2.197,11.452 c2.575,3.787,7.733,4.737,11.522,2.163c37.194-25.276,72.513-58.961,104.979-100.084c1.477-1.871,2.078-4.296,1.649-6.642 c-0.429-2.344-1.847-4.397-3.891-5.623l-24.202-14.523l91.917-13.133l6.628,92.798l-19.665-19.666 c-1.885-1.884-4.562-2.747-7.192-2.322c-2.631,0.427-4.897,2.092-6.09,4.476c-0.15,0.301-15.424,30.493-48.429,66.984 c-29.958,33.123-80.798,77.931-153.819,105.085C94.981,435.082,75.654,415.595,60.011,393.338z M316.422,315.169 c-1.098,15.493-2.623,30.514-4.547,44.861c-8.995-2.011-18.116-3.541-27.328-4.57 C298.027,340.415,308.579,326.514,316.422,315.169z M134.213,462.04c4.141-1.688,8.214-3.424,12.21-5.213 c7.284,8.37,14.996,15.847,23.049,22.395C157.196,474.448,145.414,468.686,134.213,462.04z M162.04,449.412 c12.39-6.209,24.026-12.841,34.892-19.721c5.925,21.653,14.156,44.208,25.237,60.22 C200.582,482.837,180.037,469.066,162.04,449.412z M256.001,495.411c-12.219-0.001-30.165-19.929-44.477-75.415 c23.478-16.314,42.952-33.454,58.505-49.13c13.34,0.772,26.521,2.663,39.417,5.617c-3.85,23.828-8.844,45.408-14.826,63.669 C283.289,474.753,268.851,495.411,256.001,495.411z M310.384,445.314c6.099-18.619,11.208-40.483,15.165-64.554 c19.34,5.875,37.877,14.194,55.158,24.744c-22.622,42.274-54.598,72.84-91.185,84.588 C297.209,479.127,304.218,464.141,310.384,445.314z M342.86,479.097c14.104-11.58,27.177-26.073,38.859-43.288 c4.583-6.752,8.864-13.825,12.86-21.163c7.869,5.587,15.43,11.657,22.622,18.209C395.644,452.52,370.491,468.302,342.86,479.097z M429.077,421.525c-8.523-7.823-17.525-14.888-26.939-21.434c18.608-39.799,29.077-86.59,30.141-135.247h62.974 C493.174,324.559,468.37,380.389,429.077,421.525z" />
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

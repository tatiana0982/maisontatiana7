// src/app/success/page.tsx

'use client';

import Lottie from 'lottie-react'; // Corrected import from 'Player' to 'Lottie'

import successAnimation from '@/../public/lottie/success.json';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      {/* Increased the container size for better visibility */}
      <div className="w-64 h-64 mb-6">
        <Lottie
          animationData={successAnimation}
          loop={true}
          autoplay={true}
        />
      </div>

      <h1 className="text-3xl font-semibold text-gray-800 mb-4">Order Successful!</h1>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      <Link href="/">
        <button className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded transition duration-300">
          Return to Home
        </button>
      </Link>
    </main>
  );
}
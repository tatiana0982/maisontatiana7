// src/app/success/page.tsx

'use client';

import Player from 'lottie-react';

import successAnimation from '@/../public/lottie/success.json';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <div className="w-40 h-40 mb-6">
        <Player
          autoplay
          loop={true} // Changed to true for infinite loop
          animationData={successAnimation}
          style={{ height: '100%', width: '100%' }}
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

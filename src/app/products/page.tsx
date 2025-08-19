import React from 'react';
import Link from 'next/link';

// You can expand this data as needed
const products = [
  { name: 'The Garden of Tatiana', slug: 'the-garden-of-tatiana' },
  { name: 'Covenant of Kings', slug: 'covenant-of-kings' },
  { name: 'Divine Armor', slug: 'divine-armor' },
  { name: 'King of Burn Bridge', slug: 'king-of-burn-bridge' },
  { name: 'The 7 Lucky Roses', slug: 'the-7-lucky-roses' },
];

const ProductsPage = () => {
  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-atacama mb-8">Our Fragrances</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {products.map(product => (
          <Link key={product.slug} href={`/products/${product.slug}`} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
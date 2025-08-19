import React from 'react';

// The `params` object will contain the `slug` from the URL
const ProductDetailPage = ({ params }: { params: { slug: string } }) => {
  // Replace hyphens with spaces and capitalize words for a clean title
  const productName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="py-24 text-center">
      <h1 className="text-4xl font-atacama">{productName}</h1>
      <p className="mt-4 text-gray-600">Details for this fragrance will be displayed here.</p>
    </div>
  );
};

export default ProductDetailPage;
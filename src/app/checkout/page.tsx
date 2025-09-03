'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Navbar from '@/components/common/Navbar'; // Adjust if needed
import Footer from '@/components/common/Footer'; // Adjust if needed
import Button from '@/components/ui/Button'; // Your button component
import { useSearchParams, useRouter } from 'next/navigation';

type BankDetails = {
  account_number: string;
  account_name: string;
  ifsc_code: string;
};

type OrderRequest = {
  product_id: string;
  email: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zip_code: string;
  address_line: string;
  payment_screenshot: File | null;
  quantity: number;
  price: string;
  total_price: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Product id & quantity from query params
  const productId = searchParams.get('productId') || '';
  const quantityParam = searchParams.get('quantity') || '1';
  const quantity = parseInt(quantityParam, 10) || 1;

  // Assuming you fetch product price elsewhere or pass it — we'll just store it here for demo:
  // You might want to fetch product details by productId, but I'll keep it simple here.
  const [price, setPrice] = useState('0.00');

  // Form state
  const [form, setForm] = useState<OrderRequest>({
    product_id: productId,
    email: '',
    name: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    zip_code: '',
    address_line: '',
    payment_screenshot: null,
    quantity,
    price,
    total_price: '0.00',
  });

  // Bank details state
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Calculate total price on quantity or price change
  useEffect(() => {
    const total = (parseFloat(price) * form.quantity).toFixed(2);
    setForm((f) => ({ ...f, total_price: total, price }));
  }, [price, form.quantity]);

  // Fetch bank details on mount
  useEffect(() => {
    async function fetchBankDetails() {
      try {
        const res = await fetch('https://admin.maisontatiana7worldwide.com/api/bank-details');
        if (!res.ok) throw new Error('Failed to fetch bank details');
        const data = await res.json();
        setBankDetails({
          account_number: data.account_number,
          account_name: data.account_name,
          ifsc_code: data.ifsc_code,
        });
      } catch (e) {
        setError('Could not load bank details');
      }
    }

    // Fetch product price based on productId if needed here
    // For example, fetch product details API and set price state

    fetchBankDetails();
  }, []);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: value,
    }));
  };

  // Handle quantity change (make sure quantity is positive integer)
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, parseInt(e.target.value, 10) || 1);
    setForm((f) => ({
      ...f,
      quantity: val,
    }));
  };

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm((f) => ({
        ...f,
        payment_screenshot: e.target.files![0],
      }));
    }
  };

  // Submit order form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!form.payment_screenshot) {
      setError('Please upload a payment screenshot.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('product_id', form.product_id);
      formData.append('email', form.email);
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('country', form.country);
      formData.append('state', form.state);
      formData.append('city', form.city);
      formData.append('zip_code', form.zip_code);
      formData.append('address_line', form.address_line);
      formData.append('quantity', form.quantity.toString());
      formData.append('price', form.price);
      formData.append('total_price', form.total_price);
      formData.append('payment_screenshot', form.payment_screenshot);

      const res = await fetch('https://admin.maisontatiana7worldwide.com/api/create-order', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      setSuccess('Order placed successfully! Your order ID is ' + data.data.id);

      // Optionally redirect to a success page or clear form:
      setTimeout(() => {
        router.push('/order-success'); // Create this page if you want
      }, 2500);
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto p-4 sm:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        {/* Bank Details */}
        <section className="bg-gray-50 p-6 rounded-lg mb-8 shadow">
          <h2 className="text-xl font-semibold mb-4">Bank Details for Payment</h2>
          {bankDetails ? (
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Account Name:</strong> {bankDetails.account_name}
              </p>
              <p>
                <strong>Account Number:</strong> {bankDetails.account_number}
              </p>
              <p>
                <strong>IFSC Code:</strong> {bankDetails.ifsc_code}
              </p>
            </div>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : (
            <p>Loading bank details...</p>
          )}
        </section>

        {/* Order Form */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block font-medium mb-1">
                Phone <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="+1234567890"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block font-medium mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                value={form.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="India"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block font-medium mb-1">
                State <span className="text-red-600">*</span>
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                value={form.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Maharashtra"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block font-medium mb-1">
                City <span className="text-red-600">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Mumbai"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label htmlFor="zip_code" className="block font-medium mb-1">
                Zip Code <span className="text-red-600">*</span>
              </label>
              <input
                id="zip_code"
                name="zip_code"
                type="text"
                required
                value={form.zip_code}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="400001"
              />
            </div>

            {/* Address Line */}
            <div>
              <label htmlFor="address_line" className="block font-medium mb-1">
                Address <span className="text-red-600">*</span>
              </label>
              <textarea
                id="address_line"
                name="address_line"
                required
                value={form.address_line}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="123 Street, Area"
              ></textarea>
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block font-medium mb-1">
                Quantity <span className="text-red-600">*</span>
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                required
                value={form.quantity}
                onChange={handleQuantityChange}
                className="w-full max-w-[100px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Price (read only) */}
            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Price per Unit
              </label>
              <input
                id="price"
                name="price"
                type="text"
                readOnly
                value={form.price}
                className="w-full max-w-[120px] border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Total Price (read only) */}
            <div>
              <label htmlFor="total_price" className="block font-medium mb-1">
                Total Price
              </label>
              <input
                id="total_price"
                name="total_price"
                type="text"
                readOnly
                value={form.total_price}
                className="w-full max-w-[140px] border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Payment Screenshot */}
            <div>
              <label htmlFor="payment_screenshot" className="block font-medium mb-1">
                Upload Payment Screenshot <span className="text-red-600">*</span>
              </label>
              <input
                id="payment_screenshot"
                name="payment_screenshot"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full"
              />
            </div>

            {/* Submit button */}
            <div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Placing order...' : 'Place Order'}
              </Button>
            </div>

            {/* Success & Error messages */}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {success && <p className="text-green-600 text-center">{success}</p>}
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

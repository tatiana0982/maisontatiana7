'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';

// --- Type Definitions ---
type BankDetails = {
  account_number: string;
  account_name: string;
  ifsc_code: string;
};

type ProductDetails = {
    id: string;
    title: string;
    price: string;
    single_image: {
        image_path: string;
    };
};

// --- Helper Components ---

// Back Button SVG Icon
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

// File Upload Icon
const UploadCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

// --- Main Checkout Page Component ---
export default function CheckoutPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // --- State Management ---
    const productId = searchParams.get('productId') || '';
    const quantity = parseInt(searchParams.get('quantity') || '1', 10);

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
    
    const [form, setForm] = useState({
        email: '',
        name: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        zip_code: '',
        address_line: '',
    });
    
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- Data Fetching ---
    useEffect(() => {
        if (!productId) {
            router.push('/products');
            return;
        }

        async function fetchData() {
            try {
                // Fetch product details for the summary card
                const productRes = await fetch(`https://admin.maisontatiana7worldwide.com/api/product/${productId}`);
                if (!productRes.ok) throw new Error('Could not load product details.');
                const productData = await productRes.json();
                setProduct(productData);

                // Fetch bank details
                const bankRes = await fetch('https://admin.maisontatiana7worldwide.com/api/bank-details');
                if (!bankRes.ok) throw new Error('Failed to fetch bank details');
                const bankData = await bankRes.json();
                setBankDetails(bankData);

            } catch (err: any) {
                setApiError(err.message);
            }
        }
        fetchData();
    }, [productId, router]);
    
    // --- Handlers ---
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileValidation = (selectedFile: File): boolean => {
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

        if (selectedFile.size > MAX_SIZE) {
            setFileError('File is too large. Maximum size is 10MB.');
            return false;
        }
        if (!ALLOWED_TYPES.includes(selectedFile.type)) {
            setFileError('Invalid file type. Please upload a JPG, PNG, or PDF.');
            return false;
        }
        
        setFileError(null);
        return true;
    };
    
    const handleFileSelect = (selectedFile: File | null) => {
        if (selectedFile && handleFileValidation(selectedFile)) {
            setFile(selectedFile);
            // Simulate upload progress for UX
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 100);
        } else {
            setFile(null);
            setUploadProgress(0);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files ? e.target.files[0] : null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleFileSelect(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            setFileError('Please upload a payment screenshot.');
            return;
        }
        if (!product) {
            setApiError('Product details are not loaded.');
            return;
        }
        setLoading(true);
        setApiError(null);

        const formData = new FormData();
        // The API expects 'product id' with a space, which is unusual but required.
        formData.append('product id', productId);
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('quantity', quantity.toString());
        formData.append('price', product.price);
        formData.append('total_price', (parseFloat(product.price) * quantity).toFixed(2));
        formData.append('payment_screenshot', file);

        try {
            const res = await fetch('https://admin.maisontatiana7worldwide.com/api/create-order', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();
            if (!res.ok) {
                // Handle validation errors from the server if they exist
                if (result.errors) {
                    const errorMessages = Object.values(result.errors).flat().join(' ');
                    throw new Error(errorMessages || 'An unknown validation error occurred.');
                }
                throw new Error(result.message || 'Failed to place order.');
            }
            
            router.push('/success');

        } catch (err: any) {
            setApiError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-gray-600">{apiError || 'Loading your order...'}</p>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-8">
                    <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-300">
                        <ArrowLeftIcon />
                        Back to Product
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
                    {/* Left Side: Form & Bank Details */}
                    <div className="lg:pr-8">
                        <div className="mb-12">
                            <h2 className="text-2xl font-atacama tracking-wider mb-4">Bank Details</h2>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-700 space-y-3">
                                {bankDetails ? (
                                    <>
                                        <p><strong>Account Name:</strong> {bankDetails.account_name}</p>
                                        <p><strong>Account Number:</strong> {bankDetails.account_number}</p>
                                        <p><strong>IFSC Code:</strong> {bankDetails.ifsc_code}</p>
                                    </>
                                ) : (
                                    <p>Loading bank details...</p>
                                )}
                            </div>
                        </div>

                        <h2 className="text-2xl font-atacama tracking-wider mb-4">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <input type="text" name="name" placeholder="Full Name *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                                <input type="tel" name="phone" placeholder="Phone Number *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                            </div>
                            <input type="email" name="email" placeholder="Email Address *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                            <textarea name="address_line" placeholder="Street Address *" required rows={3} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow"></textarea>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <input type="text" name="city" placeholder="City *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                                <input type="text" name="state" placeholder="State / Province *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <input type="text" name="zip_code" placeholder="ZIP / Postal Code *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                                <input type="text" name="country" placeholder="Country *" required onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black transition-shadow" />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Payment Screenshot *</h3>
                                <div 
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-black hover:bg-gray-100"
                                    onClick={() => document.getElementById('fileUpload')?.click()}
                                >
                                    <input type="file" id="fileUpload" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} className="hidden" />
                                    <div className="flex flex-col items-center">
                                        <UploadCloudIcon />
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 10MB)</p>
                                    </div>
                                </div>
                                {file && (
                                    <div className="mt-4 text-sm">
                                        <p className="font-semibold text-gray-700">{file.name}</p>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                            <div className="bg-black h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                                        </div>
                                    </div>
                                )}
                                {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                            </div>

                            {apiError && <p className="text-red-500 text-center text-sm">{apiError}</p>}
                            
                            <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800" disabled={loading}>
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </Button>
                        </form>
                    </div>

                    {/* Right Side: Product Summary */}
                    <div className="row-start-1 lg:row-auto mt-10 lg:mt-0">
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 sticky top-24">
                            <h2 className="text-2xl font-atacama tracking-wider mb-6 border-b pb-4">Order Summary</h2>
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                                    <Image src={product.single_image.image_path} alt={product.title} fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{product.title}</h3>
                                    <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                </div>
                            </div>
                            <div className="mt-6 border-t pt-6 space-y-4 text-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>€{(parseFloat(product.price) * quantity).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4">
                                    <span>Total</span>
                                    <span>€{(parseFloat(product.price) * quantity).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}


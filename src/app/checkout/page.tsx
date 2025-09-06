'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent, Suspense } from 'react';

// --- Mock Components to resolve import errors ---
// In a real project, you would import these from your component library.
const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
            <div className="font-bold text-2xl font-serif">Maison Tatiana 7</div>
            <button onClick={onMenuOpen} className="lg:hidden">Menu</button>
        </div>
    </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white p-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
            <p>&copy; 2024 Maison Tatiana 7. All rights reserved.</p>
        </div>
    </footer>
);

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { size?: string; className?: string }) => (
    <button {...props} className={`px-6 py-3 rounded-md font-semibold transition-colors duration-300 ${props.className}`}>
        {children}
    </button>
);


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

type FormState = {
    email: string;
    name: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address_line: string;
};

type OrderDetails = {
    orderId: string;
    product: ProductDetails;
    quantity: number;
    shippingInfo: FormState;
    orderDate: string;
};


// --- Helper Components ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const UploadCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const PrintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

// --- NEW: Order Receipt Component ---
const OrderReceiptComponent = ({ orderDetails, onContinue }: { orderDetails: OrderDetails, onContinue: () => void }) => {
    const handlePrint = () => window.print();

    const { orderId, product, quantity, shippingInfo, orderDate } = orderDetails;
    const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);
    const formattedDate = new Date(orderDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <>
            <style jsx global>{`
                @media print {
                    body * { visibility: hidden; }
                    #printable-receipt, #printable-receipt * { visibility: visible; }
                    #printable-receipt { position: absolute; left: 0; top: 0; width: 100%; }
                    .no-print { display: none; }
                }
            `}</style>
            <main className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-3xl mx-auto">
                    <div id="printable-receipt" className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
                        <div className="flex flex-col items-center text-center border-b pb-8 mb-8">
                            <CheckCircleIcon />
                            <h1 className="text-3xl font-bold text-gray-800 mt-4">Thank you for your order!</h1>
                            <p className="text-gray-600 mt-2">Your receipt is below. Please save it for your records.</p>
                        </div>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">Order Receipt</h2>
                                <p className="text-gray-500">Order ID: <span className="font-medium text-gray-700">{orderId}</span></p>
                                <p className="text-gray-500">Date: <span className="font-medium text-gray-700">{formattedDate}</span></p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-lg">Maison Tatiana 7</h3>
                                <p className="text-sm text-gray-500">Worldwide</p>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Shipping To</h3>
                            <div className="text-gray-600">
                                <p className="font-bold">{shippingInfo.name}</p>
                                <p>{shippingInfo.address_line}</p>
                                <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip_code}</p>
                                <p>{shippingInfo.country}</p>
                                <p>Email: {shippingInfo.email}</p>
                                <p>Phone: {shippingInfo.phone}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Order Summary</h3>
                            <div className="flow-root">
                                <div className="flex items-center gap-6 py-4 border-b">
                                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={product.single_image.image_path} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{product.title}</h3>
                                        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                    </div>
                                    <p className="font-semibold">€{totalPrice}</p>
                                </div>
                            </div>
                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>€{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-gray-800 border-t pt-4 mt-3">
                                    <span>Total Paid</span>
                                    <span>€{totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 no-print">
                        <Button onClick={handlePrint} className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800 flex items-center justify-center">
                            <PrintIcon /> Print / Save as PDF
                        </Button>
                        <Button onClick={onContinue} className="w-full sm:w-auto bg-black text-white hover:bg-gray-800">
                            Continue to Success
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
};

// --- NEW: Success Page Component ---
const SuccessComponent = () => (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <div className="w-40 h-40 mb-6">
           <CheckCircleIcon />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <a href="/">
            <Button className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded transition duration-300">
                Return to Home
            </Button>
        </a>
    </main>
);

// --- Checkout Logic Component (Main Logic) ---
function CheckoutComponent() {
    // --- State Management ---
    const [pageState, setPageState] = useState<'checkout' | 'receipt' | 'success'>('checkout');
    const [latestOrderDetails, setLatestOrderDetails] = useState<OrderDetails | null>(null);

    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
    const [form, setForm] = useState<FormState>({ email: '', name: '', phone: '', country: '', state: '', city: '', zip_code: '', address_line: '' });
    const [errors, setErrors] = useState<Partial<FormState>>({});
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'bank' | 'blockchain'>('bank');
    const [blockchainType, setBlockchainType] = useState<'eth' | 'usdt' | null>(null);
    const [showQrModal, setShowQrModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const blockchainOptions = [
        {
            key: 'eth',
            name: 'Ethereum (ETH)',
            logo: 'images/ethereum-eth.svg',
            qr: 'images/eth.jpg',
            wallet: '0x1234567890ABCDEF1234567890ABCDEF12345678'
        },
        {
            key: 'usdt',
            name: 'Tether (USDT)',
            logo: 'images/tether.svg',
            qr: 'images/usdt.jpg',
            wallet: 'TQ1234567890ABCDEF1234567890ABCDEF12345678'
        }
    ];

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pId = params.get('productId') || '';
        const qty = parseInt(params.get('quantity') || '1', 10);
        setProductId(pId);
        setQuantity(qty);

        if (!pId) {
            window.location.href = '/products'; // Redirect if no product ID
            return;
        }

        async function fetchData() {
            try {
                const productRes = await fetch(`https://admin.maisontatiana7worldwide.com/api/product/${pId}`);
                if (!productRes.ok) throw new Error('Could not load product details.');
                const productData = await productRes.json();
                setProduct(productData);

                const bankRes = await fetch('https://admin.maisontatiana7worldwide.com/api/bank-details');
                if (!bankRes.ok) throw new Error('Failed to fetch bank details');
                const bankData = await bankRes.json();
                setBankDetails(bankData);
            } catch (err: any) {
                setApiError(err.message);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFileValidation = (selectedFile: File): boolean => {
        const MAX_SIZE = 10 * 1024 * 1024;
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
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress(prev => (prev >= 100 ? 100 : prev + 10));
                if (uploadProgress >= 100) clearInterval(interval);
            }, 100);
        } else {
            setFile(null);
            setUploadProgress(0);
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => handleFileSelect(e.target.files ? e.target.files[0] : null);
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleFileSelect(e.dataTransfer.files ? e.dataTransfer.files[0] : null);
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<FormState> = {};
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!form.name.trim() || form.name.trim().length < 3) newErrors.name = 'Full name must be at least 3 characters.';
        if (!form.email.trim() || !emailRegex.test(form.email)) newErrors.email = 'Please enter a valid email address.';
        if (!form.phone.trim()) newErrors.phone = 'Phone number is required.';
        if (!form.address_line.trim()) newErrors.address_line = 'Street address is required.';
        if (!form.city.trim()) newErrors.city = 'City is required.';
        if (!form.state.trim()) newErrors.state = 'State is required.';
        if (!form.zip_code.trim()) newErrors.zip_code = 'ZIP code is required.';
        if (!form.country.trim()) newErrors.country = 'Country is required.';
        setErrors(newErrors);
        if (!file) setFileError('Please upload a payment screenshot.');
        return Object.keys(newErrors).length === 0 && !!file;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm() || !product) return;

        setLoading(true);
        setApiError(null);

        const formData = new FormData();
        formData.append('product id', productId);
        Object.entries(form).forEach(([key, value]) => formData.append(key, value));
        formData.append('quantity', quantity.toString());
        formData.append('price', product.price);
        formData.append('total_price', (parseFloat(product.price) * quantity).toFixed(2));
        formData.append('payment_screenshot', file!);

        try {
            const res = await fetch('https://admin.maisontatiana7worldwide.com/api/create-order', { method: 'POST', body: formData });
            const result = await res.json();
            if (!res.ok) {
                const errorMessages = result.errors ? Object.values(result.errors).flat().join(' ') : (result.message || 'Failed to place order.');
                throw new Error(errorMessages || 'An unknown validation error occurred.');
            }

            const orderId = `MT7-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            const orderDetails: OrderDetails = { orderId, product, quantity, shippingInfo: form, orderDate: new Date().toISOString() };
            setLatestOrderDetails(orderDetails);
            setPageState('receipt'); // Switch to receipt view

        } catch (err: any) {
            setApiError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // Conditional Rendering based on pageState
    if (pageState === 'receipt' && latestOrderDetails) {
        return <OrderReceiptComponent orderDetails={latestOrderDetails} onContinue={() => setPageState('success')} />;
    }

    if (pageState === 'success') {
        return <SuccessComponent />;
    }
    
    // Default: Checkout Form
    if (!product) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50"><p className="text-gray-600">{apiError || 'Loading your order...'}</p></div>;
    }

    const getError = (fieldName: keyof FormState) => errors[fieldName] ? <p className="text-red-500 text-xs mt-1">{errors[fieldName]}</p> : null;

    const MagnifyIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
        </svg>
    );

    const handleCopyWallet = () => {
        const wallet = blockchainOptions.find(opt => opt.key === blockchainType)?.wallet || '';
        navigator.clipboard.writeText(wallet);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            <Header onMenuOpen={() => setIsMenuOpen(true)} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
                <div className="mb-8">
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors duration-300">
                        <ArrowLeftIcon /> Back to Product
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
                    <div className="lg:pr-8">
                         <div className="mb-12 mt-12">
                            <h2 className="text-2xl font-serif tracking-wider mb-4">Choose Payment Method</h2>
                            <div className="mb-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={paymentMethod === 'bank'}
                                        onChange={() => setPaymentMethod('bank')}
                                        className="accent-black"
                                    />
                                    <span className="font-semibold">Bank Transfer</span>
                                </label>
                                <label className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        checked={paymentMethod === 'blockchain'}
                                        onChange={() => setPaymentMethod('blockchain')}
                                        className="accent-black"
                                    />
                                    <span className="font-semibold">Blockchain (Crypto)</span>
                                </label>
                            </div>
                            {paymentMethod === 'bank' && (
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Bank</h3>
                                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-700 space-y-3">
                                        {bankDetails ? (<>
                                            <p><strong>Account Name:</strong> {bankDetails.account_name}</p>
                                            <p><strong>Account Number:</strong> {bankDetails.account_number}</p>
                                            <p><strong>IFSC Code:</strong> {bankDetails.ifsc_code}</p>
                                        </>) : <p>Loading bank details...</p>}
                                    </div>
                                </div>
                            )}
                            {paymentMethod === 'blockchain' && (
                                <div>
                                    <h3 className="text-lg font-bold mb-2">Blockchain</h3>
                                    <div className="flex gap-6 mb-4">
                                        {blockchainOptions.map(option => (
                                            <button
                                                key={option.key}
                                                type="button"
                                                className={`flex flex-col items-center p-4 border rounded-lg transition-colors duration-200 ${blockchainType === option.key ? 'border-black bg-gray-100' : 'border-gray-300 bg-white'}`}
                                                onClick={() => setBlockchainType(option.key as 'eth' | 'usdt')}
                                            >
                                                <img src={option.logo} alt={option.name} className="w-10 h-10 mb-2" />
                                                <span className="font-semibold">{option.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {blockchainType && (
                                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-gray-700 flex flex-col items-center relative">
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2"
                                                onClick={() => setShowQrModal(true)}
                                                aria-label="Magnify QR"
                                            >
                                                <MagnifyIcon />
                                            </button>
                                            <img src={blockchainOptions.find(opt => opt.key === blockchainType)?.qr} alt="QR Code" className="w-32 h-32 mb-4" />
                                            <p className="font-bold mb-2">Wallet Address:</p>
                                            <p className="break-all text-gray-800 text-center mb-2">{blockchainOptions.find(opt => opt.key === blockchainType)?.wallet}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-serif tracking-wider mb-4">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" name="name" placeholder="Full Name *" onChange={handleInputChange} className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                    {getError('name')}
                                </div>
                                <div>
                                    <input type="tel" name="phone" placeholder="Phone Number *" onChange={handleInputChange} className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                    {getError('phone')}
                                </div>
                            </div>
                            <div>
                                <input type="email" name="email" placeholder="Email Address *" onChange={handleInputChange} className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                {getError('email')}
                            </div>
                            <div>
                                <textarea name="address_line" placeholder="Street Address *" rows={3} onChange={handleInputChange} className={`w-full p-3 border ${errors.address_line ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`}></textarea>
                                {getError('address_line')}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" name="city" placeholder="City *" onChange={handleInputChange} className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                    {getError('city')}
                                </div>
                                <div>
                                    <input type="text" name="state" placeholder="State / Province *" onChange={handleInputChange} className={`w-full p-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                    {getError('state')}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <input type="text" name="zip_code" placeholder="ZIP / Postal Code *" onChange={handleInputChange} className={`w-full p-3 border ${errors.zip_code ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                    {getError('zip_code')}
                                </div>
                                <div>
                                    <input type="text" name="country" placeholder="Country *" onChange={handleInputChange} className={`w-full p-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-black transition-shadow`} />
                                    {getError('country')}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Payment Screenshot *</h3>
                                <div onDragOver={handleDragOver} onDrop={handleDrop} className={`border-2 border-dashed ${fileError ? 'border-red-500' : 'border-gray-300'} rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-black hover:bg-gray-100`} onClick={() => document.getElementById('fileUpload')?.click()}>
                                    <input type="file" id="fileUpload" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileChange} className="hidden" />
                                    <div className="flex flex-col items-center">
                                        <UploadCloudIcon />
                                        <p className="mt-2 text-sm text-gray-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">PNG, JPG, or PDF (MAX. 10MB)</p>
                                    </div>
                                </div>
                                {file && <div className="mt-4 text-sm"><p className="font-semibold text-gray-700">{file.name}</p><div className="w-full bg-gray-200 rounded-full h-2.5 mt-2"><div className="bg-black h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div></div></div>}
                                {fileError && <p className="text-red-500 text-sm mt-2">{fileError}</p>}
                            </div>
                            {apiError && <p className="text-red-500 text-center text-sm my-4">{apiError}</p>}
                            <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800 !mt-6" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</Button>
                        </form>
                    </div>
                    <div className="row-start-1 lg:row-auto mt-10 lg:mt-0">
                        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200 sticky top-28">
                            <h2 className="text-2xl font-serif tracking-wider mb-6 border-b pb-4">Order Summary</h2>
                            <div className="flex items-center gap-6">
                                <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                                    <img src={product.single_image.image_path} alt={product.title} className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{product.title}</h3>
                                    <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                                </div>
                            </div>
                            <div className="mt-6 border-t pt-6 space-y-4 text-gray-700">
                                <div className="flex justify-between"><span>Subtotal</span><span>€{(parseFloat(product.price) * quantity).toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
                                <div className="flex justify-between text-lg font-bold border-t pt-4 mt-4"><span>Total</span><span>€{(parseFloat(product.price) * quantity).toFixed(2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
            {showQrModal && blockchainType && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
        <div className="relative bg-white rounded-lg p-8 w-full max-w-2xl mx-auto flex flex-col items-center">
            {/* Close Icon */}
            <button
                type="button"
                className="absolute top-6 right-6 text-gray-500 hover:text-black"
                onClick={() => setShowQrModal(false)}
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                    <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" strokeWidth="2"/>
                </svg>
            </button>
            {/* Large QR Code */}
            <img
                src={blockchainOptions.find(opt => opt.key === blockchainType)?.qr}
                alt="QR Code Large"
                className="w-96 h-96 mb-8"
            />
            {/* Wallet Address Box */}
            <div className="w-full bg-gray-100 rounded-md px-4 py-4 mb-6 flex items-center justify-between">
                <code className="break-all text-gray-800 text-base">{blockchainOptions.find(opt => opt.key === blockchainType)?.wallet}</code>
                <button
                    type="button"
                    className={`ml-2 px-3 py-2 rounded text-sm font-semibold transition-colors duration-200 ${copied ? 'bg-yellow-400 text-black' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={handleCopyWallet}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <p className="text-gray-500 text-sm text-center">Scan QR or copy wallet address to pay</p>
        </div>
    </div>
)}
        </div>
    );
}

// --- Main Page Component with Suspense Boundary ---
export default function CheckoutPage() {
    // Suspense isn't strictly necessary here anymore since we are not using React.lazy or Next.js dynamic imports,
    // but it's good practice for wrapping data-fetching components.
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-50"><p className="text-gray-600">Loading Checkout...</p></div>}>
            <CheckoutComponent />
        </Suspense>
    );
}


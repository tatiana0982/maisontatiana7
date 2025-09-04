'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../../components/ui/Button'; // Adjust path if needed

// --- Type Definitions ---
// Re-define types or import them if you have a shared types file
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

// --- Helper Icon Components ---
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


export default function OrderReceiptPage() {
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve order details from sessionStorage
        const storedDetails = sessionStorage.getItem('latestOrderDetails');
        if (storedDetails) {
            setOrderDetails(JSON.parse(storedDetails));
        } else {
            // If no details are found, redirect to home page to prevent errors
            router.replace('/');
        }
        setIsLoading(false);
    }, [router]);

    const handlePrint = () => {
        window.print();
    };

    const handleContinue = () => {
        // Clear the session storage after use
        sessionStorage.removeItem('latestOrderDetails');
        router.push('/success');
    };

    if (isLoading || !orderDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-gray-600">Loading Receipt...</p>
            </div>
        );
    }
    
    const { orderId, product, quantity, shippingInfo, orderDate } = orderDetails;
    const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);
    const formattedDate = new Date(orderDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <>
        <style jsx global>{`
            @media print {
                body * {
                    visibility: hidden;
                }
                #printable-receipt, #printable-receipt * {
                    visibility: visible;
                }
                #printable-receipt {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                }
                .no-print {
                    display: none;
                }
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
                                    <Image src={product.single_image.image_path} alt={product.title} fill className="object-cover" />
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
                    <Button
                        size="lg"
                        onClick={handlePrint}
                        className="w-full sm:w-auto bg-gray-700 text-white hover:bg-gray-800 flex items-center justify-center"
                    >
                        <PrintIcon />
                        Print / Save as PDF
                    </Button>
                    <Button
                        size="lg"
                        onClick={handleContinue}
                        className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </main>
        </>
    );
}

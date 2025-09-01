type SingleImage = {
    id: number;
    image_path: string;
}

type MultipleImage = {
    id: number;
    image_path: string;
}

// GET: https://admin.maisontatiana7worldwide.com/api/products                 NOTE: For Fetching all products
// GET: https://admin.maisontatiana7worldwide.com/api/product/{productId}      NOTE: For Fetching single product details
export type Product = {
    id: string;
    title: string;
    description: string;
    meta_title: string;
    keywords: string;
    meta_description: string;
    price: string; // keep as string since API returns "892.00"
    quantity: number;
    status: "published";
    created_at: string; // ISO date string Example: 2025-09-01T08:00:16.000000Z
    updated_at: string; // ISO date string
    single_image: SingleImage;
    multiple_images: MultipleImage[];
}


// POST: https://admin.maisontatiana7worldwide.com/api/contact-us
export type ContactUs = {
    name: string;
    email: string;
    phone: string;
    message: string;
}

// POST: https://admin.maisontatiana7worldwide.com/api/create-order
export type OrderRequest = {
    product_id: string;
    email: string;
    name: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    address_line: string;
    payment_screenshot: File;
    quantity: number;
    price: string;
    total_price: string;
}

// GET: https://admin.maisontatiana7worldwide.com/api/bank-details
export type BankDetails = {
    account_number: string;
    account_name: string;
    ifsc_code: string,
}
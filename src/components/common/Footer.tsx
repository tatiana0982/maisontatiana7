'use client';
import React, { useState } from 'react';
import Image from 'next/image';
// --- FIX 1: Import the Next.js Link component ---
import Link from 'next/link'; 
import Button from '../ui/Button';
import EditText from '../ui/EditText';

// Accordion Item Component for mobile view
const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-semibold text-black">{title}</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="py-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  // --- FIX 2: Add state to control the newsletter input ---
  const [email, setEmail] = useState('');

  const promoLinks = [
    { title: 'Discover the Maison Tatiana 7 fragrance match for your unique scent profile', subtitle: 'Start the guided experience to find the scent that fits you best.', href: '/products' },
    { title: 'Exclusives: Explore limited-edition Maison icons', subtitle: 'Available only on maisontatiana7worldwide.com', href: '/products' },
    { title: 'Limited: Members-Only First Purchase Gift', subtitle: 'Get 20% discount with your first purchase.', href: '/products' },
  ];

  // --- FIX 3: Restructure footerLinks data to include name and href for proper linking ---
  const footerLinks = {
    "Client Services": [
      { name: "Contact us", href: "/contact" },
      { name: "Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" },
      { name: "Track Your Order", href: "/track-order" },
      { name: "Receive My Invoice", href: "/invoice" },
    ],
    "Maison Tatiana 7": [
      { name: "Sustainability", href: "/sustainability" },
      { name: "Ethics & Compliance", href: "/ethics" },
      { name: "Careers", href: "/careers" },
    ],
    "Legal": [
      { name: "Legal Terms", href: "/legal" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  };

  const socialImages = [
    "/images/insta_1.png", "/images/insta_2.png", "/images/insta_3.png",
    "/images/insta_4.png", "/images/insta_5.png", "/images/insta_6.png",
  ];

  return (
    <footer 
      className="w-full bg-cover bg-center bg-no-repeat mt-16 lg:mt-24"
      style={{ backgroundImage: "url('/images/footer_bg.png')" }}
    >
      <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* --- FIX 4: Add relative and z-index to prevent other elements from overlapping the footer --- */}
        <div className="bg-white rounded-lg p-6 lg:p-12 relative z-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 border-b">
            {/* --- CORRECTED: Use Link component for promo links --- */}
            {promoLinks.map((link, index) => (
              <Link href={link.href} key={index} className={`flex justify-between items-center p-6 lg:p-8 group ${index < 2 ? 'lg:border-r' : ''}`}>
                <div className="pr-4">
                  <h4 className="font-semibold text-black group-hover:text-brand-gold transition-colors">{link.title}</h4>
                  <p className="text-sm text-gray-500 mt-2">{link.subtitle}</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>

          <div className="py-12 lg:py-16 flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-8/12 flex flex-col gap-12">
              <div>
                <h3 className="font-atacama text-2xl mb-4">Newsletter</h3>
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                  {/* --- CORRECTED: Connect EditText to state --- */}
                  <EditText 
                    placeholder="Enter an email" 
                    type="email" 
                    className="flex-grow"
                    variant="outline"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button 
                    size="md" 
                    className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
              
              <div className="hidden lg:grid grid-cols-1 sm:grid-cols-3 gap-8">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title}>
                    <h4 className="font-semibold mb-4 text-black">{title}</h4>
                    <ul className="space-y-3">
                      {/* --- CORRECTED: Use Link component and new data structure --- */}
                      {links.map(item => (
                        <li key={item.name}>
                          <Link href={item.href} className="text-sm text-gray-600 hover:text-black transition-colors">{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="lg:hidden">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <AccordionItem key={title} title={title}>
                    <ul className="space-y-3">
                      {/* --- CORRECTED: Use Link component and new data structure for mobile view --- */}
                      {links.map(item => (
                        <li key={item.name}>
                          <Link href={item.href} className="text-sm text-gray-600 hover:text-black transition-colors">{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionItem>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-4/12">
              <a href="https://www.instagram.com/maisontatiana7/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-black transition-colors">
                Instagram @maisontatiana7
              </a>
              <div className="grid grid-cols-3 gap-2.5 mt-4 w-fit">
                {socialImages.map((src, index) => (
                  <a href="https://www.instagram.com/maisontatiana7/" target="_blank" rel="noopener noreferrer" key={index} className="block w-[100px] h-[100px] overflow-hidden">
                    <Image src={src} width={100} height={100} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="text-center lg:text-left text-sm text-gray-500 order-3 lg:order-1">
              Follow Us: 
              <a href="#" className="ml-2 text-black hover:underline">TikTok</a>
              <a href="https://www.instagram.com/maisontatiana7/" target="_blank" rel="noopener noreferrer" className="ml-4 text-black hover:underline">Instagram</a>
              <a href="#" className="ml-4 text-black hover:underline">X</a>
              <a href="#" className="ml-4 text-black hover:underline">Facebook</a>
            </div>
            <div className="order-1 lg:order-2">
              <Link href="/"><Image src="/images/img_image_2.png" width={200} height={42} alt="Maison Tatiana 7 Logo"/></Link>
            </div>
            <div className="order-2 lg:order-3 flex items-center gap-3">
              <Image src="/images/z_visa.png" width={35} height={23} alt="Visa"/>
              <Image src="/images/z_mastercard.png" width={35} height={23} alt="Mastercard"/>
              <Image src="/images/z_discover.png" width={35} height={23} alt="Discover"/>
              <Image src="/images/z_american_express.png" width={35} height={23} alt="American Express"/>
              <Image src="/images/z_paypal.png" width={35} height={23} alt="PayPal"/>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
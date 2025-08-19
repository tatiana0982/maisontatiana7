'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import EditText from '../ui/EditText';
import Logo from './Logo';

// Accordion Item Component for the mobile view
const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="font-semibold text-black">{title}</span>
        <svg 
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="pt-2 pb-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const promoLinks = [
    { title: 'Discover Your Signature Scent', subtitle: 'Take our guided quiz to find the perfect fragrance for you.', href: '/products' },
    { title: 'Exclusives & Limited Editions', subtitle: 'Explore unique icons available only on our worldwide site.', href: '/products' },
    { title: 'A Gift from The Maison', subtitle: 'Receive a complimentary gift with your first purchase.', href: '/' },
  ];

  const footerLinks = {
    "Client Services": [
      { name: "Contact Us", href: "/contact" },
      { name: "Returns", href: "/" },
      { name: "FAQ", href: "/" },
      { name: "Track Your Order", href: "/" },
    ],
    "Maison Tatiana 7": [
      { name: "Our Story", href: "/about" },
      { name: "Ethics & Compliance", href: "/" },
      { name: "Careers", href: "/" },
    ],
    "Legal": [
      { name: "Legal Terms", href: "/" },
      { name: "Privacy Policy", href: "/" },
      { name: "Sitemap", href: "/" },
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
        <div className="bg-white rounded-lg p-6 lg:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 border-b">
            {promoLinks.map((link, index) => (
              <Link href={link.href} key={index} className={`flex justify-between items-center p-6 lg:p-8 group ${index < 2 ? 'lg:border-r' : ''}`}>
                <div className="pr-4">
                  <h4 className="font-semibold text-black group-hover:text-brand-gold transition-colors">{link.title}</h4>
                  <p className="text-sm text-gray-500 mt-2">{link.subtitle}</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>

          <div className="py-12 lg:py-16 flex flex-col lg:flex-row gap-12">
            
            <div className="w-full lg:w-8/12 flex flex-col gap-12">
              <div>
                <h3 className="font-atacama text-2xl mb-4">Newsletter</h3>
                <Link href="/products">
                  <p className="text-gray-600 mb-6 hover:text-black transition-colors">Stay up to date with the latest from Maison Tatiana 7.</p>
                </Link>
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                  <EditText 
                    placeholder="Enter an email" 
                    type="email" 
                    className="flex-grow"
                    variant="outline"
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
                      {links.map(item => (
                        <li key={item.name}>
                          <Link href={item.href}>
                            <span className="text-sm text-gray-600 hover:text-black transition-colors cursor-pointer">{item.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="lg:hidden">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <AccordionItem key={title} title={title}>
                    <ul className="space-y-4">
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

            <div className="w-full lg:w-4/12 flex flex-col items-start lg:items-end">
              <a href="https://www.instagram.com/maisontatiana7/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-black transition-colors font-semibold">
                Instagram @maisontatiana7
              </a>
              <div className="grid grid-cols-3 gap-2.5 mt-4 w-fit">
                {socialImages.map((src, index) => (
                  <a href="https://www.instagram.com/maisontatiana7/" target="_blank" rel="noopener noreferrer" key={index} className="block w-[100px] h-[100px] overflow-hidden">
                    <Image src={src} width={100} height={100} alt={`Instagram post ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                  </a>
                ))}
              </div>
              <div className="mt-8 text-left lg:text-right">
                <p className="text-sm text-gray-600">For inquiries:</p>
                <a href="mailto:maisontatiana7@outlook.com" className="text-base font-bold text-brand-gold hover-underline-wipe">
                  maisontatiana7@outlook.com
                </a>
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
              <Logo />
            </div>
            <div className="order-2 lg:order-3 flex flex-col items-center gap-3">
                <p className="text-xs text-gray-500">Worldwide Payments</p>
                <div className="flex items-center gap-3">
                    <Image src="/images/z_visa.png" width={35} height={23} alt="Visa"/>
                    <Image src="/images/z_mastercard.png" width={35} height={23} alt="Mastercard"/>
                    <Image src="/images/z_discover.png" width={35} height={23} alt="Discover"/>
                    <Image src="/images/z_american_express.png" width={35} height={23} alt="American Express"/>
                    <Image src="/images/z_paypal.png" width={35} height={23} alt="PayPal"/>
                </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
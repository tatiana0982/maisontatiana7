import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import EditText from '../ui/EditText';

const Footer: React.FC = () => {
  return (
    <footer 
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/img_image_1.png')" }}
    >
      <div className="w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg p-6 lg:p-12">
          {/* Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-b pb-12">
            <div>
              <h3 className="font-atacama text-2xl mb-4">Newsletter</h3>
              <p className="text-gray-600 mb-6">Stay up to date with the latest from Maison Tatiana 7.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <EditText
                  placeholder="Enter your email"
                  type="email"
                  className="flex-grow"
                  size="md"
                />
                <Button size="md" className="w-full sm:w-auto">Confirm</Button>
              </div>
            </div>
            <div className="text-left lg:text-right self-end">
              <p className="text-lg">
                <span className="text-gray-500">Instagram </span>
                <a href="#" className="text-black font-semibold hover-underline-animation">@maisontatiana7</a>
              </p>
            </div>
          </div>

          {/* Links & Social Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12">
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Find a Boutique</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black transition-colors">Parfums Boutiques</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Couture Boutiques</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Client Services</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Track Your Order</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Maison Tatiana 7</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Ethics & Compliance</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#" className="hover:text-black transition-colors">Legal Terms</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-black transition-colors">Sitemap</a></li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="grid grid-cols-3 gap-2">
                <Image src="/images/insta_1.png" width={84} height={84} alt="social1" className="w-full h-auto"/>
                <Image src="/images/insta_2.png" width={84} height={84} alt="social2" className="w-full h-auto"/>
                <Image src="/images/insta_3.png" width={84} height={84} alt="social3" className="w-full h-auto"/>
                <Image src="/images/insta_4.png" width={84} height={84} alt="social4" className="w-full h-auto"/>
                <Image src="/images/insta_5.png" width={84} height={84} alt="social5" className="w-full h-auto"/>
                <Image src="/images/insta_6.png" width={84} height={84} alt="social6" className="w-full h-auto"/>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-gray-600">Follow us: </span>
              <span className="font-semibold">TikTok Instagram X Facebook Snapchat</span>
            </div>
            <Image src="/images/img_image_2.png" width={236} height={50} alt="Maison Tatiana 7 Logo"/>
            <div className="flex items-center gap-4">
              <Image src="/images/z_visa.png" width={40} height={28} alt="visa"/>
              <Image src="/images/z_mastercard.png" width={40} height={30} alt="mastercard"/>
              <Image src="/images/z_discover.png" width={40} height={30} alt="discover"/>
              <Image src="/images/z_american_express.png" width={40} height={32} alt="amex"/>
              <Image src="/images/z_paypal.png" width={40} height={32} alt="paypal"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
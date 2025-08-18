'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import EditText from '../ui/EditText';
import Switch from '../ui/Switch';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [contrastMode, setContrastMode] = useState(false);

  const handleEmailSubmit = () => {
    console.log('Email submitted:', email);
  };

  const handleContrastToggle = (checked: boolean) => {
    setContrastMode(checked);
    console.log('Contrast mode:', checked);
  };

  return (
    <footer 
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/img_image_1.png')" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-global-2 rounded-[6px] p-4 sm:p-6 md:p-8 lg:p-[16px] m-4 sm:m-6 md:m-8 lg:m-[18px]">
          {/* Top Section */}
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-[98px]">
            {/* Main Content Row */}
            <div className="flex flex-col lg:flex-row justify-start items-start gap-6 md:gap-8 lg:gap-0 w-full mt-2 md:mt-4 lg:mt-[6px] mr-0 md:mr-2 lg:mr-[14px] ml-2 md:ml-4 lg:ml-[6px]">
              {/* Left Column */}
              <div className="flex flex-col justify-start items-center w-full lg:w-[30%] ml-0 md:ml-4 lg:ml-[8px]">
                <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[19px] text-left text-global-1 w-full">
                  Discover the Maison Tatiana 7 fragrance match for your unique scent profile
                </p>
                <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[19px] text-left text-footer-1 w-full mt-4 md:mt-6 lg:mt-[40px]">
                  Start the guided experience to find the scent that fits you best.
                </p>
              </div>

              {/* Arrow Icon */}
              <img 
                src="/images/img_frame_black_900_02.svg" 
                className="w-[14px] h-[14px] ml-0 md:ml-8 lg:ml-[40px] self-center lg:self-start lg:mt-[43px]" 
                alt="arrow" 
              />

              {/* Vertical Line */}
              <div className="w-[1px] h-16 md:h-20 lg:h-[98px] bg-footer-1 ml-0 md:ml-6 lg:ml-[34px] hidden lg:block"></div>

              {/* Middle Column */}
              <div className="flex flex-col justify-start items-center w-full lg:w-auto ml-0 md:ml-6 lg:ml-[28px]">
                <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[20px] text-left text-global-1 w-full lg:w-auto">
                  Exclusives: Explore limited-edition Maison icons
                </p>
                <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[20px] text-left text-footer-1 w-full lg:w-auto mt-4 md:mt-5 lg:mt-[22px]">
                  Available only on maisontatiana7arabia.com
                </p>
              </div>

              {/* Arrow Icon */}
              <img 
                src="/images/img_frame_black_900_02.svg" 
                className="w-[14px] h-[14px] ml-0 md:ml-8 lg:ml-[42px] self-center lg:self-start lg:mt-[43px]" 
                alt="arrow" 
              />

              {/* Vertical Line */}
              <div className="w-[1px] h-12 md:h-16 lg:h-[62px] bg-footer-1 ml-0 md:ml-6 lg:ml-[34px] hidden lg:block lg:mt-[18px]"></div>

              {/* Right Column */}
              <div className="flex flex-col justify-start items-start w-full lg:flex-1 ml-0 md:ml-6 lg:ml-[28px] mt-4 md:mt-6 lg:mt-[18px]">
                <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[20px] text-left text-global-1 w-full lg:w-auto">
                  Limited: Members-Only First Purchase Gift
                </p>
                <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:flex-1 mt-4 md:mt-5 lg:mt-[23px]">
                  <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[19px] text-left text-footer-1 w-full lg:w-[74%] self-center">
                    Get 20% discount with your first purchase.
                  </p>
                  <img 
                    src="/images/img_frame_black_900_02.svg" 
                    className="w-[14px] h-[14px] mt-2 lg:mt-0" 
                    alt="arrow" 
                  />
                </div>
              </div>
            </div>

            {/* Horizontal Line */}
            <div className="w-full h-[1px] bg-footer-1 mt-6 md:mt-8 lg:mt-[24px] mr-0 md:mr-1 lg:mr-[4px]"></div>

            {/* Bottom Section */}
            <div className="flex flex-col justify-start items-start w-full mt-12 md:mt-16 lg:mt-[64px] mr-0 md:mr-2 lg:mr-[10px] ml-2 md:ml-4 lg:ml-[8px]">
              {/* Newsletter and Instagram Row */}
              <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:w-[90%] mb-4 md:mb-6 lg:mb-[14px]">
                {/* Newsletter Section */}
                <div className="flex flex-col gap-6 md:gap-8 lg:gap-[34px] justify-start items-start w-full lg:w-[44%]">
                  <h3 className="text-base md:text-lg lg:text-[18px] font-atacama font-normal leading-6 md:leading-7 lg:leading-[27px] text-left text-footer-1">
                    Newsletter
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-[8px] justify-start items-center w-full">
                    <EditText
                      placeholder="Enter an email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      className="flex-1 w-full sm:w-auto"
                      size={undefined}
                    />
                    <Button
                      onClick={handleEmailSubmit}
                      variant="primary"
                      size="md"
                      className="w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      Confirm
                    </Button>
                  </div>
                  <div className="flex flex-row gap-6 md:gap-7 lg:gap-[28px] justify-start items-center w-auto">
                    <span className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[20px] text-left text-global-1">
                      Accessibility: Better contrast
                    </span>
                    <Switch
                      checked={contrastMode}
                      onChange={handleContrastToggle}
                      size="md"
                      color="primary"
                    />
                  </div>
                </div>

                {/* Instagram Section */}
                <div className="mt-8 lg:mt-0 lg:self-end">
                  <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[20px] text-left">
                    <span className="text-footer-1">Instagram </span>
                    <span className="text-global-2">@maisontatiana7</span>
                  </p>
                </div>
              </div>

              {/* Links and Payment Section */}
              <div className="flex flex-col lg:flex-row justify-between items-start w-full mt-6 md:mt-7 lg:mt-[28px] mr-0 md:mr-1 lg:mr-[4px]">
                {/* Links Section */}
                <div className="flex flex-col gap-6 md:gap-8 lg:gap-[30px] justify-start items-start w-full lg:w-[64%] mt-6 md:mt-8 lg:mt-[30px]">
                  <p className="text-sm md:text-base lg:text-[16px] font-hellix font-normal leading-5 md:leading-6 lg:leading-[20px] text-left text-footer-1">
                    Find a boutique                                      Client Services                                       Maison Tatiana 7                                   Legal
                  </p>
                  
                  <div className="flex flex-col lg:flex-row justify-start items-start w-full">
                    {/* Boutiques Column */}
                    <div className="flex flex-col gap-3 md:gap-4 lg:gap-[14px] justify-start items-center w-full lg:w-auto mb-6 lg:mb-0">
                      <p className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1">
                        Parfums Christian Maison Botiques
                      </p>
                      <p className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1">
                        Christian Maison Couture Boutiques
                      </p>
                    </div>

                    {/* Client Services Column */}
                    <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:w-[42%] ml-0 lg:ml-[46px]">
                      <ul className="flex flex-col gap-4 md:gap-5 lg:gap-[18px] justify-start items-start w-full lg:w-[74%]">
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Contact us
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex flex-row gap-1 md:gap-2 lg:gap-[6px] justify-start items-center text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Returns
                            <img src="/images/img_frame_gray_600.svg" className="w-4 h-4 self-end" alt="arrow" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="flex flex-row gap-1 md:gap-2 lg:gap-[6px] justify-start items-center text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            FAQ
                            <img src="/images/img_frame_gray_600.svg" className="w-4 h-4 self-end" alt="arrow" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Track Your Order
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Receive My Invoice
                          </a>
                        </li>
                      </ul>
                      <img src="/images/img_frame_gray_600.svg" className="w-4 h-4 ml-0 lg:ml-[72px] mt-2 lg:mt-0" alt="arrow" />
                    </div>

                    {/* Maison Tatiana 7 and Legal Columns */}
                    <div className="flex flex-col lg:flex-row justify-between items-start w-full lg:w-[42%] mt-6 lg:mt-0">
                      <ul className="flex flex-col gap-4 md:gap-5 lg:gap-[18px] justify-start items-start w-full lg:w-[74%]">
                        <li>
                          <a href="#" className="flex flex-row gap-1 md:gap-2 lg:gap-[6px] justify-start items-center text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Sustainability
                            <img src="/images/img_frame_gray_600.svg" className="w-4 h-4 self-end" alt="arrow" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Ethics & Compliance
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-hellix font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Careers
                          </a>
                        </li>
                      </ul>
                      
                      <ul className="flex flex-col gap-4 md:gap-5 lg:gap-[18px] justify-start items-start self-center w-auto mt-4 lg:mt-0">
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-inria font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Legal Terms
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-inria font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-inria font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Accessibility
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-xs md:text-sm lg:text-[14px] font-inria font-normal leading-4 md:leading-5 lg:leading-[17px] text-left text-footer-1 hover:text-global-1 transition-colors">
                            Sitemap
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Social Media and Payment Section */}
                <div className="flex flex-col gap-20 md:gap-24 lg:gap-[102px] justify-start items-start self-center w-full lg:w-[24%] mt-8 lg:mt-0">
                  {/* Social Media Images */}
                  <div className="flex flex-col gap-3 md:gap-4 lg:gap-[14px] justify-start items-center w-auto">
                    <div className="flex flex-row gap-3 md:gap-4 lg:gap-[14px] justify-center items-center w-auto">
                      <img src="/images/insta_1.png" className="w-16 h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px]" alt="social1" />
                      <img src="/images/insta_2.png" className="w-16 h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px]" alt="social2" />
                      <img src="/images/insta_3.png" className="w-16 h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px]" alt="social3" />
                    </div>
                    <div className="flex flex-row gap-3 md:gap-4 lg:gap-[14px] justify-center items-center w-auto">
                      <img src="/images/insta_4.png" className="w-16 h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px]" alt="social4" />
                      <img src="/images/insta_5.png" className="w-16 h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px]" alt="social5" />
                      <img src="/images/insta_6.png" className="w-16 h-16 md:w-20 md:h-20 lg:w-[84px] lg:h-[84px]" alt="social6" />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex flex-row gap-3 md:gap-4 lg:gap-[16px] justify-end items-start self-end w-auto">
                    <img src="/images/Z_visa.png" className="w-8 h-6 md:w-10 md:h-7 lg:w-[40px] lg:h-[28px] self-center" alt="visa" />
                    <img src="/images/Z_mastercard.png" className="w-8 h-6 md:w-10 md:h-8 lg:w-[40px] lg:h-[30px]" alt="mastercard" />
                    <img src="/images/z_discover.png" className="w-8 h-6 md:w-10 md:h-8 lg:w-[40px] lg:h-[30px]" alt="discover" />
                    <img src="/images/Z_american_express.png" className="w-8 h-7 md:w-10 md:h-8 lg:w-[40px] lg:h-[32px] self-end" alt="amex" />
                    <img src="/images/z_paypal.png" className="w-8 h-7 md:w-10 md:h-8 lg:w-[40px] lg:h-[32px] self-center" alt="paypal" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-16 md:mt-20 lg:mt-[86px]">
              <p className="text-xs lg:text-[12px] font-inria font-normal leading-4 lg:leading-[15px] text-left capitalize self-end mb-3 lg:mb-[14px] order-2 lg:order-1">
                <span className="text-edittext-1">Follow us: </span>
                <span className="text-global-1">       tiktok        Instagram        X        Facebook        Snapchat</span>
              </p>
              
              <img 
                src="/images/img_image_2.png" 
                className="w-32 h-8 md:w-48 md:h-10 lg:w-[236px] lg:h-[50px] order-1 lg:order-2 mb-4 lg:mb-0" 
                alt="logo" 
              />
              
              <p className="text-xs lg:text-[12px] font-inria font-normal leading-4 lg:leading-[15px] text-left w-auto order-3">
                <span className="text-xs lg:text-[10px] text-edittext-1">Choose your Country or Region & Language:</span>
                <span className="text-xs lg:text-[12px] text-global-1"> United States (English)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
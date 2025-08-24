/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block sm:-ml-6 -ml-4">
              <img src="/logo.png" alt="logo" className="w-52 h-auto sm:w-64" />
            </Link>
            <p className=" max-w-md text-sm leading-relaxed text-gray-600">
              Girl&apos;s glow BD is your trusted online shop for premium
              ornaments and lifestyle products. We bring quality with elegance
              right to your doorstep. Stay connected with us for exciting offers
              and new arrivals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative">
              Quick Links
              <div className="w-8 h-1 bg-[#E6C200] mt-2"></div>
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>
                <Link href="/shop" className="hover:text-[#E6C200]">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E6C200]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#E6C200]">
                  Discount Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative">
              Contact
              <div className="w-8 h-1 bg-[#E6C200] mt-2"></div>
            </h3>

            <div className="space-y-5 text-gray-700 text-sm">
              <div className="flex items-center gap-3">
        
                <Phone className="w-4 h-4"/>
                <a href="tel:+3104372766" className="hover:text-[#E6C200]">
                  +310-437-2766
                </a>
              </div>

              <div className="flex items-center gap-3">
       <Mail className="w-4 h-4"/>
                <a
                  href="mailto:unreal@outlook.com"
                  className="hover:text-[#E6C200]"
                >
                  unreal@outlook.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4"/>
                <a
                  href="https://www.google.com/maps/search/706+Campfire+Ave.+Meriden,+CT+06450"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#E6C200] leading-relaxed"
                >
                  706 Campfire Ave. Meriden, CT 06450
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Girl's glowBD. All rights reserved.
          <br />
          <br />
          <span>Made By <a target="_blank" href="http://qrinux.com">Qrinux Inc</a></span>
        </div>
      </div>
    </footer>
  );
}

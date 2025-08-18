import React from "react";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className=" text-black ">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            Logo
            <p className=" mt-8 max-w-md text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              Quick Links
              <div className="w-8 h-1 bg-[#E6C200] mt-2"></div>
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/shop" className="transition-colors text-lg">
                  Shop
                </Link>
              
              </li>
              <li>
                <Link href="/about" className="transition-colors text-lg">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="transition-colors text-lg">
                  Discount offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative font-tiro_bangla">
              Contact
              <div className="w-8 h-1 bg-[#E6C200] mt-2"></div>
            </h3>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiPhone size={18} />
                </div>
                <div>
                  <a href="tel:+310-437-2766" className="transition-colors">
                    310-437-2766
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MdOutlineEmail size={18} />
                </div>
                <div>
                  <a
                    href="mailto:unreal@outlook.com"
                    className="transition-colors text-sm"
                  >
                    unreal@outlook.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CiLocationOn size={18} />
                </div>
                <div>
                  <a
                    href="https://www.google.com/maps/search/706+Campfire+Ave.+Meriden,+CT+06450"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors leading-relaxed"
                  >
                    706 Campfire Ave. Meriden, CT 06450{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

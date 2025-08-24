/* eslint-disable @next/next/no-img-element */
"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { GrMenu } from "react-icons/gr";
import { TiDeleteOutline } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { Phone, Search, X } from "lucide-react";
import Marquee from "react-fast-marquee";
import { RiShoppingCart2Fill } from "react-icons/ri";

interface IData {
  _id: string;
  slug: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

const Navbar = ({ className }: { className: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const { data, refetch } = useHandleFindProductQuery({
    page: 1,
    limit: 10000,
    search,
  });

  const { data: user } = useLoggedInUserQuery();
  const products: IData[] = data?.payload || [];
  const path = usePathname();

  const activeLink = (pathValue: string) =>
    path === pathValue
      ? "relative font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-100 after:origin-bottom-left after:transition-transform after:duration-300"
      : "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-black after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100";

  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(
        localStorage.getItem("GirlglowBDCart") || "[]"
      );
      setCartCount(storedCart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      <div className="bg-black text-white py-2 lg:px-[5%]">
        <div className="max-w-screen-xl mx-auto hidden lg:flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left ">
          {/* Left text */}
          <h1 className="text-sm sm:text-base">
            Call us or send message on What’s app for order
          </h1>

          {/* Right side contact info */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
            <p className="flex items-center gap-1 text-sm sm:text-base">
              <MdEmail size={18} /> support@domain.com
            </p>
            <p className="flex items-center gap-1 text-sm sm:text-base">
              <Phone size={18} /> 01877726999
            </p>
          </div>
        </div>
        <div className="block lg:hidden">
          <Marquee>
            <div className="flex items-center gap-12">
              <h1 className="text-sm sm:text-base">
                Call us or send message on What’s app for order
              </h1>
              <p className="flex items-center gap-1 text-sm sm:text-base">
                <MdEmail size={18} /> support@domain.com
              </p>
              <p className="flex items-center gap-1 text-sm sm:text-base">
                <Phone size={18} /> 01877726999
              </p>
            </div>
          </Marquee>
        </div>
      </div>

      <nav className={`text-black relative z-30 ${className}`}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-0    relative z-50">
          {/* Logo */}
          <Link href="/" className="max-w-[15rem] sm:-ml-5">
            <img src="./logo.png" alt="logo" className="w-full h-fit" />
          </Link>
          {/* Search - Desktop */}
          {/* Nav Links - Desktop */}
          <div className="flex">
            <div className="hidden sm:flex gap-4 lg:gap-6 items-center">
              <Link href="/" className={activeLink("/")}>
                Home
              </Link>
              <Link href="/shop" className={activeLink("/shop")}>
                Shop
              </Link>
              <Link href="/about" className={activeLink("/about")}>
                About
              </Link>
              {/* <Link href="/contact" className={activeLink("/contact")}>
                Contact
              </Link> */}
              {user && (
                <Link href="/dashboard" className={activeLink("/dashboard")}>
                  Dashboard
                </Link>
              )}
              <div className="hidden sm:block flex-1 relative">
                <Input
                  className="bg-White text-black pl-10 py-2 w-full border border-black placeholder:black"
                  placeholder="Search products..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                    refetch();
                  }}
                />
                <Search className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                {/* Desktop Search Dropdown */}
                {search && (
                  <div className="absolute top-12 w-full bg-white text-black rounded-md z-50 max-h-96 overflow-y-auto">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <Link
                          key={product._id}
                          href={`/step/${product.slug}`}
                          className="flex items-center gap-3 p-3 hover:bg-gray-100 transition"
                        >
                          <div className="w-14 h-14 relative rounded overflow-hidden border">
                            <Image
                              src={product.productImage}
                              alt={product.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4
                              className="text-sm font-semibold"
                              dangerouslySetInnerHTML={{
                                __html: product.productName,
                              }}
                            />
                            <p className="text-xs text-gray-500">
                              ৳ {product.price}
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="p-3 text-sm text-gray-500">
                        No products found
                      </p> // 👈 show message
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Right Icons */}
            <div className="flex items-center gap-3 sm:gap-4 ml-4">
              {/* Mobile Search Icon */}
              <AiOutlineSearch
                className="text-2xl sm:hidden cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  setIsOpenSearch(true);
                }}
              />

              {/* Cart */}
              <Link href="/cart" className="relative group">
                <div className=" text-black flex items-center justify-center transition hover:scale-105">
                  <RiShoppingCart2Fill className=" text-2xl lg:text-3xl" />
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => {
                  setIsOpenSearch(false);
                  setIsOpen(!isOpen);
                }}
                className="sm:hidden text-2xl text-Black"
              >
                {isOpen ? <X className="text-xl" /> : <GrMenu />}
              </button>

              {/*  Mobile Menu Toggle */}
              {/* <button
            onClick={() => {
              setIsOpenSearch(false);
              setIsOpen(!isOpen);
            }}
            className="sm:hidden text-2xl text-white"
          >
            {isOpen ? <TiDeleteOutline /> : <GrMenu />}
          </button> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}

        <div
          className={`fixed top-0 left-0 w-full flex flex-col gap-4   bg-white/30 backdrop-blur-sm pt-32 pb-5 z-30 px-[5%] transform duration-700 lg:hidden shadow ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="space-y-6 text-lg flex flex-col font-medium">
            <Link onClick={() => setIsOpen(false)} href="/">
              Home
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/shop">
              Shop
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/about">
              About
            </Link>
            {/* <Link onClick={() => setIsOpen(false)} href="/contact">
              Contact
            </Link> */}
            {user && (
              <Link onClick={() => setIsOpen(false)} href="/dashboard">
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {isOpenSearch && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm px-5 pt-28 sm:hidden">
            <button
              className="absolute top-14 right-5 text-white text-3xl"
              onClick={() => setIsOpenSearch(false)}
            >
              <TiDeleteOutline />
            </button>
            <Input
              className="bg-white text-black rounded-md w-full py-2 px-4"
              placeholder="Search products..."
              onChange={(e) => {
                setSearch(e.target.value);
                refetch();
              }}
            />
            {search && products.length > 0 && (
              <div className="mt-4 space-y-2  max-h-[400px] overflow-y-auto">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/shop/${product.slug}`}
                    className="flex items-center gap-3 bg-white p-3 rounded hover:bg-gray-100 transition"
                    onClick={() => setIsOpenSearch(false)}
                  >
                    <div className="w-14 h-14 relative rounded overflow-hidden border">
                      <Image
                        src={product.productImage}
                        alt={product.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-black">
                      <h4
                        className="text-sm font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: product.productName,
                        }}
                      />
                      <p className="text-xs text-gray-500">৳ {product.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

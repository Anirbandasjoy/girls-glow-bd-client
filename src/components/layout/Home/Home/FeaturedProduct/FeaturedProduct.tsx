"use client";
import { useHandleFindProductQuery } from "@/redux/features/product/productApi";
import ProductCard from "../../shared/ProductCard";
import Link from "next/link";

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  productName: string; // Title of the data
  productImage: string; // URL of the image associated with the data (e.g., thumbnail)
  price: number;
  prvPrice: number;
  quantity: number;
  sold: number;
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

// Enhanced Loading Skeleton Component
const ProductSkeleton = () => (
  <div className="group bg-white overflow-hidden transition-all duration-500">
    <div className="relative overflow-hidden bg-gray-100">
      <div className="w-full h-64 md:h-72 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse bg-[length:400%_100%] animate-shimmer"></div>
    </div>

    <div className="py-5 space-y-4">
      {/* Title skeleton */}
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Price skeleton */}
    </div>
  </div>
);

export default function FeaturedProduct() {
  // Query to fetch all data based on pagination and search text
  const { data, isLoading, error } = useHandleFindProductQuery({
    page: 1, // Current page for pagination
    limit: 10000, // Number of items per page
    search: "", // The search text to filter data
  });

  const products: IData[] = data?.payload || [];

  // Extract unique categories (you might want to add category field to your interface)

  // Filter products based on active category (implement your filtering logic)
  const filteredProducts = products; // Add your filtering logic here
  console.log(filteredProducts)

  if (error) {
    return (
      <div className="px-[5%] py-20">
        <div className="max-w-screen-xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-red-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-red-600 mb-4">
              We couldn&#39;t load the products. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[5%] pt-10 pb-20 md:py-20 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="w-96 h-[1px] bg-gray-400 mx-auto"></div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] font-caladea my-4">
            Featured Products
          </h1>
          <div className="w-96 h-[1px] bg-gray-400 mx-auto"></div>
        </div>

        {/* Category Filter */}

        {/* Products Grid */}
        <div
          className={`grid gap-6 mb-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          {isLoading || products.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
            : filteredProducts.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
        </div>
        <div className="flex justify-center items-center">
          <Link
            href="/shop"
            className="text-black font-medium bg-[#E6C200] px-5 py-2 cursor-pointer w-fit mx-auto hover:bg-[#c7a700] transition-colors duration-300"
          >
            Explore All
          </Link>

        </div>
      </div>
    </div>
  );
}

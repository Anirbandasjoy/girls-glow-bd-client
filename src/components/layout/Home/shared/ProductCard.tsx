"use client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

// Utility function to strip HTML tags
// update
// function stripHtmlTags(str: string) {
//   if (!str) return "";
//   return str.replace(/<[^>]+>/g, "");
// }

export default function ProductCard({ product }: any) {
  const handleAddToCart = () => {
    const storedCart = JSON.parse(
      localStorage.getItem("GirlglowBDCart") || "[]"
    );

    const existingItemIndex = storedCart.findIndex(
      (item: { product: string }) => item.product === product.slug
    );

    if (existingItemIndex === -1) {
      storedCart.push({ product: product.slug, quantity: 1 });
      localStorage.setItem("GirlglowBDCart", JSON.stringify(storedCart));
      toast.success("Added to cart");
      // window.dataLayer?.push({
      //   event: "add_to_cart",
      //   ecommerce: {
      //     currency: "BDT",
      //     items: [
      //       {
      //         item_id: product?._id,
      //         item_slug: product?.slug,
      //         price: Number(product?.price),
      //         item_name: stripHtmlTags(product.productName),
      //         item_image: product?.productImage,
      //         item_tag_line: stripHtmlTags(product?.tagline),
      //         shipping_cost: product?.shipping,
      //         category: product?.category,
      //         quantity: 1,
      //         prvPrice: product?.prvPrice,
      //       },
      //     ],
      //   },
      // });
    } else {
      toast.error("Already added to cart");
    }

    setTimeout(() => {
      window.dispatchEvent(new Event("cartUpdated"));
    }, 100);
  };

  // const handleViewDetails = () => {
  //   window.dataLayer?.push({
  //     event: "view_item",
  //     ecommerce: {
  //       items: [
  //         {
  //           item_id: product?._id,
  //           item_slug: product?.slug,
  //           price: Number(product?.price),
  //           item_name: stripHtmlTags(product.productName),
  //           item_image: product?.productImage,
  //           shipping_cost: product?.shipping,
  //           category: product?.category,
  //           quantity: product?.quantity,
  //           prvPrice: product?.prvPrice,
  //         },
  //       ],
  //     },
  //   });
  // };

  return (
    <div className="group relative" key={product?._id}>
      {/* Product Image Container */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden">
        <Image
          width={400}
          height={400}
          src={product?.productImage}
          alt={product?.productName}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div
          className="
        absolute h-full w-full top-0 pt-auto space-y-2 p-5
        bg-gradient-to-b from-[rgba(26,26,26,0)] from-[54.06%] to-[rgba(26,26,26,0.8)] to-100%
        lg:opacity-0 lg:invisible
        lg:group-hover:opacity-100 lg:group-hover:visible
        transition-all duration-500
      "
        >
          <div className="absolute bottom-0 left-0 right-0 space-y-2 p-5">
            <button
              className="text-black bg-[#E6C200] w-full p-2 cursor-pointer"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <Link href={`/step/${product?.slug}`}>
              <button className="text-white border border-white w-full p-2 cursor-pointer">
                View Product
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-grow p-5 space-y-2">
        {/* Product Title */}
        <div
          className="min-h-[3rem] flex items-start"
        >
          <h1
            className="hidden sm:block text-lg font-medium text-gray-900 leading-tight  group-hover:text-golden transition-colors duration-200"
            dangerouslySetInnerHTML={{ __html: product?.productName }}
          />
          <h1
            className="block sm:hidden text-base font-bold text-gray-900 leading-tight  transition-colors duration-200"
            dangerouslySetInnerHTML={{
              __html:
                product?.productName?.split(" ").slice(0, 3).join(" ") +
                (product?.productName?.split(" ").length > 3 ? "..." : ""),
            }}
          />
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-3">
          {product?.prvPrice > product?.price && (
            <span className="text-sm text-[#656565] line-through font-medium">
              ৳ {product?.prvPrice?.toLocaleString()}
            </span>
          )}
          <span className="text-xl font-medium text-[#656565]">
            ৳ {product?.price?.toLocaleString()} BDT
          </span>
        </div>
      </div>
    </div>
  );
}

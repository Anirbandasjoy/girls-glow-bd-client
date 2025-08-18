"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { FaArrowRightLong, FaFacebookF } from "react-icons/fa6";
import { FaCheckCircle, FaMinus, FaPlus, FaWhatsapp } from "react-icons/fa";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Footer from "@/components/layout/Home/shared/Footer";
import {
  useHandleFindProductQuery,
  useHandleFindSingleProductQuery,
} from "@/redux/features/product/productApi";
import ProductCard from "@/components/layout/Home/shared/ProductCard";
import { useHandleFIndReviewsByProductQuery } from "@/redux/features/review/reviewApi";
import { useHandleAddOrderMutation } from "@/redux/features/order/orderApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";



type ShippingOption = "dhakaCity" | "dhakaCityOuter" | "outsideDhaka";
type PaymentOption = "cash" | "bkash";

interface FormData {
  name: string;
  phone: string;
  address: string;
  shipping: ShippingOption;
  payment: PaymentOption;
  bkashTransactionId?: string; // Optional for bkash payment
  bkashPhone?: string; // Optional for bkash payment
  cashPaymentMessage?: string; // Optional for cash payment
}

const ShopDetails = ({ slug }: any) => {

  const [handleAddOrder, { isLoading: placeOrderLoading }] = useHandleAddOrderMutation();
  const [quantity, setDuantity] = useState<number>(1);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      shipping: "dhakaCity",
      payment: "cash",
    },
  });
  const paymentMethod = watch("payment");

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

  const { data } = useHandleFindSingleProductQuery(slug);

  const {
    _id,
    productName,
    tagline,
    unit,
    shipping,
    prvPrice,
    category,
    price,
    productImage,
    hadith,
    benefits,
    buyingReason,
  } = data?.payload || {};

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

  // Query to fetch all data based on pagination and search text
  const { data: data2 } = useHandleFindProductQuery({
    page: 1, // Current page for pagination
    limit: 8, // Number of items per page
    search: "", // The search text to filter data
    category,
  });

  // Extracting the data list and total pages from the response
  const allData2: IData[] = data2?.payload || [];
  const allData = allData2.filter((item) => item?.slug !== slug);


  const onSubmit: SubmitHandler<FormData> = async (data) => {

    try {
      const payload = {
        user: {
          name: data?.name,
          phone: data?.phone,
          address: data?.address,
        },
        products: [
          {
            product: _id,
            quantity,
          },
        ],
        paymentInfo: {
          method: data?.payment,
          bkashPhone: data?.bkashPhone,
          bkashTransactionId: data?.bkashTransactionId,
          cashPaymentMessage: data?.cashPaymentMessage,
        },
        shippingArea: data.shipping,
      };

      const response = await handleAddOrder(payload).unwrap();

      // GA4 purchase event push
      // window.dataLayer?.push({
      //   event: "purchase",
      //   ecommerce: {
      //     transaction_id: response._id || response.data?._id || "", // fallback
      //     value: total,
      //     currency: "BDT",
      //     items: [
      //       {
      //         item_id: _id,
      //         item_name: stripHtmlTags(productName),
      //         price: Number(price),
      //         quantity: quantity,
      //       },
      //     ],
      //   },
      //   customer: {
      //     name: data.name,
      //     phone: data.phone,
      //     address: data.address,
      //   },
      // });

      // Store response in localStorage
      localStorage.setItem("orderData", JSON.stringify(response));

      // Then navigate to success page
      router.push(`/success`);

      toast.success("Order Placed Successfully!");

      reset({
        name: "",
        phone: "",
        address: "",
        shipping: "dhakaCity",
        payment: "cash",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
    }

  };

  const shippingCost: Record<ShippingOption, number> = {
    dhakaCity: shipping?.dhakaCity,
    dhakaCityOuter: shipping?.dhakaCityOuter,
    outsideDhaka: shipping?.outsideDhaka,
  };

  const selectedShipping = watch("shipping", "dhakaCity");
  const subTotal = (price || 0) * quantity;
  const total = (price || 0) * quantity + shippingCost[selectedShipping];

  const { data: reviewData, isLoading } = useHandleFIndReviewsByProductQuery(
    _id,
    {
      skip: !_id,
    }
  );

  const reviews = reviewData?.payload?.reviews || [];

  // const StarRating = ({ rating }: any) => {
  //   return (
  //     <div className="flex text-[#FF8A00]">
  //       {[...Array(5)].map((_, index) => {
  //         return index < rating ? (
  //           <AiFillStar key={index} className="text-4xl" />
  //         ) : (
  //           <AiOutlineStar key={index} className="text-4xl" />
  //         );
  //       })}
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="bg-warm-ivory text-midnight-navy min-h-screen scroll-smooth " style={{ fontFamily: 'SolaimanLipi' }}>
        <div className="hidden bg-white px-[5%] font-anek_bangla">
          <div className=" max-w-screen-xl mx-auto flex flex-col justify-center items-center gap-5 sm:gap-10 text-center py-10 sm:py-20">
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-deepGreen"
              dangerouslySetInnerHTML={{
                __html: tagline,
              }}
            ></h1>
            <Link
              href="#orderSection"
              className="rounded-none bg-[#FFa800] hover:bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
            >
              অর্ডার করতে চাই
            </Link>
          </div>
        </div>

        <div className="px-[5%]">
          <div className="max-w-screen-xl mx-auto font-anek_bangla pt-10">
            <h1
              className="py-10 sm:pt-16 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-deepGreen"
              dangerouslySetInnerHTML={{
                __html: tagline,
              }}
            ></h1>

          <div className="bg-deepGreen py-10 text-center space-y-3 rounded-lg ">
              <p
                id="order-form"
                className="text-2xl space-y-2 gap-2 sm:text-3xl lg:text-4xl font-bold text-white text-center py-2 max-w-72 sm:max-w-lg lg:max-w-full leading-relaxed mx-auto"
              >
                <span
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: productName,
                  }}
                ></span>{" "}
              </p>
              <h1
                className="text-xl sm:text-2xl lg:text-3xl font-medium text-white"
                dangerouslySetInnerHTML={{
                  __html: unit,
                }}
              ></h1>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                পূর্বের মূল্য : ৳ {prvPrice} টাকা
              </h1>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
                বর্তমান মূল্য :{" "}
                <span className="bg-[#FFA800] text-black px-4 py-1">৳ {price} টাকা</span>
              </h1>
            </div>

            <Link
              href="#orderSection"
              className="block mx-auto my-3 rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold py-3 px-5 cursor-pointer text-center w-fit"
            >
              অর্ডার করতে চাই
            </Link>


            <Image
              height={1000}
              width={1000}
              src={productImage}
              alt={productName}
              className="hidden my-10 w-full h-fit object-cover mx-auto"
            />

            <div className="relative ">
              {/* contact number */}
              <div className="absolute w-full flex flex-col items-center pt-10 h-[350px] bg-[#E4E9E6] rounded-lg">
                <a
                  href="tel:01342106348"
                  className="text-xl sm:text-2xl font-medium text-white cursor-pointer block text-center bg-deepGreen px-5 py-2 rounded "
                >
                  প্রয়োজনে কল করুন: 01342106348
                </a>
                <div className="flex flex-col items-center lg:flex-row gap-1 text-center px-5 text-xl sm:text-2xl text-wrap mt-4 ">
                  <p className="flex">
                    “<span dangerouslySetInnerHTML={{ __html: productName }} className="text-[#D61355]" />”
                  </p>
                  <p> নিতে নিচের ফর্মটি পূরণ করুন এবং অর্ডার নিশ্চিত করুন</p>
                </div>
              </div>

              <form
                id="orderSection"
                onSubmit={handleSubmit(onSubmit)}
                className="relative z-50 top-36 sm:top-24 lg:top-20 flex flex-col lg:flex-row justify-between gap-5 px-[5%] py-20"
              >
                <div className="bg-white p-5 flex-1 space-y-5 rounded-lg">
                  <h2 className="text-lg font-bold text-[#FFA800] mb-4">
                    Billing Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-forest-green font-semibold text-sm ">
                        আপনার নাম *
                      </label>
                      <input
                        {...register("name", { required: "নাম প্রয়োজন" })}
                        placeholder="আপনার নাম লিখুন"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-forest-green font-semibold text-sm">
                        মোবাইল নাম্বার *
                      </label>
                      <input
                        {...register("phone", {
                          pattern: {
                            value: /^01[0-9]{9}$/,
                            message:
                              "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                          },
                        })}
                        placeholder="01XXXXXXXXX"
                        type="tel"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-forest-green font-semibold text-sm">
                        আপনার ঠিকানা ( এলাকা, থানা, জেলা )
                      </label>
                      <textarea
                        {...register("address", { required: "ঠিকানা প্রয়োজন" })}
                        placeholder="এলাকা, থানা, জেলা লিখুন"
                        className="w-full border rounded p-2 mt-1"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 flex-1 rounded-lg">
                  <h2 className="text-lg font-bold text-[#FFA800] mb-4">
                    Your Order
                  </h2>
                  <div className="pt-2">
                    <Table className="hidden sm:block">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#808080]">
                            Product
                          </TableHead>
                          <TableHead className="text-[#808080]">
                            Quantity
                          </TableHead>
                          <TableHead className="text-[#808080]">Price</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-5">
                              <Image
                                height={100}
                                width={100}
                                src={productImage}
                                alt={productName}
                              />
                              <span
                                className="w-60 break-words whitespace-normal"
                                dangerouslySetInnerHTML={{
                                  __html: productName,
                                }}
                              ></span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center rounded-full w-fit p-1 text-xl border">
                              <span
                                className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                                onClick={() => {
                                  if (quantity > 0) {
                                    setDuantity(quantity - 1);
                                  }
                                }}
                              >
                                <FaMinus />
                              </span>
                              <Input
                                className="w-12 border-none text-center shadow-none "
                                value={quantity}
                                readOnly
                              />
                              <span
                                className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                                onClick={() => setDuantity(quantity + 1)}
                              >
                                <FaPlus />
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>৳ {price} </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>

                    <div className="sm:hidden space-y-4">
                      <div className="border rounded-lg p-4 shadow-sm relative">
                        <div className="flex items-center gap-4">
                          <Image
                            height={80}
                            width={80}
                            src={productImage}
                            alt={productName}
                          />
                          <div>
                            <p
                              dangerouslySetInnerHTML={{ __html: productName }}
                            ></p>
                            <p className="text-gray-600 text-sm mt-1">
                              Price: {price} ৳
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 relative">
                          <span className="text-sm text-gray-500">Quantity:</span>
                          <div className="flex items-center border rounded-full px-2 text-xl">
                            <span
                              className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                              onClick={() => {
                                if (quantity > 0) {
                                  setDuantity(quantity - 1);
                                }
                              }}
                            >
                              <FaMinus />
                            </span>
                            <Input
                              className="w-12 border-none text-center shadow-none "
                              value={quantity}
                              readOnly
                            />
                            <span
                              className="cursor-pointer bg-gray-200 p-[10px] rounded-full h-8 w-8 flex justify-center items-center"
                              onClick={() => setDuantity(quantity + 1)}
                            >
                              <FaPlus />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between">
                      <span className="font-semibold">Subtotal</span>
                      <span className="font-bold text-green-600">
                        Tk {subTotal}
                      </span>
                    </div>

                    <div className="space-y-3 my-5">
                      <p className="font-semibold text-gray-700">Shipping</p>
                      <label className="block cursor-pointer">
                        <span className="flex justify-between items-center gap-5">
                          <p>
                            <input
                              type="radio"
                              value="dhakaCity"
                              {...register("shipping")}
                              defaultChecked
                              className="cursor-pointer w-5"
                            />{" "}
                            ঢাকা সিটি
                          </p>
                          <p className="whitespace-nowrap">
                            {" "}
                            ৳ {shipping?.dhakaCity}
                          </p>
                        </span>
                      </label>

                      <label className="block cursor-pointer">
                        <span className="flex justify-between items-center gap-5">
                          <p>
                            <input
                              type="radio"
                              value="dhakaCityOuter"
                              {...register("shipping")}
                              className="cursor-pointer w-5"
                            />{" "}
                            ঢাকা সিটির বাহিরে ( গাজীপুর, নারায়ণগঞ্জ, কেরানীগঞ্জ,
                            সাভার, টঙ্গী, দোহার, নবাবগঞ্জ )
                          </p>
                          <p className="whitespace-nowrap">
                            ৳ {shipping?.dhakaCityOuter}
                          </p>
                        </span>
                      </label>

                      <label className="block cursor-pointer">
                        <span className="flex justify-between items-center gap-5">
                          <p>
                            <input
                              type="radio"
                              value="outsideDhaka"
                              {...register("shipping")}
                              className="cursor-pointer w-5"
                            />{" "}
                            ঢাকার বাহিরে
                          </p>
                          <p className="whitespace-nowrap">
                            ৳ {shipping?.outsideDhaka}
                          </p>
                        </span>
                      </label>
                    </div>

                    <hr className="my-3" />
                    <div className="flex justify-between mt-1">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-green-600">Tk {total}</span>
                    </div>
                  </div>

                  <div className="my-3">
                    <p className="font-medium text-forest-green">
                      Payment Option
                    </p>
                    <div className="flex justify-between items-center gap-5">
                      <label className="block mt-1">
                        <input
                          type="radio"
                          className="cursor-pointer"
                          value="cash"
                          {...register("payment")}
                          defaultChecked
                        />
                        <span className="ml-2">Cash on delivery</span>
                      </label>
                      <label className="block">
                        <input
                          type="radio"
                          className="cursor-pointer"
                          value="bkash"
                          {...register("payment")}
                        />
                        <span className="ml-2">Bkash</span>
                      </label>
                    </div>

                    {/* Conditional fields based on payment selection */}
                    {paymentMethod === "cash" && (
                      <div className="mt-3">
                        <label className="block">
                          Delivery Instructions (Optional)
                          <input
                            type="text"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Any special instructions?"
                            {...register("cashPaymentMessage")}
                          />
                        </label>
                        <div className="p-5 bg-mint-background text-midnight-navy mt-5">
                          <h1 className="text-xl font-medium mb-3">
                            ক্যাশ অন ডেলিভারি
                          </h1>
                          <p className=" bg-white p-5">
                            আমরা দিচ্ছি হোম ডেলিভারির সুবিধা — পণ্য হাতে পাওয়ার পর দেখে নিশ্চিন্তে রিসিভ করুন, ইনশাআল্লাহ
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bkash" && (
                      <div className="mt-3 space-y-3">
                        <label className="block">
                          Bkash Phone Number
                          <input
                            type="tel"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="01XXXXXXXXX"
                            {...register("bkashPhone", {
                              required: "Bkash number is required",
                              pattern: {
                                value: /^01\d{9}$/,
                                message:
                                  "দয়া করে একটি বাংলাদেশী মোবাইল (01XXXXXXXXX) নম্বর দিন",
                              },
                            })}
                          />
                          {errors.bkashPhone && (
                            <p className="text-red-500 text-sm">
                              {errors.bkashPhone.message}
                            </p>
                          )}
                        </label>
                        <label className="block">
                          Transaction ID
                          <input
                            type="text"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter transaction ID"
                            {...register("bkashTransactionId", {
                              required: "Transaction ID is required",
                            })}
                          />
                          {errors.bkashTransactionId && (
                            <p className="text-red-500 text-sm">
                              {errors.bkashTransactionId.message}
                            </p>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={placeOrderLoading}
                    className={`w-full py-2 rounded cursor-pointer ${placeOrderLoading ? "bg-gray-400 cursor-not-allowed disabled" : "bg-forest-green hover:bg-green-800 text-white"
                      }`}
                  >
                    {placeOrderLoading ? "Place Order.." : "Place Order"}
                  </button>
                </div>
              </form>

            </div>

            {/* <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-forest-green mt-3">
            (সুরা নাহল, আয়াত-৬৯)
          </p> */}

            {/* product benefit  1*/}
            <div className="mt-24 my-10 bg-white">
              <h1
                className="bg-deepGreen py-3 px-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white"
                dangerouslySetInnerHTML={{
                  __html: benefits?.heading,
                }}
              ></h1>
              <div className="py-10 ">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-2 px-[5%]">
                  <div className="sm:col-span-2 place-content-center space-y-2 sm:space-y-5 ">
                    {benefits?.steps?.map((item: string, i: number) => (
                      <p
                        key={i}
                        className="flex items-start  gap-2 text-lg lg:text-xl leading-relaxed font-semibold"
                      >
                        <FaArrowRightLong className="text-bright-orange text-xl mt-1 mr-2" />{" "}
                        {item}
                      </p>
                    ))}
                  </div>

                  <div className="flex sm:hidden text-center py-7 flex-col items-center gap-4">
                    {/* অর্ডার বাটন */}
                    <Link
                      href="#orderSection"
                      className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                    >
                      অর্ডার করতে চাই
                    </Link>

                    {/* টেক্সট */}
                    <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                      তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ করুন - +8801342106348
                    </p>

                    {/* হোয়াটসঅ্যাপ বাটন */}
                    <a
                      href="https://wa.me/+8801342106348"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                        <FaWhatsapp /> WhatsApp
                      </button>
                    </a>
                  </div>


                  <Image
                    height={1000}
                    width={1000}
                    src={productImage}
                    alt={productName}
                    className="sm:my-10 w-[500px] h-[200px] lg:h-[350px] object-cover mx-auto "
                  />
                </div>
                <div className="hidden sm:flex text-center pt-10 sm:py-7  flex-col items-center gap-4">
                  {/* অর্ডার বাটন */}
                  <Link
                    href="#orderSection"
                    className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                  >
                    অর্ডার করতে চাই
                  </Link>

                  {/* টেক্সট */}
                  <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                    তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ করুন - +8801342106348
                  </p>

                  {/* হোয়াটসঅ্যাপ বাটন */}
                  <a
                    href="https://wa.me/+8801342106348"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>

              </div>

            </div>

            <div className="text-center py-3.5 sm:py-7 ">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
              >
                অর্ডার করতে চাই
              </Link>
            </div>

            <p
              className="py-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-center leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: hadith,
              }}
            ></p>

            {/* whatsapp number and text */}
            <div className="hidden  flex-col justify-center items-center gap-5">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
              >
                অর্ডার করতে চাই
              </Link>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
                তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ
                করুন -+8801342106348
              </p>
              <a
                href="https://wa.me/+8801342106348" // Replace with your full number including country code
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                  <FaWhatsapp /> WhatsApp
                </button>
              </a>
            </div>


            {/* product benefit 2*/}
            <div className="bg-white my-10">
              <h1
                className="bg-[#1F6E43] py-3 px-5 text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white"
                dangerouslySetInnerHTML={{
                  __html: buyingReason?.heading,
                }}
              ></h1>

              <div className="px-[5%]">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2  ">
                  <Image
                    height={1000}
                    width={1000}
                    src={productImage}
                    alt={productName}
                    className="sm:my-10 w-[500px] h-[200px] sm:h-[300px] object-cover mx-auto hidden sm:block"
                  />
                  <div className="col-span-2 place-content-center space-y-2 sm:space-y-5 py-6 sm:py-10 px-[5%]">
                    {buyingReason?.steps?.map((item: string, i: number) => (
                      <p
                        key={i}
                        className="flex items-start  gap-2 text-lg lg:text-xl leading-relaxed font-semibold"
                      >
                        <div className="text-xl mt-2">
                          <FaCheckCircle className="text-[#1F6E43]" />
                        </div>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

               <div className="flex text-center pt-4 sm:pt-0 pb-10   flex-col items-center gap-4">
                  {/* অর্ডার বাটন */}
                  <Link
                    href="#orderSection"
                    className="rounded-none bg-[#FFa800] text-[#0E243A] text-xl font-bold py-3 px-5 cursor-pointer inline-block"
                  >
                    অর্ডার করতে চাই
                  </Link>

                  {/* টেক্সট */}
                  <p className="text-base sm:text-2xl font-bold text-center leading-snug">
                    তাই আর দেরি না করে আজই অর্ডার করুন <br /> প্রয়োজনে হোয়াটআপ করুন - +8801342106348
                  </p>

                  {/* হোয়াটসঅ্যাপ বাটন */}
                  <a
                    href="https://wa.me/+8801342106348"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>
            </div>


            <div className="pt-5 pb-24 px-[5%] bg-[#E4E9E6] flex flex-col-reverse lg:flex-row  justify-between items-center gap-5 ">

              <div className="w-full">
                <p className="text-lg font-semibold text-[#D61355]">
                  ক্রেতাদের কথা
                </p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F6E43] my-3">
                  নিয়মিত কাস্টমারদের রিভিউ সমূহ
                </h1>
                <p className="text-lg font-medium">
                  বিষাদ্ধ ও খাঁটি পণ্য সরবরাহের কারণে আমরা প্রায় সবসময়ই ইতিবাচক
                  মন্তব্য গেঁয়ে থাকি। আপনার প্রত্যাশিত ফলাফল পেতে সঠিক নিয়মে
                  নিয়মিত ব্যবহার অপরিহার্য। আমাদের লক্ষ্য সবসময় আপনার সন্তুষ্টি
                  নিশ্চিত করা।
                </p>

                <div className="hidden sm:block sm:text-start py-7">
                  <a
                    href="https://wa.me/+8801342106348" // Replace with your full number including country code
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="rounded-none bg-[#67D449] text-white text-lg font-bold py-2 px-4 cursor-pointer flex items-center justify-center gap-3">
                      <FaWhatsapp /> WhatsApp
                    </button>
                  </a>
                </div>
              </div>

              <div className="py-12 px-[5%] bg-[#1F6E43] text-center text-white space-y-5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                  নানান রকম অফার আপডেট পেতে <br />
                  আমাদের পেইজে লাইক দিন
                </h1>

                <Link target="_blank" href={'https://www.facebook.com/borkotmoyponno'}>
                  <button className="mx-auto text-center bg-bright-orange px-3 py-2 text-lg text-midnight-navy cursor-pointer flex items-center">
                    <FaFacebookF className="text-blue-500 mr-2 text-xl" /> Borkotmoy Ponno
                  </button>
                </Link>

                <Link
                  href="https://www.facebook.com/borkotmoyponno"
                  target="_blank"
                  className="text-base w-fit px-4 py-2 mx-auto mt-3 block text-white rounded"
                >
                  Borkotmoy Ponno— যেখানে প্রতিটি পণ্যের মাঝে থাকে সততা, বিশ্বাস ও খোদাভীতির ছোঁয়া।
                </Link>


              </div>

            </div>
            <div className="-mt-32 px-[10%]">
              <Carousel>
                <CarouselContent className=" h-full mt-20">
                  {isLoading
                    ? // Show 3 skeleton cards as placeholders
                    Array.from({ length: 3 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3 h-full"
                      >
                        <div className="bg-white p-5 rounded h-full flex flex-col animate-pulse space-y-5">
                          {/* Placeholder for review content */}
                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-full bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-200 rounded" />
                            <div className="h-3 w-5/6 bg-gray-200 rounded" />
                          </div>

                          {/* Placeholder for name and designation */}
                          <div className="flex justify-between items-center mt-auto">
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-gray-200 rounded" />{" "}
                              {/* Name */}
                              <div className="h-3 w-24 bg-gray-200 rounded" />{" "}
                              {/* Designation */}
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))
                    : reviews?.map((review: any, index: number) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3 h-full"
                      >
                        <div className="bg-white mx-2 p-5 rounded h-full flex flex-col">
                          <p className="text-sm text-[#656565] mb-5 flex-1">
                            {review?.content}
                          </p>
                          <div className="flex justify-between items-center gap-5">
                            <div className="space-y-2">
                              <p className="text-lg text-[#2A3347] font-semibold">
                                {review?.name}
                              </p>
                              <p className="text-sm text-[#656565]">
                                {review?.degisnation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            </div>
            <div className="flex justify-center items-center my-10">
              <Link
                href="#orderSection"
                className="rounded-none bg-[#FFa800] text-[#0E243A] text-2xl font-bold  py-3 px-5 cursor-pointer"
              >
                অর্ডার করতে চাই
              </Link>
            </div>
            <div className="my-10 font-caladea">
              <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#1F6E43] mb-5">
                Related Product
              </p>
              {allData?.length > 0 ? (
                <Carousel>
                  <CarouselContent>
                    {/* Add gap and side padding */}
                    {allData.map((product, index) => (
                      <CarouselItem
                        key={index}
                        className="basis-1/1 md:basis-1/3 lg:basis-1/4"
                      >
                        <div className="p-1 h-full">
                          <ProductCard product={product} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-white rounded-lg shadow-md border border-gray-200">
                  {/* <Image
                  src="https://th.bing.com/th/id/OIP.LkzZIjQWsZ47G8M8R-9b2AHaEB?rs=1&pid=ImgDetMain"
                  alt="No products"
                  width={150}
                  height={150}
                  className="mb-4 opacity-80"
                /> */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopDetails;

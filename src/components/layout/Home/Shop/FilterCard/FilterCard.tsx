"use client";
import { FaAngleRight } from "react-icons/fa6";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useHandleFindCategoryQuery } from "@/redux/features/categories/categoriesApi";
import { useEffect, useRef } from "react";
interface FilterCardProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetch: any;
  setMinPrice: any;
  setMaxPrice: any;
  setCategoryPrice: any;
  categoryPrice: any;
}

// 📝 data Interface - Defines structure for each data object
interface IData {
  _id: string; // Unique data ID from MongoDB
  slug: string; // SEO-friendly URL slug for the data (used in URL)
  categoryName: string; // Title of the data
  categoryPhoto: string; // URL of the image associated with the data (e.g., thumbnail)
  createdAt: string; // ISO date string when the data was created
  updatedAt: string; // ISO date string when the data was last updated
}

const FilterCard: React.FC<FilterCardProps> = ({
  setIsOpen,
  isOpen,
  refetch,
  setMinPrice,
  setMaxPrice,
  setCategoryPrice,
  categoryPrice,
}) => {
  // Query to fetch all data based on pagination and search text
  const { data } = useHandleFindCategoryQuery({
    page: 1, // Current page for pagination
    limit: 100, // Number of items per page
    search: "", // The search text to filter data
  });
  const categories: IData[] = data?.payload || [];

  const handleMinPrice = (data: number) => {
    setMinPrice(data);
    refetch();
  };

  const handleMaxPrice = (data: number) => {
    setMaxPrice(data);
    refetch();
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Detect outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setIsOpen]);

  return (
    <>
      <div className="w-80 space-y-5 h-fit hidden sm:block">
        <div className="bg-[#F5F5F5] p-5 space-y-5 rounded">
          <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium ">
            Category <FaAngleRight className="text-forest-green" />
          </h1>
          <div className="w-full h-px bg-[#C4C4C4]"></div>
          <RadioGroup
            defaultValue={categoryPrice}
            value={categoryPrice}
            onValueChange={(value) => {
              setCategoryPrice(value);
              refetch(); // You also forgot to refetch here!
            }}
          >
            <div className="flex items-center cursor-pointer space-x-2">
              <RadioGroupItem value="" id="" />
              <Label
                htmlFor=""
                className="text-[#656565] text-lg cursor-pointer"
              >
                All
              </Label>
            </div>

            {categories?.map((category) => (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                key={category?._id}
              >
                <RadioGroupItem value={category._id} id={category._id} />
                <Label
                  htmlFor={category._id}
                  className="text-[#656565] text-lg cursor-pointer"
                >
                  {category.categoryName}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="bg-[#F5F5F5] p-5 space-y-5 rounded">
          <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium ">
            Price Range <FaAngleRight className="text-forest-green" />
          </h1>
          <div className="w-full h-px bg-[#C4C4C4]"></div>
          <div className="space-y-2">
            <Label>Minimum Price</Label>
            <Input
              placeholder="Enter Price"
              type="number"
              onChange={(e) => handleMinPrice(Number(e.target.value))}
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label>Maximum Price</Label>
            <Input
              placeholder="Enter Price"
              type="number"
              onChange={(e) => handleMaxPrice(Number(e.target.value))}
              className="bg-white"
            />
          </div>
        </div>
      </div>
      <div
        ref={wrapperRef}
        className={`w-72 space-y-5 sm:hidden z-50 bg-white fixed top-0 bottom-0 left-0 h-screen overflow-auto p-5 transform transition-transform duration-300 shadow 
    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="bg-white p-5 space-y-5 rounded">
          <h1
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium "
          >
            Category <FaAngleRight className="text-forest-green" />
          </h1>
          <div className="w-full h-px bg-[#C4C4C4]"></div>
          <RadioGroup
            defaultValue={categoryPrice}
            value={categoryPrice}
            onValueChange={(value) => {
              setCategoryPrice(value);
              refetch(); // You also forgot to refetch here!
            }}
          >
            <div className="flex items-center cursor-pointer space-x-2">
              <RadioGroupItem value="" id="" />
              <Label
                htmlFor=""
                className="text-[#656565] text-lg cursor-pointer"
              >
                All
              </Label>
            </div>

            {categories?.map((category) => (
              <div
                className="flex items-center space-x-2 cursor-pointer"
                key={category?._id}
              >
                <RadioGroupItem value={category._id} id={category._id} />
                <Label
                  onClick={() => setIsOpen(!isOpen)}
                  htmlFor={category._id}
                  className="text-[#656565] text-lg cursor-pointer"
                >
                  {category.categoryName}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="bg-white p-5 space-y-5 rounded">
          <h1 className="flex justify-between items-center gap-5 text-forest-green text-xl font-medium ">
            Price Range <FaAngleRight className="text-forest-green" />
          </h1>
          <div className="w-full h-px bg-[#C4C4C4]"></div>
          <div className="space-y-2">
            <Label>Minimum Price</Label>
            <Input
              placeholder="Enter Price"
              type="number"
              onChange={(e) => handleMinPrice(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label>Maximum Price</Label>
            <Input
              placeholder="Enter Price"
              type="number"
              onChange={(e) => handleMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterCard;

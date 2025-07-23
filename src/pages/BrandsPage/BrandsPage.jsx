import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion as _motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BrandsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/brands"),
  });

  if (isLoading)
    return (
      <div className='fixed z-50 bg-white md:top-16 left-0 w-full h-full flex justify-center items-center'>
        <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
      </div>
    );

  if (isError)
    return (
      <div className='text-center text-red-600 font-semibold mt-20'>
        Failed to load brands. Please try again later.
      </div>
    );

  return (
    <_motion.div
      className='container mx-auto px-4 py-10'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className='text-2xl font-bold mb-6 text-center'>All Brands</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
        {data?.data?.data?.map((brand) => (
          <Link
            to={`/brands/${brand._id}`}
            key={brand._id}
            className='border hover:shadow-blue-500 rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-all duration-300 cursor-pointer'
          >
            <img
              src={brand.image}
              alt={brand.name}
              className='w-20 h-20 object-contain mb-4'
            />
            <p className='text-sm text-blue-600 font-medium text-center'>
              {brand.name}
            </p>
          </Link>
        ))}
      </div>
    </_motion.div>
  );
}

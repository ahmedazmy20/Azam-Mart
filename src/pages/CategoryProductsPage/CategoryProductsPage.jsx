import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion as _motion } from "framer-motion";
import { useState } from "react";
import { Bounce } from "react-toastify";
import { CartContext } from "../../Context/Cart/CartContext";
import { WishlistContext } from "../../Context/Wishlist/WishlistContext";
import ProductsList from "../../components/Products/ProductsList";

export default function CategoryProductsPage() {
  const [sortOrder] = useState("none");

  const { id, name } = useParams();

  const getCategoryProducts = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);

  const { data, isLoading, error } = useQuery({
    queryKey: ["categoryProducts", id],
    queryFn: getCategoryProducts,
  });

  if (isLoading) {
    return (
      <div className='fixed z-50 bg-white md:top-16 left-0 w-full h-full flex justify-center items-center'>
        <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
      </div>
    );
  }

  if (error)
    return (
      <p className='text-red-600 text-center mt-10'>Error loading products</p>
    );
  const allProducts = data?.data?.data || [];

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <_motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex justify-center items-center mt-10'
      >
        <h2 className='text-3xl font-bold'>{name}</h2>
      </_motion.div>
      {allProducts.length === 0 ? (
        <div className='text-center text-gray-500 mt-20 min-h-96'>
          <p className='text-lg mt-4'>No products found for this category.</p>
        </div>
      ) : (
        <>
          <ProductsList products={sortedProducts} />
        </>
      )}
    </>
  );
}

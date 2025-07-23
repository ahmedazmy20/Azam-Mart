import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { motion as _motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/Cart/CartContext";
import { Bounce } from "react-toastify";
import { WishlistContext } from "../../Context/Wishlist/WishlistContext";
import ProductsList from "../../components/Products/ProductsList";
export default function RecentProducts() {
  const [sortOrder] = useState("none");

  const { data, isLoading } = useProducts();

  const allProducts = data?.data?.data || [];

  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <>
      {isLoading ? (
        <div className='fixed z-50 bg-white md:top-16 left-0 w-full h-full flex justify-center items-center'>
          <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
        </div>
      ) : (
        <>
          <ProductsList products={sortedProducts} />
        </>
      )}
    </>
  );
}

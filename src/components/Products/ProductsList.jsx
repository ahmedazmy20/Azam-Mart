import React, { useContext, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion as _motion } from "framer-motion";
import { CartContext } from "../../Context/Cart/CartContext";
import { Bounce, toast } from "react-toastify";
import { WishlistContext } from "../../Context/Wishlist/WishlistContext";

export default function ProductsList({ products = [] }) {
  const { setQuickViewProduct } = useOutletContext();
  const [mainImages, setMainImages] = useState({});
  const [loadingCartId, setLoadingCartId] = useState(null);
  const [loadingWishlistId, setLoadingWishlistId] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist } = useContext(WishlistContext);
  const [sortOrder, setSortOrder] = useState("none");

  const handleImageClick = (productId, newImage) => {
    setMainImages((prevImages) => ({
      ...prevImages,
      [productId]: newImage,
    }));
  };

  async function addToCart(id) {
    setLoadingCartId(id);
    try {
      const { data } = await addProductToCart(id);
      if (data.status === "success") {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Error while adding to cart");
    } finally {
      setLoadingCartId(null);
    }
  }

  // add to wishlist
  async function addToWishlist(id) {
    setLoadingWishlistId(id);
    try {
      const { data } = await addProductToWishlist(id);
      if (data.status === "success") {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message || "Error while adding to cart");
    } finally {
      setLoadingWishlistId(null);
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <div className='flex justify-end px-4 mb-6'>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className='border cursor-pointer px-1 py-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='none'>Sort by Price</option>
          <option value='asc'>Low to High</option>
          <option value='desc'>High to Low</option>
        </select>
      </div>

      <_motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10'
      >
        {sortedProducts.map((product, index) => (
          <_motion.div
            key={product.id}
            custom={index}
            variants={cardVariants}
            initial='hidden'
            animate='visible'
            className='max-w-sm w-xs sm:w-full rounded-tr-[3rem] border-2 border-gray-200 rounded-bl-[3rem] shadow-xl overflow-hidden'
          >
            <div className='w-full max-w-sm rounded-lg overflow-hidden'>
              <div className='relative group'>
                <img
                  loading='lazy'
                  className='main-image p-4 rounded-t-lg w-full h-64 object-contain'
                  src={mainImages[product.id] || product.imageCover}
                  alt={product.title}
                />
                <div className='absolute top-0 left-60 pl-6 w-full h-full group-hover:left-1/4 transition-all duration-500 flex justify-center items-center z-10'>
                  <div className='flex items-center gap-4'>
                    <div className='flex flex-col gap-5 bg-slate-300 px-2 py-4 rounded-lg text-blue-700'>
                      {loadingCartId === product.id ? (
                        <svg
                          className='animate-spin h-5 w-5 text-pink-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8v8z'
                          ></path>
                        </svg>
                      ) : (
                        <i
                          onClick={() => addToCart(product.id)}
                          className='fa-solid fa-cart-plus fa-bounce text-xl cursor-pointer hover:text-pink-600 transition-all duration-300'
                        ></i>
                      )}
                      {loadingWishlistId === product.id ? (
                        <svg
                          className='animate-spin h-5 w-5 text-pink-600'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8v8z'
                          ></path>
                        </svg>
                      ) : (
                        <i
                          onClick={() => addToWishlist(product.id)}
                          className='fa-solid fa-heart fa-beat text-xl cursor-pointer hover:text-pink-600 transition-all duration-300'
                        ></i>
                      )}
                      <i
                        onClick={() => setQuickViewProduct?.(product)}
                        className='fa-brands fa-shake fa-quinscape text-xl hover:text-pink-600 transition-all duration-300 cursor-pointer'
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='related-images py-2 px-4'>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                grabCursor={true}
                className='w-full'
              >
                {product.images.map((img, i) => (
                  <SwiperSlide key={i} className='w-auto group'>
                    <img
                      loading='lazy'
                      className='w-16 h-16 object-cover cursor-pointer rounded-md border border-transparent group-hover:border-blue-500 transition-all duration-300'
                      src={img}
                      alt={`${product.title}-thumb-${i}`}
                      onClick={() => handleImageClick(product.id, img)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className='px-5 pb-5'>
              <div>
                <h5 className='text-xl font-semibold line-clamp-1 tracking-tight text-gray-900'>
                  {product.title.split(" ").slice(0, 3).join(" ")}...
                </h5>
                <h5 className='text-sm font-semibold line-clamp-1 text-gray-900'>
                  {product.category?.name}
                </h5>
                <span className='text-gray-500 text-sm line-clamp-1'>
                  {product.description?.split(" ").slice(0, 4).join(" ")}...
                </span>
              </div>

              <div className='flex items-center mt-2.5 mb-5'>
                <div className='flex items-center'>
                  <span className='mr-2 text-sm text-gray-500'>
                    {product.ratingsAverage?.toFixed(1)}
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const rating = product.ratingsAverage || 0;
                    if (star <= Math.floor(rating)) {
                      return (
                        <svg
                          key={star}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-4 h-5 text-yellow-400'
                        >
                          <path d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.021 6.214h6.545c.969 0 1.371 1.24.588 1.81l-5.29 3.845 2.02 6.214c.3.921-.755 1.688-1.54 1.118l-5.291-3.846-5.29 3.846c-.785.57-1.84-.197-1.54-1.118l2.02-6.214-5.29-3.845c-.783-.57-.38-1.81.588-1.81h6.545l2.02-6.214z' />
                        </svg>
                      );
                    } else if (star - rating <= 0.5) {
                      return (
                        <svg
                          key={star}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          className='w-4 h-5 text-yellow-400'
                        >
                          <defs>
                            <linearGradient id={`half-star-${star}`}>
                              <stop offset='50%' stopColor='rgb(250 204 21)' />
                              <stop offset='50%' stopColor='rgb(209 213 219)' />
                            </linearGradient>
                          </defs>
                          <path
                            fill={`url(#half-star-${star})`}
                            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.021 6.214h6.545c.969 0 1.371 1.24.588 1.81l-5.29 3.845 2.02 6.214c.3.921-.755 1.688-1.54 1.118l-5.291-3.846-5.29 3.846c-.785.57-1.84-.197-1.54-1.118l2.02-6.214-5.29-3.845c-.783-.57-.38-1.81.588-1.81h6.545l2.02-6.214z'
                          />
                        </svg>
                      );
                    } else {
                      return (
                        <svg
                          key={star}
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='w-4 h-5 text-gray-300'
                        >
                          <path d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.021 6.214h6.545c.969 0 1.371 1.24.588 1.81l-5.29 3.845 2.02 6.214c.3.921-.755 1.688-1.54 1.118l-5.291-3.846-5.29 3.846c-.785.57-1.84-.197-1.54-1.118l2.02-6.214-5.29-3.845c-.783-.57-.38-1.81.588-1.81h6.545l2.02-6.214z' />
                        </svg>
                      );
                    }
                  })}
                </div>
              </div>

              <div className='flex items-center gap-2 justify-between'>
                <span className='text-xl font-bold text-gray-900'>
                  ${product.price}
                </span>
                <Link
                  to={`/productdetails/${product.id}/${product.category?.name}`}
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center'
                >
                  More Details
                </Link>
              </div>
            </div>
          </_motion.div>
        ))}
      </_motion.div>
    </>
  );
}

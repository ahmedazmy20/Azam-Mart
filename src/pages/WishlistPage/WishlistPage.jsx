import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion as _motion } from "framer-motion";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../Context/Wishlist/WishlistContext";
import { CartContext } from "../../Context/Cart/CartContext";

export default function WishlistPage() {
  const { getWishlistProducts, removeWishlistItem } =
    useContext(WishlistContext);
  const [removingProductId, setRemovingProductId] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const [loadingCartId, setLoadingCartId] = useState(null);

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

  const {
    data: wishlistProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistProducts,
  });

  console.log("wishlistProduct", wishlistProduct?.data?.data);

  //wishlistProduct?.data?.data?.products
  async function removeProductWIshlist(id) {
    setRemovingProductId(id); // ⏳ ابدأ اللودينج
    try {
      await removeWishlistItem(id); // 🟢 حدّث الكمية
      await refetch(); // 🟢 أعد تحميل البيانات وانتظرها
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setRemovingProductId(null); // ✅ بعد ما تخلص شيل اللودينج
      toast.success("Product removed from WishList.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {wishlistProduct?.data?.data?.length === 0 ? (
        <>
          <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 bg-gradient-to-b rounded-2xl'>
            <_motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className='p-6 rounded-2xl flex flex-col items-center max-w-lg'
            >
              <h2 className='text-4xl fa-fade font-bold text-gray-800 mb-2'>
                Your Wishlist is Empty 💔
              </h2>
              <p className='text-gray-500 mb-6 text-center'>
                Looks like you haven't added any favorites yet. Let’s fix that!
              </p>

              <Link
                to='/products'
                className='fa-beat bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300'
              >
                Start Exploring
              </Link>
            </_motion.div>
          </div>
        </>
      ) : (
        <>
          <div className=' min-h-screen'>
            {isLoading && (
              <div className='fixed z-50 bg-white md:top-16 left-0 w-full h-full flex justify-center items-center'>
                <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
              </div>
            )}
            <div className='relative overflow-x-auto mt-5 rounded-lg sm:rounded-xl'>
              <div className='py-10 px-4 sm:px-10'>
                <_motion.h2
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className='text-2xl font-bold text-center mb-8'
                >
                  Your Wishlist
                </_motion.h2>

                <_motion.div
                  className='grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-2'
                  variants={containerVariants}
                  initial='hidden'
                  animate='show'
                >
                  {wishlistProduct?.data?.data.map((product) => (
                    <_motion.div
                      key={product._id}
                      variants={cardVariants}
                      className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300'
                    >
                      <div className='relative'>
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className='w-full object-cover rounded-t-xl'
                        />
                        <button
                          onClick={() => removeProductWIshlist(product._id)}
                          className='absolute cursor-pointer top-2 right-2 bg-white p-2 flex items-center justify-center rounded-full shadow-md hover:bg-red-100 text-red-600 transition'
                        >
                          {removingProductId === product._id ? (
                            <div className='w-5 h-5 border-2 border-red-500 border-t-transparent animate-spin rounded-full'></div>
                          ) : (
                            <i className='fa-solid fa-trash'></i>
                          )}
                        </button>
                      </div>
                      <div className='p-4'>
                        <h3 className='text-lg font-semibold mb-1 line-clamp-2'>
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h3>
                        <p className='text-gray-500 mb-2'>
                          <span className='text-gray-500 text-sm line-clamp-1'>
                            {product.description
                              .split(" ")
                              .slice(0, 5)
                              .join(" ")}
                            ...
                          </span>
                        </p>
                        <div className='flex items-center mt-2.5 mb-5'>
                          <div className='flex items-center'>
                            <span className='mr-2 text-sm text-gray-500'>
                              {product.ratingsAverage?.toFixed(1)}
                            </span>
                            {[1, 2, 3, 4, 5].map((star) => {
                              const rating = product.ratingsAverage || 0;
                              if (star <= Math.floor(rating)) {
                                // نجمة كاملة
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
                                // نص نجمة
                                return (
                                  <svg
                                    key={star}
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                    className='w-4 h-5 text-yellow-400'
                                  >
                                    <defs>
                                      <linearGradient id={`half-star-${star}`}>
                                        <stop
                                          offset='50%'
                                          stopColor='rgb(250 204 21)'
                                        />
                                        <stop
                                          offset='50%'
                                          stopColor='rgb(209 213 219)'
                                        />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      fill={`url(#half-star-${star})`}
                                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.021 6.214h6.545c.969 0 1.371 1.24.588 1.81l-5.29 3.845 2.02 6.214c.3.921-.755 1.688-1.54 1.118l-5.291-3.846-5.29 3.846c-.785.57-1.84-.197-1.54-1.118l2.02-6.214-5.29-3.845c-.783-.57-.38-1.81.588-1.81h6.545l2.02-6.214z'
                                    />
                                  </svg>
                                );
                              } else {
                                // نجمة فاضية
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
                        <div className='flex justify-between items-center'>
                          <span className='text-blue-600 font-bold'>
                            ${product.price}
                          </span>
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
                              className='fa-solid hover:text-pink-600 transition-all duration-300 fa-cart-plus fa-bounce text-xl cursor-pointer'
                            ></i>
                          )}
                        </div>
                      </div>
                    </_motion.div>
                  ))}
                </_motion.div>
              </div>
            </div>
            <div className='flex justify-end mr-6 mt-10'></div>
          </div>
        </>
      )}
    </>
  );
}

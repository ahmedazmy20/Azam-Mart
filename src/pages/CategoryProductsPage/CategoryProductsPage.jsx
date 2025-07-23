import { useOutletContext, useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { motion as _motion } from "framer-motion";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { CartContext } from "../../Context/Cart/CartContext";

export default function CategoryProductsPage() {
  const { setQuickViewProduct } = useOutletContext();
  const [mainImages, setMainImages] = useState({});
  const [loadingCartId, setLoadingCartId] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const [sortOrder, setSortOrder] = useState("none");

  const { id, name } = useParams();

  const getCategoryProducts = () =>
    axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`);

  const { data, isLoading, error } = useQuery({
    queryKey: ["categoryProducts", id],
    queryFn: getCategoryProducts,
  });

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

  function handleImageClick(productId, newImage) {
    setMainImages((prevImages) => ({
      ...prevImages,
      [productId]: newImage,
    }));
  }

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

      <_motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full mt-10 min-h-screen'
      >
        <div className='flex justify-end mb-6 px-4'>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className='border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value='none'>Sort by</option>
            <option value='asc'>Price: Low to High</option>
            <option value='desc'>Price: High to Low</option>
          </select>
        </div>

        {data?.data?.data.length === 0 ? (
          <div className='text-center text-xl text-gray-500 font-semibold py-10'>
            No products in this category yet.
          </div>
        ) : (
          <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className='max-w-sm w-xs sm:w-full rounded-lg shadow-md overflow-hidden'
              >
                <div className='w-full max-w-sm rounded-lg overflow-hidden'>
                  <div className='relative group'>
                    <img
                      loading='lazy'
                      className='main-image p-4 rounded-t-lg w-full h-64 object-contain'
                      src={mainImages[product.id] || product.imageCover}
                      alt={product.title}
                    />
                    <div className='absolute top-0 left-60 pl-6 w-full h-full group-hover:left-0 transition-all duration-500 flex justify-center items-center z-10'>
                      <div className='flex items-center gap-4'>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className='fa-bounce px-4 py-2 rounded-lg bg-blue-500 text-white shadow-xl hover:bg-blue-600 transition cursor-pointer'
                        >
                          Quick View
                        </button>
                        <div className='flex flex-col gap-5 bg-slate-300 px-2 py-4 rounded-lg text-blue-700'>
                          {loadingCartId === product.id ? (
                            <svg
                              className='animate-spin h-5 w-5 text-blue-600'
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
                              className='fa-solid fa-cart-plus fa-bounce text-xl cursor-pointer'
                            ></i>
                          )}
                          <i className='fa-solid fa-heart fa-beat text-xl cursor-pointer'></i>
                          <i className='fa-brands fa-shake fa-quinscape text-xl'></i>
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
                      {product.category.name}
                    </h5>
                    <span className='text-gray-500 text-sm line-clamp-1'>
                      {product.description.split(" ").slice(0, 4).join(" ")}...
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
                              <path d='M11.049 2.927...' />
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
                                d='M11.049 2.927...'
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
                              <path d='M11.049 2.927...' />
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
                      to={`/productdetails/${product.id}/${product.category.name}`}
                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center'
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </_motion.div>
    </>
  );
}

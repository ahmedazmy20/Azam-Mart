import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode } from "swiper/modules";
import { motion as _motion } from "framer-motion";
import { Navigation } from "swiper/modules";
import { useOutletContext } from "react-router-dom";

export default function ProductDetailsPage() {
  const { id, category } = useParams();
  const [singleproduct, setSingleproduct] = useState(null);
  const [relatedproducts, setRelatedproducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const { setQuickViewProduct } = useOutletContext();

  function getsinglesroduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setSingleproduct(res.data.data);
        setMainImage(res.data.data.imageCover);
      })
      .catch((err) => console.log(err));
  }

  //git relatedProducts by category
  function getrelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (item) => item.category.name === category
        );
        setRelatedproducts(related);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getsinglesroduct(id);
    getrelatedProducts();
  }, [id]);

  function handleImageClick(productId, newImage) {
    setRelatedproducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId
          ? { ...product, imageCover: newImage }
          : product
      )
    );
  }

  if (!singleproduct) {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
      </div>
    );
  }

  return (
    <>
      <_motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className='container mx-auto md:px-4 py-8'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Left Side - Images */}
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Thumbnails as Swiper */}
            <div className='related-images w-full md:w-28'>
              <Swiper
                direction='vertical'
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                modules={[FreeMode, Navigation]}
                className='md:h-[350px] h-auto'
                breakpoints={{
                  0: {
                    direction: "horizontal",
                    slidesPerView: 4,
                  },
                  768: {
                    direction: "vertical",
                    slidesPerView: 4,
                  },
                }}
              >
                {[singleproduct.imageCover, ...singleproduct.images].map(
                  (img, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={img}
                        alt={`thumb-${i}`}
                        className={`w-16 h-16 mx-auto my-1 object-cover border rounded cursor-pointer hover:ring-2 hover:ring-blue-500 transition ${
                          mainImage === img ? "ring-2 ring-blue-500" : ""
                        }`}
                        onClick={() => setMainImage(img)}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>

            {/* Main Image */}
            <div className='flex-1 flex justify-center'>
              <img
                src={mainImage}
                alt={singleproduct.title}
                className=' md:w-full p-1 h-[350px] md:h-[400px] object-contain rounded'
              />
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className='space-y-2  px-2 py-5 rounded-2xl ml-5'>
            <h2 className='font-bold flex gap-3 text-gray-800'>
              <span className='font-bold text-gray-500 text-lg'>Title: </span>
              <span className='text-black text-md'>{singleproduct.title}</span>
            </h2>

            <p className='font-semibold flex items-center gap-1'>
              <span className='font-bold text-gray-500 text-lg'>Price:</span>
              <span className='text-md text-blue-600 '>
                {singleproduct.price} $
              </span>
            </p>

            <div className='flex items-center gap-1'>
              <span className='font-bold text-gray-500 text-lg'>Rating: </span>
              <div className='text-yellow-500 text-xl'>
                {"★".repeat(Math.floor(singleproduct.ratingsAverage))}
                {"☆".repeat(5 - Math.floor(singleproduct.ratingsAverage))}
              </div>
              <span className='text-sm text-blue-600'>
                ({singleproduct.ratingsAverage})
              </span>
            </div>

            <p className='text-gray-700 flex gap-1'>
              <span className='font-bold text-gray-500 text-lg'>
                Description:{" "}
              </span>
              <span className=' text-black line-clamp-4'>
                {singleproduct.description}
              </span>
            </p>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <span className='font-bold text-gray-500 text-lg'>Brand:</span>{" "}
              <img
                src={singleproduct.brand?.image}
                alt={singleproduct.brand?.name}
                className='w-8 h-8 rounded-full shadow-md border'
              />
              <span className='text-black'>{singleproduct.brand?.name}</span>
            </div>

            <div className='text-sm text-gray-500'>
              <span className='font-bold text-gray-500 text-lg'>
                Category:{" "}
              </span>
              <span className='text-black'>{singleproduct.category?.name}</span>
            </div>

            <div className='text-sm flex items-center gap-1 text-gray-500'>
              <span className='font-bold text-gray-500 text-lg'>
                Available Quantity:
              </span>
              <span className='text-blue-600 text-lg'>
                {singleproduct.quantity}
              </span>
            </div>

            <div className='text-sm text-gray-500'>
              <span className='font-bold text-gray-500 text-lg'> Sold: </span>
              <span className='text-blue-600 text-lg'>
                {singleproduct.sold}
              </span>
            </div>

            <div className='actions flex gap-8 items-center  mt-5 text-gray-500'>
              {/* Add to Cart */}
              <button className='fa-bounce bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer'>
                Add to Cart
              </button>
              {/* Add to Wishlist */}
              <i className='fas fa-heart fa-beat text-3xl text-blue-500 hover:text-blue-600 cursor-pointer'></i>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className='mt-12 '>
          <h3 className='text-2xl font-bold fa-fade text-blue-800 mb-4'>
            Related Products
          </h3>
          <div className='flex justify-end items-center gap-4 mb-4'>
            <button className='related-prev text-gray-700 hover:text-blue-600 text-2xl'>
              <i className='fas fa-chevron-left cursor-pointer'></i>
            </button>
            <button className='related-next text-gray-700 hover:text-blue-600 text-2xl'>
              <i className='fas fa-chevron-right cursor-pointer'></i>
            </button>
          </div>

          <Swiper
            spaceBetween={15}
            slidesPerView={2}
            navigation={{
              nextEl: ".related-next",
              prevEl: ".related-prev",
            }}
            modules={[Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className='py-2 relative bg-red-60'
          >
            {relatedproducts
              .filter((item) => item._id !== id) // exclude current product
              .map((product) => (
                <SwiperSlide key={product._id}>
                  <div className='max-w-sm w-xs border border- blue-300 sm:w-full rounded-lg shadow-md overflow-hidden'>
                    <div className='w-full max-w-sm rounded-lg overflow-hidden'>
                      <div className='relative group'>
                        {/* الصورة الأساسية */}
                        <img
                          className='p-4 rounded-t-lg w-full h-64 object-contain'
                          src={product.imageCover}
                          alt={product.title}
                        />

                        {/* Overlay Layer */}
                        <div className='absolute top-0 left-60 pl-6 w-full h-full group-hover:left-0 transition-all duration-300 flex justify-center items-center z-10'>
                          <div className='flex items-center gap-4'>
                            <button
                              onClick={() => setQuickViewProduct(product)}
                              className='fa-bounce px-4 py-2 rounded-lg bg-blue-500 text-white shadow-xl hover:bg-blue-600 transition cursor-pointer'
                            >
                              Quick View
                            </button>
                            <div className='flex flex-col gap-5 bg-slate-300 px-2 py-4 rounded-lg text-blue-700'>
                              <i className='fa-solid fa-cart-plus fa-bounce text-xl cursor-pointer'></i>
                              <i className='fa-solid fa-heart fa-beat text-xl cursor-pointer'></i>
                              <i className='fa-brands fa-shake fa-quinscape text-xl'></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* الصور المصغرة (سلايدر) */}
                    <div className='related-images py-2 px-6'>
                      <div className='relative'>
                        {/* الأسهم */}
                        <button
                          className={`thumb-prev-${product._id} absolute -left-4 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-blue-600`}
                        >
                          <i className='fas fa-chevron-left cursor-pointer'></i>
                        </button>
                        <button
                          className={`thumb-next-${product._id} absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-gray-500 hover:text-blue-600`}
                        >
                          <i className='fas fa-chevron-right cursor-pointer'></i>
                        </button>

                        <Swiper
                          spaceBetween={10}
                          slidesPerView={4}
                          grabCursor={true}
                          navigation={{
                            nextEl: `.thumb-next-${product._id}`,
                            prevEl: `.thumb-prev-${product._id}`,
                          }}
                          modules={[Navigation]}
                          className='w-full' // لتوفير مساحة للأسهم
                        >
                          {product.images.map((img, i) => (
                            <SwiperSlide key={i} className='w-auto group'>
                              <img
                                className='w-16 h-16 object-contain cursor-pointer rounded-md border border-transparent group-hover:border-blue-500 transition-all duration-300'
                                src={img}
                                alt={`${product.title}-thumb-${i}`}
                                onClick={() =>
                                  handleImageClick(product.id, img)
                                }
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>

                    {/* باقي تفاصيل المنتج */}
                    <div className='px-5 pb-5'>
                      <div>
                        <h5 className='text-xl font-semibold line-clamp-1 tracking-tight text-gray-900'>
                          {product.title.split(" ").slice(0, 3).join(" ")}...
                        </h5>
                        <h5 className='text-sm font-semibold line-clamp-1 text-gray-900'>
                          {product.category.name}
                        </h5>
                        <span className='text-gray-500 text-sm line-clamp-1'>
                          {product.description.split(" ").slice(0, 4).join(" ")}
                          ...
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

                      <div className='flex items-center gap-2 justify-between'>
                        <span className='text-xl font-bold text-gray-900'>
                          ${product.price}
                        </span>
                        <Link
                          to={`/productdetails/${product.id}/${product.category.name}`}
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center'
                        >
                          More Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </_motion.div>
    </>
  );
}

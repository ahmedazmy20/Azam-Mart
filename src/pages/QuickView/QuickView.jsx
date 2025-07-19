import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function QuickView({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        color: "white",
      }}
      className='fixed inset-0 z-50 flex justify-center items-center'
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-white rounded-lg p-6 w-full max-w-2xl relative shadow-xl'
      >
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl'
        >
          <i className='fa-solid fa-xmark cursor-pointer'></i>
        </button>

        <div className='flex flex-col md:flex-row gap-4'>
          <img
            src={product.imageCover}
            alt={product.title}
            className='w-full md:w-1/2 object-contain h-64 rounded'
          />

          {/* Product details */}
          <div className='px-5 pb-5'>
            <div>
              <h5 className='text-xl font-semibold line-clamp-1 tracking-tight text-gray-900'>
                {product.title.split(" ").slice(0, 3).join(" ")}...
              </h5>
              <h5 className='text-sm font-semibold line-clamp-1 text-gray-900'>
                {product.category.name}
              </h5>
              <span className='text-gray-500 text-sm '>
                {product.description.split(" ").slice(0, 16).join(" ")}...
              </span>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <img
                  src={product.brand?.image}
                  alt={product.brand?.name}
                  className='w-8 h-8 rounded-full shadow-md border'
                />
                <span className='text-black'>{product.brand?.name}</span>
              </div>
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
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" }, onClose())
                }
                to={`/productdetails/${product.id}/${product.category.name}`}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center'
              >
                More Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

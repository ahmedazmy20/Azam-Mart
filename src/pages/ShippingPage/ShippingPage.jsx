import { useFormik } from "formik";
import { motion as _motion } from "framer-motion";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/Cart/CartContext";
import { OrderContext } from "../../Context/Order/OrderContext";
export default function ShippingPage() {
  const [isLoading, setIsLoading] = useState(false);

  let { cartId } = useContext(CartContext);
  let { checkout } = useContext(OrderContext);

  let validationSchema = Yup.object({
    details: Yup.string()
      .min(5, "Details must be at least 5 characters")
      .required("Details is Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid Phone Number")
      .required("Phone Number is Required"),
    city: Yup.string()
      .min(3, "City must be at least 3 characters")
      .required("City is Required"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: () => handelChickout(cartId, `http://localhost:5173`),
  });

  async function handelChickout(cartId, url) {
    setIsLoading(true);
    try {
      let { data } = await checkout(cartId, url, formik.values);
      window.location.href = data.session.url;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div>
        <_motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='form my-5 mt-10 py-12 px-4 sm:px-6 rounded-2xl shadow-2xl max-w-2xl mx-auto w-full bg-slate-100'
        >
          <h2 className='text-2xl flex justify-center font-bold text-blue-600 mb-2'>
            Shipping Now
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className='w-full max-w-md mx-auto'
          >
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='details'
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='details'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='details'
                className='peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Enter your details
              </label>
              {formik.errors.details && formik.touched.details ? (
                <span className='text-red-600'>{formik.errors.details}</span>
              ) : null}
            </div>

            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='tel'
                name='phone'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='phone'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='phone'
                className='peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Enter your phone
              </label>

              {formik.errors.phone && formik.touched.phone && (
                <span className='text-red-600'>{formik.errors.phone}</span>
              )}
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='city'
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='city'
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                placeholder=' '
              />
              <label
                htmlFor='city'
                className='peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                Enter your city
              </label>
              {formik.errors.city && formik.touched.city ? (
                <span className='text-red-600'>{formik.errors.city}</span>
              ) : null}
            </div>
            <button
              type='submit'
              disabled={isLoading}
              className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 min-w-[120px] justify-center disabled:opacity-70'
            >
              {isLoading ? (
                <>
                  <svg
                    className='animate-spin h-5 w-5 text-white'
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
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <i className='fa-solid fa-truck'></i> Shipping
                </>
              )}
            </button>
          </form>
        </_motion.div>
      </div>
    </>
  );
}

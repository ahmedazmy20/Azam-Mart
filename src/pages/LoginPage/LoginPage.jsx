import axios from "axios";
import { useFormik } from "formik";
import { motion as _motion } from "framer-motion";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/User/UserContext";

export default function LoginPage() {
  let { setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [apierror, setApierror] = useState("");

  // 👁️ حالات إظهار/إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .matches(/.com/, "Invalid email")
      .required("Email is Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is Required"),
  });
  async function handelLogin(values) {
    try {
      setIsloading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("userToken", data.token);
      setuserLogin(data.token);
      navigate("/");
    } catch (error) {
      setApierror(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <_motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='form my-5 mt-10 py-12 px-4 sm:px-6 rounded-2xl shadow-2xl max-w-2xl mx-auto w-full bg-slate-100'
      >
        <h2 className='text-2xl flex justify-center font-bold text-blue-600 mb-2'>
          LogIn
        </h2>
        {apierror ? (
          <div className='text-red-600 py-0 w-fit mx-auto mt-5 p-2 rounded-2xl fa-fade'>
            {apierror}
          </div>
        ) : null}
        <form
          onSubmit={formik.handleSubmit}
          className='w-full max-w-md mx-auto'
        >
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='email'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
            />
            <label
              htmlFor='email'
              className='peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Enter your email
            </label>
            {formik.errors.email && formik.touched.email ? (
              <span className='text-red-600'>{formik.errors.email}</span>
            ) : null}
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <input
              type={showPassword ? "text" : "password"}
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id='password'
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
              placeholder=' '
            />
            <label
              htmlFor='password'
              className='peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Enter your password
            </label>
            {/* 🔐 Password Field with Show/Hide */}

            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-2 top-3 text-gray-500'
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

            {formik.errors.password && formik.touched.password && (
              <span className='text-red-600'>{formik.errors.password}</span>
            )}
          </div>

          <div className='text-right mb-4'>
            <Link
              to='/forgot-password'
              className='text-blue-600 text-sm underline'
            >
              Forgot Password?
            </Link>
          </div>

          <div className='flex items-center gap-3'>
            <button
              type='submit'
              className='text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-4 py-2 text-center '
            >
              {isloading ? (
                <i className='fa-solid fa-spinner fa-spin'></i>
              ) : (
                "LogIn"
              )}
            </button>
            <div>
              <span className='text-sm text-black'>
                don't have an account?{" "}
              </span>
              <Link to='/register' className='text-blue-600'>
                {" "}
                <span className='underline text-blue-600'>Register Now</span>
              </Link>
            </div>
          </div>
        </form>
      </_motion.div>
    </>
  );
}

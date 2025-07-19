import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [apierror, setApierror] = useState("");

  const navigate = useNavigate();

  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .matches(/.com/, "Invalid email")
      .required("Email is Required"),
  });

  async function handleSend(values) {
    try {
      setIsloading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log("forget passowr data", data);
      // window.alert(data.message);
      setMessage(data.message || "Code sent to your email.");
      console.log("message from forget password", data.message); // success or error

      setApierror("");
      setTimeout(() => {
        navigate("/verify-code", { state: { email: values.email } });
      }, 2000);
    } catch (error) {
      setApierror(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSend,
  });

  //   const handleSend = async (e) => {
  //     e.preventDefault();
  //     try {
  //       let { data } = await axios.post(
  //         "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
  //         { email }
  //       );
  //       setMessage(data.message || "Code sent to your email.");
  //       setError("");
  //       navigate("/verify-code", { state: { email } });
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Error sending code.");
  //     }
  //   };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className='form my-10 bg-slate-50 shadow-2xl rounded-2xl px-6 py-12 max-w-2xl mx-auto'
    >
      <h2 className='text-2xl font-bold text-blue-600 mb-4 text-center'>
        Forgot Password
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col items-center justify-center'
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
        <button
          type='submit'
          className='bg-blue-700 text-white px-4 py-2 rounded'
        >
          {isloading ? <i className='fa fa-spinner fa-spin'></i> : "Send Code"}
        </button>
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='text-green-600 mt-3 text-sm'
          >
            {message}
          </motion.p>
        )}
        {apierror && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className='text-red-600 mt-3  text-sm'
          >
            {apierror}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}

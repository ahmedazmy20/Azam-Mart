import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function ResetPassword() {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState(false);

  const formik = useFormik({
    initialValues: { newPassword: "" },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Password is Required"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const { data } = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            email,
            newPassword: values.newPassword,
          }
        );
        setStatus({ success: data.message || "Password reset successfully." });
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setStatus({
          error: err.response?.data?.message || "Failed to reset password.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='form my-10 max-w-md mx-auto'>
      <h2 className='text-2xl font-bold text-blue-600 mb-4 text-center'>
        Reset Password
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className='relative z-0 w-full mb-5 group'>
          <input
            type={newPassword ? "text" : "password"}
            name='newPassword'
            value={formik.values.newPassword}
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
            onClick={() => setNewPassword(!newPassword)}
            className='absolute right-2 top-3 text-gray-500'
          >
            {newPassword ? "🙈" : "👁️"}
          </button>

          {formik.errors.newPassword && formik.touched.newPassword && (
            <span className='text-red-600'>{formik.errors.newPassword}</span>
          )}
        </div>

        <button
          type='submit'
          className='bg-blue-700 cursor-pointer text-white px-4 py-2 rounded w-full'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <i className='fa fa-spinner fa-spin'></i>
          ) : (
            "Reset Password"
          )}
        </button>

        {formik.status?.success && (
          <p className='text-green-600 mt-3'>{formik.status.success}</p>
        )}
        {formik.status?.error && (
          <p className='text-red-600 mt-3'>{formik.status.error}</p>
        )}
      </form>
    </div>
  );
}

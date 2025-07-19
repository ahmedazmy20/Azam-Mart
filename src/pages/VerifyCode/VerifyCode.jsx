import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function VerifyResetCode() {
  const { state } = useLocation();
  const email = state?.email;
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    code: Yup.string()
      .min(5, "Code must be at least 5 digits")
      .max(6, "Code must be 5 or 6 digits")
      .matches(/^\d{5,6}$/, "Code must be 5 or 6 digits")
      .required("Code is required"),
  });

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          { resetCode: values.code }
        );
        navigate("/reset-password", { state: { email } });
      } catch (err) {
        setErrors({
          code: err.response?.data?.message || "Invalid code",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='form bg-slate-50 px-6 py-14 rounded-2xl my-12 max-w-md mx-auto'>
      <h2 className='text-2xl font-bold text-blue-600 mb-4 text-center'>
        Verify Code
      </h2>
      <span className='text-center block text-sm text-slate-400'>
        We have sent a 6-digit code to your email.
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col items-center'
      >
        <div className='flex justify-center gap-2 mb-4'>
          <input
            type='text'
            name='code'
            inputMode='numeric'
            maxLength={6}
            className='text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 text-lg px-4 py-2 mb-2 w-3/5'
            value={formik.values.code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.code && (
          <p className='text-red-600 text-sm mb-2'>{formik.errors.code}</p>
        )}
        <button
          type='submit'
          className='bg-blue-700 cursor-pointer text-white px-4 py-2 rounded'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <i className='fa fa-spinner fa-spin'></i>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}

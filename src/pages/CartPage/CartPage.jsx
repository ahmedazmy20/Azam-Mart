import { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart/CartContext";
import { useQuery } from "@tanstack/react-query";
import { motion as _motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import emptyCartImage from "../../assets/emptycart.png";

export default function CartPage() {
  const {
    getCartProducts,
    updateProductQuantity,
    removeCartItem,
    deleteAllCartItems,
  } = useContext(CartContext);
  const [updatingProductId, setUpdatingProductId] = useState(null); // 🟡 لتعقب المنتج اللي بيتم تحديثه
  const [removingProductId, setRemovingProductId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const {
    data: cartProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartProducts,
  });

  async function updateProduct(id, count) {
    setUpdatingProductId(id); //  ابدأ التحميل
    try {
      await updateProductQuantity(id, count); // 🟢 حدّث الكمية
      await refetch(); // 🟢 أعد تحميل البيانات وانتظرها
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setUpdatingProductId(null); // ✅ بعد ما تخلص كل حاجة شيل اللودينج
      toast.success("Product quantity updated.", {
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

  async function removeProduct(id) {
    setRemovingProductId(id); // ⏳ ابدأ اللودينج
    try {
      await removeCartItem(id); // 🟢 حدّث الكمية
      await refetch(); // 🟢 أعد تحميل البيانات وانتظرها
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setRemovingProductId(null); // ✅ بعد ما تخلص شيل اللودينج
      toast.success("Product removed from cart.", {
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

  async function deleteAll() {
    setDeletingAll(true); // 🔄 ابدأ اللودينج
    try {
      const res = await deleteAllCartItems(); // 🧠 بلاش تبعت cartId هنا
      if (res.status === 200) {
        toast.success("Cart cleared successfully");
        await refetch(); // 🟢 علشان تحدث الداتا بعد المسح
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setDeletingAll(false); // ✅ انتهى اللودينج
    }
  }

  return (
    <>
      {cartProduct?.data?.data?.products?.length === 0 ? (
        <>
          <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 bg-gradient-to-b from-blue-50 to-white rounded-2xl'>
            <_motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className='p-6 rounded-2xl  flex flex-col items-center max-w-sm'
            >
              <img
                src={emptyCartImage} /* أو استخدم svg/png المناسب */
                alt='Empty Cart'
                className='mb-4 fa-bounce'
              />

              <h2 className='text-4xl font-bold text-gray-800 mb-2'>
                Your Cart is Empty
              </h2>
              <p className='text-gray-500 mb-6 text-center'>
                Your cart is currently empty.
              </p>

              <Link
                to='/products'
                className='fa-beat bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300'
              >
                Shop Now
              </Link>
            </_motion.div>
          </div>
        </>
      ) : (
        <>
          <div>
            <_motion.h2
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='text-xl mt-5 font-bold text-center'
            >
              Total Price:
              <span className='text-blue-600'>
                ${cartProduct?.data.data.totalCartPrice}
              </span>
            </_motion.h2>
            {isLoading && (
              <div className='flex justify-center items-center h-screen'>
                <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
              </div>
            )}
            <div className='relative overflow-x-auto shadow-2xl mt-5 rounded-lg sm:rounded-xl'>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
                <_motion.thead
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className='text-xs text-gray-700 uppercase bg-blue-100 '
                >
                  <tr>
                    <th scope='col' className='px-16 py-3'>
                      <span className='sr-only'>Image</span>
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Product
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Qty
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Price
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
                </_motion.thead>
                <_motion.tbody
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {cartProduct?.data?.data?.products.map((product, index) => (
                    <tr
                      key={index}
                      className='bg-white border-b border-blue-200 transition duration-500 hover:bg-blue-50 '
                    >
                      <td className='p-4'>
                        <img
                          src={product.product.imageCover}
                          className='w-16 md:w-32 max-w-full max-h-full'
                          alt='Apple Watch'
                        />
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900'>
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex items-center'>
                          <button
                            onClick={() =>
                              updateProduct(
                                product.product._id,
                                product.count - 1
                              )
                            }
                            className='cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'
                            type='button'
                          >
                            <span className='sr-only'>Quantity button</span>
                            <svg
                              className='w-3 h-3'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 2'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M1 1h16'
                              />
                            </svg>
                          </button>
                          <div>
                            <span>
                              {updatingProductId === product.product._id ? (
                                <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent animate-spin rounded-full'></div>
                              ) : (
                                <span>{product.count}</span>
                              )}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              updateProduct(
                                product.product._id,
                                product.count + 1
                              )
                            }
                            className='cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200'
                            type='button'
                          >
                            <span className='sr-only'>Quantity button</span>
                            <svg
                              className='w-3 h-3'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 18 18'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M9 1v16M1 9h16'
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className='px-6 py-4 font-semibold text-gray-900'>
                        ${product.price * product.count}
                      </td>
                      <td className='px-6 py-4'>
                        <button
                          onClick={() => removeProduct(product.product._id)}
                          className='cursor-pointer hover:text-red-500 font-medium text-orange-700 '
                        >
                          {removingProductId === product.product._id ? (
                            <div className='w-5 h-5 border-2 border-orange-500 border-t-transparent animate-spin rounded-full'></div>
                          ) : (
                            <i className='fa-solid fa-trash-can text-xl'></i>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </_motion.tbody>
              </table>
            </div>
            <div className='flex justify-end mr-6 mt-10'>
              <button
                onClick={deleteAll}
                className='cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 min-w-[120px] justify-center'
                disabled={deletingAll}
              >
                {deletingAll ? (
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
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <i className='fa-solid fa-trash-can'></i> Delete all
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

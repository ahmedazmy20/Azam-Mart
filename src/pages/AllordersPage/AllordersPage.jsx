import React, { useContext, useState, useEffect } from "react";
import { OrderContext } from "../../Context/Order/OrderContext";

export default function AllordersPage() {
  const [allorders, setallorders] = useState([]);
  const { getUserOrder } = useContext(OrderContext);

  async function handeAllOrders() {
    try {
      const { data } = await getUserOrder();
      setallorders(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    handeAllOrders();
  }, []);

  return (
    <>
      <div className='container mx-auto px-4 py-10 min-h-screen'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>
          🧾 Your Orders
        </h2>

        {allorders.length === 0 ? (
          <p className='text-center text-gray-500'>No orders yet.</p>
        ) : (
          allorders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className='bg-white shadow-lg rounded-2xl p-6 mb-6 border border-gray-100'
            >
              <div className='mb-4 flex justify-between items-center'>
                <h3 className='text-xl font-semibold text-gray-700'>
                  Order : {orderIndex + 1}
                </h3>
                <span className='text-sm px-3 py-1 rounded-full bg-green-100 text-green-700'>
                  {order.paymentMethodType}
                </span>
              </div>
              <div className='space-y-4'>
                {order.cartItems.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className='flex flex-col sm:flex-row gap-4 items-start sm:items-center border-b border-gray-100 pb-4'
                  >
                    <img
                      className='w-20 h-20 rounded object-cover'
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />
                    <div className='flex-1'>
                      <h4 className='font-medium text-gray-800 mb-1'>
                        {item.product.title.split(" ").slice(0, 3).join(" ")}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        Quantity: {item.count}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Price: {item.price} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-6 flex justify-between text-sm text-gray-600'>
                <p>
                  <span className='font-semibold'>Total Price:</span>{" "}
                  {order.totalOrderPrice} EGP
                </p>
                <p>
                  <span className='font-semibold'>Shipping Address:</span>{" "}
                  {order.shippingAddress?.details}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

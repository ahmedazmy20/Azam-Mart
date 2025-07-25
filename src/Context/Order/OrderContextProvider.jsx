import axios from "axios";
import { OrderContext } from "./OrderContext";
import { useEffect } from "react";

export default function OrderContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  //   const { ownerId } = useContext(CartContext);
  function getUserOrder() {
    const userId = localStorage.getItem("userId"); // ✅ Get userId from localStorage

    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => {
        return res;
      })
      .catch((err) => err);
  }

  async function checkout(cartId, url, formData) {

    console.log('url from checkout' , url);
    
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        shippingAddress: formData,
      },
      {
        headers,
      }
    );
  }

  useEffect(() => {
    getUserOrder();
  }, []);
  return (
    <OrderContext.Provider value={{ checkout, getUserOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

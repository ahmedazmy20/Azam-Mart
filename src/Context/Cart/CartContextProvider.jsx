import { useEffect } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";
import { useState } from "react";

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const [cartId, setCartId] = useState(null)
  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function getCartProducts() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setCartId(res.data.cartId)
        // console.log("res", res.data.cartId);
        return res;
      })
      .catch((err) => err);
  }
  function updateProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  function deleteAllCartItems() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function checkout(cartId, url, formData) {
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      {
        shippingAddress: formData,
      },
      {
        headers,
      }
    );
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCartProducts();
  }, []);
  return (
    <CartContext.Provider
      value={{
        updateProductQuantity,
        addProductToCart,
        getCartProducts,
        removeCartItem,
        deleteAllCartItems,
        checkout,
        cartId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

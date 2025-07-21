import { CartContext } from "./CartContext";
import axios from "axios";

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };
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
      .then((res) => res)
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


  return (
    <CartContext.Provider
      value={{
        updateProductQuantity,
        addProductToCart,
        getCartProducts,
        removeCartItem,
        deleteAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import axios from "axios";
import { WishlistContext } from "./WishlistContext";

export default function WishlistContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  function addProductToWishlist(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
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

  function getWishlistProducts() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  function removeWishlistItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <WishlistContext.Provider
      value={{ addProductToWishlist, getWishlistProducts, removeWishlistItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

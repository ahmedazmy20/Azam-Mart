import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const productdetails = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    // select: (data) => data?.data.data.filter((item) => item.category.name === "Electronics" || item.category.name === "Men's Fashion"),
  });

  return productdetails;
}

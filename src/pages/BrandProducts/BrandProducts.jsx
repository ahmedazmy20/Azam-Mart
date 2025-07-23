import React from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import ProductsList from "../../components/Products/ProductsList";

export default function BrandProducts() {
  const { id } = useParams(); // ID الخاص بالبراند
  const { data, isLoading, isError } = useProducts();

  const products = data?.data?.data || [];

  const filteredProducts = products.filter(
    (product) => product.brand?._id === id
  );

  if (isLoading)
    return (
      <div className='fixed z-50 bg-white md:top-16 left-0 w-full h-full flex justify-center items-center'>
        <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
      </div>
    );

  if (isError)
    return (
      <div className='text-center text-red-600 font-semibold mt-20'>
        Failed to load products.
      </div>
    );

  return (
    <div className='container mx-auto px-4 py-10 min-h-screen'>
      <h2 className='text-2xl font-bold mb-6 text-center'>Products by Brand</h2>
      {filteredProducts.length === 0 ? (
        <div className='text-center text-gray-500 mt-20'>
          <p className='text-lg mt-4'>No products found for this brand.</p>
        </div>
      ) : (
        <>
          <ProductsList products={filteredProducts} />
        </>
      )}
    </div>
  );
}

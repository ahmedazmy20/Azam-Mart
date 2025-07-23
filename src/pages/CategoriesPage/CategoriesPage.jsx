import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../apis/categories";
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white'>
        <div className='animate-spin rounded-full h-24 w-24 border-b-4 border-gray-900'></div>
      </div>
    );
  }
  if (error) return <p>Error loading categories</p>;

  return (
    <>
      <h2 className="text-2xl font-bold text-center mt-6">All Categories</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
        {data.data.data.map((category) => (
          <div
            key={category._id}
            onClick={() =>
              navigate(`/categories/${category._id}/${category.name}`)
            }
            className='shadow-blue-600 shadow hover:shadow-lg transition-all duration-300 cursor-pointer p-3 rounded text-center'
          >
            <img
              className='w-full h-40 object-contain mb-2'
              src={category.image}
              alt={category.name}
            />
            <h3 className='text-lg font-semibold'>{category.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

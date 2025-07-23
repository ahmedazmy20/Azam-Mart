import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../apis/categories";
import { useNavigate } from "react-router-dom";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories</p>;

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
      {data.data.data.map((category) => (
        <div
          key={category._id}
          onClick={() =>
            navigate(`/categories/${category._id}/${category.name}`)
          }
          className='shadow-blue-600 border hover:shadow-lg transition-all duration-300 cursor-pointer p-3 rounded text-center'
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
  );
}

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../apis/categories";
import { useNavigate } from "react-router-dom";
import { motion as _motion } from "framer-motion";

export default function CategoriesPage() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1, // stagger animation
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

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
      <h2 className='text-2xl font-bold text-center my-6'>All Categories</h2>
      <_motion.div
        className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'
        variants={containerVariants}
        initial='hidden'
        animate='show'
      >
        {data.data.data.map((category) => (
          <_motion.div
            variants={cardVariants}
            key={category._id}
            onClick={() =>
              navigate(`/categories/${category._id}/${category.name}`)
            }
            className='shadow-blue-600 shadow hover:shadow-lg transition-all duration-300 cursor-pointer p-3 rounded text-center'
          >
            <_motion.img
              variants={imageVariants}
              className='w-full h-40 object-contain mb-2'
              src={category.image}
              alt={category.name}
            />
            <_motion.h3
              variants={textVariants}
              className='text-lg font-semibold'
            >
              {category.name}
            </_motion.h3>
          </_motion.div>
        ))}
      </_motion.div>
    </>
  );
}

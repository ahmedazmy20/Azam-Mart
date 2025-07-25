import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/CartPage/CartPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import BrandsPage from "./pages/BrandsPage/BrandsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import NotfoundPage from "./pages/NotfoundPage/NotfoundPage";
import ForgotPassword from "./pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UserContextProvider from "./Context/User/UserContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./Context/Cart/CartContextProvider";
import { ToastContainer } from "react-toastify";
import CategoryProductsPage from "./pages/CategoryProductsPage/CategoryProductsPage";
import BrandProducts from "./pages/BrandProducts/BrandProducts";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import WishlistContextProvider from "./Context/Wishlist/WishlistContextProvider";
import ShippingPage from "./pages/ShippingPage/ShippingPage";
import AllordersPage from "./pages/AllordersPage/AllordersPage";
import OrderContextProvider from "./Context/Order/OrderContextProvider";

function App() {
  const queryClient = new QueryClient();
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:category",
          element: (
            <ProtectedRoute>
              <ProductDetailsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories/:id/:name",
          element: (
            <ProtectedRoute>
              <CategoryProductsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <BrandsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands/:id",
          element: (
            <ProtectedRoute>
              <BrandProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "shipping",
          element: (
            <ProtectedRoute>
              <ShippingPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllordersPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "verify-code",
          element: <VerifyCode />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "*",
          element: <NotfoundPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          <CartContextProvider>
            <WishlistContextProvider>
              <OrderContextProvider>
                <RouterProvider router={router}></RouterProvider>
              </OrderContextProvider>
            </WishlistContextProvider>
            <ToastContainer />
          </CartContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

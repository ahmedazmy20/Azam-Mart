import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import QuickView from "../../pages/QuickView/QuickView";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Layout() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <>
    <ScrollToTop />
      <Navbar />
      <div className='container mx-auto py-14 md:py-10'>
        <Outlet context={{ setQuickViewProduct }} />
      </div>
      <Footer />
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}

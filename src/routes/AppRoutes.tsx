
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LightSwitch from "@/components/LightSwitch";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import Product from "@/pages/Product";
import About from "@/pages/About";
import NotFound from "@/pages/NotFound";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const AppRoutes = () => {
  // Use the scroll to top hook with default options
  useScrollToTop();
  
  return (
    <>
      <Navbar />
      <LightSwitch />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;

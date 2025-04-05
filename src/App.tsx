
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Product from "./pages/Product";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Marketing from "./pages/Marketing";
import RainEffect from "./components/RainEffect";
import ContactTab from "./components/ContactTab";
import { LightProvider } from "./context/LightProvider";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import LightSwitch from "./components/LightSwitch";
import { useScrollToTop } from "./hooks/useScrollToTop";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <LightSwitch />
      <ContactTab />
      <main className="transition-all duration-500 content-visibility">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LightProvider>
          <CartProvider>
            <style>
              {`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                
                .animate-fade-in {
                  animation: fadeIn 0.8s ease-in-out forwards;
                }
                
                @keyframes slideIn {
                  from { transform: translateY(20px); opacity: 0; }
                  to { transform: translateY(0); opacity: 1; }
                }
                
                .animate-slide-in {
                  animation: slideIn 0.8s ease-out forwards;
                }
                
                .content-reveal .reveal-item {
                  animation: fadeIn 1.5s ease forwards;
                }
              `}
            </style>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RainEffect />
              <AppRoutes />
            </BrowserRouter>
          </CartProvider>
        </LightProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

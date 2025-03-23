
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Product from "./pages/Product";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import RainEffect from "./components/RainEffect";
import { LightProvider } from "./context/LightProvider";
import LightSwitch from "./components/LightSwitch";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LightProvider>
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
      </LightProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

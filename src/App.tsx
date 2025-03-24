
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import RainEffect from "./components/RainEffect";
import { LightProvider } from "./context/LightProvider";
import ToastProvider from "./components/providers/ToastProvider";
import AppRoutes from "./routes/AppRoutes";

// Create a client for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

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
        <ToastProvider>
          <BrowserRouter>
            <RainEffect />
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </LightProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

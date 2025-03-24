
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import RainEffect from "./components/RainEffect";
import { LightProvider } from "./context/LightProvider";
import ToastProvider from "./components/providers/ToastProvider";
import AppRoutes from "./routes/AppRoutes";

// Create a client for react-query with simpler configuration
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
              animation: fadeIn 0.5s ease-in forwards;
            }
            
            @keyframes slideIn {
              from { transform: translateY(10px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            
            .animate-slide-in {
              animation: slideIn 0.5s ease-out forwards;
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

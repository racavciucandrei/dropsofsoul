
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
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
        <ToastProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ToastProvider>
      </LightProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

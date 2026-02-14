import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { FAQPage } from "@/components/FAQPage";
import { ContactPage } from "@/components/ContactPage";
import { ProfilePage } from "@/components/ProfilePage";
import { SignUpPage } from "@/components/SignUpPage";
import { SignInPage } from "@/components/SignInPage";
import { PhotoCapturePage } from "@/pages/PhotoCapturePage";
import { DocumentTypePage } from "@/pages/DocumentTypePage";
import { PhotoVariationsPage } from "@/pages/PhotoVariationsPage";
import { DeliveryConfirmationPage } from "@/pages/DeliveryConfirmationPage";
import { SuccessPageRoute } from "@/pages/SuccessPageRoute";

const queryClient = new QueryClient();

const getBasePath = () => {
  // Check if we're in preview mode (different port) or production
  const isPreview = window.location.port !== '8080' && window.location.port !== '5173';
  const isProduction = import.meta.env.MODE === "production";
  
  if (isProduction) {
    return "/photoai-beta";
  } else if (isPreview) {
    return ""; // Preview should use root path
  } else {
    return ""; // Development uses root path
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={getBasePath()}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/unauthorized" element={<NotFound />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          
          {/* Photo flow routes */}
          <Route path="/photo-capture" element={<PhotoCapturePage />} />
          <Route path="/document-type" element={<DocumentTypePage />} />
          <Route path="/photo-variations" element={<PhotoVariationsPage />} />
          <Route path="/delivery-confirmation" element={<DeliveryConfirmationPage />} />
          <Route path="/success" element={<SuccessPageRoute />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

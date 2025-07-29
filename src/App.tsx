import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Compose from "./pages/Compose";
import SelectComposition from "./pages/SelectComposition";
import VoiceRecording from "./pages/VoiceRecording";
import InstrumentSelection from "./pages/InstrumentSelection";
import FinalizeComposition from "./pages/FinalizeComposition";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compose" element={<Compose />} />
          <Route path="/select-composition" element={<SelectComposition />} />
          <Route path="/voice-recording" element={<VoiceRecording />} />
          <Route path="/instrument-selection" element={<InstrumentSelection />} />
          <Route path="/finalize-composition" element={<FinalizeComposition />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

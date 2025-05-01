import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Facilities from "./pages/Facilities";
import FacilityDetail from "./pages/FacilityDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminCalendar from "./pages/admin/AdminCalendar";
import AdminLayout from "./components/layout/AdminLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  console.log("🚀 App.tsx rendering...");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<><Home /><p>🏠 Home route matched</p></>} />
            <Route path="/login" element={<><Login /><p>🔐 Login route matched</p></>} />
            <Route path="/register" element={<><Register /><p>📝 Register route matched</p></>} />
            <Route path="/facilities" element={<><Facilities /><p>🏟️ Facilities route matched</p></>} />
            <Route path="/facilities/:id" element={<><FacilityDetail /><p>🔍 FacilityDetail route matched</p></>} />
            <Route path="/about" element={<><About /><p>ℹ️ About route matched</p></>} />

            <Route path="/test" element={<div>✅ Test route OK</div>} />

            <Route
              path="/admin"
              element={
                (() => {
                  console.log("🔐 ProtectedRoute /admin rendering");
                  return (
                    <ProtectedRoute requiredRole="admin">
                      <AdminLayout />
                    </ProtectedRoute>
                  );
                })()
              }
            >
              <Route index element={<AdminCalendar />} />
              <Route path="calendar" element={<AdminCalendar />} />
            </Route>


            <Route path="*" element={<><NotFound /><p>❌ NotFound route matched</p></>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;

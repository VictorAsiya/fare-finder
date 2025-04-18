
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { StrictMode } from "react";

// User pages
import Index from "./pages/Index";
import Compare from "./pages/Compare";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ViewSelection from "./pages/ViewSelection";

// Company pages
import CompanyDashboard from "./pages/company/Dashboard";
import ManageFares from "./pages/company/ManageFares";
import PriceHistory from "./pages/company/PriceHistory";
import CompanyAnalytics from "./pages/company/Analytics";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminManageFares from "./pages/admin/ManageFares";
import CompanyManagement from "./pages/admin/CompanyManagement";
import UserReports from "./pages/admin/UserReports";
import AdminAnalytics from "./pages/admin/Analytics";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Check if we're on a login or register page
const isAuthPage = (pathname: string) => {
  return pathname === "/login" || pathname === "/register" || pathname === "/view-selection";
};

// Create a layout component to handle the conditional rendering
const AppLayout = () => {
  const location = useLocation();
  
  if (isAuthPage(location.pathname)) {
    // Render authentication pages without sidebar
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view-selection" element={<ViewSelection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
  
  // Render app pages with sidebar
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-2xl font-bold">Go Fare</h1>
              </div>
              <Navbar />
            </div>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/report" element={<Report />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Company Routes */}
              <Route path="/company/dashboard" element={<CompanyDashboard />} />
              <Route path="/company/manage-fares" element={<ManageFares />} />
              <Route path="/company/price-history" element={<PriceHistory />} />
              <Route path="/company/analytics" element={<CompanyAnalytics />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-fares" element={<AdminManageFares />} />
              <Route path="/admin/company-management" element={<CompanyManagement />} />
              <Route path="/admin/user-reports" element={<UserReports />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;

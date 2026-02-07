import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import EmployeesPage from "./pages/EmployeesPage";
import InventoryPage from "./pages/InventoryPage";
import TasksPage from "./pages/TasksPage";
import CompanyPage from "./pages/CompanyPage";
import NotFound from "./pages/NotFound";
import ForgotPassword from "@/pages/ForgotPassword";

import RoleProtectedRoute from "@/routes/RoleProtectedRoute";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* ROOT */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PROTECTED + ROLE BASED ROUTES */}

      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute path="/dashboard">
            <DashboardPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <RoleProtectedRoute path="/projects">
            <ProjectsPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/employees"
        element={
          <RoleProtectedRoute path="/employees">
            <EmployeesPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={
          <RoleProtectedRoute path="/inventory">
            <InventoryPage />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <RoleProtectedRoute path="/tasks">
            <TasksPage />
          </RoleProtectedRoute>
        }
      />

      {/* ✅ FIXED ABOUT ROUTE */}
      <Route
        path="/about"
        element={
          <RoleProtectedRoute path="/about">
            <CompanyPage />
          </RoleProtectedRoute>
        }
      />

      {/* NOT FOUND */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

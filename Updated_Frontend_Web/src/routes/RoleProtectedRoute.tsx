import { Navigate } from "react-router-dom";
import roleAccess from "@/config/roleAccess";

import { useAuth } from "@/contexts/AuthContext";

interface Props {
  path: string;
  children: JSX.Element;
}

export default function RoleProtectedRoute({ path, children }: Props) {
  const { isAuthenticated } = useAuth();

  // 🔐 Step 1: auth check
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Step 2: role must come from persistent storage
  const role = localStorage.getItem("role")?.toUpperCase();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // 🔐 Step 3: role access check
  const allowedPaths = roleAccess[role];

  const hasAccess = allowedPaths.some(
    (allowed) => path === allowed || path.startsWith(allowed + "/"),
  );

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type UserRole = "admin" | "manager" | "staff";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: any) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Restore auth ONCE
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // ✅ LOGIN (backend role OR frontend role supported)
  const login = async (userData: any): Promise<boolean> => {
    const normalizedRole = userData.role.toLowerCase() as UserRole;

    const normalizedUser: User = {
      id: userData.id ?? userData.userId ?? "",
      name: userData.name,
      email: userData.email,
      role: normalizedRole,
      avatar: userData.avatar,
    };

    setUser(normalizedUser);

    localStorage.setItem("auth_user", JSON.stringify(normalizedUser));
    localStorage.setItem("role", normalizedRole);
    localStorage.setItem("token", userData.token);

    console.log("LOGIN SUCCESS:", normalizedUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HardHat, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { loginApi } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const roleDescriptions: Record<UserRole, string> = {
  admin: "Full access to all features and settings",
  manager: "Manage projects, employees, and view reports",
  staff: "View assigned tasks and update progress",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Backend API call
      const res = await loginApi({
        email,
        password,
      });

      if (res.status !== 200 || res.data?.error) {
        throw new Error("Invalid credentials");
      }

      // ✅ Save token
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Normalize backend role → frontend role
      const backendRole = res.data.role; // ADMIN | MANAGER | EMPLOYEE

      const mappedRole: UserRole =
        backendRole === "ADMIN"
          ? "admin"
          : backendRole === "MANAGER"
            ? "manager"
            : "staff";

      // ✅ Build user object from backend
      const user = {
        id: String(res.data.user?.id || Date.now()),
        name: res.data.user?.name || email,
        email,
        role: mappedRole,
      };

      // ✅ Update AuthContext
      await login(user);

      toast({
        title: "Welcome back!",
        description: "Login successful",
      });

      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-glow animate-pulse-glow">
                <HardHat className="w-9 h-9 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">CONSTRUCT</h1>
                <p className="text-lg text-primary-foreground/60 tracking-[0.3em] font-medium">
                  EDGE
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Build Smarter.
              <br />
              <span className="text-accent">Manage Better.</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
              The complete construction management platform that brings your
              projects, teams, and resources together in one powerful system.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-6 lg:p-12"
      >
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access your construction management dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection (visual only now) */}
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <Tabs
                    value={selectedRole}
                    onValueChange={(v) => setSelectedRole(v as UserRole)}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3 h-12">
                      <TabsTrigger value="admin">Admin</TabsTrigger>
                      <TabsTrigger value="manager">Manager</TabsTrigger>
                      <TabsTrigger value="staff">Staff</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {roleDescriptions[selectedRole]}
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Forgot Password */}
                <p
                  className="text-sm text-center text-accent cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </p>

                <p className="text-sm text-center text-muted-foreground">
                  Don’t have an account?{" "}
                  <span
                    className="text-accent font-medium cursor-pointer hover:underline"
                    onClick={() => navigate("/register")}
                  >
                    Create Account
                  </span>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

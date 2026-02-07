import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HardHat, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";

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
import { useToast } from "@/hooks/use-toast";
import { registerApi } from "@/services/api";

type RoleRegister = "ADMIN" | "MANAGER" | "EMPLOYEE";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleRegister>("EMPLOYEE");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerApi({
        name,
        email,
        password,
        role, // ✅ selected role
      });

      toast({
        title: "Registration successful 🎉",
        description: "Your account has been created. Please sign in.",
      });

      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (err: any) {
      toast({
        title: "Registration failed ❌",
        description:
          err?.response?.data?.error ||
          "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* ================= LEFT PANEL ================= */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-glow">
              <HardHat className="w-9 h-9 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">CONSTRUCT</h1>
              <p className="text-lg text-primary-foreground/60 tracking-[0.3em] font-medium">
                COMPASS
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-3">
            Create your account
            <br />
            <span className="text-accent">Get started</span>
          </h2>

          <p className="text-lg text-primary-foreground/80 max-w-md leading-relaxed">
            Join Construct Compass to manage your projects, teams, and resources
            in one place.
          </p>
        </div>
      </motion.div>

      {/* ================= RIGHT PANEL ================= */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-6 lg:p-12"
      >
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">
                Create Account
              </CardTitle>
              <CardDescription>
                Sign up to get started with Construction Compass
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={submit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
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
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>Select Role</Label>
                  <Tabs
                    value={role}
                    onValueChange={(v) => setRole(v as RoleRegister)}
                  >
                    <TabsList className="grid grid-cols-3 h-12">
                      <TabsTrigger value="ADMIN">Admin</TabsTrigger>
                      <TabsTrigger value="MANAGER">Manager</TabsTrigger>
                      <TabsTrigger value="EMPLOYEE">Employee</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Login link */}
                <p className="text-sm text-center text-muted-foreground">
                  Already have an account?{" "}
                  <span
                    className="text-accent cursor-pointer font-medium"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
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

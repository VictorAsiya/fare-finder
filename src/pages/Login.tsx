import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

// Nigeria flag colors
const nigeriaGreen = "bg-[#008751]";
const nigeriaGreenHover = "hover:bg-[#006b40]";
const nigeriaGreenText = "text-[#008751]";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [role, setRole] = useState<"regular" | "company" | "admin">("regular");

  const [load, setLoading] = useState(false);


  // Get the selected role from sessionStorage on component mount
  useEffect(() => {
    const selectedRole = (sessionStorage.getItem("selectedRole") as
    | "regular"
    | "company"
    | "admin"
    | null) || localStorage.getItem("user_type");
    if (
      selectedRole === "admin" ||
      selectedRole === "company" ||
      selectedRole === "regular"
    ) {
      setRole(selectedRole);
      sessionStorage.setItem("selectedRole", selectedRole); // Keep sessionStorage synced
    } else {
      // If no role is selected, redirect to view selection page
      navigate("/login");
      // alert("Please select a role to login");
    }
  }, [navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login submitted:", data, "Role:", role);
    localStorage.setItem("user_type", role);

    setLoading(true);

    // Prepare payload
    const payload = {
      email: data.email,
      password: data.password,
      role, // Send the selected role along with the credentials
    };

    try {
      // Make the API request to your backend
      const response = await fetch(
        "https://gofare.onrender.com/api/users/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        // If login is successful, store the token and navigate
        localStorage.setItem("token", responseData.token); // Store token (JWT or session ID)
        toast({
          title: `${
            role.charAt(0).toUpperCase() + role.slice(1)
          } login successful`,
          description: `Welcome to Go Fare ${role} portal`,
        });
        setLoading(false);

        // Navigate based on the role
        setTimeout(() => {
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else if (role === "company") {
            navigate("/company/dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      } else {
        // If login fails, show the error message from the API
        toast({
          title: "Login failed",
          description: responseData.message || "Invalid credentials",
          variant: "destructive",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An error occurred while logging in. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Role-specific titles and descriptions
  const getRoleSpecificContent = () => {
    switch (role) {
      case "admin":
        return {
          title: "Admin Login",
          description: "Access the administration portal for Go Fare",
        };
      case "company":
        return {
          title: "Company Login",
          description: "Manage your transportation company on Go Fare",
        };
      default:
        return {
          title: "User Login",
          description: "Sign in to access transport fare updates across Enugu",
        };
    }
  };

  const { title, description } = getRoleSpecificContent();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Nigeria flag colors as accent bars */}
        <div className="flex mb-6">
          <div className="w-1/3 h-2 bg-[#008751]"></div>
          <div className="w-1/3 h-2 bg-white"></div>
          <div className="w-1/3 h-2 bg-[#008751]"></div>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/view-selection")}
                className="text-muted-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to view selection</span>
              </Button>
              <h1 className="text-3xl font-bold text-center text-primary flex-1">
                Go Fare
              </h1>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {title}
            </CardTitle>
            <CardDescription className="text-center">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="name@example.com"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10 text-muted-foreground"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!load && (
                  <Button
                    type="submit"
                    className={`w-full ${nigeriaGreen} ${nigeriaGreenHover}`}
                  >
                    Sign In
                  </Button>
                )}

                {/* Loading Overlay */}
                {load && (
                  <div className="top-[-10vh] fixed inset-0  z-10 bg-black bg-opacity-50 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                  </div>
                )}

                {load && (
                  <Button
                    type="submit"
                    disabled
                    className={`w-full bg-[#2963f5]`}
                  >
                    Loading...
                  </Button>
                )}
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              <a href="#" className={`${nigeriaGreenText} hover:underline`}>
                Forgot your password?
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`${nigeriaGreenText} font-semibold hover:underline`}
              >
                Sign up
              </Link>
            </div>

            <div className="text-center text-xs text-muted-foreground mt-4">
              By signing in, you agree to our Terms and Privacy Policy
            </div>

            <div className="text-center text-xs">
              <span className="text-muted-foreground">Fare prices in</span>{" "}
              <span className="font-medium">Nigerian Naira (₦)</span>
            </div>
          </CardFooter>
        </Card>

        {/* Nigeria flag colors as accent bars */}
        <div className="flex mt-6">
          <div className="w-1/3 h-2 bg-[#008751]"></div>
          <div className="w-1/3 h-2 bg-white"></div>
          <div className="w-1/3 h-2 bg-[#008751]"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

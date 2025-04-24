import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/ui/select-Input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone } from "lucide-react";
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

// Nigeria flag colors
const nigeriaGreen = "bg-[#008751]";
const nigeriaGreenHover = "hover:bg-[#006b40]";
const nigeriaGreenText = "text-[#008751]";

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z.string().min(11, { message: "Please enter a valid phone number" }),
    location: z.string().min(2, { message: "Location is required" }),
    user_type: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "Enugu",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(false); 

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
      user_type: data.user_type,
      phone_number: data.phone,
      location: data.location,
    };

    try {
      const response = await fetch(
        "https://gofare.onrender.com/api/users/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Check for detailed validation errors or fallback message
        const message =
          result?.detail ||
          result?.message ||
          Object.values(result || {})?.[0] ||
          "Something went wrong. Please try again.";

        throw new Error(message);
      }

      // Save token if available
      if (result?.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user_type", result.user_type)

      }

      console.log("Registered:", result);
      navigate("/login");
    } catch (err: any) {
      const friendlyError = err?.message || "Network error. Please try again.";
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };


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
            <div className="flex items-center justify-center mb-2">
              <h1 className="text-3xl font-bold text-center text-primary">
                Go Fare
              </h1>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Sign up to track transport fares in Enugu
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="John Doe"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="080xxxxxxxx"
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder="Enugu"
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
                  name="user_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User-type</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <SelectInput
                            {...field}
                            value={field.value}
                            // onChange={field.onChange}
                            options={[
                              { label: "regular", value: "regular" },
                              { label: "Company", value: "company_user" },
                              { label: "Admin", value: "admin" },
                            ]}
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="pl-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10 text-muted-foreground"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {showConfirmPassword ? (
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

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-1">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I agree to the{" "}
                          <a
                            href="#"
                            className={`${nigeriaGreenText} hover:underline`}
                          >
                            terms and conditions
                          </a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

{!loading && (
                  <Button
                    type="submit"
                    className={`w-full ${nigeriaGreen} ${nigeriaGreenHover}`}
                  >
                    Create Account
                  </Button>
                )}

                {/* Loading Overlay */}
                {loading && (
                  <div className="top-[-10vh] fixed inset-0  z-10 bg-black bg-opacity-50 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 text-white animate-spin" />
                  </div>
                )}

                {loading && (
                  <Button
                    type="submit"
                    disabled
                    className={`w-full bg-[#2963f5]`}
                  >
                    Loading...
                  </Button>
                )}

                {error && (
                  <div className="text-red-500 text-sm text-center mb-4">
                    {error}
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className={`${nigeriaGreenText} font-semibold hover:underline`}
              >
                Sign in
              </Link>
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

export default Register;

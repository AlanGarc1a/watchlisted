"use client";
import Link from "next/link";
import TextField from "../molecules/TextField";
import GoogleIcon from "../ui/icons/GoogleIcon";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/discover",
        redirect: false,
      });

      if (signInResult?.error) {
        setServerError(
          "Registration successful but login failed. Please log in manually.",
        );
        router.push("/login");
        return;
      }

      router.push("/discover");
    } catch (error) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-deep p-8 rounded-lg w-full max-w-md">
      <div className="text-center mb-6 space-y-1">
        <p className="text-primary text-2xl font-semibold">
          Create your account
        </p>
        <p className="text-muted text-sm">
          Start tracking what you watch in seconds
        </p>
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/discover" })}
        className="flex items-center justify-center gap-2 w-full py-2 border border-raised rounded-lg mb-4 bg-muted/15 cursor-pointer hover:bg-raised transition-colors"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-raised" />
        <span className="text-muted text-xs">or sign up with email</span>
        <div className="flex-1 h-px bg-raised" />
      </div>

      {/* Server error */}
      {serverError && (
        <p className="text-brand border border-brand/30 bg-brand/15 rounded-lg p-2 mb-4 text-sm">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Full name"
          type="text"
          id="name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          label="Email"
          type="email"
          id="email"
          placeholder="john@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          id="password"
          placeholder="Min. 8 characters"
          error={errors.password?.message}
          {...register("password")}
        />
        <TextField
          label="Confirm password"
          type="password"
          id="confirmPassword"
          placeholder="Repeat your password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-brand text-white rounded-lg hover:bg-rose transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-sm text-muted text-center mt-4">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="text-violet hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-violet hover:underline">
          Privacy Policy
        </Link>
      </p>

      <p className="text-sm text-muted text-center mt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-brand hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

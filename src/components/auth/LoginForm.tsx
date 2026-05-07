"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from "../molecules/TextField";
import GoogleIcon from "../ui/icons/GoogleIcon";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setServerError("Incorrect email or password. Please try again.");
      return;
    }

    router.push("/discover");
  };

  return (
    <div className="bg-deep p-8 rounded-lg w-full max-w-md">
      <div className="text-center mb-6 space-y-1">
        <p className="text-2xl font-bold text-primary">Welcome back</p>
        <p className="text-muted text-sm">Log in to your account</p>
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
        <span className="text-muted text-xs">or log in with email</span>
        <div className="flex-1 h-px bg-raised" />
      </div>

      {serverError && (
        <p className="text-brand border border-brand/30 bg-brand/15 rounded-lg p-2 mb-4 text-sm">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Your password"
          error={errors.password?.message}
          rightLabel={
            <Link
              href="/forgot-password"
              className="text-sm text-violet hover:underline"
            >
              Forgot password?
            </Link>
          }
          {...register("password")}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-brand text-white rounded-lg hover:bg-rose transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-center text-muted mt-4 text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-brand hover:underline">
          Sign up free
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

"use client";
import Link from "next/link";
import GoogleIcon from "../ui/icons/GoogleIcon";
import TextField from "../molecules/TextField";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  return (
    <div className="bg-deep p-8 rounded-lg">
      <form className="max-w-md mx-auto mb-4">
        <div className="text-center mb-4 space-y-2">
          <p>Welcome Back</p>
        </div>
        <div>
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full py-2 border border-raised rounded-lg mb-4 bg-muted/15 cursor-pointer"
            onClick={() => signIn("google", { callbackUrl: "/discover" })}
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-raised" />
            <span className="text-muted text-sm">or log in with email</span>
            <div className="flex-1 h-px bg-raised" />
          </div>
        </div>
        <p className="text-brand border border-brand/30 bg-brand/15 rounded-lg p-2 mb-4 text-sm">
          Incorrect email or password. Please try again.
        </p>
        <TextField
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="joe@example.com"
        />
        <div>
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            rightLabel={
              <Link
                href="/forgot-password"
                className="text-sm text-violet hover:underline"
              >
                Forgot password?
              </Link>
            }
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-brand text-white rounded-lg"
        >
          {" "}
          Log in
        </button>
      </form>
      <p className="text-center text-muted mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-sm text-brand hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;

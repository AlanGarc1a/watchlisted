"use client";
import Link from "next/link";
import TextField from "../molecules/TextField";
import GoogleIcon from "../ui/icons/GoogleIcon";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  return (
    <div className="bg-deep p-8 rounded-lg">
      <form className="max-w-md mx-auto mb-4 space-y-2">
        <div className="text-center mb-4 space-y-2">
          <p className="text-primary text-2xl font-semibold">
            Create your account
          </p>
          <p className="text-muted text-sm">
            Start tracking what you watch in seconds
          </p>
        </div>
        <div>
          <button
            className="flex items-center justify-center gap-2 w-full py-2 border border-raised rounded-lg mb-4 bg-muted/15"
            onClick={() => signIn("google", { callbackUrl: "/discover" })}
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-raised" />
            <span className="text-xs text-muted">or sign up with email</span>
            <div className="flex-1 h-px bg-raised" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="First name"
            type="text"
            id="first-name"
            name="first-name"
            placeholder="Joe"
          />
          <TextField
            label="Last name"
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Doe"
          />
        </div>
        <TextField
          label="Username"
          type="text"
          id="username"
          name="username"
          placeholder="joe_doe"
        />
        <div className="mb-4">
          <TextField
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="joe@example.com"
          />
          <span className="text-sm text-muted">
            This is how friends will find you
          </span>
        </div>
        <TextField
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <TextField
          label="Confirm Password"
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Confirm Password"
        />
        <span className="text-xs text-brand">Passwords don't match</span>
        <button
          type="submit"
          className="w-full py-2 bg-brand text-white rounded-lg"
        >
          Create Account
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
      <p className="text-sm text-muted text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-sm text-brand hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;

// src/app/(auth)/login/page.tsx
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <span className="text-2xl font-bold">
          Watch<span className="text-brand">listed</span>
        </span>
      </div>
      <LoginForm />
    </div>
  );
};
export default LoginPage;

import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <span className="text-2xl font-bold">
          Watch<span className="text-brand">listed</span>
        </span>
      </div>
      <RegisterForm />
    </div>
  );
}

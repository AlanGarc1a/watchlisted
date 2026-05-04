// src/app/(auth)/layout.tsx
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center px-4">
      {children}
    </div>
  );
};
export default AuthLayout;

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;

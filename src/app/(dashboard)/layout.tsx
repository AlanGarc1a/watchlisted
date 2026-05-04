import NavBar from "@/components/layout/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <main className="grid grid-cols-[1fr_min(1280px,100%)_1fr] py-6">
        <div className="col-start-2 px-4 md:px-8">{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;

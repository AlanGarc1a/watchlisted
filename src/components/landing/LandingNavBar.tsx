import Link from "next/link";

const LandingNavBar = () => {
  return (
    <nav className="border-b border-raised bg-deep">
      <div className="grid grid-cols-[1fr_min(1280px,100%)_1fr]">
        <div className="col-start-2 px-4 md:px-8 h-14 flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            Watch<span className="text-brand">listed</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-brand text-white text-sm rounded-md py-2 px-4 hover:bg-rose transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavBar;

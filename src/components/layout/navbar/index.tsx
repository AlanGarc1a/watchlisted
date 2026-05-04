"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import NavLinks from "./navlinks";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-raised bg-deep">
      <div className="flex justify-between items-center px-6 h-14">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
          Watch<span className="text-brand">listed</span>
        </Link>

        {/* Desktop links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
        </div>

        {/* Hamburger button — visible on mobile only */}
        <button
          className="md:hidden text-muted hover:text-primary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown — only renders when isOpen is true */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-raised bg-deep">
          <NavLinks mobile />
        </div>
      )}
    </nav>
  );
};

export default NavBar;

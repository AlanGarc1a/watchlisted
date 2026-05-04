"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./navbar/navlinks";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden text-muted hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 py-4 border-t border-raised bg-deep">
          <NavLinks mobile />
        </div>
      )}
    </>
  );
};

export default MobileMenu;

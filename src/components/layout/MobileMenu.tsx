"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import NavLinks from "./navbar/navlinks";
import ProfileCard from "../shared/ProfileCard";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const close = () => setIsOpen(false);

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
        <div className="md:hidden flex flex-col gap-1 px-6 py-4 border-t border-raised bg-deep">
          {/* Nav links */}
          <NavLinks mobile onLinkClick={close} />

          {/* User section — only when logged in */}
          {status === "authenticated" && session && (
            <>
              <div className="border-t border-raised mt-2 pt-4 flex items-center gap-3">
                <ProfileCard name={session.user.name ?? null} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-primary truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                onClick={close}
                className="text-sm text-muted hover:text-primary transition-colors py-2"
              >
                My profile
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm text-brand hover:text-rose transition-colors py-2 text-left"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MobileMenu;

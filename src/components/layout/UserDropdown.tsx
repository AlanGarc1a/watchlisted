"use client";
import { useEffect, useState, useRef } from "react";
import ProfileCard from "../shared/ProfileCard";
import { signOut } from "next-auth/react";
import Link from "next/link";

type UserDropdownProps = {
  name: string;
  email: string;
  image?: string;
};

const UserDropdown = ({ name, email }: UserDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <ProfileCard name={name} size="sm" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-deep border border-raised rounded-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-raised">
            <p className="text-sm font-semibold text-primary truncate">
              {name}
            </p>
            <p className="text-xs text-muted truncate">{email}</p>
          </div>
          <div className="py-1 border-b border-raised">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:text-primary hover:bg-raised transition-colors w-full"
              onClick={() => setIsOpen(false)}
            >
              My profile
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-4 py-2 text-sm text-brand hover:bg-brand/10 transition-colors w-full text-left"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

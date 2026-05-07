"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "../../UserDropdown";

type NavLink = {
  id: number;
  href: string;
  name: string;
};

type NavLinksProps = {
  mobile?: boolean;
  onLinkClick?: () => void;
};

const landingLinks: NavLink[] = [
  { id: 1, href: "#features", name: "Features" },
  { id: 2, href: "#how-it-works", name: "How it works" },
  { id: 3, href: "/login", name: "Log in" },
];

const dashboardLinks: NavLink[] = [
  { id: 1, href: "/discover", name: "Discover" },
  { id: 2, href: "/my-list", name: "My list" },
  { id: 3, href: "/friends", name: "Friends" },
  { id: 4, href: "/status", name: "Status" },
  { id: 5, href: "/profile", name: "My Profile" },
];

const NavLinks = ({ mobile = false, onLinkClick }: NavLinksProps) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const links = status === "authenticated" ? dashboardLinks : landingLinks;

  return (
    <>
      {status === "unauthenticated"
        ? links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={onLinkClick}
              className={`text-muted hover:text-primary transition-colors text-sm ${mobile ? "py-2 border-b border-raised" : ""}`}
            >
              {link.name}
            </Link>
          ))
        : dashboardLinks.map((link) => {
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`
                  text-sm transition-colors
                  ${pathname === link.href ? "text-primary border-b border-brand" : "text-muted hover:text-primary"}
                  ${mobile ? "py-2 border-b border-raised" : ""}
                `}
              >
                {link.name}
              </Link>
            );
          })}
      {status === "unauthenticated" ? (
        <Link
          href="/register"
          className={`bg-brand text-white text-sm rounded-md py-2 px-4 hover:bg-rose transition-colors text-center ${mobile ? "mt-2" : ""}`}
        >
          Get started free
        </Link>
      ) : (
        <>
          <UserDropdown
            name={session?.user.name ?? "Anonymous"}
            email={session?.user.email ?? ""}
          />
        </>
      )}
    </>
  );
};

export default NavLinks;

import Link from "next/link"

type NavLink = {
  id: number
  href: string
  name: string
}

type NavLinksProps = {
  mobile?: boolean
}

const links: NavLink[] = [
  { id: 1, href: "#features", name: "Features" },
  { id: 2, href: "#how-it-works", name: "How it works" },
  { id: 3, href: "/login", name: "Log in" },
]

const NavLinks = ({ mobile = false }: NavLinksProps) => {
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={`text-muted hover:text-primary transition-colors text-sm ${mobile ? "py-2 border-b border-raised" : ""}`}
        >
          {link.name}
        </Link>
      ))}

      <Link
        href="/register"
        className={`bg-brand text-white text-sm rounded-md py-2 px-4 hover:bg-rose transition-colors text-center ${mobile ? "mt-2" : ""}`}
      >
        Get started free
      </Link>
    </>
  )
}

export default NavLinks
import Link from "next/link";

type NavLink = {
    id: number
    href: string
    name: string
}

const NavLinks = () => {

    const links: NavLink[] = [
        { id: 1, href: '/features', name: 'Features' },
        { id: 2, href: '/how-it-works', name: 'How it works' },
        { id: 3, href: '/login', name: 'Log in' },
    ]

    return (
        <div className="flex items-center gap-6">
            {links.map((link) => (
                <Link
                    key={link.id}
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                >
                    {link.name}
                </Link>
            ))}
            <Link 
                href="/register" 
                className="inline-block rounded-md bg-brand py-1 px-4 text-white"
            >
                Get started free
            </Link>
        </div>
    )
}

export default NavLinks;
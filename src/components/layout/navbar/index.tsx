import NavLinks from "./navlinks";
import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="border-b border-raised">
            <div className="flex justify-between items-center px-6 h-14">
                <Link href='/' className="font-bold text-lg">
                    Watch<span className='text-brand'>listed</span>
                </Link>
                <NavLinks />
            </div>
        </nav>
    )
}

export default NavBar;
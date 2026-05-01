const Footer = () => {
    return (
        <footer className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-raised bg-void">
            <div className="max-w-6xl mx-auto px-8 py-6 text-center">
                <p className="text-sm text-primary">&copy; {new Date().getFullYear()} Watch<span className='text-brand'>listed</span>. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
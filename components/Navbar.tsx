import Logo from "./Logo";

const Navbar = () => {
    return <nav className='bg-slate-900 border-b border-slate-600 py-3 px-20 flex items-center justify-between w-full'>
        <Logo />
        <div className=''>
            <a href={process.env.NEXT_PUBLIC_YOUTUBE_URL} target="_blank" rel="noreferrer" className='text-red-500 font-bold tracking-widest text-lg hover:text-red-600'> How It Works </a>
        </div>
    </nav>
}

export default Navbar;
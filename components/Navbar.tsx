const Navbar = () => {
    return <nav className='bg-slate-900 border-b border-slate-600 py-3 px-20 flex items-center justify-between w-full'>
        <div>
            <h1 className='font-bold text-3xl text-white'>NFTs Generator</h1>
        </div>
        <div className=''>
            <a href="#" className='text-blue-500 hover:text-blue-600'>Buy A Coffee</a>
        </div>
    </nav>
}

export default Navbar;
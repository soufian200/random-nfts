import Image from "next/image";

const Logo = () => {
    return <div className="flex items-center">
        <Image
            alt="NFTs Generator"
            src="/nftsgenerator.svg"
            width={30}
            height={60}
        />
        <h1 className='font-bold text-3xl ml-3 text-white'>NFTs Generator</h1>
    </div>
}

export default Logo;
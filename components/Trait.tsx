
import Image from 'next/image'
export const commonStyles = `w-[170px] h-[170px] bg-slate-800 mr-2  rounded-xl overflow-hidden `

export type TraitType = {
    name: string;
    src: string;
}

const Trait = ({ item }: { item: TraitType }) => {
    return <div className='mb-4 relative '>
        <div className={`${commonStyles}`}>
            <Image
                width="100%"
                height="100%"
                layout='responsive'
                src={item.src}
            />
        </div>
        <h1 className='mt-1 text-sm rounded-bl-xl rounded-tr-xl text-slate-200 absolute bottom-0 py-1 px-3 bg-[#222]' >{item.name}</h1>
    </div>
}

export default Trait;
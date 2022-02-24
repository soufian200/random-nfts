import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { BsUpload } from 'react-icons/bs'
import { useState } from 'react'
import Image from 'next/image'

const commonStyles = `w-[170px] h-[170px] bg-slate-800 mr-2 mb-2 rounded-xl overflow-hidden `

type TraitType = {
    name: string;
    src: string;
}

type LayerType = {
    name: string;
    items: TraitType[]
}
const Layer = ({ layer }: { layer: LayerType }) => {

    const [opened, setOpened] = useState(false)

    return <div className='mb-4'>
        <div className={`bg-slate-700 rounded-t-lg ${!opened && "rounded-b-lg"} p-2 px-3 items-center flex justify-between cursor-pointer`}
            onClick={() => setOpened(!opened)}
        >
            <h1 className='font-bold transform '>{layer.name}</h1>
            <div

                className='hover:bg-slate-600  transition-all  p-1 rounded-full'>

                {
                    opened
                        ? <FiChevronUp size={25} />
                        : <FiChevronDown size={25} />
                }
            </div>
        </div>
        <div className={`bg-[#3c495c] transition-all rounded-b-lg p-2 max-h-[370px] ${opened ? 'h-auto ' : 'h-0 py-0'} flex flex-wrap overflow-auto`}>
            <div className={`${commonStyles}flex justify-center items-center hover:bg-slate-400 transition-all relative cursor-pointer `}>
                <BsUpload size={50} />
                <input type="file" className={` absolute top-0 left-0 opacity-0 cursor-pointer h-full w-full`} title='Select images' />
            </div>

            {
                layer.items.map((item, index) => {
                    return <div key={index} className={`${commonStyles}`}>
                        <Image
                            width="100%"
                            height="100%"
                            layout='responsive'
                            src={item.src}
                        />
                    </div>
                })
            }
        </div>
    </div>
}
export default Layer
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { BsUpload } from 'react-icons/bs'
import { useState } from 'react'

import Trait, { commonStyles, TraitType } from './Trait'




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
            <h1 className='font-bold transform '>{layer.name} ( {layer.items.length} )</h1>
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
            <div className={`${commonStyles}flex justify-center items-center hover:bg-slate-900 transition-all relative cursor-pointer `}>
                <BsUpload size={50} />
                <input type="file" className={` absolute top-0 left-0 opacity-0 cursor-pointer h-full w-full`} title='Select images' />
            </div>

            {
                layer.items.map((item, index) => {
                    return <Trait key={index} item={item} />
                })
            }
        </div>
    </div>
}
export default Layer

import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { AppContext } from '../context/AppContext'
import { LayerType } from './Layer'
export const commonStyles = `w-[170px] h-[170px] bg-slate-800 mr-2  rounded-xl overflow-hidden `


const Trait = ({ file, layerName }: { file: File, layerName: string }) => {

    const [url, setUrl] = useState('')

    const { setLayers, layers } = useContext(AppContext)

    const handleRemoveTrait = () => {

        const updatedLayers = layers.map(layer => layer.folderName == layerName ? { ...layer, imgs: [...layer.imgs.filter(i => i.name != file.name)] } : layer)

        setLayers(updatedLayers as LayerType[])
    }

    useEffect(() => {
        setUrl(URL.createObjectURL(file))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layers])

    return <div className='mb-2 relative select-none group cursor-pointer '>
        <div className={`${commonStyles} relative`}>
            {
                url && <Image
                    width="100%"
                    height="100%"
                    layout='responsive'
                    src={url}
                    alt="Trait"
                />
            }
            <div
                onClick={handleRemoveTrait}
                className='group-hover:translate-y-0 -translate-y-10 absolute transform top-2 right-2 bg-slate-500 cursor-pointer hover:bg-slate-300 hover:text-slate-800 transition  p-1 rounded-md' title='Remove'>
                <FiTrash size={17} />
            </div>
        </div>
        <h1 className='mt-1 text-sm rounded-bl-xl rounded-tr-xl text-slate-200 absolute bottom-0 py-1 px-3 bg-[#222]' >
            {file.name}
        </h1>
    </div>
}

export default Trait;
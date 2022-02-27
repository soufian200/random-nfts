import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { AppContext } from "../context/AppContext";

const Preview = () => {

    const { layers, generate, refresh } = useContext(AppContext)
    const [url, setUrl] = useState('')



    useEffect(() => {
        const handleGenerate = async () => {

            const { images } = await generate(1)
            setUrl(images[0])
        }
        if (layers.length && layers[0].imgs.length)
            handleGenerate()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layers, refresh])


    return <div>
        <h1 className="text-slate-500 mb-1">Preview</h1>
        <div className='bg-slate-500 h-[340px] w-[340px] rounded-md flex-none overflow-hidden'>
            {
                url ? <Image
                    alt="Preview"
                    width="100%"
                    height="100%"
                    layout='responsive'
                    src={url}
                />
                    : <div className="text-slate-400 w-full h-full flex justify-center items-center opacity-90"><BsImage size={150} /></div>
            }
        </div>
    </div>
}
export default Preview;
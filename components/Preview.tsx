import Image from "next/image";

const Preview = ({ src }: { src: string }) => {
    return <div>
        <h1 className="text-slate-500 mb-1">Preview</h1>
        <div className='bg-slate-500 h-[340px] w-[340px] rounded-md flex-none overflow-hidden'>
            <Image
                width="100%"
                height="100%"
                layout='responsive'
                src={src}
            />
        </div>
    </div>
}
export default Preview;
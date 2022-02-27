import { AiFillCheckCircle, AiFillWarning, AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import { FiDownload } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { IMGS_DIR, JSON_DIR, METADATA } from '../lib/constants/config'
import routes from '../lib/constants/routes';


type OverlayType = {
    setOverlayVisible: (val: boolean) => void
}

const Overlay = ({ setOverlayVisible }: OverlayType) => {

    const [done, setDone] = useState(false)
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [output, setOuput] = useState({})
    const [err, setErr] = useState(false)
    const { formData, generate, count, setCount } = useContext(AppContext)


    const { size, collectionName, description } = formData

    /**
   * 
   * @param _collectionName 
   * @param _description 
   * @param _count 
   * @return if collection saved successfully
   */
    const saveCollection = async (_collectionName: string, _description: string, _count: number) => {

        const body = {
            collectionName: _collectionName,
            size: _count,
            description: _description
        }

        await axios.post(routes.collections + routes.add, body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
        return true
    }

    /**
      * 
      * Download ZIP file which contain (images-json) Folders
      * image folder: contains assets
      * json folder: contains json of assets + _matadata for all files
      */
    const handleDownload = async () => {

        if (err)
            setErr(false)


        const { images, metadataList, jsonFiles }: any = output

        if (loading) return;
        try {

            setLoading(true)
            // Dynamic import JSZip
            const JSZip = (await import('jszip')).default
            var zip = new JSZip();
            let imagesDir: any = zip.folder(IMGS_DIR);
            images.forEach((img: any, index: number) => {
                imagesDir.file(`${index + 1}.png`, img.slice(22,), { base64: true })
            })
            /** make zip for metadata **/
            let json: any = zip.folder(JSON_DIR);
            json.file(`${METADATA}.json`, metadataList);
            /* make zip for json folder */
            jsonFiles.forEach((jsonFile: string, index: number) => json.file(`${index + 1}.json`, jsonFile));

            // Dynamic import JSZip
            const fileSave = (await import('file-saver')).default
            zip
                .generateAsync({ type: "blob" })
                .then((content) => {
                    fileSave.saveAs(content, `${collectionName} collection.zip`)
                    setLoading(false)
                });

            if (saved) return;

            const isSaved = await saveCollection(collectionName, description, Number(count));
            setSaved(isSaved)
        } catch (err) {
            // const Sentry = (await import("@sentry/nextjs")).default
            // Sentry.captureException(err)
            // console.log(err)

            setErr(true)

            setLoading(false)
        }
    }






    useEffect(() => {

        /**
         * 
         * Handle Generate
         * Here Where All The Magic Happen
         */
        const handleGenerate = async () => {

            try {
                if (err)
                    setErr(false)

                setDone(false)

                const ouputResult = await generate(Number(size))

                setOuput(ouputResult)
                setDone(true)

            } catch (err) {
                // const Sentry = (await import("@sentry/nextjs")).default
                // Sentry.captureException(err)
                // console.log(err)
                setErr(true)

            }
        }

        if (!Object.keys(output).length)
            handleGenerate()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return <div className="bg-[#222222ef]  fixed w-screen h-screen top-0 left-0 z-50 flex justify-center items-center">
        <div className="bg-slate-50 rounded-xl shadow-2xl w-[600px] " >
            <div>
                <div className="flex items-center justify-between border-slate-300 border-b p-3">
                    <h1 className="font-bold">Create</h1>
                    <div
                        onClick={() => {
                            setOverlayVisible(false)
                            setCount(0)
                        }}
                        className="hover:bg-slate-200 cursor-pointer transition p-2 rounded-full">
                        <AiOutlineClose size={22} />
                    </div>
                </div>
                <div className="p-8 flex justify-center items-center flex-col ">

                    <div className="relative w-[240px] h-[240px] flex justify-center items-center">
                        {err ?
                            <div className='text-red-500' ><AiFillWarning size={160} /></div>
                            : <>  <div className={`absolute border-4 border-b-0 border-t-0 ${!done && 'animate-spin'} border-blue-400 top-0 left-0 w-full h-full  rounded-full`}></div>
                                <h1 className="text-7xl">{count}</h1></>}
                    </div>
                    <div className="  mt-10">

                        {err
                            ? <div className=' mt-10'>
                                <h1 className='text-red-500 text-center'>Something Went Wrong!. Please Try Again</h1>
                            </div>
                            : !done
                                ? <h1 className="font-bold text-center ">Generating...</h1>
                                : <div className="flex flex-col items-center">
                                    {
                                        count < size && <div className="flex rounded-xl  items-center bg-orange-100 text-orange-500 p-4 mb-5">
                                            <AiOutlineWarning size={28} />
                                            <p className="ml-3">You Need More Layers or Traits to make {size} image.</p>
                                        </div>
                                    }
                                    <div className="flex  rounded-xl items-center bg-green-100 text-green-500 p-4 mb-5">
                                        <AiFillCheckCircle size={28} />
                                        <p className="ml-3">Done Successfully.</p>
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        className={` ${loading ? "pointer-events-none bg-green-200" : "pointer-events-auto bg-green-400"}   flex justify-center items-center hover:bg-green-500 py-3 px-20 rounded-md text-slate-900 font-bold`}>
                                        {loading
                                            ? <>
                                                <h1 className="ml-2">Downloading...</h1>
                                            </>

                                            : <>
                                                <FiDownload size={28} />
                                                <h1 className="ml-2">Download</h1>
                                            </>
                                        }
                                    </button>
                                </div>
                        }

                    </div>
                </div>

            </div>
        </div>
    </div>
}
export default Overlay;
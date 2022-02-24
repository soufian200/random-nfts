import Preview from "./Preview";
import { AiFillCheckCircle, AiOutlineClose, AiOutlineDownload } from 'react-icons/ai'
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
const Overlay = ({ setOverlayVisible }) => {
    const [done, setDone] = useState(false)
    return <div className="bg-[#222222ef]  fixed w-screen h-screen top-0 left-0 z-50 flex justify-center items-center">
        <div className="bg-slate-50 rounded-xl shadow-2xl w-[600px] " >
            <div>
                <div className="flex items-center justify-between border-slate-300 border-b p-3">
                    <h1 className="font-bold">Create</h1>
                    <div
                        onClick={() => setOverlayVisible(false)}
                        className="hover:bg-slate-200 cursor-pointer transition p-2 rounded-full">
                        <AiOutlineClose size={22} />
                    </div>
                </div>
                <div className="p-8 flex justify-center items-center flex-col ">

                    <div className="relative w-[240px] h-[240px] flex justify-center items-center">
                        <div className={`absolute border-4 border-b-0 border-t-0 ${done && 'animate-spin'} border-blue-400 top-0 left-0 w-full h-full  rounded-full`}></div>
                        <h1 className="text-7xl">500</h1>
                    </div>
                    <div className="  mt-10">
                        {
                            done
                                ? <h1 className="font-bold ">Generating...</h1>
                                : <div className="flex flex-col items-center">
                                    <div className="flex  items-center bg-green-100 text-green-500 p-4 mb-5">
                                        <AiFillCheckCircle size={28} />
                                        <p className="ml-3">Done Sucessfully.</p>
                                    </div>
                                    <button className='bg-green-400  flex justify-center items-center hover:bg-green-500 py-3 px-20 rounded-md text-slate-900 font-bold'>
                                        <FiDownload size={28} />
                                        <h1 className="ml-2">Download</h1>
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
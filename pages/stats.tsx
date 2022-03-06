import { NextPage } from "next"

const Stats: NextPage = () => {
    return <div className="bg-slate-800 h-screen w-screen" >
        <div className="w-full h-full flex justify-center items-center text-white flex-1">
            <div className="bg-slate-600  p-2 flex items-center justify-center flex-col  rounded-md w-[200px] h-[140px]">
                <h1 className="text-xl font-bold mb-5 text-slate-400" >Users</h1>
                <h1 className="text-6xl" >33</h1>
            </div>
            <div className="bg-slate-600 ml-4  p-2 flex items-center justify-center flex-col  rounded-md ">
                <h1 className="text-xl font-bold mb-5 text-slate-400" >Total Generated</h1>
                <h1 className="text-6xl" >33122134567</h1>
            </div>
        </div>
    </div>
}
export default Stats
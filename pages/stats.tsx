import axios from "axios"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import routes from "../lib/constants/routes"
import formatCount from "../lib/utils/formatCount"


const Stats: NextPage = () => {

    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState(0)
    const [collections, setCollections] = useState(0)


    useEffect(() => {
        const getStats = async () => {
            try {
                const { data } = await axios.get(routes.stats)
                const { users, collections } = data.payload
                setUsers(users)
                setCollections(collections)

                setLoading(false)
            } catch (err) {
                console.log(err)
            }
        }
        getStats()
    }, [])

    return <div className="bg-slate-800 h-screen w-screen" >
        <div className="w-full h-full flex justify-center items-center text-white flex-1">
            <div className="bg-slate-600  p-2 flex items-center justify-center flex-col  rounded-md w-[200px] h-[140px]">
                <h1 className="text-xl font-bold mb-5 text-slate-400" >Users</h1>
                {
                    loading
                        ? <p>...</p>
                        : <h1 title={users.toString()} className="text-6xl" >{formatCount(users) || "?"}</h1>
                }
            </div>
            <div className="bg-slate-600 ml-4  p-2 flex items-center justify-center flex-col  rounded-md w-[200px] h-[140px]">
                <h1 className="text-xl font-bold mb-5 text-slate-400" >Total Generated</h1>
                {
                    loading
                        ? <p>...</p>
                        : <h1 title={collections.toString()} className="text-6xl" >{formatCount(collections) || "?"}</h1>
                }
            </div>
        </div>
    </div>
}
export default Stats
import { ChangeEvent, useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Input from "./Input";

/** @returns random number */
const getRandomId = () => Math.floor(Math.random() * 10000);

const NewLayerForm = ({ setNewLayerFormVisible }: { setNewLayerFormVisible: (prev: any) => void }) => {

    const [layerName, setLayerName] = useState('')


    const { layers, setLayers } = useContext(AppContext)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLayerName(e.target.value)
    }


    /**
     * Add New Layer
     * @returns void
     */
    const handleSave = () => {


        if (!layerName) return;

        const newLayers = [...layers, { id: getRandomId(), folderName: layerName, imgs: [] }];
        setLayers(newLayers)
        setNewLayerFormVisible(false)
        setLayerName('')
    }



    return <div className={`z-50 transition bg-slate-600 p-2 absolute right-0 top-0 w-[220px] rounded-md shadow-md`}>
        <Input
            placeholder='Layer Name'
            name="layerName"
            styles='w-full'
            value={layerName}
            onChange={handleChange}
        />
        <button
            onClick={handleSave}
            className='bg-yellow-400 hover:bg-yellow-5\00 p-2 py-3 text-slate-900 w-full rounded-md'>Save</button>
        <button
            onClick={() => setNewLayerFormVisible(false)}
            className='bg-slate-200 hover:bg-slate-300 p-2 py-3 text-slate-900 w-full rounded-md mt-1'>Cancel</button>
    </div>
}
export default NewLayerForm;
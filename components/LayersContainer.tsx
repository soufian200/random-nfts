import { useContext } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { AppContext } from "../context/AppContext"
import { Container } from "./Container"

const LayersContainer = () => {

    const { layers } = useContext(AppContext);


    return <div className="">
        {
            layers.length === 0
                ? <div className={`bg-slate-700 px-3 py-5 flex justify-center items-center rounded-lg`}>
                    <h1 className='text-slate-400' >No Layers Here !</h1>
                </div>
                : <DndProvider backend={HTML5Backend}>
                    <Container />
                </DndProvider>
        }
    </div>
}
export default LayersContainer;
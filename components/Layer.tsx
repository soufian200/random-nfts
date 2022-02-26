import { FiChevronDown, FiChevronUp, FiMove, FiTrash } from 'react-icons/fi'
import { MdOutlineDragHandle, MdOutlineDragIndicator } from 'react-icons/md'
import { BsUpload } from 'react-icons/bs'
import { useContext, useEffect, useRef, useState } from 'react'
import Trait, { commonStyles } from './Trait'
import { AppContext } from '../context/AppContext'
import { useDrag, useDrop } from 'react-dnd'
import type { XYCoord, Identifier } from 'dnd-core'

export type LayerType = {
    id: number
    folderName: string;
    imgs: File[]

}


interface DragItem {
    index: number
    id: string
    type: string
}

const Layer = ({ layer, index, moveCard }: { layer: LayerType, index: number, moveCard: (dragIndex: number, hoverIndex: number) => void }) => {

    const [opened, setOpened] = useState(false)

    const { setLayers, layers } = useContext(AppContext)

    const handleChange = (e: any) => {

        const imgs = Array.from(e.target.files)
        if (!imgs) return;

        const newLayers = layers.map(i => (i.folderName === layer.folderName) ? { ...i, imgs: [...i.imgs, ...imgs] } : i)

        setLayers(newLayers as LayerType[])
        console.log(newLayers)
    }

    const handleRemoveLayer = (name: string) => {

        const filtered = layers.filter(i => i.folderName != name)

        setLayers([...filtered])
    }

    // =========================================================================
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: 'layer',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) return

            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) return

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'layer',
        item: () => ({ id: layer.id, index }),
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    useEffect(() => {
        drag(drop(ref))
    }, [])


    return <div

        className={`  mb-4  overflow-hidden rounded-lg hover:cursor-move  bg-[#3c495c]  `}

    >
        <div
            className={`  ${!opened && "rounded-b-lg"} p-2 px-2 bg-slate-700 items-center flex justify-between ${isDragging ? "opacity-30 border-l-4 border-blue-500 " : "opacity-100 "}`}
            ref={ref}

            data-handler-id={handlerId}
        >

            <div
                className='flex items-center cursor-pointer  '
                onClick={() => setOpened(!opened)}
            >

                <div

                    className='hover:bg-slate-500 bg-slate-600  transition-all  p-1 rounded-full'>
                    {
                        opened
                            ? <FiChevronUp size={25} />
                            : <FiChevronDown size={25} />
                    }
                </div>
                <h1 className='font-bold transform ml-2'>{layer.folderName} ( {layer.imgs.length} )</h1>
            </div>
            <div title='Move' className='group-hover:opacity-100 opacity-0  flex flex-1 justify-center'>
                <MdOutlineDragHandle size={24} />
            </div>
            <div
                onClick={() => handleRemoveLayer(layer.folderName)}
                className='hover:bg-slate-600  transition-all cursor-pointer  p-2 rounded-full'>
                <FiTrash size={20} />
            </div>
        </div>
        <div className={`bg-[#3c495c] transition-all p-2 max-h-[370px]  ${opened ? 'h-auto ' : 'h-0 py-0'} flex flex-wrap overflow-auto`}>
            <div className={`${commonStyles} flex justify-center items-center hover:bg-slate-900 transition-all relative cursor-pointer `}>
                <BsUpload size={50} />
                <input
                    onChange={handleChange}
                    multiple
                    type="file"
                    accept="image/*"
                    className={` absolute top-0 left-0 opacity-0 cursor-pointer h-full w-full`}
                    title='Select images'
                />
            </div>

            {
                layer.imgs.map((file, index) => {
                    return <Trait key={index} file={file} layerName={layer.folderName} />
                })
            }
        </div>
    </div>
}
export default Layer
import { FC, useState, useCallback, useContext } from 'react'
import update from 'immutability-helper'
import Layer, { LayerType } from './Layer'
import { AppContext } from '../context/AppContext'


export interface Item {
    id: number
    text: string
}

export interface ContainerState {
    layers: LayerType[]
}

export const Container: FC = () => {

    const { layers, setLayers } = useContext(AppContext)


    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {

        setLayers((prevCards: any) => {
            return update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as any],
                ],
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const renderCard = useCallback(
        (layer: LayerType, index: number) => {

            return <Layer
                layer={layer}
                key={layer.id}
                index={index}
                moveCard={moveCard}
            />
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [],
    )


    return (<>
        {layers.map((layer, i) => renderCard(layer, i))}
    </>)

}

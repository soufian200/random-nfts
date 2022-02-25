import { LayerInterface } from "./interfaces";

/**
     * 
     * Get Layer From Layers
     * @param layers 
     * @param layerName 
     * @returns layer
     */
const getLayer = (layers: LayerInterface[], layerName: string) => layers.find(layer => layer.folderName === layerName)
export default getLayer
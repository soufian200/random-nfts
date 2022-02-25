import React, { createContext, ReactChild, useState } from "react";
import { LayerType } from "../components/Layer";

type AppContextType = {
    overlayVisible: boolean
    setOverlayVisible: (val: boolean) => void

    layers: LayerType[]
    setLayers: (vals: LayerType[]) => void
}
export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: ReactChild }) => {

    const [overlayVisible, setOverlayVisible] = useState(false)
    const [layers, setLayers] = useState<LayerType[]>([])

    return <AppContext.Provider value={{
        overlayVisible,
        setOverlayVisible,

        layers,
        setLayers
    }}>
        {children}
    </AppContext.Provider>
}
export default AppProvider
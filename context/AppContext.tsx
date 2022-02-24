import React, { createContext, ReactChild, useState } from "react";

type AppContextType = {
    overlayVisible: boolean
    setOverlayVisible: (val: boolean) => void
}
export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: ReactChild }) => {

    const [overlayVisible, setOverlayVisible] = useState(false)

    return <AppContext.Provider value={{
        overlayVisible,
        setOverlayVisible
    }}>
        {children}
    </AppContext.Provider>
}
export default AppProvider
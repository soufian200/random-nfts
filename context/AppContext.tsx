import React, { createContext, ReactChild, useState } from "react";
import { LayerType } from "../components/Layer";
import ArtGenerator from "../lib/classes/ArtGenerator";
import shuffle from "../lib/utils/shuffle";


type FormDataType = {
    width: number
    height: number
    collectionName: string
    ipfs: string
    description: string
    size: number
}

type AppContextType = {
    overlayVisible: boolean
    setOverlayVisible: (val: boolean) => void

    layers: LayerType[]
    setLayers: (vals: any) => void

    count: number
    setCount: (val: number) => void

    refresh: boolean
    setRefresh: (val: boolean) => void

    generate: any

    formData: FormDataType
    setFormData: (val: FormDataType) => void
}
export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider = ({ children }: { children: ReactChild }) => {

    const [overlayVisible, setOverlayVisible] = useState(false)
    const [layers, setLayers] = useState<LayerType[]>([])
    const [count, setCount] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [formData, setFormData] = useState({
        width: 512,
        height: 512,
        collectionName: '',
        ipfs: '',
        description: '',
        size: 1
    })

    const generate = async (_size: number) => {

        const { width, height, collectionName, ipfs, description } = formData

        const artGenerator = new ArtGenerator(
            Number(width),
            Number(height),
            collectionName,
            ipfs,
            description,
            layers.filter(i => i.imgs.length > 0))


        let editionCount = 1;
        let failedCount = 0;
        let dnaList = new Set();
        const imgsBuffer: any[] = []
        const allSingleMetaData: string[] = []



        // get an array of number e.g 4 => [1,2,3,4]

        artGenerator.abstractedIndexes = artGenerator.getAbstractedIndexes(_size);

        // shuffle abstractedIndexes
        if (artGenerator.shuffleLayers)
            artGenerator.abstractedIndexes = shuffle(artGenerator.abstractedIndexes);


        // setup layer
        const traits = artGenerator.layersSetup(artGenerator.layers);



        while (editionCount <= _size) {

            let newDna: string = artGenerator.createDna(traits);

            if (artGenerator.isDnaUnique(dnaList, newDna)) {

                let results = artGenerator.constructLayerToDna(newDna, traits);
                let loadedElements: Promise<any>[] = [];
                results.forEach((layer) => {

                    loadedElements.push(artGenerator.loadLayerImg(layer));
                });


                await Promise.all(loadedElements).then((renderObjectArray) => {

                    //for debuging
                    // debugLogs ? console.log("Clearing canvas") : null;

                    // clean rectangle
                    artGenerator.ctx.clearRect(0, 0, artGenerator.width, artGenerator.height);



                    if (artGenerator.backgroundOption.generate)
                        artGenerator.drawBackground();


                    renderObjectArray.forEach((renderObject, index) => {

                        artGenerator.drawElement(renderObject, index, artGenerator.layers.length);

                        // if (gif.export)
                        //     hashlipsGiffer.add();

                    });

                    imgsBuffer.push(artGenerator.canvas.toDataURL())
                    // imgsBuffer.push(imgBuffer)


                    artGenerator.addMetadata(newDna, artGenerator.abstractedIndexes[0], artGenerator.collectionName, artGenerator.description);
                    const singleMetaData = artGenerator.saveMetaDataSingleFile(artGenerator.abstractedIndexes[0]);

                    allSingleMetaData.push(singleMetaData)

                    // console.log(`Created edition: ${artGenerator.abstractedIndexes[0]}, with DNA: ${sha1(newDna)}`);
                });


                dnaList.add(newDna);
                setCount(editionCount)
                editionCount++;
                artGenerator.abstractedIndexes.shift();
            }
            else {
                // console.log("DNA exists!");
                failedCount++;
                if (failedCount >= artGenerator.maxFailedCount)
                    break;

            }

        }

        return {
            images: imgsBuffer,
            metadataList: JSON.stringify(artGenerator.metadataList, null, 2),
            jsonFiles: allSingleMetaData
        };
    }

    return <AppContext.Provider value={{
        overlayVisible,
        setOverlayVisible,

        layers,
        setLayers,

        count,
        setCount,

        refresh,
        setRefresh,

        generate,

        formData,
        setFormData

    }}>
        {children}
    </AppContext.Provider>
}
export default AppProvider
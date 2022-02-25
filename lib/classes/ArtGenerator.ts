import { AttributeListInterface, ConstructLayerInterface, LayerInterface, LayersInterface, RenderObjectInterface, TempMetadataInterface } from "../utils/interfaces";
import { createCanvas, loadImage, } from 'canvas'
import sha1 from "sha1"


function shuffle(array: number[]) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

class ArtGenerator {


    private rarityDelimiter = "#";
    private DNA_DELIMITER = "-";
    private maxFailedCount = 10000;
    private text = {
        only: false,
        color: "#ffffff",
        size: 20,
        xGap: 40,
        yGap: 40,
        align: "left",
        baseline: "top",
        weight: "regular",
        family: "Courier",
        spacer: " => ",
    };

    private solanaMetadata = {
        symbol: "YC",
        seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
        // external_url: "https://www.youtube.com/c/hashlipsnft",
        creators: [
            {
                address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
                share: 100,
            },
        ],
    };

    private extraMetadata = {};

    private height;
    private width;
    private collectionName;
    private ipfs;
    private description;
    private layers;
    private shuffleLayers;
    private network;
    private backgroundOption;


    private canvas;
    private ctx;

    private abstractedIndexes: number[] = [];
    private attributesList: AttributeListInterface[] = [];
    private metadataList: any = [];


    constructor(
        height: number = 512, width: number = 512,
        collectionName: string,
        ipfs: string,
        description: string = "",
        layers: LayerInterface[],
        shuffleLayers: boolean = false,
        network: 'eth' | 'sol' = 'eth',
        backgroundOption: {
            generate: boolean
            brightness: string
            static: boolean
            default: string
        } = {
                generate: false,
                brightness: "80%",
                static: false,
                default: "#000000",
            }
    ) {
        this.height = height;
        this.width = width;
        this.collectionName = collectionName;
        this.ipfs = ipfs || "ipfs://NewUriToReplace";
        this.description = description;
        this.layers = layers;
        this.shuffleLayers = shuffleLayers;

        this.network = network;
        this.backgroundOption = backgroundOption;


        /**
         * 
         * Create Canvas
        */
        this.canvas = createCanvas(this.width, this.height);
        this.ctx = this.canvas.getContext("2d");


    }

    private getAbstractedIndexes(_size: number) {
        const indexes: number[] = [];
        for (
            let i = (this.network == 'sol') ? 0 : 1;
            i <= _size;
            i++
        ) indexes.push(i);

        return indexes;
    }


    /**
    * get filename without extension
    * */
    private cleanName = (_str: string) => _str.split(this.rarityDelimiter)[0];
    /**
     * 
     * Get Rarity Weight
     * */
    private getRarityWeight = (_str: string) => { // e.g yellow#12.png => 12

        let nameWithoutExtension = _str.slice(0, -4);
        const poped = nameWithoutExtension.split(this.rarityDelimiter).pop()
        const nameWithoutWeight = Number(poped);

        return isNaN(nameWithoutWeight) ? 1 : nameWithoutWeight;
    };
    /**
     * 
     * getElements
     * */
    private getElements = (imgs: File[]) => {


        return imgs.map((img: File, index: number) => {
            return {
                id: index,
                name: this.cleanName(img.name),
                filename: img.name,
                file: img,
                weight: this.getRarityWeight(img.name),
            };
        });
    };
    /**
     * 
     * layersSetup
     * */
    private layersSetup = (_layers: LayerInterface[]) => {

        const layers = _layers.map((layerObj, index: number) => ({
            id: index,
            elements: this.getElements(layerObj.imgs),
            name:
                layerObj.options?.["displayName"] != undefined
                    ? layerObj.options?.["displayName"]
                    : layerObj.folderName,
            blend:
                layerObj.options?.["blend"] != undefined
                    ? layerObj.options?.["blend"]
                    : "source-over",
            opacity:
                layerObj.options?.["opacity"] != undefined
                    ? layerObj.options?.["opacity"]
                    : 1,
        }));
        return layers;
    };
    /**
     * 
     * Create Dna
     * */
    private createDna = (_layers: LayersInterface[]): string => {

        let randNum: string[] = [];

        _layers.forEach((layer) => {

            let totalWeight = 0;
            layer.elements.forEach((element) => { totalWeight += element.weight; });

            // number between 0 - totalWeight
            let random = Math.floor(Math.random() * totalWeight);


            for (let i = 0; i < layer.elements.length; i++) {

                // subtract the current weight from the random weight until we reach a sub zero value.
                random -= layer.elements[i].weight;

                if (random < 0)
                    return randNum.push(`${layer.elements[i].id}:${layer.elements[i].filename}`);

            }

        });
        return randNum.join(this.DNA_DELIMITER);
    };
    /**
     * 
     * is Dna Unique
     * */

    private isDnaUnique = (_DnaList = new Set(), _dna = "") => !_DnaList.has(_dna);
    /**
     * 
    * cleanDna
    * */

    private cleanDna = (_str: string) => Number(_str.split(":").shift());
    /**
     * 
     * construct Layer To Dna
     * */

    private constructLayerToDna = (_dna: string = "", _layers: LayersInterface[] = []): ConstructLayerInterface[] => {

        let mappedDnaToLayers = _layers.map((layer, index) => {

            let selectedElement = layer.elements.find((e) => e.id == this.cleanDna(_dna.split(this.DNA_DELIMITER)[index]));
            return {
                name: layer.name,
                blend: layer.blend,
                opacity: layer.opacity,
                selectedElement,
            };
        });
        return mappedDnaToLayers;
    };



    private toBase64 = (file: File) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })

    /**
    * Load Layer Image
    * */
    private loadLayerImg = async (_layer: ConstructLayerInterface) => {

        return new Promise(async (resolve) => {
            const path = await this.toBase64(_layer.selectedElement?.file as File)
            const image = await loadImage(`${path}`);
            resolve({ layer: _layer, loadedImage: image });
        });
    };



    /**
     * Generate Color
     * */
    private genColor = () => {
        let hue = Math.floor(Math.random() * 360);
        let pastel = `hsl(${hue}, 100%, ${this.backgroundOption.brightness})`;
        return pastel;
    };



    /**
     * draw Background
     * */
    private drawBackground = () => {
        this.ctx.fillStyle = this.backgroundOption.static ? this.backgroundOption.default : this.genColor();
        this.ctx.fillRect(0, 0, this.width, this.height);
    };


    /**
     * Add Text
     * */
    private addText = (_sig: string, x: number, y: number, size: number) => {

        const { color, baseline, align, weight } = this.text;

        const bs: any = baseline;
        const alg: any = align;

        this.ctx.fillStyle = color;
        this.ctx.font = `${weight} ${size}pt ${this.text.family}`;
        this.ctx.textBaseline = bs;
        this.ctx.textAlign = alg;
        this.ctx.fillText(_sig, x, y);
    };



    /**
     * Add Attributes
     * */
    private addAttributes = (_element: any) => {

        let selectedElement = _element.layer.selectedElement;

        this.attributesList.push({
            trait_type: _element.layer.name.split("-").pop(),
            value: selectedElement.name,
        });
    };



    /**
     * Draw Background
     * */
    private drawElement = (_renderObject: RenderObjectInterface, _index: number, _layersLen: number) => {

        const { xGap, yGap, size, spacer } = this.text;

        this.ctx.globalAlpha = _renderObject.layer.opacity;
        this.ctx.globalCompositeOperation = _renderObject.layer.blend;
        this.text.only
            ? this.addText(
                `${_renderObject.layer.name}${spacer}${_renderObject.layer.selectedElement.name}`,
                xGap,
                yGap * (_index + 1),
                size
            )
            : this.ctx.drawImage(
                _renderObject.loadedImage,
                0,
                0,
                this.width,
                this.height
            );

        this.addAttributes(_renderObject);
    };



    /**
     * Get Buffer Image
     * */
    private getBufferImage = (_editionCount: number) => {

        return this.canvas.toBuffer("image/png")
    }




    /**
     * Add Metadata
     * */
    private addMetadata = (_dna: string, _edition: number, namePrefix: string, description: string) => {

        // time
        let dateTime = Date.now();

        // meta data
        let tempMetadata: TempMetadataInterface = {
            name: `${namePrefix} #${_edition}`,
            description,
            image: `${this.ipfs}/${_edition}.png`,
            dna: sha1(_dna),
            edition: _edition,
            date: dateTime,
            ...this.extraMetadata,
            attributes: this.attributesList,
            compiler: "NFTs Generator",
        };

        if (this.network == 'sol') {

            tempMetadata = {
                //Added metadata for solana
                name: tempMetadata.name,
                symbol: this.solanaMetadata.symbol,
                description: tempMetadata.description,
                //Added metadata for solana
                seller_fee_basis_points: this.solanaMetadata.seller_fee_basis_points,
                image: `image.png`,
                //Added metadata for solana
                // external_url: this.solanaMetadata.external_url,
                edition: _edition,
                ...this.extraMetadata,
                attributes: tempMetadata.attributes,
                properties: {
                    category: "image",
                    creators: this.solanaMetadata.creators,
                    files: [
                        {
                            uri: "image.png",
                            type: "image/png",
                        }
                    ],

                },
            };
        }

        this.metadataList.push(tempMetadata);
        this.attributesList = [];
    };




    /**
     * save MetaData Single File
     * */
    private saveMetaDataSingleFile = (_editionCount: number) => {

        let metadata = this.metadataList.find((meta: any) => meta.edition == _editionCount);
        return JSON.stringify(metadata, null, 2)
    };






    async generate(_size: number) {

        let editionCount = 1;
        let failedCount = 0;
        let dnaList = new Set();
        const imgsBuffer: any[] = []
        const allSingleMetaData: string[] = []



        // get an array of number e.g 4 => [1,2,3,4]
        this.abstractedIndexes = this.getAbstractedIndexes(_size);

        // shuffle abstractedIndexes
        if (this.shuffleLayers)
            this.abstractedIndexes = shuffle(this.abstractedIndexes);


        // setup layer
        const layers = this.layersSetup(this.layers);



        while (editionCount <= _size) {

            let newDna: string = this.createDna(layers);

            if (this.isDnaUnique(dnaList, newDna)) {

                let results: ConstructLayerInterface[] = this.constructLayerToDna(newDna, layers);
                let loadedElements: Promise<any>[] = [];
                results.forEach((layer) => {

                    loadedElements.push(this.loadLayerImg(layer));
                });


                await Promise.all(loadedElements).then((renderObjectArray) => {

                    //for debuging
                    // debugLogs ? console.log("Clearing canvas") : null;

                    // clean rectangle
                    this.ctx.clearRect(0, 0, this.width, this.height);

                    // if (gif.export) {
                    //   hashlipsGiffer = new HashlipsGiffer(
                    //     canvas,
                    //     ctx,
                    //     `${buildDir}/gifs/${abstractedIndexes[0]}.gif`,
                    //     gif.repeat,
                    //     gif.quality,
                    //     gif.delay
                    //   );
                    //   hashlipsGiffer.start();
                    // }

                    if (this.backgroundOption.generate)
                        this.drawBackground();


                    renderObjectArray.forEach((renderObject, index) => {

                        this.drawElement(renderObject, index, this.layers.length);

                        // if (gif.export)
                        //     hashlipsGiffer.add();

                    });

                    // if (gif.export) hashlipsGiffer.stop();


                    // debugLogs
                    //     ? console.log("Editions left to create: ", abstractedIndexes)
                    //     : null;
                    // const imgBuffer = this.getBufferImage(this.abstractedIndexes[0]);
                    // console.log(this.canvas)
                    imgsBuffer.push(this.canvas.toDataURL())
                    // imgsBuffer.push(imgBuffer)


                    this.addMetadata(newDna, this.abstractedIndexes[0], this.collectionName, this.description);
                    const singleMetaData = this.saveMetaDataSingleFile(this.abstractedIndexes[0]);

                    allSingleMetaData.push(singleMetaData)

                    // console.log(`Created edition: ${this.abstractedIndexes[0]}, with DNA: ${sha1(newDna)}`);
                });


                dnaList.add(newDna);
                editionCount++;
                this.abstractedIndexes.shift();
            }
            else {
                // console.log("DNA exists!");
                failedCount++;
                if (failedCount >= this.maxFailedCount)
                    break;

            }



        }

        return {
            images: imgsBuffer,
            metadataList: JSON.stringify(this.metadataList, null, 2),
            jsonFiles: allSingleMetaData
        };
    }




}



export default ArtGenerator;
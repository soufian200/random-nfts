export interface ElementInterface {
    id: number
    name: string
    filename: string
    file: File
    weight: number
}
/**
 * 
 * Step Interface
 */
export interface IStep {
    id: number,
    Icon: JSX.Element
    title: string;
    description: string;
    bgColor: string;
}
/**
 * 
 * Step Props Interface
 */
export interface StepProps {
    step: IStep;
}
/**
 * 
 * Add path property to File
 */
export interface IFile extends File {
    path?: string
}
/**
 * 
 * Intial Values in Generate Form
 */
export interface Values {
    width: string;
    height: string;
    size: string;
    collectionName: string;
    isShuffle: boolean;
    ipfs: string
    description: string
}
/**
 * 
 * Intial Values in Add IPFS Tools
 */
export interface AddIpfsValues {
    ipfs: string
}


export interface ImgInterface {

    id: string
    filename: string
    path: string
    createdAt: number
}


// export interface LayerInterface {

//     id?: string
//     folderName: String
//     imgs: ImgInterface[]
//     options?: any
// }

export interface LayerInterface {
    folderName: string;
    imgs: File[];
    options?: any;
}


export interface LayersOrderInterface {
    layersOrder: LayerInterface[]
}


export interface LayersInterface {
    id: number
    elements: ElementInterface[]
    name: string
    blend: string
    opacity: number
}


export interface ConstructLayerInterface {
    name: string
    blend: string
    opacity: number
    selectedElement?: ElementInterface
};

export interface AttributeListInterface {
    trait_type: string
    value: string
}

export interface CreaterInterface {

    address: string
    share: number
}


export interface SolanaMetadataInterface {

    symbol: string
    seller_fee_basis_points: number
    external_url: string
    creators: CreaterInterface[]
}


export interface FileInterface {
    uri: string
    type: string
}

export interface PropertyInterface {

    files?: FileInterface[]
    category: string
    creators: CreaterInterface[]

}

export interface TempMetadataInterface {

    name: string
    description: string
    image: string
    edition: number
    attributes: AttributeListInterface[]
    symbol?: string
    seller_fee_basis_points?: number
    external_url?: string

    date?: number
    extraMetadata?: any
    dna?: string
    properties?: PropertyInterface
    compiler?: "NFTs Generator"
}


export interface RenderObjectInterface {

    layer: {
        name: string
        blend: "color" | "saturate" | "clear" | "copy" | "destination" | "source-over" | "destination-over" | "source-in" | "destination-in" | "source-out" | "destination-out" | "source-atop" // there is more...
        opacity: number
        selectedElement: ElementInterface
    },
    loadedImage: Promise<any>[]
}

/**
 * User Interface
 * */
export interface IUser {

    id: string
    username: string;
    email: string;
    password: string;
    passwordChangedAt?: number;
    role?: "user" | "admin";
    isVerified?: boolean;
    createdAt?: number;
    hashed?: string;
    expiresIn?: number;
    sendedTimes?: number;
    sendAfter?: number;
}
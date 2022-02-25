import { IFile } from "./interfaces"

/**
* 
* Get file path
* @param _file File 
* @returns file path
*/
const getFilePath = (_file: IFile) => (_file.webkitRelativePath || _file.path) as string
export default getFilePath
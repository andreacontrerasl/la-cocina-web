import { compressAccurately } from "image-conversion"

const compressFile = async (rawFile, options = { size: 200 }) => {
    const compressedFile = await compressAccurately(rawFile, options)
  
    return compressedFile
}
export {  compressFile }
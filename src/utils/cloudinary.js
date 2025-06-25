import {v2 as cloudinary} from "cloudinary" 
import { log } from "console"
import fs from  "fs"
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key    : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
}) 
const uploadOnCloudianry = async (localfilepath)=>{
    try {
        if(!localfilepath) return null
       const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type : "auto"
        })
        console.log("file has been uploaded successfully",response.url);
        return response
        
    } catch (error) {
        fs.unlinkSync(localfilepath)
        console.log("There was an error in uploading file !");
        return null;
        
    }
}

export {uploadOnCloudianry}
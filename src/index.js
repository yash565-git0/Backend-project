// import mongoose from "mongoose"
// import { DB_Name } from "./constants"
import {app} from "./app.js"
// ;(async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
//         app.on("error",(error)=>{
//             console.log("there is some error ");
//             throw error
//          })
//          app.listen(process.env.PORT , ()=>{
//             console.log(`app is listening on port ${process.env.PORT}`);
            
//          })
        
//     } catch (error) {
//         console.log("ERROR : ",error)
//         throw err
//     }

// })()

import dotenv from "dotenv"

import connectDB from "./db/index.js";

dotenv.config({
    path: '/.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Connectiion failed!!",err);
    
})


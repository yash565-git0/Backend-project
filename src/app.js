import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true,limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js"

console.log("Mounting /api/v1/users");
app.use("/api/v1/users",userRouter)

console.log("User routes mounted at /api/v1/users");

export { app }

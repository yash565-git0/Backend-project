import { Router } from "express";
import { loginUser,registerUser , loggeOutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/register").post((req,res,next)=>{
    console.log("Hit /register route"); // Debug middleware
    next();
},
    upload.fields([
        { 
            name : "avatar",
            maxCount : 1

        },
        { 
            name : "coverImage",
            maxCount : 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT ,loggeOutUser)

export default router ;
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"



const generateAccessAndRefreshToken = async function(userId){
    try {
        const user = await User.findById(userId)

         if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}

    } catch (error) {
        console.log(error)
        throw new ApiError(504,"Something went wrong while generating tokens")
    }
}

const registerUser = asyncHandler( async(req,res)=>{
    
const {username,email,fullName,password,} = req.body
// console.log("email : ",email);

if ([fullName,username,email,password].some((field)=> field?.trim === "")) {
    throw new ApiError(400,"All fields are required")
}

const existedUser = await User.findOne({
    $or:[{username},{email}]
})
if (existedUser) {
    throw new ApiError(409,"User with such email/Username already exists")
}
const avatarLocalpath = req.files?.avatar[0]?.path;
// const coverImageLocalpath = req.files?.coverImage[0]?.path

let coverImageLocalpath;
if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalpath = req.files.coverImage[0].path
    
}

if (!avatarLocalpath){
    throw new ApiError(400,"Avatar file is required")
}
const avatar = await uploadOnCloudinary(avatarLocalpath)
const coverImage = await uploadOnCloudinary(coverImageLocalpath)

if (!avatar){
    throw new ApiError(400,"Avatar file is required")
}
const user = await User.create({
    fullName,
    avatar : avatar.url,
    coverImage: coverImage?.url || "" ,
    email,password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select("-password -refreshToken")

if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
}

return res.status(201).json(
    new  ApiResponse(200,createdUser,"User registered successfully")
)
})

const loginUser = asyncHandler(async (req,res)=>{
    // user se input email or username
    //  then password input
    // then password and username check from database
    // fir I think token access denge aur ab jb bhi koi authorised kaam krna hoga tb ye 
    // token dekhenge until and unless token gets expired

const {username,email,password} = req.body 

if (!(username || email)){
    throw new ApiError(400,"username or password is required")
}

const user = await User.findOne({
    $or : [{username},{email}]
})
 if (!user) {
    throw new ApiError(404,"User does not exist")
}
 const isPasswordValid = await user.isPasswordCorrect(password)

 if (!isPasswordValid) {
    throw new ApiError(401,"password is incorrect")
}

const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

const options = {
    httponly : true,
    secure : true 
}

return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(200,{
        user : loggedInUser,accessToken,refreshToken
    },"User Login Successfully")
)
 






})

const logoutUser = asyncHandler(async(req,res)=>{
    
    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )
    const options = {
    httponly : true,
    secure : true 
}

return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json( new ApiResponse(200,{},"User Loggedout Successfully"))


})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    

    if (!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized access token")
    }

   try {

     const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )
    const user  = await User.findById(decodedToken?._id)

    if (!user){
        throw new ApiError(401,"Invalid refresh token")
    }

    if (incomingRefreshToken !== user?.refreshToken) {
        throw new ApiError(401,"Refresh token is expired or used")
    }

    const options = {
        httpOnly:true,
        secure : true
    }

  const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(user._id)

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {accessToken,refreshToken:newRefreshToken},
            "Access Token refreshed succesfully"
        )
    )

   } 
   catch (error) {
        throw new ApiError(401,"Invalid refresh token")
   }
    

})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body

    const user  = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400,"Invalid old Password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))




})

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res
    .status(200)
    .json( new ApiResponse(200,req.user,"current user fetched"
        ))
})

const updateAccountDetails = asyncHandler(async(req,res)=>{
    const {fullName,email,} = req.body

    if (!fullName || !email) {
        throw new ApiError(400,"All fields are required")
    }

     const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName:fullName,
                email : email
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"user details updated successfullyi")
    )
})

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalpath = req.file?.path

    if (!avatarLocalpath) {
        throw new ApiError(400,"avatar file is missing")
    }

   const avatar =  await uploadOnCloudinary(avatarLocalpath)

   if (!avatar.url) {
        throw new ApiError(400,"Error while uploading avatar file")
   }

   const user = await User.findByIdAndUpdate(req.user?._id,
    {$set:
        {
            avatar: avatar.url
        }
    },
    {new:true}).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"coverImage updated successfully")
    )
})


const updateUserCoverImage= asyncHandler(async(req,res)=>{
    const coverImageLocalpath = req.file?.path

    if (!coverImageLocalpath) {
        throw new ApiError(400,"coverImage file is missing")
    }

   const coverImage =  await uploadOnCloudinary(coverImageLocalpath)

   if (!coverImage.url) {
        throw new ApiError(400,"Error while uploading coverImage file")
   }

   const user = await User.findByIdAndUpdate(req.user?._id,
    {$set:
        {
            coverImage: coverImage.url
        }
    },
    {new:true}).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"coverImage updated successfully")
    )
})

export {registerUser ,
        loginUser ,
        logoutUser , 
        refreshAccessToken, 
        changeCurrentPassword,
        getCurrentUser,
        updateAccountDetails,
        updateUserAvatar,
        updateUserCoverImage
    }
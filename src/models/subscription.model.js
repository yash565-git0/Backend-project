import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new mongoose.Schema({
    subcriber : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    channel : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})
export const subscription = mongoose.model("subscription",subscriptionSchema)
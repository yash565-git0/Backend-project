import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema = new Schema(
    {
        videoFile : {
            type : String,
            required : true,
        },
        thumbnail : {
            type : String,
            required : true,
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        duration : {
            type : Number,
            required : true,
        },
        views : {
            type : Number,
            required : true,
            default : 0
        },
        isPublished : {
            type : Boolean
        },
    }
    ,{timestamps:true})

videoschema.plugin(mongooseAggregatePaginate)
 export const Video = mongoose.model("Video",videoschema)
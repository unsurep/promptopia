import mongoose from "mongoose";

// this model is for normal login


const registerSchema = new mongoose.Schema ({
    email: {
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
        
    }, 

    password:{
        type:String,
        required:true,
        trim:true
        
    },


}, {timestamps:true});

// here, mongoose is checking if models.register exists else register a new one.

const registerModel = mongoose.models.register || mongoose.model ('register', registerSchema);
export default registerModel;
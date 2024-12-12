import { Schema, model, models } from "mongoose";

const UserSchema = new Schema ({

    email: {
        type:String,
        required:true,
        trim:true
    },

    name: {
        type: String,
        required:true
        
      },

      image: {
        type:String,
      }

}, {timestamps:true});

const User = models.User || model('User', UserSchema);

export default User;



import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type: String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            default: false
        }

    },{
        timestamps:true
    }
)


userSchema.methods.matchPassword = async function(comparedPassword){
       return await bcrypt.compare(comparedPassword,this.password)     
}

const User = mongoose.model("User",userSchema);

export default User;
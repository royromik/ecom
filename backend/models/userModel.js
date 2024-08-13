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

userSchema.pre("save",async function(next){
    if(!this.password){
       next()
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
})


userSchema.methods.matchPassword = async function(comparedPassword){
       return await bcrypt.compare(comparedPassword,this.password)     
}

const User = mongoose.model("User",userSchema);

export default User;
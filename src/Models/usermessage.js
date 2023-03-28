const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
        // minLength:3
    },
    email:{
        type: String,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },
    phone:{
        type: String,
        required:true,
        // min:10
    },
    message:{
        type: String,
        required:true,
        // minLength:3
    },
}) 

//creating a collection 
const User = mongoose.model("User",userSchema);

module.exports = User;

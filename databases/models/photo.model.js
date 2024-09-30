import mongoose from "mongoose";

const schema =new mongoose.Schema({
    title:String,
    img:String
},{timestamps:true});


export const photoModel = mongoose.model('photo',schema)

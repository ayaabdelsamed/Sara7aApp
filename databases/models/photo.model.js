import mongoose from "mongoose";

const schema =new mongoose.Schema({
    title:String,
    img:String
},{timestamps:true});

schema.post('init',function(doc){
    doc.img = process.env.BASE_URL+doc.img
})

export const photoModel = mongoose.model('photo',schema)

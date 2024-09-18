import mongoose from "mongoose"


export function dbConnection(){
    mongoose.connect('mongodb://127.0.0.1:27017/sara7ac41').then(()=>{
        console.log('Database Connected');
    }).catch((err)=>{
        console.log('database error',err);
    })
}
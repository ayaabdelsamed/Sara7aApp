import { messageModel } from "../../../databases/models/message.model.js"
import { catchError } from "../../middleware/catchError.js"

import QRcode from 'qrcode'


const addMsg = catchError(async(req,res)=>{

    await messageModel.insertMany(req.body)
    res.json({message:'success'})

})
const allMsgs = catchError(async(req,res)=>{
    let messages = await messageModel.find({receivedId:req.user.userId})
    res.json({message:'success',messages})

})

const shareProfile = catchError(async(req,res)=>{
    QRcode.toDataURL('http://127.0.0.1:3000/messages',(err,qr)=>{

        res.send(`<img src="${qr}"/>`)

    })

})

export{
    addMsg,
    allMsgs,
    shareProfile
}
import { messageModel } from "../../../databases/models/message.model.js"
import { catchError } from "../../middleware/catchError.js"



const addMsg = catchError(async(req,res)=>{

    await messageModel.insertMany(req.body)
    res.json({message:'success'})

})
const allMsgs = catchError(async(req,res)=>{

    let messages = await messageModel.find({receivedId:req.user.userId})

    res.json({message:'success',messages})

})


export{
    addMsg,
    allMsgs
}
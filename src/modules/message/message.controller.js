import { messageModel } from "../../../databases/models/message.model.js"



const addMsg = async(req,res)=>{

    await messageModel.insertMany(req.body)
    res.json({message:'success'})

}

const allMsgs = async(req,res)=>{
    let messages = await messageModel.find()
    res.json({message:'success',messages})

}


export{
    addMsg,
    allMsgs
}
import { userModel } from "../../../databases/models/user.model.js"
import { sendEmail } from "../../emails/sendEmail.js"


const signup =async(req,res)=>{
    
    await userModel.insertMany(req.body)

    sendEmail(req.body.email)
    res.json({message:"success"})
}

const verify = async(req,res)=>{
    await userModel.findOneAndUpdate({email:req.params.email},{verifyEmail:true})
    req.json({message:"success"})

}

export{
    signup,
    verify
}

import jwt from "jsonwebtoken"
import { userModel } from "../../../databases/models/user.model.js"
import { sendEmail } from "../../emails/sendEmail.js"


const signup =async(req,res)=>{
    await userModel.insertMany(req.body)
    sendEmail(req.body.email)
    res.json({message:"success"})
}

const verify = (req,res)=>{

    jwt.verify(req.params.token,'myNameIsYotii',async(err,decoded)=>{
        if(err) return res.json({message:"Not success"})
            await userModel.findOneAndUpdate({email:decoded.email},{verifyEmail:true})
            res.json({message:"success"})

    })

}

export{
    signup,
    verify
}

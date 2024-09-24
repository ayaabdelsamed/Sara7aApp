import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { userModel } from "../../../databases/models/user.model.js"
import { sendEmail } from "../../emails/sendEmail.js"
import { catchError } from "../../middleware/catchError.js"




const signup =catchError(async(req,res)=>{
    await userModel.insertMany(req.body)
    sendEmail(req.body.email)
    res.json({message:"success"})
})

const signin =catchError(async(req,res)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userId:user._id,email:user.email},'aykey')
        if(user.verifyEmail)
        return res.json({message:"success",token})
        else  
        return res.json({message:"verify email first"})
    }
    return res.json({message:"incorrect mail or password"})
})

const verify = catchError(async(req,res)=>{

    jwt.verify(req.params.token,'myNameIsYotii',async(err,decoded)=>{
        if(err) return res.json({message:"Not success"})
            await userModel.findOneAndUpdate({email:decoded.email},{verifyEmail:true})
            res.json({message:"success"})

    })

})

export{
    signup,
    verify,
    signin
}

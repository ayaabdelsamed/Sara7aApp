import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import { userModel } from "../../../databases/models/user.model.js"
import { sendEmail } from "../../emails/sendEmail.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"






const signup =catchError(async(req,res,next)=>{
        await userModel.insertMany(req.body)
        //let token = jwt.sign({email: req.body.email},)
        //sendEmail(req.body.email)
        res.json({message:"success"})
    
})


const signin =catchError(async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email})
    if(user&&bcrypt.compareSync(req.body.password,user.password)){
        let token = jwt.sign({userId:user._id,email:user.email},'aykey')
       // if(user.verifyEmail)
            return res.json({message:"success",token})
        // else  
        //     return next(new AppError("verify email first",401))
    }
    //return res.json({message:"incorrect mail or password"})
    next(new AppError("incorrect mail or password",401))
})

const verify = catchError(async(req,res,next)=>{
    jwt.verify(req.params.token,process.env.JWT_KEY,async(err,decoded)=>{
        if(err) return next(new AppError(err,401))
            await userModel.findOneAndUpdate({email:decoded.email},{verifyEmail:true})
            res.json({message:"success"})

    })

})

export{
    signup,
    verify,
    signin
}

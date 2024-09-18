import { userModel } from "../../../databases/models/user.model.js"
import { sendEmail } from "../../emails/sendEmail.js"


const signup =async(req,res)=>{
    
    await userModel.insertMany(req.body)

    sendEmail()
    res.json({message:"success"})
}

export{
    signup
}

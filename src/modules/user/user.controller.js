import { userModel } from "../../../databases/models/user.model.js"


const signup =async(req,res)=>{
    
    await userModel.insertMany(req.body)
    res.json({message:"success"})
}

export{
    signup
}

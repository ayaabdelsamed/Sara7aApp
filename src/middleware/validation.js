import { AppError } from "../utils/appError.js"


export const validation = (Schema)=>{
    return (req,res,next)=>{
        const {error} = Schema.validate(req.body,{abortEarly:false})
        if(!error){
            next()
        }else{
            res.json({message:"error",error : error.details})
           // next(new AppError(error.details401,))
        }
    }

}
import { AppError } from "../utils/appError.js"


export const validation = (Schema)=>{
    return (req,res,next)=>{
        const {error} = Schema.validate({...req.params,...req.body,...req.query},{abortEarly:false})
        if(!error){
            next()
        }else{
            let errMsg=[]
            error.details.forEach((val) => {
                errMsg.push(val.message)
            });
           // res.json(errMsg)
            next(new AppError(errMsg,401))
        }
    }

}
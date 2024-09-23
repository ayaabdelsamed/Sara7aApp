import jwt from 'jsonwebtoken'

export const auth = async(req,res,next)=>{

    jwt.verify(req.header('token'),'aykey',(err,decoded)=>{

        if(err) return res.json(err)
        
        req.user = decoded
        next()
    })
}
export function catchError(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch(err=>{//عشان sync بترجع promise
            //ال next دي عصفورة بتسلم ال error للكبيرة global error handlig
            next(err)
        })
    }
}
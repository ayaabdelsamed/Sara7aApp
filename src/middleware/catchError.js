export function catchError(fn){
    return (req,res,next)=>{
        fn(req,res).catch(err=>{//عشان sync بترجع promise
            res.json(err)
        })
    }
}
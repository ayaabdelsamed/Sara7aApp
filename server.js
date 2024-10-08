process.on('uncaughtException',(err)=>{
    console.log('error',err);
})


import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import messageRouter from './src/modules/message/message.routes.js'
import { AppError } from './src/utils/appError.js'
import { globalError } from './src/middleware/globalErrorMiddleware.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const port = 3000

app.use('/',express.static('uploads'))
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

import { photoModel } from './databases/models/photo.model.js';
import { fileSingleUpload } from './src/fileUpload/upload.js';


app.post('/photos',fileSingleUpload('img'),async(req,res)=>{
    req.body.img = req.file.filename
    await photoModel.insertMany(req.body)
    res.json({message:"success"})
})

app.get('/photos',async(req,res)=>{
    let photos = await photoModel.find()
    // photos.forEach((val,index)=>{
    //     val.img = process.env.BASE_URL+val.img
    // })
    res.json({message:'success',photos})
})
app.use(userRouter)
app.use(messageRouter)


dbConnection()

//handle invalid routes مينفعش احطها فوق لازم في الاخر
app.use('*',(req,res,next)=>{
    //بس هنا دا response مش error ف مفدرش اديه لل next ال global error handling يعني
   // res.json({message:`not found endPoint: ${req.originalUrl}` })
   //هروح اختلق error انا
    next(new AppError(`not found endPoint: ${req.originalUrl}`,404))
})

//global error handling: middleware
app.use(globalError)

process.on('unhandledRejection',(err)=>{
    console.log('error',err);
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
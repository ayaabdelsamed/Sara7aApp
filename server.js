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

app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname)
    }
})

const upload = multer({ storage})


app.post('/photos',upload.single('img'),(req,res)=>{
    res.json({message:"success"})
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
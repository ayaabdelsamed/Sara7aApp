import express from 'express'
import { dbConnection } from './databases/dbConnection.js'
import userRouter from './src/modules/user/user.routes.js'
import messageRouter from './src/modules/message/message.routes.js'
const app = express()
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(messageRouter)
app.get('/', (req, res) => res.send('Hello World!'))

dbConnection()

//handle invalid routes مينفعش احطها فوق لازم في الاخر
app.use('*',(req,res,next)=>{
    //بس هنا دا response مش error ف مفدرش اديه لل next ال global error handling يعني
   // res.json({message:`not found endPoint: ${req.originalUrl}` })
   //هروح اختلق error انا
    next(new Error(`not found endPoint: ${req.originalUrl}`))
})

//global error handling:
app.use((err,req,res,next)=>{
    res.json({error:err.message})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
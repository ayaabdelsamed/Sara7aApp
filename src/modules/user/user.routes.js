import express from 'express'
import { signup, verify } from './user.controller.js'
import { checkEmail } from '../../middleware/checkEmail.js'

const userRouter=express.Router()

userRouter.post('/signup',checkEmail,signup)
userRouter.get('/verify/email',verify)

export default userRouter
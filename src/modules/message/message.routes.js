import express from 'express'
import { addMsg, allMsgs } from './message.controller.js'
import { auth } from '../../middleware/auth.js'

const messageRouter = express.Router()

messageRouter.post('/messages',addMsg)
messageRouter.get('/messages',auth,allMsgs)

export default messageRouter
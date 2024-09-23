import express from 'express'
import { addMsg, allMsgs } from './message.controller.js'

const messageRouter = express.Router()

messageRouter.post('/messages',addMsg)
messageRouter.get('/messages',allMsgs)

export default messageRouter
import express from 'express'
import { addMsg, allMsgs, shareProfile } from './message.controller.js'
import { auth } from '../../middleware/auth.js'

const messageRouter = express.Router()

messageRouter.post('/messages',addMsg)
messageRouter.get('/messages',auth,allMsgs)
messageRouter.get('/shareProfile',shareProfile)

export default messageRouter
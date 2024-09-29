import express from 'express'
import { addMsg, allMsgs, shareProfile } from './message.controller.js'
import { auth } from '../../middleware/auth.js'
import { validation } from '../../middleware/validation.js'
import { addMsgSchemaVal } from './message.validation.js'

const messageRouter = express.Router()

messageRouter.post('/messages',validation(addMsgSchemaVal),addMsg)
messageRouter.get('/messages',auth,allMsgs)
messageRouter.get('/shareProfile',shareProfile)

export default messageRouter
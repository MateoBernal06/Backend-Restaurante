import express from 'express'
import { createUserController } from '../controllers/users.controller'

const route = express()

route.post('/user', createUserController)

export default route
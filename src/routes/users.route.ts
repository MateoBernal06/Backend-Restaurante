import express from 'express'
import { createUserController } from '../controllers/users.controller'
import { upload } from '../middlewares/multer'

const route = express()

route.post('/user', upload.single('imagen_link'), createUserController)

export default route
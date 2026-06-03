import express from 'express'
import { createUserController, loginUserController } from '../controllers/users.controller'
import { upload } from '../middlewares/multer'

const route = express()

route.post('/register', upload.single('imagen_link'), createUserController)
route.post('/login', loginUserController)

export default route
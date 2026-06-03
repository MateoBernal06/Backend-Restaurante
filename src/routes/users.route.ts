import express from 'express'
import { createUserController, loginUserController, profileUserController } from '../controllers/users.controller'
import { upload } from '../middlewares/multer'
import { verifyToken } from '../middlewares/token'

const route = express()

route.post('/register', upload.single('imagen_link'), createUserController)
route.post('/login', loginUserController)
route.get('/user/profile', verifyToken, profileUserController)

export default route
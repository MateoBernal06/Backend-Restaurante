import express from 'express'
import { createUserController, loginUserController, profileUserController } from '../controllers/users.controller'
import { upload } from '../middlewares/multer'
import { verifyToken } from '../middlewares/token'

const route = express()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan
 *               surname:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 example: juan.perez@mail.com
 *               password:
 *                 type: string
 *                 example: 1234567890ab
 *               rol:
 *                 type: string
 *                 example: admin
 *               number_phone:
 *                 type: string
 *                 example: 3123456789
 *               address:
 *                 type: string
 *                 example: Calle 123, Medellín
 *               imagen_link:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error de validación o usuario duplicado
 */
route.post('/register', upload.single('imagen_link'), createUserController)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión y devuelve un token JWT
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: juan.perez@mail.com
 *               password:
 *                 type: string
 *                 example: 1234567890ab
 *     responses:
 *       201:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales inválidas o falta de datos
 */
route.post('/login', loginUserController)

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario autenticado
 *       400:
 *         description: Id de usuario inválido o falta de token
 *       401:
 *         description: Token no proporcionado o inválido
 *       404:
 *         description: Usuario no encontrado
 */
route.get('/user/profile', verifyToken, profileUserController)

export default route
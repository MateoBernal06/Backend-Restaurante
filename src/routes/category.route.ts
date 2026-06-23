import {
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  statusCategoryController,
} from "../controllers/category.controller";
import { upload } from "../middlewares/multer";
import { verifyToken } from "../middlewares/token";
import express from "express";

const route = express();

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Crea una nueva categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bebidas
 *               description:
 *                 type: string
 *                 example: Jugos naturales, gaseosas y aguas
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente
 *       400:
 *         description: Error de validación o categoría duplicada
 */
route.post(
  "/category",
  verifyToken,
  upload.single("imagen_link"),
  createCategoryController,
);

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Obtiene todas las categorías
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       201:
 *         description: No hay categorías registradas
 *       400:
 *         description: Error al obtener las categorías
 *       401:
 *         description: Token no proporcionado
 */
route.get("/category", verifyToken, getCategoriesController);

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Obtiene una categoría por su id
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: No se encontró la categoría
 *       400:
 *         description: Error al obtener las categorías
 *       401:
 *         description: Token no proporcionado
 */
route.get("/category/:id", verifyToken, getCategoryController);

/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Actualiza una categoría existente
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Refrescos
 *               description:
 *                 type: string
 *                 example: Bebidas frías y calientes
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente
 *       400:
 *         description: Error en la validación o al actualizar la categoría
 *       404:
 *         description: No se encontró la categoría
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.put(
  "/category/:id",
  verifyToken,
  upload.single("imagen_link"),
  updateCategoryController,
);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Activa o desactiva una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Categoría actualizada exitosamente
 *       400:
 *         description: Error al actualizar la categoría
 *       404:
 *         description: No se encontró la categoría
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.patch("/category/:id", verifyToken, statusCategoryController);

export default route;

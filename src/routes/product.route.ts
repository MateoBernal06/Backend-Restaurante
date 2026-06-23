import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  statusProductController
} from "../controllers/product.controller";
import express from "express";
import { upload } from "../middlewares/multer";
import { verifyToken } from "../middlewares/token";

const route = express();

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
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
 *                 example: Coca Cola
 *               description:
 *                 type: string
 *                 example: Bebida gaseosa de cola
 *               stock:
 *                 type: number
 *                 example: 20
 *               price:
 *                 type: number
 *                 example: 1.5
 *               unit:
 *                 type: string
 *                 example: unidad
 *               category_id:
 *                 type: string
 *                 example: 1
 *               imagen_link:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación o producto duplicado
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.post(
  "/product",
  verifyToken,
  upload.single("imagen_link"),
  createProductController,
);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *       400:
 *         description: Error al obtener los productos
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get("/product", verifyToken, getProductsController);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Obtiene un producto por su id
 *     tags: [Productos]
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
 *         description: Producto encontrado
 *       400:
 *         description: Producto no encontrado o error en la solicitud
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get("/product/:id", verifyToken, getProductController);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Actualiza un producto existente
 *     tags: [Productos]
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
 *                 example: Coca Cola Zero
 *               description:
 *                 type: string
 *                 example: Bebida gaseosa sin azúcar
 *               stock:
 *                 type: number
 *                 example: 30
 *               price:
 *                 type: number
 *                 example: 1.8
 *               unit:
 *                 type: string
 *                 example: unidad
 *               category_id:
 *                 type: string
 *                 example: 1
 *               imagen_link:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: Error de validación o producto duplicado
 *       404:
 *         description: No se encontró el producto
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.put(
  "/product/:id",
  verifyToken,
  upload.single("imagen_link"),
  updateProductController,
);

/**
 * @swagger
 * /product/{id}:
 *   patch:
 *     summary: Activa o desactiva un producto
 *     tags: [Productos]
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
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: No se encontró el producto
 *       400:
 *         description: Error al actualizar el estado del producto
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.patch("/product/:id", verifyToken, statusProductController);

export default route;

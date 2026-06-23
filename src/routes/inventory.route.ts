import express from "express";
import {
  createInventoryController,
  getAllInventoryController,
  getInventoryController,
  getInventoryByProductController,
} from "../controllers/inventory.controller";
import { verifyToken } from "../middlewares/token";

const route = express();

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Registra un movimiento de inventario
 *     tags: [Inventario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 example: 1
 *               type:
 *                 type: string
 *                 enum: [entrada, salida]
 *                 example: entrada
 *               quantity:
 *                 type: number
 *                 example: 5
 *               reason:
 *                 type: string
 *                 example: Recepción de mercadería
 *     responses:
 *       201:
 *         description: Registro creado exitosamente
 *       400:
 *         description: Error de validación o producto inexistente
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.post("/inventory", verifyToken, createInventoryController);

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Obtiene todos los movimientos de inventario
 *     tags: [Inventario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimientos de inventario
 *       400:
 *         description: Error al obtener los movimientos
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get("/inventory", verifyToken, getAllInventoryController);

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Obtiene un movimiento de inventario por su id
 *     tags: [Inventario]
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
 *         description: Movimiento encontrado
 *       400:
 *         description: Movimiento no encontrado o error en la solicitud
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get("/inventory/:id", verifyToken, getInventoryController);

/**
 * @swagger
 * /inventory/product/{id}:
 *   get:
 *     summary: Obtiene movimientos de inventario para un producto
 *     tags: [Inventario]
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
 *         description: Movimientos encontrados por producto
 *       400:
 *         description: Producto no encontrado o error en la solicitud
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get(
  "/inventory/product/:id",
  verifyToken,
  getInventoryByProductController,
);

export default route;

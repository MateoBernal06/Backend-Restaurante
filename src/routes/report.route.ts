import express from "express";
import {
  getLowStockProductsContoller,
  getInventoryValueContoller,
  getMovementsByDateContoller,
} from "../controllers/report.controller";
import { verifyToken } from "../middlewares/token";
const route = express();

/**
 * @swagger
 * /reports/low-stock:
 *   get:
 *     summary: Obtiene productos con bajo stock
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos con bajo stock
 *       500:
 *         description: Error al obtener los productos con bajo stock
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get("/reports/low-stock", verifyToken, getLowStockProductsContoller);

/**
 * @swagger
 * /reports/most-used:
 *   get:
 *     summary: Obtiene el valor total del inventario o productos más usados
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de valor de inventario
 *       500:
 *         description: Error al obtener los datos de inventario
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get("/reports/most-used", verifyToken, getInventoryValueContoller);

/**
 * @swagger
 * /reports/movements-by-date:
 *   get:
 *     summary: Obtiene movimientos de inventario entre dos fechas
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-06-01
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-06-22
 *     responses:
 *       200:
 *         description: Movimientos de inventario entre las fechas indicadas
 *       400:
 *         description: Fecha de inicio o fin no proporcionada
 *       500:
 *         description: Error al obtener los movimientos por fecha
 *       401:
 *         description: Token no proporcionado o inválido
 */
route.get(
  "/reports/movements-by-date",
  verifyToken,
  getMovementsByDateContoller,
);

export default route;

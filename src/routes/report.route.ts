import express from "express";
import {
  getLowStockProductsContoller,
  getInventoryValueContoller,
  getMovementsByDateContoller,
} from "../controllers/report.controller";
import { verifyToken } from "../middlewares/token";
const route = express();

route.get("/reports/low-stock", verifyToken, getLowStockProductsContoller);
route.get("/reports/most-used", verifyToken, getInventoryValueContoller);
route.get(
  "/reports/movements-by-date",
  verifyToken,
  getMovementsByDateContoller,
);

export default route;

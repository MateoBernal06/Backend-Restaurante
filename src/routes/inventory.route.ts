import express from "express";
import {
  createInventoryController,
  getAllInventoryController,
  getInventoryController,
  getInventoryByProductController,
} from "../controllers/inventory.controller";
import { verifyToken } from "../middlewares/token";

const route = express();

route.post("/inventory", verifyToken, createInventoryController);
route.get("/inventory", verifyToken, getAllInventoryController);
route.get("/inventory/:id", verifyToken, getInventoryController);
route.get(
  "/inventory/product/:id",
  verifyToken,
  getInventoryByProductController,
);

export default route;

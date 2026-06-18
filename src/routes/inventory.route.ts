import express from "express";
import { createInventoryController } from "../controllers/inventory.controller";
import { verifyToken } from "../middlewares/token";

const route = express();

route.post("/inventory", verifyToken, createInventoryController);

export default route;

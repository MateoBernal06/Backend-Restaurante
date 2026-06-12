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

route.post(
  "/product",
  verifyToken,
  upload.single("imagen_link"),
  createProductController,
);
route.get("/product", verifyToken, getProductsController);
route.get("/product/:id", verifyToken, getProductController);
route.put(
  "/product/:id",
  verifyToken,
  upload.single("imagen_link"),
  updateProductController,
);
route.patch("/product/:id", verifyToken, statusProductController);

export default route;

import {
  createProductController,
  getProductsController,
  getProductController
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

export default route;

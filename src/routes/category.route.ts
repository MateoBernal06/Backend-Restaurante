import {
  createCategoryController,
  getCategoriesController,
  getCategoryController
} from "../controllers/category.controller";
import { upload } from "../middlewares/multer";
import { verifyToken } from "../middlewares/token";
import express from "express";

const route = express();

route.post(
  "/category",
  verifyToken,
  upload.single("imagen_link"),
  createCategoryController,
);

route.get("/category", verifyToken, getCategoriesController);
route.get("/category/:id", verifyToken, getCategoryController);

export default route;

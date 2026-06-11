import {
  createProduct,
  getProducts,
  getProduct,
} from "../models/product.model";
import { getCategory } from "../models/category.model";
import { CreateProductDTO } from "../types/product.types";
import { Request, Response } from "express";

const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, description, stock, price, unit, category_id } = req.body;
    const imagen_link = req.file;
    const user_id = req.userId;

    if (
      !name ||
      !description ||
      !stock ||
      !price ||
      !unit ||
      !category_id ||
      !imagen_link
    ) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos obligatorios",
      });
    }

    if (name.length < 3 || name.length > 80) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre debe tener entre 3 y 80 caracteres",
      });
    }

    if (description.length < 10 || description.length > 255) {
      return res.status(400).json({
        ok: false,
        msg: "La descripción debe tener entre 10 y 255 caracteres",
      });
    }

    if (stock <= 0) {
      return res.status(400).json({
        ok: false,
        msg: "El stock debe ser mayor a 0",
      });
    }

    const category = await getCategory(category_id);
    if (!category || category.error) {
      return res.status(400).json({
        ok: false,
        msg: "La categoría no existe",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        ok: false,
        msg: "El precio no puede ser menor o igual a cero",
      });
    }

    if (!["unidad", "Kg", "Lb"].includes(unit)) {
      return res.status(400).json({
        ok: false,
        msg: "Unidad de medida del producto incorrecto",
      });
    }
    const newProduct: CreateProductDTO = {
      name: name.trim().toLowerCase(),
      user_id: user_id as string,
      category_id: category_id,
      description: description.trim().toLowerCase(),
      stock: stock,
      price: price,
      unit: unit,
      imagen_link: imagen_link ? imagen_link.path : "",
    };

    if (newProduct.imagen_link === "") {
      return res.status(400).json({
        ok: false,
        msg: "Error al subir la imagen",
      });
    }

    const product = await createProduct(newProduct);
    console.log(product);

    if (
      product.error?.code === "23505" &&
      product.error.message.includes("name")
    ) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un producto con ese nombre",
      });
    }

    if (product.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al crear el producto",
      });
    }

    return res.status(201).json({
      ok: false,
      msg: "Producto creado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();

    if (products.data?.length === 0 || !products.data) {
      return res.status(200).json({
        ok: true,
        msg: "No hay productos registradas",
      });
    }

    if (products.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener los productos",
      });
    }

    return res.status(200).json({
      ok: true,
      data: products.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getProduct(id as string);

    if (product.data?.length === 0 || !product.data) {
      return res.status(200).json({
        ok: true,
        msg: "No se encontró el producto",
      });
    }

    if (product.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener el producto",
      });
    }

    return res.status(200).json({
      ok: true,
      msg: product.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

export { createProductController, getProductsController, getProductController };

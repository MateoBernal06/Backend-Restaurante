import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  inactivateProduct,
  activateProduct,
} from "../models/product.model";
import { getCategory } from "../models/category.model";
import { CreateProductDTO, UpdateProductDTO } from "../types/product.types";
import { typeInventory, ModifyStock } from "../types/inventory.types";
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
        msg: "No hay productos registrados",
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

const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, stock, price, unit, category_id } = req.body;
    const imagen_link = req.file;

    const productDB = await getProduct(id as string);
    if (productDB.data?.length === 0 || !productDB.data) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el producto",
      });
    }

    if (category_id) {
      const categoryDB = await getCategory(category_id as string);
      if (categoryDB.data?.length === 0 || !categoryDB.data) {
        return res.status(404).json({
          ok: false,
          msg: "La categoría no existe",
        });
      }
    }

    if (name && (name.length < 3 || name.length > 80)) {
      return res.status(400).json({
        ok: false,
        msg: "El nombre debe tener entre 3 y 80 caracteres",
      });
    }

    if (description && (description.length < 10 || description.length > 255)) {
      return res.status(400).json({
        ok: false,
        msg: "La descripción debe tener entre 10 y 255 caracteres",
      });
    }

    if (price && isNaN(price)) {
      return res.status(400).json({
        ok: false,
        msg: "El precio deben ser un valor numéricos válido",
      });
    }

    if (stock && isNaN(stock)) {
      return res.status(400).json({
        ok: false,
        msg: "El stock deben ser un valor numéricos válido",
      });
    }

    if (stock !== undefined && stock <= 0) {
      return res.status(400).json({
        ok: false,
        msg: "El stock debe ser mayor a 0",
      });
    }

    if (price !== undefined && price <= 0) {
      return res.status(400).json({
        ok: false,
        msg: "El precio no puede ser menor o igual a cero",
      });
    }

    if (unit && !["unidad", "Kg", "Lb"].includes(unit)) {
      return res.status(400).json({
        ok: false,
        msg: "Unidad de medida del producto incorrecto",
      });
    }

    const productUpdate: UpdateProductDTO = {};

    if (name) {
      productUpdate.name = name.trim().toLowerCase();
    }

    if (description) {
      productUpdate.description = description.trim().toLowerCase();
    }

    if (stock !== undefined) {
      productUpdate.stock = stock;
    }

    if (price !== undefined) {
      productUpdate.price = price;
    }

    if (unit) {
      productUpdate.unit = unit.trim();
    }

    if (category_id) {
      productUpdate.category_id = category_id.trim();
    }

    if (imagen_link) {
      productUpdate.imagen_link = imagen_link.path;
    }

    const product = await updateProduct(id as string, productUpdate);

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
        msg: "Error al actualizar el producto",
        error: product.error,
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Producto actualizado exitosamente",
      data: product.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const statusProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productDB = await getProduct(id as string);

    if (productDB.data?.length === 0 || !productDB.data) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró el producto",
      });
    }

    if (productDB.data.status) {
      const product = await inactivateProduct(id as string);
      if (product.error || !product.data) {
        return res.status(400).json({
          ok: false,
          msg: "Error al inactivar el producto",
          error: product.error,
        });
      }
    }

    if (!productDB.data.status) {
      const product = await activateProduct(id as string);
      if (product.error || !product.data) {
        return res.status(400).json({
          ok: false,
          msg: "Error al activar el producto",
          error: product.error,
        });
      }
    }

    return res.status(201).json({
      ok: true,
      msg: "Producto actualizado exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const updateProductStock = async (data: ModifyStock) => {
  const { product_id, type, quantity } = data;

  const product = await getProduct(product_id);

  if (!product || product.error || !product.data) {
    throw new Error("Producto no encontrado");
  }

  const typeStock: typeInventory = type;
  const productUpdate: UpdateProductDTO = {};

  if (typeStock === "entrada") {
    const stockAdd = product.data.stock + quantity;
    productUpdate.stock = stockAdd;
    const result = await updateProduct(product_id, productUpdate);

    if (result.error || !result.data) {
      throw new Error(`Error ${result.error}`);
    }

    return {
      data: result.data,
      note: "Entrada registrada correctamente",
    };
  }

  if (typeStock === "salida") {
    if (product.data.stock <= 0) {
      throw new Error("Producto sin stock");
    }
    if (product.data.stock < quantity) {
      throw new Error(
        `Stock insuficiente: hay ${product.data.stock} pero se requieren ${quantity}`,
      );
    }
    const stockRemove = product.data.stock - quantity;
    productUpdate.stock = stockRemove;
    const result = await updateProduct(product_id, productUpdate);

    if (result.error || !result.data) {
      throw new Error(`Error ${result.error}`);
    }

    return {
      data: result.data,
      note:
        stockRemove === 0
          ? "El retiro consumió todo el stock"
          : "Salida registrada correctamente",
    };
  }
};

export {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  statusProductController,
  updateProductStock,
};

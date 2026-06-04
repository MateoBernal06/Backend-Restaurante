import { Request, Response } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
} from "../models/category.model";
import { CreateCategoryDTO } from "../types/category.types";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const imagen_link = req.file;

    if (!imagen_link) {
      return res.status(400).json({
        ok: false,
        msg: "La imagen es obligatoria",
      });
    }

    if (!name || !description) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos son obligatorios",
      });
    }

    if (description.length < 10 || description.length > 255) {
      return res.status(400).json({
        ok: false,
        msg: "La descripción debe tener entre 10 y 255 caracteres",
      });
    }

    const newCategory: CreateCategoryDTO = {
      name: name.trim().toLowerCase(),
      description: description.trim().toLowerCase(),
      imagen_link: imagen_link ? imagen_link.path : "",
    };

    const category = await createCategory(newCategory);

    if (
      category.error?.code === "23505" &&
      category.error.message.includes("name")
    ) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una categoría con ese nombre",
      });
    }

    res.status(201).json({
      ok: true,
      msg: "Categoría creada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();

    if (categories.data?.length === 0 || !categories.data) {
      return res.status(200).json({
        ok: true,
        msg: "No hay categorías registradas",
      });
    }

    if (categories.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener las categorías",
      });
    }

    return res.status(200).json({
      ok: true,
      data: categories.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(typeof id !== "string" || id.trim() === "") {
      return res.status(400).json({
        ok: false,
        msg: "El id es obligatorio",
      });
    }

    const category = await getCategory(id);

    if (category.data?.length === 0 || !category.data) {
      return res.status(200).json({
        ok: true,
        msg: "No se encontró la categoría",
      });
    }

    if (category.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener la categoría",
      });
    }

    return res.status(200).json({
      ok: true,
      data: category.data,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

export { createCategoryController, getCategoriesController, getCategoryController };

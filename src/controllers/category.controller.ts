import { Request, Response } from "express";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  inactivateCategory,
  activateCategory,
} from "../models/category.model";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../types/category.types";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const imagen_link = req.file;

    if (!name || !description || !imagen_link) {
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

    if (!newCategory.imagen_link) {
      return res.status(400).json({
        ok: false,
        msg: "Error al subir la imagen",
      });
    }

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

    const category = await getCategory(id as string);

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

const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const name = req.body.name?.trim() ?? "";
    const description = req.body.description?.trim() ?? "";
    const imagen_link = req.file;

    const categoryDB = await getCategory(id as string);

    if (categoryDB.data?.length === 0 || !categoryDB.data) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró la categoría",
      });
    }

    if (!name && !description && !imagen_link) {
      return res.status(400).json({
        ok: false,
        msg: "Error, No se ha proporcionado ningún campo para actualizar",
      });
    }

    if (description && (description.length < 10 || description.length > 255)) {
      return res.status(400).json({
        ok: false,
        msg: "La descripción debe tener entre 10 y 255 caracteres",
      });
    }

    const categoryUpdate: UpdateCategoryDTO = {};

    if (name) {
      categoryUpdate.name = name.toLowerCase();
    }

    if (description) {
      categoryUpdate.description = description.toLowerCase();
    }

    if (imagen_link) {
      categoryUpdate.imagen_link = imagen_link.path;
    }

    const category = await updateCategory(id as string, categoryUpdate);

    if (
      category.error?.code === "23505" &&
      category.error.message.includes("name")
    ) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe una categoría con ese nombre",
      });
    }

    if (category.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al actualizar la categoría",
        error: category.error,
      });
    }

    return res.status(200).json({
      ok: true,
      msg: "Categoría actualizada exitosamente",
      data: category.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const statusCategoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const categoryDB = await getCategory(id as string);

    if (categoryDB.data?.length === 0 || !categoryDB.data) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontró la categoría",
      });
    }

    if (categoryDB.data.status) {
      const category = await inactivateCategory(id as string);
      if (category.error || !category.data) {
        return res.status(400).json({
          ok: false,
          msg: "Error al inactivar la categoría",
          error: category.error,
        });
      }
    }

    if (!categoryDB.data.status) {
      const category = await activateCategory(id as string);
      if (category.error || !category.data) {
        return res.status(400).json({
          ok: false,
          msg: "Error al activar la categoría",
          error: category.error,
        });
      }
    }

    return res.status(201).json({
      ok: true,
      msg: "Categoría actualizada exitosamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

export {
  createCategoryController,
  getCategoriesController,
  getCategoryController,
  updateCategoryController,
  statusCategoryController,
};

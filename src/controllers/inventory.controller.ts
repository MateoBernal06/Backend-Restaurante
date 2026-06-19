import {
  createInventory,
  getAllInventory,
  getInventory,
  getInventoryByProduct
} from "../models/inventory.model";
import { Response, Request } from "express";
import { getProduct } from "../models/product.model";
import { updateProductStock } from "../controllers/product.controller";
import { CreateInventory } from "../types/inventory.types";

const createInventoryController = async (req: Request, res: Response) => {
  try {
    const { product_id, type, quantity, reason } = req.body;
    const user_id = req.userId;

    if (!product_id || !type || !quantity || !reason) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos obligatorios",
      });
    }

    const product = await getProduct(product_id);

    if (!product || product.error) {
      return res.status(400).json({
        ok: false,
        msg: "El producto no existe",
      });
    }

    if (!["entrada", "salida"].includes(type)) {
      return res.status(400).json({
        ok: false,
        msg: "Tipo inválido: solo se permite 'entrada' o 'salida",
      });
    }

    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({
        ok: false,
        msg: "La cantidad debe ser un número mayor a 0",
      });
    }

    if (reason.length < 3 || reason.length > 50) {
      return res.status(400).json({
        ok: false,
        msg: "El motivo debe tener entre 3 y 50 caracteres",
      });
    }

    type inventoryController = { data: any; note: string } | undefined;
    let stockResult: inventoryController;

    try {
      stockResult = await updateProductStock({
        product_id,
        quantity: parsedQuantity,
        type,
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        msg:
          error instanceof Error
            ? error.message
            : "Error al actualizar el stock",
      });
    }

    if (!stockResult) {
      return res.status(400).json({
        ok: false,
        msg: "No fue posible actualizar el stock",
      });
    }

    const newInventory: CreateInventory = {
      user_id: user_id as string,
      product_id,
      type,
      quantity: parsedQuantity,
      reason: reason.trim().toLowerCase(),
    };

    const inventory = await createInventory(newInventory);

    if (inventory.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al crear el registro",
      });
    }

    return res.status(201).json({
      ok: true,
      msg: "Registro creado exitosamente",
      note: stockResult.note,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getAllInventoryController = async (req: Request, res: Response) => {
  try {
    const movements = await getAllInventory();

    if (movements.data?.length === 0 || !movements.data) {
      return res.status(200).json({
        ok: true,
        msg: "No hay movimientos registrados",
      });
    }

    if (movements.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener los movimientos",
      });
    }

    return res.status(200).json({
      ok: true,
      data: movements.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getInventoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movement = await getInventory(id as string);

    if (movement.data?.length === 0 || !movement.data) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontro el movimiento",
      });
    }

    if (movement.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener el movimiento",
      });
    }

    return res.status(200).json({
      ok: true,
      data: movement.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getInventoryByProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const movement = await getInventoryByProduct(id as string);

    if (movement.data?.length === 0 || !movement.data) {
      return res.status(400).json({
        ok: false,
        msg: "No se encontro el movimiento",
      });
    }

    if (movement.error) {
      return res.status(400).json({
        ok: false,
        msg: "Error al obtener el movimiento",
      });
    }

    return res.status(200).json({
      ok: true,
      data: movement.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

export {
  createInventoryController,
  getAllInventoryController,
  getInventoryController,
  getInventoryByProductController
};

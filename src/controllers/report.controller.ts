import {
  getLowStockProducts,
  getInventoryValue,
  getMovementsByDate,
} from "../models/report.model";
import { Response, Request } from "express";

const getLowStockProductsContoller = async (req: Request, res: Response) => {
  try {
    const report = await getLowStockProducts();

    if (report.error) {
      return res.status(500).json({
        ok: false,
        msg: "Error al obtener los productos",
      });
    }

    if (!report.data) {
      return res.status(500).json({
        ok: false,
        msg: "No se pudieron obtener los datos de productos",
      });
    }

    return res.status(200).json({
      ok: true,
      data: report.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getInventoryValueContoller = async (req: Request, res: Response) => {
  try {
    const report = await getInventoryValue();

    if (report.error) {
      return res.status(500).json({
        ok: false,
        msg: "Error al obtener los datos de los productos",
      });
    }

    if (!report.data) {
      return res.status(500).json({
        ok: false,
        msg: "No se pudieron obtener los datos de productos",
      });
    }

    return res.status(200).json({
      ok: true,
      data: report.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

const getMovementsByDateContoller = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        ok: false,
        msg: "La fecha de incio y fin son obligatorios",
      });
    }

    const report = await getMovementsByDate(
      startDate as string,
      endDate as string,
    );

    if (report.error) {
      return res.status(500).json({
        ok: false,
        msg: "Error al obtener los datos de los productos",
      });
    }

    return res.status(200).json({
      ok: true,
      data: report.data,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno en servidor",
    });
  }
};

export {
  getLowStockProductsContoller,
  getInventoryValueContoller,
  getMovementsByDateContoller,
};

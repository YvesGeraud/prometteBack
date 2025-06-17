import { Request, Response } from "express";
import CtConsumiblesProveedorService from "../services/ct_consumibles_proveedor.service";

class CtConsumiblesProveedorController {
  async getConsumiblesProveedor(req: Request, res: Response) {
    try {
      const consumiblesProveedor =
        await CtConsumiblesProveedorService.obtenerConsumiblesProveedor();
      res.status(200).json(consumiblesProveedor);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener consumibles proveedor en el controlador",
      });
      console.error(
        "Error al obtener consumibles proveedor en el controlador:",
        error
      );
    }
  }

  //* Crear un consumible proveedor
  async crearConsumibleProveedor(req: Request, res: Response) {
    try {
      const data = req.body;
      const consumibleProveedor =
        await CtConsumiblesProveedorService.crearConsumibleProveedor(data);
      res.status(200).json(consumibleProveedor);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el consumible proveedor en el controlador",
      });
      console.error(
        "Error al crear el consumible proveedor en el controlador:",
        error
      );
    }
  }
}

export default new CtConsumiblesProveedorController();

import { Request, Response } from "express";
import CtFuncionService from "../services/ct_funcion.service";

class CtFuncionController {
  async getFunciones(req: Request, res: Response) {
    try {
      const funciones = await CtFuncionService.obtenerFunciones();
      res.status(200).json(funciones);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener funciones en el controlador" });
      console.error("Error al obtener funciones en el controlador:", error);
    }
  }
}

export default new CtFuncionController();

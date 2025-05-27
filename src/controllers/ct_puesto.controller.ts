import { Request, Response } from "express";
import CtPuestoService from "../services/ct_puesto.service";

class CtPuestoController {
  async getPuestos(req: Request, res: Response) {
    try {
      const puestos = await CtPuestoService.obtenerPuestos();
      res.status(200).json(puestos);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener puestos en el controlador" });
      console.error("Error al obtener puestos en el controlador:", error);
    }
  }

  //* obtener un puesto por su id
  async obtenerPuestoPorId(req: Request, res: Response) {
    const { id } = req.params;
    const puesto = await CtPuestoService.obtenerPuestoPorId(Number(id));
    res.status(200).json(puesto);
  }

  //* obtener funciones por puesto
  async obtenerFuncionesPorPuesto(req: Request, res: Response) {
    const { id } = req.params;
    const funciones = await CtPuestoService.obtenerFuncionesPorPuesto(
      Number(id)
    );
    res.status(200).json(funciones);
  }
}

export default new CtPuestoController();

import { Request, Response } from "express";
import CtUsuarioService from "../services/ct_usuario.service";

class CtUsuarioController {
  async obtenerUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await CtUsuarioService.obtenerUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener usuarios en el controlador" });
      console.error("Error al obtener usuarios en el controlador:", error);
    }
  }

  //* obtener un usuario por su id
  async obtenerUsuarioPorId(req: Request, res: Response) {
    const { id } = req.params;
    const usuario = await CtUsuarioService.obtenerUsuarioPorId(Number(id));
    res.status(200).json(usuario);
  }

  //* obtener funciones por usuario
  async obtenerFuncionesPorUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const funciones = await CtUsuarioService.obtenerFuncionesPorUsuario(
      Number(id)
    );
    res.status(200).json(funciones);
  }

  //* obtener puestos por usuario
  async obtenerPuestosPorUsuario(req: Request, res: Response) {
    const { id } = req.params;
    const puestos = await CtUsuarioService.obtenerPuestosPorUsuario(Number(id));
    res.status(200).json(puestos);
  }
}

export default new CtUsuarioController();

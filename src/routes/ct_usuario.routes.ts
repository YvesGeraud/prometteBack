import { Router } from "express";
import CtUsuarioController from "../controllers/ct_usuario.controller";

const router = Router();

//* Obtener todos los usuarios
router.get("/", CtUsuarioController.obtenerUsuarios);

//* Obtener un usuario por su ID
router.get("/:id", CtUsuarioController.obtenerUsuarioPorId);

//* Obtener funciones por usuario
router.get("/:id/funciones", CtUsuarioController.obtenerFuncionesPorUsuario);

//* Obtener puestos por usuario
router.get("/:id/puestos", CtUsuarioController.obtenerPuestosPorUsuario);

export default router;

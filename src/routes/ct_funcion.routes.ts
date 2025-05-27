import { Router } from "express";
import CtFuncionController from "../controllers/ct_funcion.controller";

const router = Router();

//* Obtener todos los puestos
router.get("/", CtFuncionController.getFunciones);

//* Obtener un puesto por su ID
//router.get("/:id", ctPuestoController.getPuestoById);

export default router;

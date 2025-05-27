import { Router } from "express";
import CtPuestoController from "../controllers/ct_puesto.controller";

const router = Router();

//* Obtener todos los puestos
router.get("/", CtPuestoController.getPuestos);

//* Obtener un puesto por su ID
router.get("/:id", CtPuestoController.obtenerPuestoPorId);

//* Obtener funciones por puesto
router.get("/:id/funciones", CtPuestoController.obtenerFuncionesPorPuesto);

export default router;

import { Router } from "express";
import CtConsumiblesProveedorController from "../controllers/ct_consumibles_proveedor.controller";

const router = Router();

//* Obtener todos los consumibles proveedor
router.get("/", CtConsumiblesProveedorController.getConsumiblesProveedor);

//* Obtener un consumible proveedor por su ID
//router.get("/:id", ctPuestoController.getPuestoById);

export default router;

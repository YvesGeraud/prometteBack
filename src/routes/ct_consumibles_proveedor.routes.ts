import { Router } from "express";
import CtConsumiblesProveedorController from "../controllers/ct_consumibles_proveedor.controller";

const router = Router();

//* Obtener todos los consumibles proveedor
router.get("/", CtConsumiblesProveedorController.getConsumiblesProveedor);

//* Crear un consumible proveedor
router.post("/", CtConsumiblesProveedorController.crearConsumibleProveedor);

export default router;

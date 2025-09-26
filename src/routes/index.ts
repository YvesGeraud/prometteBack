import { Router } from "express";

import authRoutes from "./authRoutes";
import reportesRoutes from "./reportes.routes";

//catalogos
import ctBitacoraAccionRoutes from "./ct_bitacora_accion.route";
import ctBitacoraEntidadRoutes from "./ct_bitacora_entidad.routes";
import ctCapituloRoutes from "./ct_capitulo.routes";
import ctConsumiblesProveedorRoutes from "./ct_consumibles_proveedor.route";
import ctConsumibleFacturaRoutes from "./ct_consumible_factura.routes";
import ctCorrespondenciaEstadoRoutes from "./ct_correspondencia_estado.routes";

/*import entidadRoutes from "./entidad.route";
import municipioRoutes from "./municipio.route";
import localidadRoutes from "./localidad.route";*/

const router = Router();

// Montar las rutas con sus prefijos
//router.use("/auth", authRoutes);
//router.use("/reportes", reportesRoutes);

//catalogos
router.use("/ct_bitacora_accion", ctBitacoraAccionRoutes);
router.use("/ct_bitacora_entidad", ctBitacoraEntidadRoutes);
router.use("/ct_capitulo", ctCapituloRoutes);
router.use("/ct_consumibles_proveedor", ctConsumiblesProveedorRoutes);
router.use("/ct_consumible_factura", ctConsumibleFacturaRoutes);
router.use("/ct_correspondencia_estado", ctCorrespondenciaEstadoRoutes);

/*router.use("/entidad", entidadRoutes);
router.use("/municipio", municipioRoutes);
router.use("/localidad", localidadRoutes);*/

// Ruta de salud para las APIs
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;

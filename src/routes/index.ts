import { Router } from "express";

import authRoutes from "./authRoutes";
import reportesRoutes from "./reportes.routes";

//catalogos
import ctBitacoraAccionRoutes from "./ct_bitacora_accion.route";

/*import entidadRoutes from "./entidad.route";
import municipioRoutes from "./municipio.route";
import localidadRoutes from "./localidad.route";*/

const router = Router();

// Montar las rutas con sus prefijos
//router.use("/auth", authRoutes);
//router.use("/reportes", reportesRoutes);

//catalogos
router.use("/ct_bitacora_accion", ctBitacoraAccionRoutes);

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

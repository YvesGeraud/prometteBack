import { Router } from "express";
import { DtInformesAneecBaseController } from "../controllers/dt_informes_aneec.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtInformesAneecSchema,
  actualizarDtInformesAneecSchema,
  dtInformesAneecIdParamSchema,
  dtInformesAneecFiltrosSchema,
  eliminarDtInformesAneecSchema,
} from "../schemas/dt_informes_aneec.schema";

//TODO ===== RUTAS PARA DT_INFORMES_ANEEC CON BASE SERVICE =====

const router = Router();
const dtInformesAneecController = new DtInformesAneecBaseController();

// 📦 Obtener todos los informes aneec con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtInformesAneecFiltrosSchema }),
  dtInformesAneecController.obtenerTodosLosInformesAneec
);

// 📦 Obtener informe aneec específico por ID
router.get(
  "/:id_dt_informes_aneec",
  validarRequest({ params: dtInformesAneecIdParamSchema }),
  dtInformesAneecController.obtenerInformeAneecPorId
);

// 📦 Crear nuevo informe aneec
router.post(
  "/",
  validarRequest({ body: crearDtInformesAneecSchema }),
  dtInformesAneecController.crearInformeAneec
);

// 📦 Actualizar informe aneec existente
router.put(
  "/:id_dt_informes_aneec",
  validarRequest({
    params: dtInformesAneecIdParamSchema,
    body: actualizarDtInformesAneecSchema,
  }),
  dtInformesAneecController.actualizarInformeAneec
);

// 📦 Eliminar informe aneec
router.delete(
  "/:id_dt_informes_aneec",
  validarRequest({
    params: dtInformesAneecIdParamSchema,
    body: eliminarDtInformesAneecSchema,
  }),
  dtInformesAneecController.eliminarInformeAneec
);

export default router;

// 🎉 API REST completa para dt_informes_aneec:
// GET    /api/dt_informes_aneec          - Listar con filtros/paginación
// GET    /api/dt_informes_aneec/:id      - Obtener por ID
// POST   /api/dt_informes_aneec          - Crear
// PUT    /api/dt_informes_aneec/:id      - Actualizar
// DELETE /api/dt_informes_aneec/:id      - Eliminar

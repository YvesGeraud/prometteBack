import { Router } from "express";
import { DtFuncionBaseController } from "../controllers/dt_funcion.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearDtFuncionSchema,
  actualizarDtFuncionSchema,
  dtFuncionIdParamSchema,
  dtFuncionFiltrosSchema,
  eliminarDtFuncionSchema,
} from "../schemas/dt_funcion.schema";

//TODO ===== RUTAS PARA DT_FUNCION CON BASE SERVICE =====

const router = Router();
const dtFuncionController = new DtFuncionBaseController();

// 📦 Obtener todas las entidades con filtros y paginación
router.get(
  "/",
  validarRequest({ query: dtFuncionFiltrosSchema }),
  dtFuncionController.obtenerTodasLasDtFunciones
);

// 📦 Obtener dt_funcion específica por ID
router.get(
  "/:id_dt_funcion",
  validarRequest({ params: dtFuncionIdParamSchema }),
  dtFuncionController.obtenerDtFuncionPorId
);

// 📦 Crear nueva dt_funcion
router.post(
  "/",
  validarRequest({ body: crearDtFuncionSchema }),
  dtFuncionController.crearDtFuncion
);

// 📦 Actualizar entidad existente
router.put(
  "/:id_dt_funcion",
  validarRequest({
    params: dtFuncionIdParamSchema,
    body: actualizarDtFuncionSchema,
  }),
  dtFuncionController.actualizarDtFuncion
);

// 📦 Eliminar entidad
router.delete(
  "/:id_dt_funcion",
  validarRequest({
    params: dtFuncionIdParamSchema,
    body: eliminarDtFuncionSchema,
  }),
  dtFuncionController.eliminarDtFuncion
);

export default router;

// 🎉 API REST completa para dt_funcion:
// GET    /api/dt_funcion          - Listar con filtros/paginación
// GET    /api/dt_funcion/:id      - Obtener por ID
// POST   /api/dt_funcion          - Crear
// PUT    /api/dt_funcion/:id      - Actualizar
// DELETE /api/dt_funcion/:id      - Eliminar

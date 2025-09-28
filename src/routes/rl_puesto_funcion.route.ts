import { Router } from "express";
import { RlPuestoFuncionBaseController } from "../controllers/rl_puesto_funcion.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlPuestoFuncionSchema,
  actualizarRlPuestoFuncionSchema,
  rlPuestoFuncionIdParamSchema,
  rlPuestoFuncionFiltrosSchema,
  eliminarRlPuestoFuncionSchema,
} from "../schemas/rl_puesto_funcion.schema";

//TODO ===== RUTAS PARA RL_PUESTO_FUNCION CON BASE SERVICE =====

const router = Router();
const rlPuestoFuncionController = new RlPuestoFuncionBaseController();

// 📦 Obtener todas las relaciones puesto función con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlPuestoFuncionFiltrosSchema }),
  rlPuestoFuncionController.obtenerTodasLasPuestosFuncion
);

// 📦 Obtener relación puesto función específica por ID
router.get(
  "/:id_rl_puesto_funcion",
  validarRequest({ params: rlPuestoFuncionIdParamSchema }),
  rlPuestoFuncionController.obtenerPuestoFuncionPorId
);

// 📦 Crear nueva relación puesto función
router.post(
  "/",
  validarRequest({ body: crearRlPuestoFuncionSchema }),
  rlPuestoFuncionController.crearPuestoFuncion
);

// 📦 Actualizar relación puesto función existente
router.put(
  "/:id_rl_puesto_funcion",
  validarRequest({
    params: rlPuestoFuncionIdParamSchema,
    body: actualizarRlPuestoFuncionSchema,
  }),
  rlPuestoFuncionController.actualizarPuestoFuncion
);

// 📦 Eliminar relación puesto función
router.delete(
  "/:id_rl_puesto_funcion",
  validarRequest({
    params: rlPuestoFuncionIdParamSchema,
    body: eliminarRlPuestoFuncionSchema,
  }),
  rlPuestoFuncionController.eliminarPuestoFuncion
);

export default router;

// 🎉 API REST completa para rl_puesto_funcion:
// GET    /api/rl_puesto_funcion          - Listar con filtros/paginación
// GET    /api/rl_puesto_funcion/:id      - Obtener por ID
// POST   /api/rl_puesto_funcion          - Crear
// PUT    /api/rl_puesto_funcion/:id      - Actualizar
// DELETE /api/rl_puesto_funcion/:id      - Eliminar

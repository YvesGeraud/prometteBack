import { Router } from "express";
import { RlCorrespondenciaUsuarioEstadoBaseController } from "../controllers/rl_correspondencia_usuario_estado.controller";
import { validarRequest } from "../middleware/validacion";
import {
  crearRlCorrespondenciaUsuarioEstadoSchema,
  actualizarRlCorrespondenciaUsuarioEstadoSchema,
  rlCorrespondenciaUsuarioEstadoIdParamSchema,
  rlCorrespondenciaUsuarioEstadoFiltrosSchema,
  eliminarRlCorrespondenciaUsuarioEstadoSchema,
} from "../schemas/rl_correspondencia_usuario_estado.schema";

//TODO ===== RUTAS PARA RL_CORRESPONDENCIA_USUARIO_ESTADO CON BASE SERVICE =====

const router = Router();
const rlCorrespondenciaUsuarioEstadoController =
  new RlCorrespondenciaUsuarioEstadoBaseController();

// 📦 Obtener todas las relaciones correspondencia usuario estado con filtros y paginación
router.get(
  "/",
  validarRequest({ query: rlCorrespondenciaUsuarioEstadoFiltrosSchema }),
  rlCorrespondenciaUsuarioEstadoController.obtenerTodasLasCorrespondenciasUsuarioEstado
);

// 📦 Obtener relación correspondencia usuario estado específica por ID
router.get(
  "/:id_rl_correspondencia_usuario_estado",
  validarRequest({ params: rlCorrespondenciaUsuarioEstadoIdParamSchema }),
  rlCorrespondenciaUsuarioEstadoController.obtenerCorrespondenciaUsuarioEstadoPorId
);

// 📦 Crear nueva relación correspondencia usuario estado
router.post(
  "/",
  validarRequest({ body: crearRlCorrespondenciaUsuarioEstadoSchema }),
  rlCorrespondenciaUsuarioEstadoController.crearCorrespondenciaUsuarioEstado
);

// 📦 Actualizar relación correspondencia usuario estado existente
router.put(
  "/:id_rl_correspondencia_usuario_estado",
  validarRequest({
    params: rlCorrespondenciaUsuarioEstadoIdParamSchema,
    body: actualizarRlCorrespondenciaUsuarioEstadoSchema,
  }),
  rlCorrespondenciaUsuarioEstadoController.actualizarCorrespondenciaUsuarioEstado
);

// 📦 Eliminar relación correspondencia usuario estado
router.delete(
  "/:id_rl_correspondencia_usuario_estado",
  validarRequest({
    params: rlCorrespondenciaUsuarioEstadoIdParamSchema,
    body: eliminarRlCorrespondenciaUsuarioEstadoSchema,
  }),
  rlCorrespondenciaUsuarioEstadoController.eliminarCorrespondenciaUsuarioEstado
);

export default router;

// 🎉 API REST completa para rl_correspondencia_usuario_estado:
// GET    /api/rl_correspondencia_usuario_estado          - Listar con filtros/paginación
// GET    /api/rl_correspondencia_usuario_estado/:id      - Obtener por ID
// POST   /api/rl_correspondencia_usuario_estado          - Crear
// PUT    /api/rl_correspondencia_usuario_estado/:id      - Actualizar
// DELETE /api/rl_correspondencia_usuario_estado/:id      - Eliminar

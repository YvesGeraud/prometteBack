import { z } from "zod";
import {
  esquemaTextoRequerido,
  esquemaTextoOpcional,
  esquemaEstadoRequerido,
  esquemaEstadoOpcional,
  esquemaUsuarioCreacion,
  esquemaUsuarioActualizacion,
  esquemaFechaOpcional,
  esquemaQueryId,
  esquemaQueryTexto,
  esquemaQueryBoolean,
  esquemaPaginaQuery,
  esquemaLimiteQuery,
  esquemaParamId,
  esquemaDeleteConUsuario,
  esquemaNumeroRequerido,
  esquemaQueryNumeroRequerido,
  paginationSchema,
  idParamSchema,
  esquemaQueryNumeroOpcional,
  esquemaNumeroOpcional,
} from "./commonSchemas";

//TODO ===== SCHEMAS PARA RL_JUSTIFICACION =====

//? Esquema para crear una nueva relación justificación
export const crearRlJustificacionSchema = z.object({
  ct_partida_id: esquemaNumeroRequerido(1, 100000),
  ct_area_id: esquemaNumeroRequerido(1, 100000),
  dt_techo_id: esquemaNumeroOpcional(1, 100000),
  justificacion: esquemaTextoRequerido(1, 10000), // Text field
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación justificación
export const actualizarRlJustificacionSchema = z.object({
  ct_partida_id: esquemaNumeroOpcional(1, 100000),
  ct_area_id: esquemaNumeroOpcional(1, 100000),
  dt_techo_id: esquemaNumeroOpcional(1, 100000),
  justificacion: esquemaTextoOpcional(10000), // Text field
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones justificación
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlJustificacionFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_justificacion: esquemaQueryId,
  ct_partida_id: esquemaQueryNumeroOpcional,
  ct_area_id: esquemaQueryNumeroOpcional,
  dt_techo_id: esquemaQueryNumeroOpcional,
  justificacion: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones justificación
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlJustificacionInput = z.infer<
  typeof crearRlJustificacionSchema
>;
export type ActualizarRlJustificacionInput = z.infer<
  typeof actualizarRlJustificacionSchema
>;

export type BuscarRlJustificacionInput = z.infer<
  typeof rlJustificacionFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación justificación)
export const rlJustificacionIdParamSchema = z.object({
  id_rl_justificacion: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlJustificacionSchema = esquemaDeleteConUsuario;

export type RlJustificacionIdParam = z.infer<
  typeof rlJustificacionIdParamSchema
>;

export type EliminarRlJustificacionInput = z.infer<
  typeof eliminarRlJustificacionSchema
>;

/*
🎉 SCHEMA REFACTORIZADO CON ESQUEMAS BASE REUTILIZABLES

✅ Beneficios:
- ✨ Código más limpio y mantenible
- 🔄 Reutilización de validaciones comunes
- 📝 Consistencia en mensajes de error
- 🚀 Fácil actualización de validaciones globales
- 🛡️ Menos duplicación de código

🔧 Esquemas utilizados:
- esquemaTextoRequerido/Opcional - Para campos de texto
- esquemaEstadoRequerido/Opcional - Para campos booleanos de estado
- esquemaUsuarioCreacion/Actualización - Para auditoría de usuarios
- esquemaQueryId/Texto/Boolean - Para filtros en query parameters
- esquemaPaginaQuery/LimiteQuery - Para paginación
- esquemaParamId - Para parámetros de URL
- esquemaDeleteConUsuario - Para eliminación con auditoría
*/

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

//TODO ===== SCHEMAS PARA RL_CORRESPONDENCIA_USUARIO_ESTADO =====

//? Esquema para crear una nueva relación correspondencia usuario estado
export const crearRlCorrespondenciaUsuarioEstadoSchema = z.object({
  id_dt_correspondencia: esquemaNumeroRequerido(1, 100000),
  id_rl_usuario_puesto: esquemaNumeroRequerido(1, 100000),
  id_ct_correspondencia_estado: esquemaNumeroRequerido(1, 100000),
  tipo_turnado: z.enum(["respuesta", "consulta"]).default("respuesta"),
  observaciones: esquemaTextoOpcional(300),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación correspondencia usuario estado
export const actualizarRlCorrespondenciaUsuarioEstadoSchema = z.object({
  id_dt_correspondencia: esquemaNumeroOpcional(1, 100000),
  id_rl_usuario_puesto: esquemaNumeroOpcional(1, 100000),
  id_ct_correspondencia_estado: esquemaNumeroOpcional(1, 100000),
  tipo_turnado: z.enum(["respuesta", "consulta"]).optional(),
  observaciones: esquemaTextoOpcional(300),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones correspondencia usuario estado
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlCorrespondenciaUsuarioEstadoFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_correspondencia_usuario_estado: esquemaQueryId,
  id_dt_correspondencia: esquemaQueryNumeroOpcional,
  id_rl_usuario_puesto: esquemaQueryNumeroOpcional,
  id_ct_correspondencia_estado: esquemaQueryNumeroOpcional,
  tipo_turnado: z.enum(["respuesta", "consulta"]).optional(),
  observaciones: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones correspondencia usuario estado
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlCorrespondenciaUsuarioEstadoInput = z.infer<
  typeof crearRlCorrespondenciaUsuarioEstadoSchema
>;
export type ActualizarRlCorrespondenciaUsuarioEstadoInput = z.infer<
  typeof actualizarRlCorrespondenciaUsuarioEstadoSchema
>;

export type BuscarRlCorrespondenciaUsuarioEstadoInput = z.infer<
  typeof rlCorrespondenciaUsuarioEstadoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación correspondencia usuario estado)
export const rlCorrespondenciaUsuarioEstadoIdParamSchema = z.object({
  id_rl_correspondencia_usuario_estado: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlCorrespondenciaUsuarioEstadoSchema =
  esquemaDeleteConUsuario;

export type RlCorrespondenciaUsuarioEstadoIdParam = z.infer<
  typeof rlCorrespondenciaUsuarioEstadoIdParamSchema
>;

export type EliminarRlCorrespondenciaUsuarioEstadoInput = z.infer<
  typeof eliminarRlCorrespondenciaUsuarioEstadoSchema
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

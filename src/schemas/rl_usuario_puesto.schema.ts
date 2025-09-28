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

//TODO ===== SCHEMAS PARA RL_USUARIO_PUESTO =====

//? Esquema para crear una nueva relación usuario puesto
export const crearRlUsuarioPuestoSchema = z.object({
  id_ct_usuario: esquemaNumeroRequerido(1, 100000),
  id_ct_puesto: esquemaNumeroRequerido(1, 100000),
  id_area: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoRequerido,
  ct_usuario_in: esquemaUsuarioCreacion, // Campo específico para este modelo
});

//? Esquema para actualizar una relación usuario puesto
export const actualizarRlUsuarioPuestoSchema = z.object({
  id_ct_usuario: esquemaNumeroOpcional(1, 100000),
  id_ct_puesto: esquemaNumeroOpcional(1, 100000),
  id_area: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  ct_usuario_at: esquemaUsuarioCreacion, // Campo específico para este modelo
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones usuario puesto
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlUsuarioPuestoFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_usuario_puesto: esquemaQueryId,
  id_ct_usuario: esquemaQueryNumeroOpcional,
  id_ct_puesto: esquemaQueryNumeroOpcional,
  id_area: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones usuario puesto
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlUsuarioPuestoInput = z.infer<
  typeof crearRlUsuarioPuestoSchema
>;
export type ActualizarRlUsuarioPuestoInput = z.infer<
  typeof actualizarRlUsuarioPuestoSchema
>;

export type BuscarRlUsuarioPuestoInput = z.infer<
  typeof rlUsuarioPuestoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación usuario puesto)
export const rlUsuarioPuestoIdParamSchema = z.object({
  id_rl_usuario_puesto: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlUsuarioPuestoSchema = esquemaDeleteConUsuario;

export type RlUsuarioPuestoIdParam = z.infer<
  typeof rlUsuarioPuestoIdParamSchema
>;

export type EliminarRlUsuarioPuestoInput = z.infer<
  typeof eliminarRlUsuarioPuestoSchema
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

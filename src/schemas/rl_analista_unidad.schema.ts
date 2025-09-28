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

//TODO ===== SCHEMAS PARA RL_ANALISTA_UNIDAD =====

//? Esquema para crear una nueva relación analista unidad
export const crearRlAnalistaUnidadSchema = z.object({
  ct_usuario_id: esquemaNumeroRequerido(1, 100000),
  rl_area_financiero: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación analista unidad
export const actualizarRlAnalistaUnidadSchema = z.object({
  ct_usuario_id: esquemaNumeroOpcional(1, 100000),
  rl_area_financiero: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones analista unidad
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlAnalistaUnidadFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_analista_unidad: esquemaQueryId,
  ct_usuario_id: esquemaQueryNumeroOpcional,
  rl_area_financiero: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones analista unidad
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlAnalistaUnidadInput = z.infer<
  typeof crearRlAnalistaUnidadSchema
>;
export type ActualizarRlAnalistaUnidadInput = z.infer<
  typeof actualizarRlAnalistaUnidadSchema
>;

export type BuscarRlAnalistaUnidadInput = z.infer<
  typeof rlAnalistaUnidadFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación analista unidad)
export const rlAnalistaUnidadIdParamSchema = z.object({
  id_rl_analista_unidad: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlAnalistaUnidadSchema = esquemaDeleteConUsuario;

export type RlAnalistaUnidadIdParam = z.infer<
  typeof rlAnalistaUnidadIdParamSchema
>;

export type EliminarRlAnalistaUnidadInput = z.infer<
  typeof eliminarRlAnalistaUnidadSchema
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

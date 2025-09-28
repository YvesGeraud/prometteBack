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

//TODO ===== SCHEMAS PARA RL_PRODUCTO_AREA =====

//? Esquema para crear una nueva relación producto área
export const crearRlProductoAreaSchema = z.object({
  id_ct_producto_consumible: esquemaNumeroRequerido(1, 100000),
  id_area_infra: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación producto área
export const actualizarRlProductoAreaSchema = z.object({
  id_ct_producto_consumible: esquemaNumeroOpcional(1, 100000),
  id_area_infra: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones producto área
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlProductoAreaFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_producto_area: esquemaQueryId,
  id_ct_producto_consumible: esquemaQueryNumeroOpcional,
  id_area_infra: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones producto área
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlProductoAreaInput = z.infer<
  typeof crearRlProductoAreaSchema
>;
export type ActualizarRlProductoAreaInput = z.infer<
  typeof actualizarRlProductoAreaSchema
>;

export type BuscarRlProductoAreaInput = z.infer<
  typeof rlProductoAreaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación producto área)
export const rlProductoAreaIdParamSchema = z.object({
  id_rl_producto_area: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlProductoAreaSchema = esquemaDeleteConUsuario;

export type RlProductoAreaIdParam = z.infer<typeof rlProductoAreaIdParamSchema>;

export type EliminarRlProductoAreaInput = z.infer<
  typeof eliminarRlProductoAreaSchema
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

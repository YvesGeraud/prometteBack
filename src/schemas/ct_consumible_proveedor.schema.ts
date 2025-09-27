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

//TODO ===== SCHEMAS PARA CT_CONSUMIBLE_PROVEEDOR =====

//? Esquema para crear una nueva consumible proveedor
export const crearCtConsumibleProveedorSchema = z.object({
  razon_social: esquemaTextoRequerido(2),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una consumible proveedor
export const actualizarCtConsumibleProveedorSchema = z.object({
  razon_social: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de consumible proveedor
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctConsumibleProveedorFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_consumible_proveedor: esquemaQueryId,
  razon_social: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de consumible proveedor
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtConsumibleProveedorInput = z.infer<
  typeof crearCtConsumibleProveedorSchema
>;
export type ActualizarCtConsumibleProveedorInput = z.infer<
  typeof actualizarCtConsumibleProveedorSchema
>;

export type BuscarCtConsumibleProveedorInput = z.infer<
  typeof ctConsumibleProveedorFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de consumible proveedor)
export const ctConsumibleProveedorIdParamSchema = z.object({
  id_ct_consumible_proveedor: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtConsumibleProveedorSchema = esquemaDeleteConUsuario;

export type CtConsumibleProveedorIdParam = z.infer<
  typeof ctConsumibleProveedorIdParamSchema
>;

export type EliminarCtConsumibleProveedorInput = z.infer<
  typeof eliminarCtConsumibleProveedorSchema
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

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

//TODO ===== SCHEMAS PARA CT_CONSUMIBLE_FACTURA =====

//? Esquema para crear una nueva consumible factura
export const crearCtConsumibleFacturaSchema = z.object({
  factura: esquemaTextoRequerido(1, 100000),
  id_ct_consumible_proveedor: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una consumible factura
export const actualizarCtConsumibleFacturaSchema = z.object({
  factura: esquemaTextoOpcional(255),
  id_ct_consumible_proveedor: esquemaNumeroOpcional,
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de consumible factura
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctConsumibleFacturaFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_consumible_factura: esquemaQueryId,
  factura: esquemaQueryTexto,
  id_ct_consumible_proveedor: esquemaQueryId,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,
  incluir_ct_consumible_proveedor: esquemaQueryBoolean,

  //? Filtros para incluir inactivos de consumible factura
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtConsumibleFacturaInput = z.infer<
  typeof crearCtConsumibleFacturaSchema
>;
export type ActualizarCtConsumibleFacturaInput = z.infer<
  typeof actualizarCtConsumibleFacturaSchema
>;

export type BuscarCtConsumibleFacturaInput = z.infer<
  typeof ctConsumibleFacturaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de consumible factura)
export const ctConsumibleFacturaIdParamSchema = z.object({
  id_ct_consumible_factura: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtConsumibleFacturaSchema = esquemaDeleteConUsuario;

export type CtConsumibleFacturaIdParam = z.infer<
  typeof ctConsumibleFacturaIdParamSchema
>;

export type EliminarCtConsumibleFacturaInput = z.infer<
  typeof eliminarCtConsumibleFacturaSchema
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

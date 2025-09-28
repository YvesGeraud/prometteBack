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
  esquemaDecimalRequerido,
  esquemaDecimalOpcional,
} from "./commonSchemas";

//TODO ===== SCHEMAS PARA RL_PRODUCTO_REQUISICION =====

//? Esquema para crear una nueva relación producto requisición
export const crearRlProductoRequisicionSchema = z.object({
  id_rl_area_financiero: esquemaNumeroRequerido(1, 100000),
  id_dt_techo_presupuesto: esquemaNumeroRequerido(1, 100000),
  id_ct_producto_consumible: esquemaNumeroRequerido(1, 100000),
  cantidad: esquemaDecimalRequerido(0, 999999.999), // Decimal(10,3)
  mes: esquemaTextoRequerido(1, 2), // VARCHAR(2)
  total: esquemaDecimalRequerido(0, 999999999999.999), // Decimal(15,3)
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una relación producto requisición
export const actualizarRlProductoRequisicionSchema = z.object({
  id_rl_area_financiero: esquemaNumeroOpcional(1, 100000),
  id_dt_techo_presupuesto: esquemaNumeroOpcional(1, 100000),
  id_ct_producto_consumible: esquemaNumeroOpcional(1, 100000),
  cantidad: esquemaDecimalOpcional(0, 999999.999), // Decimal(10,3)
  mes: esquemaTextoOpcional(2), // VARCHAR(2)
  total: esquemaDecimalOpcional(0, 999999999999.999), // Decimal(15,3)
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de relaciones producto requisición
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const rlProductoRequisicionFiltrosSchema = z.object({
  //? Filtros específicos
  id_rl_producto_requisicion: esquemaQueryId,
  id_rl_area_financiero: esquemaQueryNumeroOpcional,
  id_dt_techo_presupuesto: esquemaQueryNumeroOpcional,
  id_ct_producto_consumible: esquemaQueryNumeroOpcional,
  cantidad: esquemaQueryNumeroOpcional,
  mes: esquemaQueryTexto,
  total: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de relaciones producto requisición
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearRlProductoRequisicionInput = z.infer<
  typeof crearRlProductoRequisicionSchema
>;
export type ActualizarRlProductoRequisicionInput = z.infer<
  typeof actualizarRlProductoRequisicionSchema
>;

export type BuscarRlProductoRequisicionInput = z.infer<
  typeof rlProductoRequisicionFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de relación producto requisición)
export const rlProductoRequisicionIdParamSchema = z.object({
  id_rl_producto_requisicion: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarRlProductoRequisicionSchema = esquemaDeleteConUsuario;

export type RlProductoRequisicionIdParam = z.infer<
  typeof rlProductoRequisicionIdParamSchema
>;

export type EliminarRlProductoRequisicionInput = z.infer<
  typeof eliminarRlProductoRequisicionSchema
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
- esquemaDecimalRequerido/Opcional - Para campos decimales
*/

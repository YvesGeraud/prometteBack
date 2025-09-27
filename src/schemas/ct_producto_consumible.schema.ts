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

//TODO ===== SCHEMAS PARA CT_PRODUCTO_CONSUMIBLE =====

//? Esquema para crear una nueva producto consumible
export const crearCtProductoConsumibleSchema = z.object({
  id_ct_partida: esquemaNumeroRequerido(1, 100000),
  nombre_producto: esquemaTextoRequerido(2, 50),
  precio: esquemaNumeroRequerido(1, 100000),
  id_ct_unidad_medida: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una producto consumible
export const actualizarCtProductoConsumibleSchema = z.object({
  id_ct_partida: esquemaNumeroOpcional(1, 100000),
  nombre_producto: esquemaTextoOpcional(50),
  precio: esquemaNumeroOpcional(1, 100000),
  id_ct_unidad_medida: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de producto consumible
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctProductoConsumibleFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_producto_consumible: esquemaQueryId,
  id_ct_partida: esquemaQueryNumeroOpcional,
  nombre_producto: esquemaQueryTexto,
  precio: esquemaQueryNumeroOpcional,
  id_ct_unidad_medida: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de producto consumible
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtProductoConsumibleInput = z.infer<
  typeof crearCtProductoConsumibleSchema
>;
export type ActualizarCtProductoConsumibleInput = z.infer<
  typeof actualizarCtProductoConsumibleSchema
>;

export type BuscarCtProductoConsumibleInput = z.infer<
  typeof ctProductoConsumibleFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de producto consumible)
export const ctProductoConsumibleIdParamSchema = z.object({
  id_ct_producto_consumible: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtProductoConsumibleSchema = esquemaDeleteConUsuario;

export type CtProductoConsumibleIdParam = z.infer<
  typeof ctProductoConsumibleIdParamSchema
>;

export type EliminarCtProductoConsumibleInput = z.infer<
  typeof eliminarCtProductoConsumibleSchema
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

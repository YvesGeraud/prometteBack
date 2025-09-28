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

//TODO ===== SCHEMAS PARA DT_CONSUMIBLE_INVENTARIO =====

//? Esquema para crear una nueva capitulo
export const crearDtConsumibleInventarioSchema = z.object({
  folio: esquemaTextoRequerido(2, 20),
  descripcion: esquemaTextoOpcional(255),
  cantidad: esquemaNumeroRequerido(1, 100000),
  resta: esquemaNumeroRequerido(1, 100000),
  id_ct_partida: esquemaNumeroRequerido(1, 100000),
  id_ct_unidad_medida: esquemaNumeroRequerido(1, 100000),
  id_ct_consumible_factura: esquemaNumeroRequerido(1, 100000),
  observaciones: esquemaTextoOpcional(255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una capitulo
export const actualizarDtConsumibleInventarioSchema = z.object({
  folio: esquemaTextoOpcional(20),
  descripcion: esquemaTextoOpcional(255),
  cantidad: esquemaNumeroOpcional(1, 100000),
  resta: esquemaNumeroOpcional(1, 100000),
  id_ct_partida: esquemaNumeroOpcional(1, 100000),
  id_ct_unidad_medida: esquemaNumeroOpcional(1, 100000),
  id_ct_consumible_factura: esquemaNumeroOpcional(1, 100000),
  observaciones: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtConsumibleInventarioFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_consumible_inventario: esquemaQueryId,
  folio: esquemaQueryNumeroOpcional,
  descripcion: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de consumible inventario
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtConsumibleInventarioInput = z.infer<
  typeof crearDtConsumibleInventarioSchema
>;
export type ActualizarDtConsumibleInventarioInput = z.infer<
  typeof actualizarDtConsumibleInventarioSchema
>;

export type BuscarDtConsumibleInventarioInput = z.infer<
  typeof dtConsumibleInventarioFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de capitulo)
export const dtConsumibleInventarioIdParamSchema = z.object({
  id_dt_consumible_inventario: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtConsumibleInventarioSchema = esquemaDeleteConUsuario;

export type DtConsumibleInventarioIdParam = z.infer<
  typeof dtConsumibleInventarioIdParamSchema
>;

export type EliminarDtConsumibleInventarioInput = z.infer<
  typeof eliminarDtConsumibleInventarioSchema
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

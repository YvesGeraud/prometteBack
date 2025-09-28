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

//TODO ===== SCHEMAS PARA DT_CONSUMIBLE_ENTREGA =====

//? Esquema para crear una nueva consumible entrega
export const crearDtConsumibleEntregaSchema = z.object({
  folio: esquemaTextoRequerido(2, 15),
  id_ct_area: esquemaNumeroRequerido(1, 100000),
  id_dt_consumible_inventario: esquemaNumeroRequerido(1, 100000),
  id_ct_unidad_medida: esquemaNumeroRequerido(1, 100000),
  id_rl_entrega_formato: esquemaNumeroOpcional(1, 100000),
  cantidad: esquemaNumeroRequerido(1, 100000),
  observaciones: esquemaTextoOpcional(255),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una consumible entrega
export const actualizarDtConsumibleEntregaSchema = z.object({
  folio: esquemaTextoOpcional(15),
  id_ct_area: esquemaNumeroOpcional(1, 100000),
  id_dt_consumible_inventario: esquemaNumeroOpcional(1, 100000),
  id_ct_unidad_medida: esquemaNumeroOpcional(1, 100000),
  id_rl_entrega_formato: esquemaNumeroOpcional(1, 100000),
  cantidad: esquemaNumeroOpcional(1, 100000),
  observaciones: esquemaTextoOpcional(255),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de consumible entrega
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtConsumibleEntregaFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_consumible_entrega: esquemaQueryId,
  folio: esquemaQueryNumeroOpcional,
  id_ct_area: esquemaQueryNumeroOpcional,
  id_dt_consumible_inventario: esquemaQueryNumeroOpcional,
  id_ct_unidad_medida: esquemaQueryNumeroOpcional,
  id_rl_entrega_formato: esquemaQueryNumeroOpcional,
  cantidad: esquemaQueryNumeroOpcional,
  observaciones: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de consumible entrega
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtConsumibleEntregaInput = z.infer<
  typeof crearDtConsumibleEntregaSchema
>;
export type ActualizarDtConsumibleEntregaInput = z.infer<
  typeof actualizarDtConsumibleEntregaSchema
>;

export type BuscarDtConsumibleEntregaInput = z.infer<
  typeof dtConsumibleEntregaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de consumible entrega)
export const dtConsumibleEntregaIdParamSchema = z.object({
  id_dt_consumible_entrega: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtConsumibleEntregaSchema = esquemaDeleteConUsuario;

export type DtConsumibleEntregaIdParam = z.infer<
  typeof dtConsumibleEntregaIdParamSchema
>;

export type EliminarDtConsumibleEntregaInput = z.infer<
  typeof eliminarDtConsumibleEntregaSchema
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

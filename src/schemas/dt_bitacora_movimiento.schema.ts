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

//TODO ===== SCHEMAS PARA DT_BITACORA_MOVIMIENTO =====

//? Esquema para crear una nueva capitulo
export const crearDtBitacoraMovimientoSchema = z.object({
  id_dt_bitacora_accion: esquemaNumeroRequerido(1, 100000),
  id_dt_bitacora_entidad: esquemaNumeroRequerido(1, 100000),
  id_registro_afectado: esquemaNumeroOpcional(1, 100000),
  id_ct_usuario: esquemaNumeroOpcional(1, 100000),
  ip_origen: esquemaTextoRequerido(2, 45),
  id_ct_dispositivo: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoRequerido,
  datos_anteriores: esquemaTextoOpcional(100000),
  datos_nuevos: esquemaTextoOpcional(100000),
  //id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una capitulo
export const actualizarDtBitacoraMovimientoSchema = z.object({
  id_dt_bitacora_accion: esquemaNumeroOpcional(1, 100000),
  id_dt_bitacora_entidad: esquemaNumeroOpcional(1, 100000),
  id_registro_afectado: esquemaNumeroOpcional(1, 100000),
  id_ct_usuario: esquemaNumeroOpcional(1, 100000),
  ip_origen: esquemaTextoOpcional(45),
  id_ct_dispositivo: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  datos_anteriores: esquemaTextoOpcional(100000),
  datos_nuevos: esquemaTextoOpcional(100000),
  //id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  //fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtBitacoraMovimientoFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_bitacora_movimiento: esquemaQueryId,
  id_dt_bitacora_accion: esquemaQueryNumeroOpcional,
  id_dt_bitacora_entidad: esquemaQueryNumeroOpcional,
  id_registro_afectado: esquemaQueryNumeroOpcional,
  id_ct_usuario: esquemaQueryNumeroOpcional,
  ip_origen: esquemaQueryTexto,
  id_ct_dispositivo: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  datos_anteriores: esquemaQueryTexto,
  datos_nuevos: esquemaQueryTexto,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de capitulos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtBitacoraMovimientoInput = z.infer<
  typeof crearDtBitacoraMovimientoSchema
>;
export type ActualizarDtBitacoraMovimientoInput = z.infer<
  typeof actualizarDtBitacoraMovimientoSchema
>;

export type BuscarDtBitacoraMovimientoInput = z.infer<
  typeof dtBitacoraMovimientoFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de capitulo)
export const dtBitacoraMovimientoIdParamSchema = z.object({
  id_dt_bitacora_movimiento: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtBitacoraMovimientoSchema = esquemaDeleteConUsuario;

export type DtBitacoraMovimientoIdParam = z.infer<
  typeof dtBitacoraMovimientoIdParamSchema
>;

export type EliminarDtBitacoraMovimientoInput = z.infer<
  typeof eliminarDtBitacoraMovimientoSchema
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

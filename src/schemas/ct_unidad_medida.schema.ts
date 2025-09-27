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

//TODO ===== SCHEMAS PARA CT_UNIDAD_MEDIDA =====

//? Esquema para crear una nueva unidad medida
export const crearCtUnidadMedidaSchema = z.object({
  clave_unidad: esquemaNumeroRequerido(1, 100000),
  nombre_unidad: esquemaTextoRequerido(2, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una unidad medida
export const actualizarCtUnidadMedidaSchema = z.object({
  clave_unidad: esquemaNumeroOpcional(1, 100000),
  nombre_unidad: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de unidades medidas
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctUnidadMedidaFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_unidad_medida: esquemaQueryId,
  clave_unidad: esquemaQueryNumeroOpcional,
  nombre_unidad: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de unidades medidas
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtUnidadMedidaInput = z.infer<
  typeof crearCtUnidadMedidaSchema
>;
export type ActualizarCtUnidadMedidaInput = z.infer<
  typeof actualizarCtUnidadMedidaSchema
>;

export type BuscarCtUnidadMedidaInput = z.infer<
  typeof ctUnidadMedidaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de capitulo)
export const ctUnidadMedidaIdParamSchema = z.object({
  id_ct_unidad_medida: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtUnidadMedidaSchema = esquemaDeleteConUsuario;

export type CtUnidadMedidaIdParam = z.infer<typeof ctUnidadMedidaIdParamSchema>;

export type EliminarCtUnidadMedidaInput = z.infer<
  typeof eliminarCtUnidadMedidaSchema
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

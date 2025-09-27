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

//TODO ===== SCHEMAS PARA CT_DOCUMENTOS_ANNEC =====

//? Esquema para crear una nueva tipo de documento
export const crearCtDocumentosAnnecSchema = z.object({
  nombre: esquemaTextoRequerido(2, 50),
  //vigencia: esquemaEstadoRequerido,
  /*estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,*/
});

//? Esquema para actualizar una tipo de documento
export const actualizarCtDocumentosAnnecSchema = z.object({
  nombre: esquemaTextoOpcional(50),
  //vigencia: esquemaEstadoOpcional,
  /*estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_in: esquemaFechaOpcional,*/
});

//? Schema para filtros y paginación de tipo de documento
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctDocumentosAnnecFiltrosSchema = z.object({
  //? Filtros específicos
  id_tipo_documento: esquemaQueryId,
  nombre: esquemaQueryTexto,
  vigencia: esquemaQueryBoolean,
  /*estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,*/

  //? Filtros para incluir inactivos de tipo de documento
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtDocumentosAnnecInput = z.infer<
  typeof crearCtDocumentosAnnecSchema
>;
export type ActualizarCtDocumentosAnnecInput = z.infer<
  typeof actualizarCtDocumentosAnnecSchema
>;

export type BuscarCtDocumentosAnnecInput = z.infer<
  typeof ctDocumentosAnnecFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de tipo de documento)
export const ctDocumentosAnnecIdParamSchema = z.object({
  id_tipo_documento: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtDocumentosAnnecSchema = esquemaDeleteConUsuario;

export type CtDocumentosAnnecIdParam = z.infer<
  typeof ctDocumentosAnnecIdParamSchema
>;

export type EliminarCtDocumentosAnnecInput = z.infer<
  typeof eliminarCtDocumentosAnnecSchema
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

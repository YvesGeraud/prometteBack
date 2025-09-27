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
export const crearCtDocumentoAnnecSchema = z.object({
  nombre: esquemaTextoRequerido(2, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una tipo de documento
export const actualizarCtDocumentoAnnecSchema = z.object({
  nombre: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion,
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de tipo de documento
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctDocumentoAnnecFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_documento_aneec: esquemaQueryId,
  nombre: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de tipo de documento
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtDocumentoAnnecInput = z.infer<
  typeof crearCtDocumentoAnnecSchema
>;
export type ActualizarCtDocumentoAnnecInput = z.infer<
  typeof actualizarCtDocumentoAnnecSchema
>;

export type BuscarCtDocumentoAnnecInput = z.infer<
  typeof ctDocumentoAnnecFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de tipo de documento)
export const ctDocumentoAnnecIdParamSchema = z.object({
  id_ct_documento_aneec: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtDocumentoAnnecSchema = esquemaDeleteConUsuario;

export type CtDocumentoAnnecIdParam = z.infer<
  typeof ctDocumentoAnnecIdParamSchema
>;

export type EliminarCtDocumentoAnnecInput = z.infer<
  typeof eliminarCtDocumentoAnnecSchema
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

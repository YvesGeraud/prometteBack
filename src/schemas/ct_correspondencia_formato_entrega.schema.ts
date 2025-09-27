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

//TODO ===== SCHEMAS PARA CT_CORRESPONDENCIA_FORMATO_ENTREGA =====

//? Esquema para crear una nueva correspondencia formato entrega
export const crearCtCorrespondenciaFormatoEntregaSchema = z.object({
  nombre: esquemaTextoRequerido(2, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una correspondencia formato entrega
export const actualizarCtCorrespondenciaFormatoEntregaSchema = z.object({
  nombre: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion,
  fecha_in: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctCorrespondenciaFormatoEntregaFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_correspondencia_formato_entrega: esquemaQueryId,
  nombre: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de correspondencia formatos entrega
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearCtCorrespondenciaFormatoEntregaInput = z.infer<
  typeof crearCtCorrespondenciaFormatoEntregaSchema
>;
export type ActualizarCtCorrespondenciaFormatoEntregaInput = z.infer<
  typeof actualizarCtCorrespondenciaFormatoEntregaSchema
>;

export type BuscarCtCorrespondenciaFormatoEntregaInput = z.infer<
  typeof ctCorrespondenciaFormatoEntregaFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de capitulo)
export const ctCorrespondenciaFormatoEntregaIdParamSchema = z.object({
  id_ct_correspondencia_formato_entrega: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarCtCorrespondenciaFormatoEntregaSchema =
  esquemaDeleteConUsuario;

export type CtCorrespondenciaFormatoEntregaIdParam = z.infer<
  typeof ctCorrespondenciaFormatoEntregaIdParamSchema
>;

export type EliminarCtCorrespondenciaFormatoEntregaInput = z.infer<
  typeof eliminarCtCorrespondenciaFormatoEntregaSchema
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

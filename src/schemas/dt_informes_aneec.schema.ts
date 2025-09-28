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

//TODO ===== SCHEMAS PARA DT_INFORMES_ANEEC =====

//? Esquema para crear un nuevo informe aneec
export const crearDtInformesAneecSchema = z.object({
  ruta_informe: esquemaTextoRequerido(1, 50),
  id_dt_aspirante_aneec: esquemaNumeroRequerido(1, 100000),
  id_dt_diagnostico_aneec: esquemaNumeroRequerido(1, 100000),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar un informe aneec
export const actualizarDtInformesAneecSchema = z.object({
  ruta_informe: esquemaTextoOpcional(50),
  id_dt_aspirante_aneec: esquemaNumeroOpcional(1, 100000),
  id_dt_diagnostico_aneec: esquemaNumeroOpcional(1, 100000),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de informes aneec
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtInformesAneecFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_informes_aneec: esquemaQueryId,
  ruta_informe: esquemaQueryTexto,
  id_dt_aspirante_aneec: esquemaQueryNumeroOpcional,
  id_dt_diagnostico_aneec: esquemaQueryNumeroOpcional,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de informes aneec
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtInformesAneecInput = z.infer<
  typeof crearDtInformesAneecSchema
>;
export type ActualizarDtInformesAneecInput = z.infer<
  typeof actualizarDtInformesAneecSchema
>;

export type BuscarDtInformesAneecInput = z.infer<
  typeof dtInformesAneecFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de informe aneec)
export const dtInformesAneecIdParamSchema = z.object({
  id_dt_informes_aneec: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtInformesAneecSchema = esquemaDeleteConUsuario;

export type DtInformesAneecIdParam = z.infer<
  typeof dtInformesAneecIdParamSchema
>;

export type EliminarDtInformesAneecInput = z.infer<
  typeof eliminarDtInformesAneecSchema
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

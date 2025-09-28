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

//TODO ===== SCHEMAS PARA DT_DIAGNOSTICO_ANEEC =====

//? Esquema para crear una nueva diagnostico aneec
export const crearDtDiagnosticoAneecSchema = z.object({
  curp: esquemaTextoRequerido(18, 18),
  nombreCompleto: esquemaTextoRequerido(100, 100),
  ct_municipio_id: esquemaNumeroRequerido(1, 100000),
  tipo_necesidad: esquemaTextoRequerido(100, 100),
  rehabilitacion_fisica: esquemaTextoRequerido(1, 1),
  ruta_diagnostico: esquemaTextoRequerido(50, 50),
  id_dt_aspirante_aneec: esquemaNumeroRequerido(1, 100000),
  ruta_INE_tutor: esquemaTextoRequerido(50, 50),
  ruta_acta_nacimiento_usuario: esquemaTextoRequerido(50, 50),
  ruta_comprobante_domicilio: esquemaTextoRequerido(50, 50),
  ruta_privacidad_usuario: esquemaTextoRequerido(50, 50),
  ruta_carta_compromiso_usuario: esquemaTextoRequerido(50, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una diagnostico aneec
export const actualizarDtDiagnosticoAneecSchema = z.object({
  curp: esquemaTextoOpcional(18),
  nombreCompleto: esquemaTextoOpcional(100),
  ct_municipio_id: esquemaNumeroOpcional(1, 100000),
  tipo_necesidad: esquemaTextoOpcional(100),
  rehabilitacion_fisica: esquemaTextoOpcional(1),
  ruta_diagnostico: esquemaTextoOpcional(50),
  id_dt_aspirante_aneec: esquemaNumeroOpcional(1, 100000),
  ruta_INE_tutor: esquemaTextoOpcional(50),
  ruta_acta_nacimiento_usuario: esquemaTextoOpcional(50),
  ruta_comprobante_domicilio: esquemaTextoOpcional(50),
  ruta_privacidad_usuario: esquemaTextoOpcional(50),
  ruta_carta_compromiso_usuario: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de diagnostico aneec
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtDiagnosticoAneecFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_diagnostico_aneec: esquemaQueryId,
  curp: esquemaQueryTexto,
  nombreCompleto: esquemaQueryTexto,
  ct_municipio_id: esquemaQueryNumeroOpcional,
  tipo_necesidad: esquemaQueryTexto,
  rehabilitacion_fisica: esquemaQueryTexto,
  ruta_diagnostico: esquemaQueryTexto,
  id_dt_aspirante_aneec: esquemaQueryNumeroOpcional,
  ruta_INE_tutor: esquemaQueryTexto,
  ruta_acta_nacimiento_usuario: esquemaQueryTexto,
  ruta_comprobante_domicilio: esquemaQueryTexto,
  ruta_privacidad_usuario: esquemaQueryTexto,
  ruta_carta_compromiso_usuario: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de diagnóstico aneec
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtDiagnosticoAneecInput = z.infer<
  typeof crearDtDiagnosticoAneecSchema
>;
export type ActualizarDtDiagnosticoAneecInput = z.infer<
  typeof actualizarDtDiagnosticoAneecSchema
>;

export type BuscarDtDiagnosticoAneecInput = z.infer<
  typeof dtDiagnosticoAneecFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de diagnostico aneec)
export const dtDiagnosticoAneecIdParamSchema = z.object({
  id_dt_diagnostico_aneec: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtDiagnosticoAneecSchema = esquemaDeleteConUsuario;

export type DtDiagnosticoAneecIdParam = z.infer<
  typeof dtDiagnosticoAneecIdParamSchema
>;

export type EliminarDtDiagnosticoAneecInput = z.infer<
  typeof eliminarDtDiagnosticoAneecSchema
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

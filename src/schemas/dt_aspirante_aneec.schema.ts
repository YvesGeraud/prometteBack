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
  esquemaFechaRequerida,
} from "./commonSchemas";

//TODO ===== SCHEMAS PARA DT_ASPIRANTE_ANEEC =====

//? Esquema para crear una nueva capitulo
export const crearDtAspiranteAneecSchema = z.object({
  curp: esquemaTextoRequerido(18, 18),
  nombre: esquemaTextoRequerido(2, 50),
  apellido_paterno: esquemaTextoRequerido(2, 50),
  apellido_materno: esquemaTextoRequerido(2, 50),
  telefono: esquemaTextoRequerido(15, 15),
  correo: esquemaTextoRequerido(50, 50),
  fecha_nacimiento: esquemaFechaRequerida,
  instituto: esquemaTextoRequerido(100, 100),
  licenciatura: esquemaTextoRequerido(50, 50),
  direccion: esquemaTextoRequerido(50, 50),
  codigo_postal: esquemaTextoRequerido(10, 10),
  ct_municipio_id: esquemaNumeroRequerido(1, 100000),
  localidad: esquemaTextoRequerido(100, 100),
  ruta_ine: esquemaTextoRequerido(50, 50),
  tipo_documento: esquemaTextoRequerido(45, 45),
  ruta_comprobante_estudio: esquemaTextoRequerido(50, 50),
  ruta_comprobante_domicilio: esquemaTextoRequerido(50, 50),
  ruta_carta_compromiso: esquemaTextoRequerido(50, 50),
  ruta_aviso_privacidad_aspirante: esquemaTextoRequerido(50, 50),
  estado: esquemaEstadoRequerido,
  id_ct_usuario_in: esquemaUsuarioCreacion,
});

//? Esquema para actualizar una capitulo
export const actualizarDtAspiranteAneecSchema = z.object({
  curp: esquemaTextoOpcional(18),
  nombre: esquemaTextoOpcional(50),
  apellido_paterno: esquemaTextoOpcional(50),
  apellido_materno: esquemaTextoOpcional(50),
  telefono: esquemaTextoOpcional(15),
  correo: esquemaTextoOpcional(50),
  fecha_nacimiento: esquemaFechaOpcional,
  instituto: esquemaTextoOpcional(100),
  licenciatura: esquemaTextoOpcional(50),
  direccion: esquemaTextoOpcional(50),
  codigo_postal: esquemaTextoOpcional(10),
  ct_municipio_id: esquemaNumeroOpcional(1, 100000),
  localidad: esquemaTextoOpcional(100),
  ruta_ine: esquemaTextoOpcional(50),
  tipo_documento: esquemaTextoOpcional(45),
  ruta_comprobante_estudio: esquemaTextoOpcional(50),
  ruta_comprobante_domicilio: esquemaTextoOpcional(50),
  ruta_carta_compromiso: esquemaTextoOpcional(50),
  ruta_aviso_privacidad_aspirante: esquemaTextoOpcional(50),
  estado: esquemaEstadoOpcional,
  id_ct_usuario_up: esquemaUsuarioCreacion, // Requerido para actualización
  fecha_up: esquemaFechaOpcional,
});

//? Schema para filtros y paginación de capitulos
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const dtAspiranteAneecFiltrosSchema = z.object({
  //? Filtros específicos
  id_dt_aspirante_aneec: esquemaQueryId,
  curp: esquemaQueryTexto,
  nombre: esquemaQueryTexto,
  apellido_paterno: esquemaQueryTexto,
  apellido_materno: esquemaQueryTexto,
  telefono: esquemaQueryTexto,
  correo: esquemaQueryTexto,
  fecha_nacimiento: esquemaFechaOpcional,
  instituto: esquemaQueryTexto,
  licenciatura: esquemaQueryTexto,
  direccion: esquemaQueryTexto,
  codigo_postal: esquemaQueryTexto,
  ct_municipio_id: esquemaQueryNumeroOpcional,
  localidad: esquemaQueryTexto,
  ruta_ine: esquemaQueryTexto,
  tipo_documento: esquemaQueryTexto,
  ruta_comprobante_estudio: esquemaQueryTexto,
  ruta_comprobante_domicilio: esquemaQueryTexto,
  ruta_carta_compromiso: esquemaQueryTexto,
  ruta_aviso_privacidad_aspirante: esquemaQueryTexto,
  estado: esquemaQueryBoolean,
  id_ct_usuario_in: esquemaQueryId,
  fecha_in: esquemaFechaOpcional,

  //? Filtros para incluir inactivos de capitulos
  incluirInactivos: esquemaQueryBoolean,

  //? Paginación
  pagina: esquemaPaginaQuery,
  limite: esquemaLimiteQuery,
});

export type CrearDtAspiranteAneecInput = z.infer<
  typeof crearDtAspiranteAneecSchema
>;
export type ActualizarDtAspiranteAneecInput = z.infer<
  typeof actualizarDtAspiranteAneecSchema
>;

export type BuscarDtAspiranteAneecInput = z.infer<
  typeof dtAspiranteAneecFiltrosSchema
>;

//? Esquema para parámetros de URL (ID de capitulo)
export const dtAspiranteAneecIdParamSchema = z.object({
  id_dt_aspirante_aneec: esquemaParamId,
});

//? Esquema para validar el body del DELETE - quién ejecuta la eliminación
export const eliminarDtAspiranteAneecSchema = esquemaDeleteConUsuario;

export type DtAspiranteAneecIdParam = z.infer<
  typeof dtAspiranteAneecIdParamSchema
>;

export type EliminarDtAspiranteAneecInput = z.infer<
  typeof eliminarDtAspiranteAneecSchema
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

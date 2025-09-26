import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_CAPITULO =====
//? Esquemas para crear una nueva entidad

export const crearCtCorrespondenciaEstadoSchema = z.object({
  nombre: z.string().min(1, "El nombre debe tener al menos 1 caracter"),
  activo: z.boolean().default(true),
});

//? Esquemas para actualizar una acción
export const actualizarCtCorrespondenciaEstadoSchema = z.object({
  nombre: z.string().min(1, "El nombre debe tener al menos 1 caracter"),
  activo: z.boolean().default(true),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctCorrespondenciaEstadoFiltrosSchema = z.object({
  //? Filtros específicos
  id_estado: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return undefined;
      const num = parseInt(val, 10);
      return isNaN(num) ? undefined : num;
    })
    .pipe(
      z
        .number()
        .int()
        .positive("ID de la estado debe ser un número positivo")
        .optional()
    ),
  nombre: z.string().optional(),
  activo: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return undefined;
      return val === "true" || val === "1";
    })
    .pipe(z.boolean().optional()),

  //? Filtros para incluir inactivos
  incluirInactivos: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return false;
      return val === "true" || val === "1";
    })
    .pipe(z.boolean()),
  //? Paginación
  pagina: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return 1;
      const num = parseInt(val, 10);
      return isNaN(num) || num < 1 ? 1 : num;
    })
    .pipe(z.number().int().min(1)),
  //? Filtros para limite
  limite: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return 10;
      const num = parseInt(val, 10);
      return isNaN(num) || num < 1 ? 10 : Math.min(num, 100);
    })
    .pipe(z.number().int().min(1).max(100)),
});

export type CrearCtCorrespondenciaEstadoInput = z.infer<
  typeof crearCtCorrespondenciaEstadoSchema
>;
export type ActualizarCtCorrespondenciaEstadoInput = z.infer<
  typeof actualizarCtCorrespondenciaEstadoSchema
>;

export type BuscarCtCorrespondenciaEstadoInput = z.infer<
  typeof ctCorrespondenciaEstadoFiltrosSchema
>;

export const ctCorrespondenciaEstadoIdParamSchema = z.object({
  id_estado: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la estado debe ser un número positivo");
    }
    return num;
  }),
});

export type CtCorrespondenciaEstadoIdParam = z.infer<
  typeof ctCorrespondenciaEstadoIdParamSchema
>;

/*
🔧 SCHEMA CORREGIDO PARA SOFT DELETE:

✅ Cambios realizados:
1. 🔢 id_capitulo - Ahora maneja correctamente valores undefined/vacíos
2. ✅ activo - Corregido de number a boolean opcional
3. 🆕 incluirInactivos - Nuevo parámetro para mostrar registros eliminados
4. 📄 pagina/limite - Mejorado manejo de valores undefined con defaults

🎯 Comportamiento:
- Por defecto solo muestra registros activos (activo = true)
- Todos los campos de filtro son opcionales
- Paginación tiene valores por defecto (pagina=1, limite=10)
- incluirInactivos=true muestra también registros eliminados

📝 Uso de query parameters:
- GET /api/ct_correspondencia_estado (solo activos)
- GET /api/ct_correspondencia_estado?incluirInactivos=true (todos)
- GET /api/ct_correspondencia_estado?activo=false (solo inactivos)
*/

import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_BITACORA_ENTIDAD =====
//? Esquemas para crear una nueva entidad

export const crearCtBitacoraEntidadSchema = z.object({
  entidad: z.string().min(2, "La entidad debe tener al menos 2 caracteres"),
  descripcion: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres"),
  activo: z.boolean().default(true),
});

//? Esquemas para actualizar una acción
export const actualizarCtBitacoraEntidadSchema = z.object({
  entidad: z.string().min(2, "La entidad debe tener al menos 2 caracteres"),
  descripcion: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .optional(),
  activo: z.boolean().default(true),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctBitacoraEntidadFiltrosSchema = z.object({
  //? Filtros específicos
  id_ct_bitacora_entidad: z
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
        .positive("ID de la entidad debe ser un número positivo")
        .optional()
    ),
  entidad: z.string().optional(),
  descripcion: z.string().optional(),
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

export type CrearCtBitacoraEntidadInput = z.infer<
  typeof crearCtBitacoraEntidadSchema
>;
export type ActualizarCtBitacoraEntidadInput = z.infer<
  typeof actualizarCtBitacoraEntidadSchema
>;

export type BuscarCtBitacoraEntidadInput = z.infer<
  typeof ctBitacoraEntidadFiltrosSchema
>;

export const ctBitacoraEntidadIdParamSchema = z.object({
  id_ct_bitacora_entidad: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la entidad debe ser un número positivo");
    }
    return num;
  }),
});

export type CtBitacoraEntidadIdParam = z.infer<
  typeof ctBitacoraEntidadIdParamSchema
>;

/*
🔧 SCHEMA CORREGIDO PARA SOFT DELETE:

✅ Cambios realizados:
1. 🔢 id_ct_bitacora_entidad - Ahora maneja correctamente valores undefined/vacíos
2. ✅ activo - Corregido de number a boolean opcional
3. 🆕 incluirInactivos - Nuevo parámetro para mostrar registros eliminados
4. 📄 pagina/limite - Mejorado manejo de valores undefined con defaults

🎯 Comportamiento:
- Por defecto solo muestra registros activos (activo = true)
- Todos los campos de filtro son opcionales
- Paginación tiene valores por defecto (pagina=1, limite=10)
- incluirInactivos=true muestra también registros eliminados

📝 Uso de query parameters:
- GET /api/ct_bitacora_entidad (solo activos)
- GET /api/ct_bitacora_entidad?incluirInactivos=true (todos)
- GET /api/ct_bitacora_entidad?activo=false (solo inactivos)
*/

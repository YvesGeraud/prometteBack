import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_BITACORA_ACCION =====
//? Esquemas para crear una nueva entidad

export const crearCtBitacoraAccionSchema = z.object({
  accion: z.string().min(2, "La acción debe tener al menos 2 caracteres"),
  descripcion: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .optional(),
  activo: z.boolean().default(true),
});

//? Esquemas para actualizar una acción
export const actualizarCtBitacoraAccionSchema = z.object({
  accion: z.string().min(2, "La acción debe tener al menos 2 caracteres"),
  descripcion: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .optional(),
  activo: z.boolean().default(true),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const bitacoraAccionFiltrosSchema = z.object({
  // Filtros específicos
  id_ct_bitacora_accion: z
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
        .positive("ID de la acción debe ser un número positivo")
        .optional()
    ),
  accion: z.string().optional(),
  descripcion: z.string().optional(),
  activo: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return undefined;
      return val === "true" || val === "1";
    })
    .pipe(z.boolean().optional()),
  incluirInactivos: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return false;
      return val === "true" || val === "1";
    })
    .pipe(z.boolean()),
  // Paginación
  pagina: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return 1;
      const num = parseInt(val, 10);
      return isNaN(num) || num < 1 ? 1 : num;
    })
    .pipe(z.number().int().min(1)),
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

export type CrearCtBitacoraAccionInput = z.infer<
  typeof crearCtBitacoraAccionSchema
>;
export type ActualizarCtBitacoraAccionInput = z.infer<
  typeof actualizarCtBitacoraAccionSchema
>;

export type BuscarBitacoraAccionInput = z.infer<
  typeof bitacoraAccionFiltrosSchema
>;

export const ctBitacoraAccionIdParamSchema = z.object({
  id_ct_bitacora_accion: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la acción debe ser un número positivo");
    }
    return num;
  }),
});

export type CtBitacoraAccionIdParam = z.infer<
  typeof ctBitacoraAccionIdParamSchema
>;

/*
🔧 SCHEMA CORREGIDO PARA SOFT DELETE:

✅ Cambios realizados:
1. 🔢 id_ct_bitacora_accion - Ahora maneja correctamente valores undefined/vacíos
2. ✅ activo - Corregido de number a boolean opcional
3. 🆕 incluirInactivos - Nuevo parámetro para mostrar registros eliminados
4. 📄 pagina/limite - Mejorado manejo de valores undefined con defaults

🎯 Comportamiento:
- Por defecto solo muestra registros activos (activo = true)
- Todos los campos de filtro son opcionales
- Paginación tiene valores por defecto (pagina=1, limite=10)
- incluirInactivos=true muestra también registros eliminados

📝 Uso de query parameters:
- GET /api/ct_bitacora_accion (solo activos)
- GET /api/ct_bitacora_accion?incluirInactivos=true (todos)
- GET /api/ct_bitacora_accion?activo=false (solo inactivos)
*/

import { z } from "zod";

//TODO ===== SCHEMAS COMUNES PARA TODA LA APLICACIÓN =====

//? Schema para paginación - usado en todos los módulos
export const paginationSchema = z.object({
  pagina: z
    .string()
    .transform((val) => parseInt(val, 10) || 1)
    .pipe(z.number().int().min(1))
    .optional(),
  limite: z
    .string()
    .transform((val) => parseInt(val, 10) || 10)
    .pipe(z.number().int().min(1).max(100))
    .optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

//? Schema para validar IDs en parámetros de ruta (maneja string y number)
export const idParamSchema = z.object({
  id: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .pipe(z.number().int().positive("ID debe ser un número positivo")),
});

//? Helper para crear schemas de ID específicos (soluciona problema de Express parseando números)
export const createIdParamSchema = (fieldName: string, message?: string) => {
  return z.object({
    [fieldName]: z
      .union([z.string(), z.number()])
      .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
      .pipe(
        z
          .number()
          .int()
          .positive(message || `${fieldName} debe ser un número positivo`)
      ),
  });
};

//? Schema para búsqueda general
export const searchSchema = z.object({
  search: z.string().min(1, "El término de búsqueda es requerido").optional(),
});

//? Schema para fechas
export const dateRangeSchema = z.object({
  fechaInicio: z
    .string()
    .transform((val) => new Date(val))
    .pipe(z.date())
    .optional(),
  fechaFin: z
    .string()
    .transform((val) => new Date(val))
    .pipe(z.date())
    .optional(),
});

//? Schema para estados de vigencia
export const vigenciaSchema = z.object({
  vigente: z.enum(["S", "N"]).optional(),
});

//TODO ===== TIPOS INFERIDOS =====
export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
export type VigenciaInput = z.infer<typeof vigenciaSchema>;

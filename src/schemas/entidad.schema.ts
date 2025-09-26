import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_ENTIDAD =====
//? Esquemas para crear una nueva entidad

export const crearCtEntidadSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre de la entidad debe tener al menos 2 caracteres"),
  abreviatura: z
    .string()
    .min(2, "La abreviatura debe tener al menos 2 caracteres"),
});

//? Esquemas para actualizar una acción
export const actualizarCtEntidadSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre de la entidad debe tener al menos 2 caracteres"),
  abreviatura: z
    .string()
    .min(2, "La abreviatura debe tener al menos 2 caracteres"),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
export const entidadFiltrosSchema = z.object({
  // Filtros específicos
  id_entidad: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().positive("ID del entidad debe ser un número positivo")
    )
    .optional(),
  nombre: z.string().optional(),
  abreviatura: z.string().optional(),
  // Paginación
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
});

export type CrearCtEntidadInput = z.infer<typeof crearCtEntidadSchema>;
export type ActualizarCtEntidadInput = z.infer<
  typeof actualizarCtEntidadSchema
>;

export type BuscarEntidadInput = z.infer<typeof entidadFiltrosSchema>;

export const ctEntidadIdParamSchema = z.object({
  id_entidad: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la entidad debe ser un número positivo");
    }
    return num;
  }),
});

export type CtEntidadIdParam = z.infer<typeof ctEntidadIdParamSchema>;

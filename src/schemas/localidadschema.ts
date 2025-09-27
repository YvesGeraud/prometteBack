import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_ENTIDAD =====
//? Esquemas para crear una nueva entidad

export const crearCtLocalidadSchema = z.object({
  localidad: z
    .string()
    .min(2, "El nombre de la entidad debe tener al menos 2 caracteres"),
  ambito: z.string().min(2, "La cve_mun debe tener al menos 2 caracteres"),
  id_municipio: z.number().min(1, "El id_entidad debe ser un número positivo"),
});

//? Esquemas para actualizar una acción
export const actualizarCtLocalidadSchema = z.object({
  localidad: z
    .string()
    .min(2, "El nombre de la entidad debe tener al menos 2 caracteres"),
  ambito: z.string().min(2, "La abreviatura debe tener al menos 2 caracteres"),
  id_municipio: z
    .number()
    .min(1, "El id_municipio debe ser un número positivo"),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
export const localidadFiltrosSchema = z.object({
  // Filtros específicos
  id_localidad: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().positive("ID del municipio debe ser un número positivo")
    )
    .optional(),
  localidad: z.string().optional(),
  ambito: z.string().optional(),
  id_municipio: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().positive("ID del municipio debe ser un número positivo")
    )
    .optional(),
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
  incluir_municipio: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
  incluir_municipio_con_entidad: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
});

export type CrearCtLocalidadInput = z.infer<typeof crearCtLocalidadSchema>;
export type ActualizarCtLocalidadInput = z.infer<
  typeof actualizarCtLocalidadSchema
>;

export type BuscarLocalidadInput = z.infer<typeof localidadFiltrosSchema>;

export const ctLocalidadIdParamSchema = z.object({
  id_localidad: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la localidad debe ser un número positivo");
    }
    return num;
  }),
});

export type CtLocalidadIdParam = z.infer<typeof ctLocalidadIdParamSchema>;

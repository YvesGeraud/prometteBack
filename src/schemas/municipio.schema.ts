import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_ENTIDAD =====
//? Esquemas para crear una nueva entidad

export const crearCtMunicipioSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre de la entidad debe tener al menos 2 caracteres"),
  cve_mun: z.string().min(2, "La cve_mun debe tener al menos 2 caracteres"),
  id_entidad: z.number().min(1, "El id_entidad debe ser un número positivo"),
});

//? Esquemas para actualizar una acción
export const actualizarCtMunicipioSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre de la entidad debe tener al menos 2 caracteres"),
  cve_mun: z.string().min(2, "La abreviatura debe tener al menos 2 caracteres"),
  id_entidad: z.number().min(1, "El id_entidad debe ser un número positivo"),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
export const municipioFiltrosSchema = z.object({
  // Filtros específicos
  id_municipio: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().positive("ID del municipio debe ser un número positivo")
    )
    .optional(),
  nombre: z.string().optional(),
  cve_mun: z.string().optional(),
  id_entidad: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z.number().int().positive("ID del entidad debe ser un número positivo")
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
  incluir_entidad: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
});

export type CrearCtMunicipioInput = z.infer<typeof crearCtMunicipioSchema>;
export type ActualizarCtMunicipioInput = z.infer<
  typeof actualizarCtMunicipioSchema
>;

export type BuscarMunicipiosInput = z.infer<typeof municipioFiltrosSchema>;

export const ctMunicipioIdParamSchema = z.object({
  id_municipio: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la municipio debe ser un número positivo");
    }
    return num;
  }),
});

export type CtMunicipioIdParam = z.infer<typeof ctMunicipioIdParamSchema>;

import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_CONSUMIBLES_PROVEEDOR =====
//? Esquemas para crear una nueva entidad

export const crearCtConsumiblesProveedorSchema = z.object({
  razon_social: z
    .string()
    .min(1, "La razon social debe tener al menos 1 caracter"),
  activo: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
});

//? Esquemas para actualizar una acción
export const actualizarCtConsumiblesProveedorSchema = z.object({
  razon_social: z
    .string()
    .min(1, "La razon social debe tener al menos 1 caracter"),
  activo: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctConsumiblesProveedorFiltrosSchema = z.object({
  // Filtros específicos
  id_proveedor: z
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
        .positive("ID de la proveedor debe ser un número positivo")
        .optional()
    ),
  razon_social: z
    .string()
    .min(2, "La razon social debe tener al menos 2 caracteres")
    .optional(),
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

export type CrearCtConsumiblesProveedorInput = z.infer<
  typeof crearCtConsumiblesProveedorSchema
>;
export type ActualizarCtConsumiblesProveedorInput = z.infer<
  typeof actualizarCtConsumiblesProveedorSchema
>;

export type BuscarCtConsumiblesProveedorInput = z.infer<
  typeof ctConsumiblesProveedorFiltrosSchema
>;

export const ctConsumiblesProveedorIdParamSchema = z.object({
  id_proveedor: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la proveedor debe ser un número positivo");
    }
    return num;
  }),
});

export type CtConsumiblesProveedorIdParam = z.infer<
  typeof ctConsumiblesProveedorIdParamSchema
>;

/*
🔧 SCHEMA CORREGIDO PARA SOFT DELETE:

✅ Cambios realizados:
1. 🔢 id_proveedor - Ahora maneja correctamente valores undefined/vacíos
2. ✅ activo - Corregido de number a boolean opcional
3. 🆕 incluirInactivos - Nuevo parámetro para mostrar registros eliminados
4. 📄 pagina/limite - Mejorado manejo de valores undefined con defaults

🎯 Comportamiento:
- Por defecto solo muestra registros activos (activo = true)
- Todos los campos de filtro son opcionales
- Paginación tiene valores por defecto (pagina=1, limite=10)
- incluirInactivos=true muestra también registros eliminados

📝 Uso de query parameters:
- GET /api/ct_proveedor (solo activos)
- GET /api/ct_proveedor?incluirInactivos=true (todos)
- GET /api/ct_proveedor?activo=false (solo inactivos)
*/

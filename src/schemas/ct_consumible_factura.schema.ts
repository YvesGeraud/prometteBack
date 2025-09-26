import { z } from "zod";

//TODO ===== SCHEMAS PARA CT_CONSUMIBLE_FACTURA =====
//? Esquemas para crear una nueva entidad

export const crearCtConsumibleFacturaSchema = z.object({
  factura: z
    .string()
    .min(2, "El nombre del capitulo debe tener al menos 2 caracteres"),
  ct_provedor_id: z
    .number()
    .min(1, "El proveedor debe tener al menos 1 caracter"),
  activo: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
});

//? Esquemas para actualizar una acción
export const actualizarCtConsumibleFacturaSchema = z.object({
  factura: z
    .string()
    .min(2, "El nombre del capitulo debe tener al menos 2 caracteres")
    .optional(),
  ct_provedor_id: z
    .number()
    .min(1, "El proveedor debe tener al menos 1 caracter")
    .optional(),
  activo: z.boolean().default(true).optional(),
});

export { paginationSchema, idParamSchema } from "./commonSchemas";

//? Schema para filtros y paginación de entidades
//! NOTA: Implementa soft delete - por defecto solo muestra registros activos
export const ctConsumibleFacturaFiltrosSchema = z.object({
  // Filtros específicos
  id_factura: z
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
        .positive("ID de la factura debe ser un número positivo")
        .optional()
    ),
  factura: z
    .string()
    .min(2, "El nombre del capitulo debe tener al menos 2 caracteres")
    .optional(),
  ct_provedor_id: z.number().optional(),
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
  incluir_ct_provedor: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
});

export type CrearCtConsumibleFacturaInput = z.infer<
  typeof crearCtConsumibleFacturaSchema
>;
export type ActualizarCtConsumibleFacturaInput = z.infer<
  typeof actualizarCtConsumibleFacturaSchema
>;

export type BuscarCtConsumibleFacturaInput = z.infer<
  typeof ctConsumibleFacturaFiltrosSchema
>;

export const ctConsumibleFacturaIdParamSchema = z.object({
  id_factura: z.union([z.string(), z.number()]).transform((val) => {
    const num = typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(num) || num <= 0) {
      throw new Error("ID de la factura debe ser un número positivo");
    }
    return num;
  }),
});

export type CtConsumibleFacturaIdParam = z.infer<
  typeof ctConsumibleFacturaIdParamSchema
>;

/*
🔧 SCHEMA CORREGIDO PARA SOFT DELETE:

✅ Cambios realizados:
1. 🔢 id_factura - Ahora maneja correctamente valores undefined/vacíos
2. ✅ activo - Corregido de number a boolean opcional
3. 🆕 incluirInactivos - Nuevo parámetro para mostrar registros eliminados
4. 📄 pagina/limite - Mejorado manejo de valores undefined con defaults

🎯 Comportamiento:
- Por defecto solo muestra registros activos (activo = true)
- Todos los campos de filtro son opcionales
- Paginación tiene valores por defecto (pagina=1, limite=10)
- incluirInactivos=true muestra también registros eliminados

📝 Uso de query parameters:
- GET /api/ct_consumible_factura (solo activos)
- GET /api/ct_consumible_factura?incluirInactivos=true (todos)
- GET /api/ct_consumible_factura?activo=false (solo inactivos)
*/

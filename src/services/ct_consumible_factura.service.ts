/**
 * @fileoverview Servicio de ct_consumible_factura usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_consumible_factura } from "@prisma/client";
import {
  CrearCtConsumibleFacturaInput,
  BuscarCtConsumibleFacturaInput,
  ActualizarCtConsumibleFacturaInput,
} from "../schemas/ct_consumible_factura.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtConsumibleFacturaService extends BaseService<
  ct_consumible_factura,
  CrearCtConsumibleFacturaInput,
  ActualizarCtConsumibleFacturaInput,
  BuscarCtConsumibleFacturaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_consumible_factura",
    defaultOrderBy: { id_ct_consumible_factura: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtConsumibleFacturaInput) {
    const includes: any = {};

    // Solo incluir entidad si se solicita explícitamente
    if (filters?.incluir_ct_consumible_proveedor) {
      includes.ct_consumible_proveedor = true;
    }

    return Object.keys(includes).length > 0 ? includes : undefined;
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtConsumibleFacturaInput) {
    const where: any = {};

    // Filtro de entidad
    if (filters?.id_ct_consumible_factura) {
      where.id_ct_consumible_factura = filters.id_ct_consumible_factura;
    }

    // Filtro de factura (campo numérico)
    if (filters?.factura) {
      where.factura = {
        contains: filters.factura,
      };
    }

    // Filtro de ct_provedor_id
    if (filters?.id_ct_consumible_proveedor) {
      where.id_ct_consumible_proveedor = filters.id_ct_consumible_proveedor;
    }

    // Filtro de activo
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_consumible_factura";
  }

  // ✨ ¡YA TIENES CRUD COMPLETO AUTOMÁTICAMENTE!
  // - obtenerTodos() con paginación ✅
  // - obtenerPorId() ✅
  // - crear() con validaciones ✅
  // - actualizar() con verificaciones ✅
  // - eliminar() con manejo de errores ✅
}

// 🎉 TOTAL: ¡Solo 18 líneas para CRUD completo!
// Sin BaseService serían ~150 líneas 😱

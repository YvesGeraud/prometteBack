/**
 * @fileoverview Servicio de ct_consumible_proveedor usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_consumible_proveedor } from "@prisma/client";
import {
  CrearCtConsumibleProveedorInput,
  ActualizarCtConsumibleProveedorInput,
  BuscarCtConsumibleProveedorInput,
} from "../schemas/ct_consumible_proveedor.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtConsumibleProveedorService extends BaseService<
  ct_consumible_proveedor,
  CrearCtConsumibleProveedorInput,
  ActualizarCtConsumibleProveedorInput,
  BuscarCtConsumibleProveedorInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_consumible_proveedor",
    defaultOrderBy: { id_ct_consumible_proveedor: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtConsumibleProveedorInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtConsumibleProveedorInput) {
    const where: any = {};
    const conditions: any[] = [];

    // Filtro de id_ct_consumible_proveedor
    if (filters?.id_ct_consumible_proveedor) {
      where.id_ct_consumible_proveedor = filters.id_ct_consumible_proveedor;
    }

    // Filtro de razon_social
    if (filters?.razon_social) {
      where.razon_social = {
        contains: filters.razon_social,
      };
    }

    // Filtro de activo
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_consumible_proveedor";
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

/**
 * @fileoverview Servicio de ct_consumible_proveedor usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_consumibles_proveedor } from "@prisma/client";
import {
  CrearCtConsumiblesProveedorInput,
  ActualizarCtConsumiblesProveedorInput,
  BuscarCtConsumiblesProveedorInput,
} from "../schemas/ct_consumibles_proveedor.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtConsumiblesProveedorService extends BaseService<
  ct_consumibles_proveedor,
  CrearCtConsumiblesProveedorInput,
  ActualizarCtConsumiblesProveedorInput,
  BuscarCtConsumiblesProveedorInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_consumibles_proveedor",
    defaultOrderBy: { id_proveedor: "asc" as const },
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtConsumiblesProveedorInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtConsumiblesProveedorInput) {
    const where: any = {};
    const conditions: any[] = [];

    // Filtro de entidad
    if (filters?.id_proveedor) {
      where.id_proveedor = filters.id_proveedor;
    }

    // Filtro de clave_capitulo (campo numérico)
    if (filters?.razon_social) {
      where.razon_social = {
        contains: filters.razon_social,
      };
    }

    // Filtro de activo
    if (filters?.activo) {
      where.activo = filters.activo;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_proveedor";
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

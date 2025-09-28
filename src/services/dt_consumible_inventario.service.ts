/**
 * @fileoverview Servicio de dt_consumible_inventario usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_consumible_inventario } from "@prisma/client";
import {
  CrearDtConsumibleInventarioInput,
  ActualizarDtConsumibleInventarioInput,
  BuscarDtConsumibleInventarioInput,
} from "../schemas/dt_consumible_inventario.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class DtConsumibleInventarioService extends BaseService<
  dt_consumible_inventario,
  CrearDtConsumibleInventarioInput,
  ActualizarDtConsumibleInventarioInput,
  BuscarDtConsumibleInventarioInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_consumible_inventario",
    defaultOrderBy: { id_dt_consumible_inventario: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtConsumibleInventarioInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtConsumibleInventarioInput) {
    const where: any = {};

    // Filtro de id_dt_consumible_inventario
    if (filters?.id_dt_consumible_inventario) {
      where.id_dt_consumible_inventario = filters.id_dt_consumible_inventario;
    }

    // Filtro de folio
    if (filters?.folio) {
      where.folio = {
        contains: filters.folio,
      };
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_consumible_inventario";
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

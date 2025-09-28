/**
 * @fileoverview Servicio de dt_bitacora_movimiento usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_bitacora_movimiento } from "@prisma/client";
import {
  CrearDtBitacoraMovimientoInput,
  ActualizarDtBitacoraMovimientoInput,
  BuscarDtBitacoraMovimientoInput,
} from "../schemas/dt_bitacora_movimiento.schema";

//TODO ===== SERVICIO PARA DT_BITACORA_MOVIMIENTO CON BASE SERVICE =====

export class DtBitacoraMovimientoService extends BaseService<
  dt_bitacora_movimiento,
  CrearDtBitacoraMovimientoInput,
  ActualizarDtBitacoraMovimientoInput,
  BuscarDtBitacoraMovimientoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_bitacora_movimiento",
    defaultOrderBy: { id_dt_bitacora_movimiento: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtBitacoraMovimientoInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtBitacoraMovimientoInput) {
    const where: any = {};

    // Filtro de id_dt_bitacora_movimiento
    if (filters?.id_dt_bitacora_movimiento) {
      where.id_dt_bitacora_movimiento = filters.id_dt_bitacora_movimiento;
    }

    // Filtro de id_dt_bitacora_accion
    if (filters?.id_dt_bitacora_accion) {
      where.id_dt_bitacora_accion = filters.id_dt_bitacora_accion;
    }

    // Filtro de id_ct_usuario
    if (filters?.id_ct_usuario) {
      where.id_ct_usuario = filters.id_ct_usuario;
    }

    // Filtro de estado
    /*if (filters?.estado) {
      where.estado = filters.estado;
    }*/

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_bitacora_movimiento";
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

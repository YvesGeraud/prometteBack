/**
 * @fileoverview Servicio de dt_proyecto_anual usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_proyecto_anual } from "@prisma/client";
import {
  CrearDtProyectoAnualInput,
  ActualizarDtProyectoAnualInput,
  BuscarDtProyectoAnualInput,
} from "../schemas/dt_proyecto_anual.schema";

//TODO ===== SERVICIO PARA DT_PROYECTO_ANUAL CON BASE SERVICE =====

export class DtProyectoAnualService extends BaseService<
  dt_proyecto_anual,
  CrearDtProyectoAnualInput,
  ActualizarDtProyectoAnualInput,
  BuscarDtProyectoAnualInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_proyecto_anual",
    defaultOrderBy: { id_dt_proyecto_anual: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtProyectoAnualInput) {
    return {};
  }

  // 🔍 Filtros específicos para proyectos anuales
  protected construirWhereClause(filters?: BuscarDtProyectoAnualInput) {
    const where: any = {};

    // Filtro de id_dt_proyecto_anual
    if (filters?.id_dt_proyecto_anual) {
      where.id_dt_proyecto_anual = filters.id_dt_proyecto_anual;
    }

    // Filtro de año
    if (filters?.a_o) {
      where.a_o = filters.a_o;
    }

    // Filtro de id_dt_techo_presupuesto
    if (filters?.id_dt_techo_presupuesto) {
      where.id_dt_techo_presupuesto = filters.id_dt_techo_presupuesto;
    }

    // Filtro de monto_asignado
    if (filters?.monto_asignado) {
      where.monto_asignado = filters.monto_asignado;
    }

    // Filtro de monto_utilizado
    if (filters?.monto_utilizado) {
      where.monto_utilizado = filters.monto_utilizado;
    }

    // Filtro de monto_disponible
    if (filters?.monto_disponible) {
      where.monto_disponible = filters.monto_disponible;
    }

    // Filtro de descripcion
    if (filters?.descripcion) {
      where.descripcion = {
        contains: filters.descripcion,
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
    return "id_dt_proyecto_anual";
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

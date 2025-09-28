/**
 * @fileoverview Servicio de rl_justificacion usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_justificacion } from "@prisma/client";
import {
  CrearRlJustificacionInput,
  ActualizarRlJustificacionInput,
  BuscarRlJustificacionInput,
} from "../schemas/rl_justificacion.schema";

//TODO ===== SERVICIO PARA RL_JUSTIFICACION CON BASE SERVICE =====

export class RlJustificacionService extends BaseService<
  rl_justificacion,
  CrearRlJustificacionInput,
  ActualizarRlJustificacionInput,
  BuscarRlJustificacionInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_justificacion",
    defaultOrderBy: { id_rl_justificacion: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlJustificacionInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones justificación
  protected construirWhereClause(filters?: BuscarRlJustificacionInput) {
    const where: any = {};

    // Filtro de id_rl_justificacion
    if (filters?.id_rl_justificacion) {
      where.id_rl_justificacion = filters.id_rl_justificacion;
    }

    // Filtro de ct_partida_id
    if (filters?.ct_partida_id) {
      where.ct_partida_id = filters.ct_partida_id;
    }

    // Filtro de ct_area_id
    if (filters?.ct_area_id) {
      where.ct_area_id = filters.ct_area_id;
    }

    // Filtro de dt_techo_id
    if (filters?.dt_techo_id) {
      where.dt_techo_id = filters.dt_techo_id;
    }

    // Filtro de justificacion
    if (filters?.justificacion) {
      where.justificacion = {
        contains: filters.justificacion,
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
    return "id_rl_justificacion";
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

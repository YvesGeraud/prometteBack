/**
 * @fileoverview Servicio de rl_usuario_puesto usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_usuario_puesto } from "@prisma/client";
import {
  CrearRlUsuarioPuestoInput,
  ActualizarRlUsuarioPuestoInput,
  BuscarRlUsuarioPuestoInput,
} from "../schemas/rl_usuario_puesto.schema";

//TODO ===== SERVICIO PARA RL_USUARIO_PUESTO CON BASE SERVICE =====

export class RlUsuarioPuestoService extends BaseService<
  rl_usuario_puesto,
  CrearRlUsuarioPuestoInput,
  ActualizarRlUsuarioPuestoInput,
  BuscarRlUsuarioPuestoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_usuario_puesto",
    defaultOrderBy: { id_rl_usuario_puesto: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlUsuarioPuestoInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones usuario puesto
  protected construirWhereClause(filters?: BuscarRlUsuarioPuestoInput) {
    const where: any = {};

    // Filtro de id_rl_usuario_puesto
    if (filters?.id_rl_usuario_puesto) {
      where.id_rl_usuario_puesto = filters.id_rl_usuario_puesto;
    }

    // Filtro de id_ct_usuario
    if (filters?.id_ct_usuario) {
      where.id_ct_usuario = filters.id_ct_usuario;
    }

    // Filtro de id_ct_puesto
    if (filters?.id_ct_puesto) {
      where.id_ct_puesto = filters.id_ct_puesto;
    }

    // Filtro de id_area
    if (filters?.id_area) {
      where.id_area = filters.id_area;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_rl_usuario_puesto";
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

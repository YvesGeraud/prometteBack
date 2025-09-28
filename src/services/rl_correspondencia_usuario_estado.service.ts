/**
 * @fileoverview Servicio de rl_correspondencia_usuario_estado usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_correspondencia_usuario_estado } from "@prisma/client";
import {
  CrearRlCorrespondenciaUsuarioEstadoInput,
  ActualizarRlCorrespondenciaUsuarioEstadoInput,
  BuscarRlCorrespondenciaUsuarioEstadoInput,
} from "../schemas/rl_correspondencia_usuario_estado.schema";

//TODO ===== SERVICIO PARA RL_CORRESPONDENCIA_USUARIO_ESTADO CON BASE SERVICE =====

export class RlCorrespondenciaUsuarioEstadoService extends BaseService<
  rl_correspondencia_usuario_estado,
  CrearRlCorrespondenciaUsuarioEstadoInput,
  ActualizarRlCorrespondenciaUsuarioEstadoInput,
  BuscarRlCorrespondenciaUsuarioEstadoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_correspondencia_usuario_estado",
    defaultOrderBy: { id_rl_correspondencia_usuario_estado: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(
    filters?: BuscarRlCorrespondenciaUsuarioEstadoInput
  ) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones correspondencia usuario estado
  protected construirWhereClause(
    filters?: BuscarRlCorrespondenciaUsuarioEstadoInput
  ) {
    const where: any = {};

    // Filtro de id_rl_correspondencia_usuario_estado
    if (filters?.id_rl_correspondencia_usuario_estado) {
      where.id_rl_correspondencia_usuario_estado =
        filters.id_rl_correspondencia_usuario_estado;
    }

    // Filtro de id_dt_correspondencia
    if (filters?.id_dt_correspondencia) {
      where.id_dt_correspondencia = filters.id_dt_correspondencia;
    }

    // Filtro de id_rl_usuario_puesto
    if (filters?.id_rl_usuario_puesto) {
      where.id_rl_usuario_puesto = filters.id_rl_usuario_puesto;
    }

    // Filtro de id_ct_correspondencia_estado
    if (filters?.id_ct_correspondencia_estado) {
      where.id_ct_correspondencia_estado = filters.id_ct_correspondencia_estado;
    }

    // Filtro de tipo_turnado
    if (filters?.tipo_turnado) {
      where.tipo_turnado = filters.tipo_turnado;
    }

    // Filtro de observaciones
    if (filters?.observaciones) {
      where.observaciones = {
        contains: filters.observaciones,
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
    return "id_rl_correspondencia_usuario_estado";
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

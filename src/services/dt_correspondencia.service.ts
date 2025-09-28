/**
 * @fileoverview Servicio de dt_correspondencia usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_correspondencia } from "@prisma/client";
import {
  CrearDtCorrespondenciaInput,
  ActualizarDtCorrespondenciaInput,
  BuscarDtCorrespondenciaInput,
} from "../schemas/dt_correspondencia.schema";

//TODO ===== SERVICIO PARA DT_CORRESPONDENCIA CON BASE SERVICE =====

export class DtCorrespondenciaService extends BaseService<
  dt_correspondencia,
  CrearDtCorrespondenciaInput,
  ActualizarDtCorrespondenciaInput,
  BuscarDtCorrespondenciaInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_correspondencia",
    defaultOrderBy: { id_dt_correspondencia: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtCorrespondenciaInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtCorrespondenciaInput) {
    const where: any = {};

    // Filtro de id_dt_correspondencia
    if (filters?.id_dt_correspondencia) {
      where.id_dt_correspondencia = filters.id_dt_correspondencia;
    }

    // Filtro de asunto
    if (filters?.asunto) {
      where.asunto = filters.asunto;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_correspondencia";
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

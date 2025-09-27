/**
 * @fileoverview Servicio de ct_correspondencia_prioridad usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_capitulo, ct_correspondencia_prioridad } from "@prisma/client";
import {
  CrearCtCorrespondenciaPrioridadInput,
  ActualizarCtCorrespondenciaPrioridadInput,
  BuscarCtCorrespondenciaPrioridadInput,
} from "../schemas/ct_correspondencia_prioridad.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class CtCorrespondenciaPrioridadService extends BaseService<
  ct_correspondencia_prioridad,
  CrearCtCorrespondenciaPrioridadInput,
  ActualizarCtCorrespondenciaPrioridadInput,
  BuscarCtCorrespondenciaPrioridadInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_correspondencia_prioridad",
    defaultOrderBy: { id_ct_correspondencia_prioridad: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(
    filters?: BuscarCtCorrespondenciaPrioridadInput
  ) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(
    filters?: BuscarCtCorrespondenciaPrioridadInput
  ) {
    const where: any = {};

    // Filtro de id_ct_capitulo
    if (filters?.id_ct_correspondencia_prioridad) {
      where.id_ct_correspondencia_prioridad =
        filters.id_ct_correspondencia_prioridad;
    }

    // Filtro de nombre_capitulo
    if (filters?.nombre) {
      where.nombre = {
        contains: filters.nombre,
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
    return "id_ct_correspondencia_prioridad";
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

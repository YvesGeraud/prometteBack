/**
 * @fileoverview Servicio de dt_planeaciones_aneec usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_planeaciones_aneec } from "@prisma/client";
import {
  CrearDtPlaneacionesAneecInput,
  ActualizarDtPlaneacionesAneecInput,
  BuscarDtPlaneacionesAneecInput,
} from "../schemas/dt_planeaciones_aneec.schema";

//TODO ===== SERVICIO PARA DT_PLANEACIONES_ANEEC CON BASE SERVICE =====

export class DtPlaneacionesAneecService extends BaseService<
  dt_planeaciones_aneec,
  CrearDtPlaneacionesAneecInput,
  ActualizarDtPlaneacionesAneecInput,
  BuscarDtPlaneacionesAneecInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_planeaciones_aneec",
    defaultOrderBy: { id_dt_planeaciones_aneec: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtPlaneacionesAneecInput) {
    return {};
  }

  // 🔍 Filtros específicos para planeaciones aneec
  protected construirWhereClause(filters?: BuscarDtPlaneacionesAneecInput) {
    const where: any = {};

    // Filtro de id_dt_planeaciones_aneec
    if (filters?.id_dt_planeaciones_aneec) {
      where.id_dt_planeaciones_aneec = filters.id_dt_planeaciones_aneec;
    }

    // Filtro de ruta_documento
    if (filters?.ruta_documento) {
      where.ruta_documento = {
        contains: filters.ruta_documento,
      };
    }

    // Filtro de id_ct_documento_aneec
    if (filters?.id_ct_documento_aneec) {
      where.id_ct_documento_aneec = filters.id_ct_documento_aneec;
    }

    // Filtro de id_dt_aspirante_aneec
    if (filters?.id_dt_aspirante_aneec) {
      where.id_dt_aspirante_aneec = filters.id_dt_aspirante_aneec;
    }

    // Filtro de id_dt_diagnostico_aneec
    if (filters?.id_dt_diagnostico_aneec) {
      where.id_dt_diagnostico_aneec = filters.id_dt_diagnostico_aneec;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_planeaciones_aneec";
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

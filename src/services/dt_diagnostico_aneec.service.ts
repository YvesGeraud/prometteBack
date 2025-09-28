/**
 * @fileoverview Servicio de dt_diagnostico_aneec usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_diagnostico_aneec } from "@prisma/client";
import {
  CrearDtDiagnosticoAneecInput,
  ActualizarDtDiagnosticoAneecInput,
  BuscarDtDiagnosticoAneecInput,
} from "../schemas/dt_diagnostico_aneec.schema";

//TODO ===== SERVICIO PARA CT_BITACORA_ACCION CON BASE SERVICE =====

export class DtDiagnosticoAneecService extends BaseService<
  dt_diagnostico_aneec,
  CrearDtDiagnosticoAneecInput,
  ActualizarDtDiagnosticoAneecInput,
  BuscarDtDiagnosticoAneecInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_diagnostico_aneec",
    defaultOrderBy: { id_dt_diagnostico_aneec: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtDiagnosticoAneecInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarDtDiagnosticoAneecInput) {
    const where: any = {};

    // Filtro de id_dt_diagnostico_aneec
    if (filters?.id_dt_diagnostico_aneec) {
      where.id_dt_diagnostico_aneec = filters.id_dt_diagnostico_aneec;
    }

    // Filtro de curp
    if (filters?.curp) {
      where.curp = {
        contains: filters.curp,
      };
    }

    // Filtro de nombreCompleto
    if (filters?.nombreCompleto) {
      where.nombreCompleto = {
        contains: filters.nombreCompleto,
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
    return "id_dt_diagnostico_aneec";
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

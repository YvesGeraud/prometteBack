/**
 * @fileoverview Servicio de dt_informes_aneec usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_informes_aneec } from "@prisma/client";
import {
  CrearDtInformesAneecInput,
  ActualizarDtInformesAneecInput,
  BuscarDtInformesAneecInput,
} from "../schemas/dt_informes_aneec.schema";

//TODO ===== SERVICIO PARA DT_INFORMES_ANEEC CON BASE SERVICE =====

export class DtInformesAneecService extends BaseService<
  dt_informes_aneec,
  CrearDtInformesAneecInput,
  ActualizarDtInformesAneecInput,
  BuscarDtInformesAneecInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_informes_aneec",
    defaultOrderBy: { id_dt_informes_aneec: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtInformesAneecInput) {
    return {};
  }

  // 🔍 Filtros específicos para informes aneec
  protected construirWhereClause(filters?: BuscarDtInformesAneecInput) {
    const where: any = {};

    // Filtro de id_dt_informes_aneec
    if (filters?.id_dt_informes_aneec) {
      where.id_dt_informes_aneec = filters.id_dt_informes_aneec;
    }

    // Filtro de ruta_informe
    if (filters?.ruta_informe) {
      where.ruta_informe = {
        contains: filters.ruta_informe,
      };
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
    return "id_dt_informes_aneec";
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

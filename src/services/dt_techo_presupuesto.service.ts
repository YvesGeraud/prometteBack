/**
 * @fileoverview Servicio de dt_techo_presupuesto usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { dt_techo_presupuesto } from "@prisma/client";
import {
  CrearDtTechoPresupuestoInput,
  ActualizarDtTechoPresupuestoInput,
  BuscarDtTechoPresupuestoInput,
} from "../schemas/dt_techo_presupuesto.schema";

//TODO ===== SERVICIO PARA DT_TECHO_PRESUPUESTO CON BASE SERVICE =====

export class DtTechoPresupuestoService extends BaseService<
  dt_techo_presupuesto,
  CrearDtTechoPresupuestoInput,
  ActualizarDtTechoPresupuestoInput,
  BuscarDtTechoPresupuestoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "dt_techo_presupuesto",
    defaultOrderBy: { id_dt_techo_presupuesto: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarDtTechoPresupuestoInput) {
    return {};
  }

  // 🔍 Filtros específicos para techos presupuestales
  protected construirWhereClause(filters?: BuscarDtTechoPresupuestoInput) {
    const where: any = {};

    // Filtro de id_dt_techo_presupuesto
    if (filters?.id_dt_techo_presupuesto) {
      where.id_dt_techo_presupuesto = filters.id_dt_techo_presupuesto;
    }

    // Filtro de id_rl_area_financiero
    if (filters?.id_rl_area_financiero) {
      where.id_rl_area_financiero = filters.id_rl_area_financiero;
    }

    // Filtro de id_ct_capitulo
    if (filters?.id_ct_capitulo) {
      where.id_ct_capitulo = filters.id_ct_capitulo;
    }

    // Filtro de id_ct_financiamiento
    if (filters?.id_ct_financiamiento) {
      where.id_ct_financiamiento = filters.id_ct_financiamiento;
    }

    // Filtro de cantidad_presupuestada
    if (filters?.cantidad_presupuestada) {
      where.cantidad_presupuestada = filters.cantidad_presupuestada;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_dt_techo_presupuesto";
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

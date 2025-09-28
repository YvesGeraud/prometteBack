/**
 * @fileoverview Servicio de rl_entrega_formato usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { rl_entrega_formato } from "@prisma/client";
import {
  CrearRlEntregaFormatoInput,
  ActualizarRlEntregaFormatoInput,
  BuscarRlEntregaFormatoInput,
} from "../schemas/rl_entrega_formato.schema";

//TODO ===== SERVICIO PARA RL_ENTREGA_FORMATO CON BASE SERVICE =====

export class RlEntregaFormatoService extends BaseService<
  rl_entrega_formato,
  CrearRlEntregaFormatoInput,
  ActualizarRlEntregaFormatoInput,
  BuscarRlEntregaFormatoInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "rl_entrega_formato",
    defaultOrderBy: { id_rl_entrega_formato: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarRlEntregaFormatoInput) {
    return {};
  }

  // 🔍 Filtros específicos para relaciones entrega formato
  protected construirWhereClause(filters?: BuscarRlEntregaFormatoInput) {
    const where: any = {};

    // Filtro de id_rl_entrega_formato
    if (filters?.id_rl_entrega_formato) {
      where.id_rl_entrega_formato = filters.id_rl_entrega_formato;
    }

    // Filtro de folio_formato
    if (filters?.folio_formato) {
      where.folio_formato = {
        contains: filters.folio_formato,
      };
    }

    // Filtro de mes_cantidad
    if (filters?.mes_cantidad) {
      where.mes_cantidad = {
        contains: filters.mes_cantidad,
      };
    }

    // Filtro de persona_recibe
    if (filters?.persona_recibe) {
      where.persona_recibe = {
        contains: filters.persona_recibe,
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
    return "id_rl_entrega_formato";
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

/**
 * @fileoverview Servicio de ct_producto_consumible usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { ct_producto_consumible } from "@prisma/client";
import {
  CrearCtProductoConsumibleInput,
  ActualizarCtProductoConsumibleInput,
  BuscarCtProductoConsumibleInput,
} from "../schemas/ct_producto_consumible.schema";

//TODO ===== SERVICIO PARA CT_PRODUCTO_CONSUMIBLE CON BASE SERVICE =====

export class CtProductoConsumibleService extends BaseService<
  ct_producto_consumible,
  CrearCtProductoConsumibleInput,
  ActualizarCtProductoConsumibleInput,
  BuscarCtProductoConsumibleInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "ct_producto_consumible",
    defaultOrderBy: { id_ct_producto_consumible: "asc" as const },
    campoActivo: "estado",
  };

  // 🔗 Sin includes - tabla simple (3 líneas)
  protected configurarIncludes(filters?: BuscarCtProductoConsumibleInput) {
    return {};
  }

  // 🔍 Filtros específicos para entidades
  protected construirWhereClause(filters?: BuscarCtProductoConsumibleInput) {
    const where: any = {};

    // Filtro de id_ct_producto_consumible
    if (filters?.id_ct_producto_consumible) {
      where.id_ct_producto_consumible = filters.id_ct_producto_consumible;
    }

    // Filtro de id_ct_partida
    if (filters?.id_ct_partida) {
      where.id_ct_partida = filters.id_ct_partida;
    }

    // Filtro de nombre_producto
    if (filters?.nombre_producto) {
      where.nombre_producto = {
        contains: filters.nombre_producto,
      };
    }

    // Filtro de precio
    if (filters?.precio) {
      where.precio = filters.precio;
    }

    // Filtro de id_ct_unidad_medida
    if (filters?.id_ct_unidad_medida) {
      where.id_ct_unidad_medida = filters.id_ct_unidad_medida;
    }

    // Filtro de estado
    if (filters?.estado) {
      where.estado = filters.estado;
    }

    return where;
  }

  // 🔧 Sobrescribir campo PK (3 líneas)
  protected getPrimaryKeyField(): string {
    return "id_ct_producto_consumible";
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

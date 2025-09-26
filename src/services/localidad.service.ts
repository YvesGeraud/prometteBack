/**
 * @fileoverview Servicio de ct_localidad usando BaseService
 * ¡Prueba de que solo necesitas ~15 líneas para un CRUD completo!
 */

import { BaseService } from "./BaseService";
import { Localidad } from "@prisma/client";
import {
  CrearCtLocalidadInput,
  ActualizarCtLocalidadInput,
  BuscarLocalidadInput,
} from "../schemas/ct_localidad.schema";

//TODO ===== SERVICIO PARA CT_LOCALIDAD CON BASE SERVICE =====

export class CtLocalidadBaseService extends BaseService<
  Localidad,
  CrearCtLocalidadInput,
  ActualizarCtLocalidadInput,
  BuscarLocalidadInput
> {
  // 🔧 Configuración específica del modelo (4 líneas)
  protected config = {
    tableName: "localidad", // Nombre del modelo en Prisma (no de la tabla)
    defaultOrderBy: { id_localidad: "asc" as const },
  };

  // 🔗 Includes condicionales basados en filtros
  protected configurarIncludes(filters?: BuscarLocalidadInput) {
    // Por defecto, sin includes para mejor performance
    const includes: any = {};

    // Include condicional de municipio
    if (filters?.incluir_municipio) {
      includes.ct_municipio = true;
    }

    // Include anidado: municipio + entidad
    if (filters?.incluir_municipio_con_entidad) {
      includes.ct_municipio = {
        include: {
          ct_entidad: true,
        },
      };
    }

    // 🎯 IMPORTANTE: Si no hay includes, retornar undefined para que Prisma no incluya nada
    return Object.keys(includes).length > 0 ? includes : undefined;
  }

  // 🔍 Filtros específicos para municipios
  protected construirWhereClause(filters?: BuscarLocalidadInput) {
    const where: any = {};
    const conditions: any[] = [];

    if (filters?.id_localidad) {
      conditions.push({
        id_localidad: filters.id_localidad,
      });
    }

    // Filtro de municipio (simplificado para compatibilidad)
    if (filters?.localidad) {
      conditions.push({
        localidad: {
          contains: filters.localidad,
        },
      });
    }

    // Filtro de municipio
    if (filters?.ambito) {
      conditions.push({
        ambito: filters.ambito,
      });
    }

    // Filtro de ámbito
    if (filters?.id_municipio) {
      conditions.push({
        id_municipio: filters.id_municipio,
      });
    }

    // Si hay condiciones, usar AND, sino where vacío
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    return where;
  }

  // ✅ NO necesitamos sobreescribir getPrimaryKeyField()
  // El algoritmo inteligente detecta: ct_municipio → id_municipio automáticamente
}

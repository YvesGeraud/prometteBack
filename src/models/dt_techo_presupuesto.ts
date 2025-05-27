import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_area, ct_areaId } from './ct_area';
import type { ct_capitulo, ct_capituloId } from './ct_capitulo';
import type { ct_financiamiento, ct_financiamientoId } from './ct_financiamiento';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';
import type { dt_proyecto_anual, dt_proyecto_anualId } from './dt_proyecto_anual';
import type { rl_producto_requisicion, rl_producto_requisicionId } from './rl_producto_requisicion';

export interface dt_techo_presupuestoAttributes {
  id_techo: number;
  ct_area_id: number;
  ct_capitulo_id: number;
  ct_financiamiento_id: number;
  cantidad_presupuestada: number;
  ct_usuario_in: number;
  ct_usuario_at?: number;
  fecha_in: Date;
  fecha_at?: Date;
}

export type dt_techo_presupuestoPk = "id_techo";
export type dt_techo_presupuestoId = dt_techo_presupuesto[dt_techo_presupuestoPk];
export type dt_techo_presupuestoOptionalAttributes = "id_techo" | "ct_area_id" | "ct_capitulo_id" | "ct_financiamiento_id" | "cantidad_presupuestada" | "ct_usuario_in" | "ct_usuario_at" | "fecha_in" | "fecha_at";
export type dt_techo_presupuestoCreationAttributes = Optional<dt_techo_presupuestoAttributes, dt_techo_presupuestoOptionalAttributes>;

export class dt_techo_presupuesto extends Model<dt_techo_presupuestoAttributes, dt_techo_presupuestoCreationAttributes> implements dt_techo_presupuestoAttributes {
  id_techo!: number;
  ct_area_id!: number;
  ct_capitulo_id!: number;
  ct_financiamiento_id!: number;
  cantidad_presupuestada!: number;
  ct_usuario_in!: number;
  ct_usuario_at?: number;
  fecha_in!: Date;
  fecha_at?: Date;

  // dt_techo_presupuesto belongsTo ct_area via ct_area_id
  ct_area!: ct_area;
  getCt_area!: Sequelize.BelongsToGetAssociationMixin<ct_area>;
  setCt_area!: Sequelize.BelongsToSetAssociationMixin<ct_area, ct_areaId>;
  createCt_area!: Sequelize.BelongsToCreateAssociationMixin<ct_area>;
  // dt_techo_presupuesto belongsTo ct_capitulo via ct_capitulo_id
  ct_capitulo!: ct_capitulo;
  getCt_capitulo!: Sequelize.BelongsToGetAssociationMixin<ct_capitulo>;
  setCt_capitulo!: Sequelize.BelongsToSetAssociationMixin<ct_capitulo, ct_capituloId>;
  createCt_capitulo!: Sequelize.BelongsToCreateAssociationMixin<ct_capitulo>;
  // dt_techo_presupuesto belongsTo ct_financiamiento via ct_financiamiento_id
  ct_financiamiento!: ct_financiamiento;
  getCt_financiamiento!: Sequelize.BelongsToGetAssociationMixin<ct_financiamiento>;
  setCt_financiamiento!: Sequelize.BelongsToSetAssociationMixin<ct_financiamiento, ct_financiamientoId>;
  createCt_financiamiento!: Sequelize.BelongsToCreateAssociationMixin<ct_financiamiento>;
  // dt_techo_presupuesto belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // dt_techo_presupuesto belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // dt_techo_presupuesto hasMany dt_proyecto_anual via dt_techo_id
  dt_proyecto_anuals!: dt_proyecto_anual[];
  getDt_proyecto_anuals!: Sequelize.HasManyGetAssociationsMixin<dt_proyecto_anual>;
  setDt_proyecto_anuals!: Sequelize.HasManySetAssociationsMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  addDt_proyecto_anual!: Sequelize.HasManyAddAssociationMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  addDt_proyecto_anuals!: Sequelize.HasManyAddAssociationsMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  createDt_proyecto_anual!: Sequelize.HasManyCreateAssociationMixin<dt_proyecto_anual>;
  removeDt_proyecto_anual!: Sequelize.HasManyRemoveAssociationMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  removeDt_proyecto_anuals!: Sequelize.HasManyRemoveAssociationsMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  hasDt_proyecto_anual!: Sequelize.HasManyHasAssociationMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  hasDt_proyecto_anuals!: Sequelize.HasManyHasAssociationsMixin<dt_proyecto_anual, dt_proyecto_anualId>;
  countDt_proyecto_anuals!: Sequelize.HasManyCountAssociationsMixin;
  // dt_techo_presupuesto hasMany rl_producto_requisicion via dt_techo_id
  rl_producto_requisicions!: rl_producto_requisicion[];
  getRl_producto_requisicions!: Sequelize.HasManyGetAssociationsMixin<rl_producto_requisicion>;
  setRl_producto_requisicions!: Sequelize.HasManySetAssociationsMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  addRl_producto_requisicion!: Sequelize.HasManyAddAssociationMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  addRl_producto_requisicions!: Sequelize.HasManyAddAssociationsMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  createRl_producto_requisicion!: Sequelize.HasManyCreateAssociationMixin<rl_producto_requisicion>;
  removeRl_producto_requisicion!: Sequelize.HasManyRemoveAssociationMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  removeRl_producto_requisicions!: Sequelize.HasManyRemoveAssociationsMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  hasRl_producto_requisicion!: Sequelize.HasManyHasAssociationMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  hasRl_producto_requisicions!: Sequelize.HasManyHasAssociationsMixin<rl_producto_requisicion, rl_producto_requisicionId>;
  countRl_producto_requisicions!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_techo_presupuesto {
    return dt_techo_presupuesto.init({
    id_techo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ct_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ct_area',
        key: 'id_area'
      }
    },
    ct_capitulo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ct_capitulo',
        key: 'id_capitulo'
      }
    },
    ct_financiamiento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ct_financiamiento',
        key: 'id_financiamiento'
      }
    },
    cantidad_presupuestada: {
      type: DataTypes.DECIMAL(15,3),
      allowNull: false,
      defaultValue: 0.000
    },
    ct_usuario_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    ct_usuario_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    fecha_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'dt_techo_presupuesto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_techo" },
        ]
      },
      {
        name: "fk_techo_area",
        using: "BTREE",
        fields: [
          { name: "ct_area_id" },
        ]
      },
      {
        name: "fk_techo_capitulo",
        using: "BTREE",
        fields: [
          { name: "ct_capitulo_id" },
        ]
      },
      {
        name: "fk_techo_financiamiento",
        using: "BTREE",
        fields: [
          { name: "ct_financiamiento_id" },
        ]
      },
      {
        name: "fk_techo_usuario_in",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_techo_usuario_at",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}

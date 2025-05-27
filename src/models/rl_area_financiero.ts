import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';
import type { rl_analista_unidad, rl_analista_unidadId } from './rl_analista_unidad';

export interface rl_area_financieroAttributes {
  id_area_fin: number;
  id_financiero: number;
  id_area_infra: number;
  ct_usuario_in: number;
  ct_usuario_at?: number;
  fecha_in: Date;
  fecha_at?: Date;
}

export type rl_area_financieroPk = "id_area_fin";
export type rl_area_financieroId = rl_area_financiero[rl_area_financieroPk];
export type rl_area_financieroOptionalAttributes = "id_area_fin" | "id_financiero" | "id_area_infra" | "ct_usuario_in" | "ct_usuario_at" | "fecha_in" | "fecha_at";
export type rl_area_financieroCreationAttributes = Optional<rl_area_financieroAttributes, rl_area_financieroOptionalAttributes>;

export class rl_area_financiero extends Model<rl_area_financieroAttributes, rl_area_financieroCreationAttributes> implements rl_area_financieroAttributes {
  id_area_fin!: number;
  id_financiero!: number;
  id_area_infra!: number;
  ct_usuario_in!: number;
  ct_usuario_at?: number;
  fecha_in!: Date;
  fecha_at?: Date;

  // rl_area_financiero belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // rl_area_financiero belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // rl_area_financiero hasMany rl_analista_unidad via rl_area_financiero
  rl_analista_unidads!: rl_analista_unidad[];
  getRl_analista_unidads!: Sequelize.HasManyGetAssociationsMixin<rl_analista_unidad>;
  setRl_analista_unidads!: Sequelize.HasManySetAssociationsMixin<rl_analista_unidad, rl_analista_unidadId>;
  addRl_analista_unidad!: Sequelize.HasManyAddAssociationMixin<rl_analista_unidad, rl_analista_unidadId>;
  addRl_analista_unidads!: Sequelize.HasManyAddAssociationsMixin<rl_analista_unidad, rl_analista_unidadId>;
  createRl_analista_unidad!: Sequelize.HasManyCreateAssociationMixin<rl_analista_unidad>;
  removeRl_analista_unidad!: Sequelize.HasManyRemoveAssociationMixin<rl_analista_unidad, rl_analista_unidadId>;
  removeRl_analista_unidads!: Sequelize.HasManyRemoveAssociationsMixin<rl_analista_unidad, rl_analista_unidadId>;
  hasRl_analista_unidad!: Sequelize.HasManyHasAssociationMixin<rl_analista_unidad, rl_analista_unidadId>;
  hasRl_analista_unidads!: Sequelize.HasManyHasAssociationsMixin<rl_analista_unidad, rl_analista_unidadId>;
  countRl_analista_unidads!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof rl_area_financiero {
    return rl_area_financiero.init({
    id_area_fin: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_financiero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    id_area_infra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ct_usuario_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    ct_usuario_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
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
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'rl_area_financiero',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_area_fin" },
        ]
      },
      {
        name: "fk_area_fin_usuario_in",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_area_fin_usuario_at",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}

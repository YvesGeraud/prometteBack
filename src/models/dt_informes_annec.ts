import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';
import type { dt_aspirante_aneec, dt_aspirante_aneecId } from './dt_aspirante_aneec';

export interface dt_informes_annecAttributes {
  id_informe: number;
  ruta_informe: string;
  dt_aspirante_id: number;
  ct_usuario_in: number;
  fecha_in: Date;
  ct_usuario_at?: number;
  fecha_at?: Date;
}

export type dt_informes_annecPk = "id_informe";
export type dt_informes_annecId = dt_informes_annec[dt_informes_annecPk];
export type dt_informes_annecOptionalAttributes = "id_informe" | "fecha_in" | "ct_usuario_at" | "fecha_at";
export type dt_informes_annecCreationAttributes = Optional<dt_informes_annecAttributes, dt_informes_annecOptionalAttributes>;

export class dt_informes_annec extends Model<dt_informes_annecAttributes, dt_informes_annecCreationAttributes> implements dt_informes_annecAttributes {
  id_informe!: number;
  ruta_informe!: string;
  dt_aspirante_id!: number;
  ct_usuario_in!: number;
  fecha_in!: Date;
  ct_usuario_at?: number;
  fecha_at?: Date;

  // dt_informes_annec belongsTo ct_usuario via ct_usuario_in
  ct_usuario_in_ct_usuario!: ct_usuario;
  getCt_usuario_in_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_in_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_in_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // dt_informes_annec belongsTo ct_usuario via ct_usuario_at
  ct_usuario_at_ct_usuario!: ct_usuario;
  getCt_usuario_at_ct_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario_at_ct_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario_at_ct_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;
  // dt_informes_annec belongsTo dt_aspirante_aneec via dt_aspirante_id
  dt_aspirante!: dt_aspirante_aneec;
  getDt_aspirante!: Sequelize.BelongsToGetAssociationMixin<dt_aspirante_aneec>;
  setDt_aspirante!: Sequelize.BelongsToSetAssociationMixin<dt_aspirante_aneec, dt_aspirante_aneecId>;
  createDt_aspirante!: Sequelize.BelongsToCreateAssociationMixin<dt_aspirante_aneec>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_informes_annec {
    return dt_informes_annec.init({
    id_informe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ruta_informe: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dt_aspirante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dt_aspirante_aneec',
        key: 'id_aspirante'
      }
    },
    ct_usuario_in: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    ct_usuario_at: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ct_usuario',
        key: 'id_usuario'
      }
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'dt_informes_annec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_informe" },
        ]
      },
      {
        name: "fk_dt_aspirante_id_informe",
        using: "BTREE",
        fields: [
          { name: "dt_aspirante_id" },
        ]
      },
      {
        name: "fk_dt_informes_annec_creado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_in" },
        ]
      },
      {
        name: "fk_dt_informes_annec_actualizado_por",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_at" },
        ]
      },
    ]
  });
  }
}

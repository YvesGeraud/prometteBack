import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_area, ct_areaId } from './ct_area';
import type { ct_partida, ct_partidaId } from './ct_partida';
import type { ct_usuario, ct_usuarioId } from './ct_usuario';

export interface rl_justificacionAttributes {
  id_justificacion: number;
  ct_partida_id: number;
  ct_area_id: number;
  justificacion: string;
  ct_usuario_id?: number;
  fecha_in: Date;
  fecha_at: Date;
}

export type rl_justificacionPk = "id_justificacion";
export type rl_justificacionId = rl_justificacion[rl_justificacionPk];
export type rl_justificacionOptionalAttributes = "id_justificacion" | "ct_usuario_id" | "fecha_in" | "fecha_at";
export type rl_justificacionCreationAttributes = Optional<rl_justificacionAttributes, rl_justificacionOptionalAttributes>;

export class rl_justificacion extends Model<rl_justificacionAttributes, rl_justificacionCreationAttributes> implements rl_justificacionAttributes {
  id_justificacion!: number;
  ct_partida_id!: number;
  ct_area_id!: number;
  justificacion!: string;
  ct_usuario_id?: number;
  fecha_in!: Date;
  fecha_at!: Date;

  // rl_justificacion belongsTo ct_area via ct_area_id
  ct_area!: ct_area;
  getCt_area!: Sequelize.BelongsToGetAssociationMixin<ct_area>;
  setCt_area!: Sequelize.BelongsToSetAssociationMixin<ct_area, ct_areaId>;
  createCt_area!: Sequelize.BelongsToCreateAssociationMixin<ct_area>;
  // rl_justificacion belongsTo ct_partida via ct_partida_id
  ct_partida!: ct_partida;
  getCt_partida!: Sequelize.BelongsToGetAssociationMixin<ct_partida>;
  setCt_partida!: Sequelize.BelongsToSetAssociationMixin<ct_partida, ct_partidaId>;
  createCt_partida!: Sequelize.BelongsToCreateAssociationMixin<ct_partida>;
  // rl_justificacion belongsTo ct_usuario via ct_usuario_id
  ct_usuario!: ct_usuario;
  getCt_usuario!: Sequelize.BelongsToGetAssociationMixin<ct_usuario>;
  setCt_usuario!: Sequelize.BelongsToSetAssociationMixin<ct_usuario, ct_usuarioId>;
  createCt_usuario!: Sequelize.BelongsToCreateAssociationMixin<ct_usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof rl_justificacion {
    return rl_justificacion.init({
    id_justificacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ct_partida_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ID de la partida relacionada con esta justificación",
      references: {
        model: 'ct_partida',
        key: 'id_partida'
      }
    },
    ct_area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ID del área relacionada con esta justificación",
      references: {
        model: 'ct_area',
        key: 'id_area'
      }
    },
    justificacion: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Texto de la justificación para la combinación área-partida"
    },
    ct_usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Usuario que creó la justificación",
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
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'rl_justificacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_justificacion" },
        ]
      },
      {
        name: "idx_justificacion_partida",
        using: "BTREE",
        fields: [
          { name: "ct_partida_id" },
        ]
      },
      {
        name: "idx_justificacion_area",
        using: "BTREE",
        fields: [
          { name: "ct_area_id" },
        ]
      },
      {
        name: "idx_justificacion_usuario",
        using: "BTREE",
        fields: [
          { name: "ct_usuario_id" },
        ]
      },
      {
        name: "idx_justificacion_partida_area",
        using: "BTREE",
        fields: [
          { name: "ct_partida_id" },
          { name: "ct_area_id" },
        ]
      },
    ]
  });
  }
}

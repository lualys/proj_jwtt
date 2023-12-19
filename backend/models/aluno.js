'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class aluno extends Model {
    static associate(models) {
      aluno.belongsTo(models.curso, {
        foreignKey: 'cur_id'
      })
    }
  }
  aluno.init(
    {
      nome: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'aluno'
    }
  )
  return aluno
}
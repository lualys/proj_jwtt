'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class curso extends Model {
    static associate(models) {
      curso.hasMany(models.aluno, {
        foreignKey: 'cur_id'
      })
    }
  }
  curso.init(
    {
      curso: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'curso'
    }
  )
  return curso
}
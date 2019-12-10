'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PreguntaSchema extends Schema {
  up () {
    this.create('preguntas', (table) => {
      table.increments()
      table.integer('idcuestionario').notNullable().references('id').inTable('cuestionarios');
      table.string('preguntatxt', 80).notNullable()
      table.string('respuesta', 80)
      table.string('respondido', 10)
      //table.string('calificar', 10)
      table.integer('tiporespuesta')
      table.integer('visible').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('preguntas')
  }
}

module.exports = PreguntaSchema

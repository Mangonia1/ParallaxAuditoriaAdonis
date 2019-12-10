'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RespuestaSchema extends Schema {
  up () {
    this.create('respuestas', (table) => {
      table.increments()
      table.integer('idpregunta').notNullable().references('id').inTable('preguntas');
      table.string('respuestatxt', 80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('respuestas')
  }
}

module.exports = RespuestaSchema

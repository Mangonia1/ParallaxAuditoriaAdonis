'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CuestionarioSchema extends Schema {
  up () {
    this.create('cuestionarios', (table) => {
      table.increments()
      table.string('nombrecuestionario', 80).notNullable()
      table.integer('idcreador').notNullable()
      table.string('usernameauditor', 80).notNullable()
      table.string('empresa', 80).notNullable()
      table.string('departamento', 80).notNullable()
      table.integer('terminado').notNullable()
      table.integer('terminareditarcuestionario').notNullable()
      table.integer('visible').notNullable()
      //table.integer('idauditor').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cuestionarios')
  }
}

module.exports = CuestionarioSchema

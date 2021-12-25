import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add games table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLES.GAMES, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary().unsigned();
    table.string('name').notNullable();

    table.timestamps(true, true);
  });
}

/**
 * Drop games table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.GAMES);
}

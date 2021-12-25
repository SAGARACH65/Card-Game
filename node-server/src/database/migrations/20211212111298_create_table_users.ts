import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add users table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLES.USERS, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary().unsigned();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();

    table.timestamps(true, true);
  });
}

/**
 * Drop users table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.USERS);
}

import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add user_games table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  await knex.schema.createTable(TABLES.USER_GAMES, (table: Knex.CreateTableBuilder) => {
    table.string('id').primary();

    table.integer('game_id').references('id').inTable(TABLES.GAMES).notNullable();
    table.integer('user_id').references('id').inTable(TABLES.USERS).notNullable();
    table.specificType('cards_generated', 'varchar').notNullable();

    table.string('game_status').notNullable();

    table.integer('hands_dealt').notNullable();
    table.boolean('is_winner').defaultTo(false);

    table.timestamps(true, true);
  });

  await knex.raw(`
  ALTER TABLE ${TABLES.USER_GAMES}
    ADD CONSTRAINT game_status_check
    CHECK (game_status IN ('IN_PROGRESS', 'COMPLETED'))
`);

  return;
}

/**
 * Drop user_games table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.USER_GAMES);
}

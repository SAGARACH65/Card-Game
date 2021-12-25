import Knex from 'knex';

import TABLES from '../../constants/tables';

/**
 * Add game_settings table.
 *
 * @param {Knex} knex
 */
export async function up(knex: Knex) {
  return knex.schema.createTable(TABLES.GAME_SETTINGS, (table: Knex.CreateTableBuilder) => {
    table.increments('id').primary().unsigned();

    table.integer('game_id').references('id').inTable(TABLES.GAMES).notNullable();
    table.integer('cards_dealt_in_one_hand').notNullable();
    table.integer('winner_card').notNullable();
    table.specificType('generation_config', 'varchar');

    table.timestamps(true, true);
  });
  //   TODO: Find a way to add this contraint in pg.
  //   .then(async () => {
  //     await knex.raw(`
  //     ALTER TABLE ${TABLES.GAME_SETTINGS}
  //       ADD CONSTRAINT check_config_is_valid_json
  //       CHECK(ISJSON(generation_config) = 1);
  //   `);
  //   })
}

/**
 * Drop game_settings table.
 *
 * @param {Knex} knex
 */
export async function down(knex: Knex) {
  return knex.schema.dropTable(TABLES.GAME_SETTINGS);
}

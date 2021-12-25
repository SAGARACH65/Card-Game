import Knex from 'knex';

import TABLES from '../../constants/tables';

export async function seed(knex: Knex): Promise<any> {
  return knex(TABLES.GAMES).then(() => {
    // Inserts seed entries
    return knex(TABLES.GAMES).insert([
      {
        id: 1,
        name: 'Card Game 1',
      },
    ]);
  });
}

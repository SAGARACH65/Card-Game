import Knex from 'knex';

import TABLES from '../../constants/tables';
import { ADMIN_USER_ID } from '../../constants/common';

export async function seed(knex: Knex): Promise<any> {
  return knex(TABLES.USERS).then(() => {
    // Inserts seed entries
    return knex(TABLES.USERS).insert([
      {
        id: ADMIN_USER_ID,
        username: 'Admin',
        email: 'admin@test.com',
      },
    ]);
  });
}

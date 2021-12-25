import * as path from 'path';

import knex from '../config/knex';
import { read } from '../utils/fs';
import User from '../domains/responses/User';

const queryPath = path.resolve(__dirname, '../database/queries');

/**
 * Fetches the user data
 *
 * @param {number} userId
 * @returns {Promise<User>}
 */
export async function getUserData(userId: number): Promise<User> {
  const fetchUserQuery = await read(`${queryPath}/get_user_data.sql`);

  const [data] = await knex.raw<User[]>(fetchUserQuery, { userId: userId });

  return data;
}

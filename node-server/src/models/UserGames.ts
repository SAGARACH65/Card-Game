import * as path from 'path';

import knex from '../config/knex';
import { read } from '../utils/fs';
import TABLES from '../constants/tables';
import GameStatus from '../enums/GameStatus';
import UserGame from '../domains/entities/UserGame';
import UserGameResponse from '../domains/misc/UserGame';

const queryPath = path.resolve(__dirname, '../database/queries');

/**
 * Fetches the user game data for the `userGameId`
 *
 * @param {string} userGameId
 * @returns {Promise<UserGameResponse>}
 */
export const getUserGameData = async (userGameId: string): Promise<UserGameResponse> => {
  const fetchUserGameDataQuery = await read(`${queryPath}/get_user_game_data.sql`);

  const [data] = await knex.raw(fetchUserGameDataQuery, { userGameId });

  return { ...data, cardsGenerated: JSON.parse(data.cardsGenerated) };
};

/**
 * Creates a game for a user based on the params provided.
 *
 * @param {UserGame} params
 * @returns {Promise<void>}
 */
export const createUserGame = (params: UserGame) => {
  return knex(TABLES.USER_GAMES).insert(params, 'id');
};

/**
 * Updates the status and the hands_dealt variables in the user_games table.
 *
 * @param {number} handsDealt
 * @param {string} userGameId
 * @param {GameStatus} GameStatus
 * @returns {Promise<void>}
 */
export const updateHandsDealt = (
  userGameId: string,
  handsDealt: number,
  gameStatus: GameStatus
) => {
  return knex.raw(
    `UPDATE ${TABLES.USER_GAMES} SET hands_dealt = ${handsDealt}, game_status = '${gameStatus}' where id = '${userGameId}'`
  );
};

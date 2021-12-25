import knex from '../config/knex';
import TABLES from '../constants/tables';
import GameSettings from '../domains/entities/GameSettings';

/**
 * Fetches the game settings for a gameId.
 *
 * @param {number} gameId
 * @returns {Promise<GameSettings>}
 */
export const getGameSettings = async (gameId: number): Promise<GameSettings> => {
  const [settings] = await knex.raw(
    `SELECT * FROM ${TABLES.GAME_SETTINGS} WHERE game_id = ${gameId}`
  );

  return {
    ...settings,
    generationConfig: JSON.parse(settings.generationConfig),
  };
};

import Knex from 'knex';

import TABLES from '../../constants/tables';
import CardTypes from '../../enums/CardTypes';

export const CARD_SUITE_MAX_COUNT = 13;

export async function seed(knex: Knex): Promise<any> {
  return knex(TABLES.GAME_SETTINGS).then(() => {
    // Inserts seed entries
    return knex(TABLES.GAME_SETTINGS).insert([
      {
        id: 1,
        game_id: 1,
        cards_dealt_in_one_hand: 5,
        winner_card: 1,
        generation_config: JSON.stringify([
          {
            name: CardTypes.SPADE,
            count: CARD_SUITE_MAX_COUNT,
          },
          {
            name: CardTypes.HEART,
            count: CARD_SUITE_MAX_COUNT,
          },
          {
            name: CardTypes.DIAMOND,
            count: CARD_SUITE_MAX_COUNT,
          },
          {
            name: CardTypes.CLUB,
            count: CARD_SUITE_MAX_COUNT,
          },
        ]),
      },
    ]);
  });
}

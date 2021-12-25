import CardTypes from '../../enums/CardTypes';
import {
  generateCardsForASuit,
  initializeCards,
  checkIfUserHasWon,
  getWinnerCardCount,
} from '../../services/game';

const EXPECTED_CARDS_FOR_SUIT = [
  { name: CardTypes.SPADE, number: 1 },
  { name: CardTypes.SPADE, number: 2 },
  { name: CardTypes.SPADE, number: 3 },
  { name: CardTypes.SPADE, number: 4 },
  { name: CardTypes.SPADE, number: 5 },
];

const TEST_GENERATION_CONFIG = [
  { name: CardTypes.SPADE, count: 3 },
  { name: CardTypes.DIAMOND, count: 2 },
];

const EXPECTED_GENERATED_CARDS = [
  { name: CardTypes.SPADE, number: 1 },
  { name: CardTypes.SPADE, number: 2 },
  { name: CardTypes.SPADE, number: 3 },
  { name: CardTypes.DIAMOND, number: 1 },
  { name: CardTypes.DIAMOND, number: 2 },
];

const GENERATION_CONFIG_FIRST = {
  winnerCard: 2,
  cardsDealtInOneHand: 2,
};

const GENERATION_CONFIG_SECOND = {
  winnerCard: 1,
  cardsDealtInOneHand: 2,
};

describe('Core service logic for card generation', () => {
  it('Generate cards for "Spade" having 5 cards', () => {
    expect(generateCardsForASuit(CardTypes.SPADE, 5)).toEqual(EXPECTED_CARDS_FOR_SUIT);
  });

  it('Should generate cards based on the generation config', () => {
    expect(initializeCards(TEST_GENERATION_CONFIG)).toEqual(EXPECTED_GENERATED_CARDS);
  });

  it('User should win based on the config', () => {
    expect(checkIfUserHasWon(EXPECTED_GENERATED_CARDS, GENERATION_CONFIG_FIRST)).toEqual(true);
  });

  it('USer should not win based on the config', () => {
    expect(checkIfUserHasWon(EXPECTED_GENERATED_CARDS, GENERATION_CONFIG_SECOND)).toEqual(false);
  });

  it('Should return the count of winner cards in the card list', () => {
    expect(getWinnerCardCount(EXPECTED_GENERATED_CARDS, 1)).toEqual(2);
  });
});

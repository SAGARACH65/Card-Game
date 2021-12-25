import Card from '../domains/misc/Card';
import CardTypes from '../enums/CardTypes';
import GameConfig from '../domains/misc/GameConfig';
import SuitConfig from '../domains/misc/GenerationConfig';

/**
 * Generates card based on certain config
 *
 * @param {GenerationConfig[]} generationConfig
 * @returns {Card[]}
 */
export const initializeCards = (generationConfig: SuitConfig[]): Card[] => {
  const generatedCards = generationConfig.reduce((acc: Card[], item: SuitConfig) => {
    return [...acc, ...generateCardsForASuit(item.name, item.count)];
  }, []);

  return generatedCards;
};

/**
 * Generates the cards for a suit. It will generate `numberOfCardsInTheSuit` for the `suitName` in ascending order.
 *
 * @param {string} suitName
 * @param {number} numberOfCardsInTheSuit
 * @returns {Card[]}
 */
export const generateCardsForASuit = (
  suitName: CardTypes,
  numberOfCardsInTheSuit: number
): Card[] => {
  const cards = [];

  for (let i = 1; i <= numberOfCardsInTheSuit; i++) {
    cards.push({
      name: suitName,
      number: i,
    });
  }

  return cards;
};

/**
 * Checks if the user has won with the generatedCards based on the  generationConfig
 *
 * @param {Card[]} generatedCards
 * @param {GameConfig} generationConfig
 * @returns {boolean}
 */
export const checkIfUserHasWon = (generatedCards: Card[], generationConfig: GameConfig) => {
  const { cardsDealtInOneHand, winnerCard } = generationConfig;

  const cardsCount = generatedCards.length;

  //   Dividing the total cards count by the hand size to get the last hand index.
  const lastHandIndex = Math.ceil(cardsCount / cardsDealtInOneHand);

  const lastHand = generatedCards.slice((lastHandIndex - 1) * cardsDealtInOneHand);

  // If there is a ace winner card in the last hand. Then the user is a winner. And its computed at the start before revealing it to the user.
  const hasUserWon = !!lastHand.some((item) => item.number === winnerCard);

  return hasUserWon;
};

/**
 * Returns the count of winner cards in the `cards` variable. Uses the winnerCard determine the winner card count.
 *
 * @param {Card[]} cards
 * @param {number} winnerCard
 * @returns {number}
 */
export const getWinnerCardCount = (cards: Card[], winnerCard: number) => {
  return cards.reduce((sum: number, item) => {
    if (item.number === winnerCard) {
      return sum + 1;
    }

    return sum;
  }, 0);
};

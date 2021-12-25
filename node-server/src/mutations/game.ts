import * as uuid from 'uuid';

import { en } from '../lang/en-us';
import { shuffleArr } from '../utils/common';
import GameStatus from '../enums/GameStatus';
import { getGameSettings } from '../models/Game';
import { INITIAL_HAND_NUMBER } from '../constants/common';
import GameResponse from '../domains/responses/GameResponse';
import { createUserGame, getUserGameData, updateHandsDealt } from '../models/UserGames';
import { initializeCards, checkIfUserHasWon, getWinnerCardCount } from '../services/game';

/**
 * Mutation for doing a deal of cards
 *
 * @export
 * @param {*} parent
 * @param {{ userGameId: string }} params
 * @returns {Promise<GameResponse>}
 */
export const deal = async (parent: any, params: { userGameId: string }): Promise<GameResponse> => {
  const userGameId = params.userGameId;

  console.log('Fetching user game data');
  const userGameData = await getUserGameData(userGameId);

  // If the user tries to play the game that is already completed. Throw and error
  if (userGameData.gameStatus === GameStatus.COMPLETED) {
    throw Error(en.GAME_ALREADY_COMPLETED);
  }

  const handSize = userGameData.cardsDealtInOneHand;
  const winnerCard = userGameData.winnerCard;
  const cards = userGameData.cardsGenerated;
  const handsShownTillNow = userGameData.handsDealt;

  const nextHandNumber = handsShownTillNow + 1;

  const cardsInDeck = cards.slice(handSize * nextHandNumber);
  const cardsAlreadyShown = cards.slice(0, handSize * nextHandNumber);
  const cardsToShow = cards.slice(handSize * handsShownTillNow, handSize * nextHandNumber);

  const winnerCardsDealt = getWinnerCardCount(cardsAlreadyShown, winnerCard);
  const isGameCompleted = cardsToShow.length < handSize || winnerCardsDealt === 4;

  const gameStatus = {
    userGameId,
    isGameCompleted,
    winnerCardsDealt,
    cardsInDeck: cardsInDeck.length,
    hasUserWon: userGameData.isWinner,
  };

  console.log('Updating the hands shown count and the game status in the database');

  await updateHandsDealt(
    userGameId,
    nextHandNumber,
    isGameCompleted ? GameStatus.COMPLETED : GameStatus.IN_PROGRESS
  );

  console.log('Game updateds successfully');

  return {
    gameStatus,
    cardsDealt: cardsToShow,
  };
};

/**
 * Mutation for starting a new game
 *
 * @param {*} parent
 * @param {{gameId:number}} params
 * @returns {Promise<GameResponse>}
 */
export const startNewGame = async (
  parent: any,
  params: { gameId: number }
): Promise<GameResponse> => {
  const gameId = params.gameId;

  console.log('Fetching game setting for game:', { gameId });
  const settings = await getGameSettings(gameId);

  const generatedCards = initializeCards(settings.generationConfig);
  const randomisedCards = shuffleArr(generatedCards);

  console.log('randomized deck created');

  const handSize = settings.cardsDealtInOneHand;
  const winnerCard = settings.winnerCard;

  const willUserWinTheGame = checkIfUserHasWon(randomisedCards, {
    winnerCard: winnerCard,
    cardsDealtInOneHand: handSize,
  });

  // Game id is used as unique one because a lot of users might be playing the game in parallel.
  // And using a incremental counter is bad for that
  const generatedUserGameId = uuid.v4();
  const insertParams = {
    id: generatedUserGameId,
    gameId,
    userId: 1,
    cardsGenerated: JSON.stringify(randomisedCards),
    gameStatus: GameStatus.IN_PROGRESS,
    handsDealt: INITIAL_HAND_NUMBER,
    isWinner: willUserWinTheGame,
  };

  console.log('Creating a game', { insertParams });
  await createUserGame(insertParams);

  console.log('Game created successfully');

  const cardsInDeck = randomisedCards.slice(handSize * INITIAL_HAND_NUMBER);
  const cardsAlreadyShown = randomisedCards.slice(0, handSize * INITIAL_HAND_NUMBER);

  const winnerCardsDealt = getWinnerCardCount(cardsAlreadyShown, winnerCard);

  const gameStatus = {
    userGameId: generatedUserGameId,
    isGameCompleted: false,
    winnerCardsDealt,
    cardsInDeck: cardsInDeck.length,
    hasUserWon: willUserWinTheGame,
  };

  return {
    gameStatus,
    cardsDealt: cardsAlreadyShown,
  };
};

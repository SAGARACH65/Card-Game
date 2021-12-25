import Card from '../Card';

interface GameStatus {
  userGameId: string;
  isGameCompleted: boolean;
  winnerCardsDealt: number;
  cardsInDeck: number;
  hasUserWon: boolean;
}

interface GameResponse {
  gameStatus: GameStatus;
  cardsDealt: Card[];
}

export default GameResponse;

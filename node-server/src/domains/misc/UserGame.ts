import Card from './Card';
import GameStatus from '../../enums/GameStatus';

interface UserGame {
  cardsGenerated: Card[];
  gameStatus: GameStatus;
  handsDealt: number;
  isWinner: boolean;
  winnerCard: number;
  cardsDealtInOneHand: number;
}

export default UserGame;

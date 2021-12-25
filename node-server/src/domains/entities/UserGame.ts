import GameStatus from '../../enums/GameStatus';

interface UserGame {
  id: string;
  userId: number;
  gameId: number;
  cardsGenerated: string;
  gameStatus: GameStatus;
  handsDealt: number;
  isWinner: boolean;
}

export default UserGame;

import SuitConfig from '../misc/GenerationConfig';

interface GameSettings {
  id: string;
  gameId: number;
  winnerCard: number;
  cardsDealtInOneHand: number;
  generationConfig: SuitConfig[];
}

export default GameSettings;

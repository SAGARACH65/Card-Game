import { gql } from '@apollo/client';

const startNewGameMutation = gql`
  mutation StartNewGame($gameId: Int!) {
    startNewGame(gameId: $gameId) {
      cardsDealt {
        name
        number
      }
      gameStatus {
        userGameId
        isGameCompleted
        hasUserWon
        winnerCardsDealt
        cardsInDeck
      }
    }
  }
`;

export default startNewGameMutation;

import { gql } from '@apollo/client';

const Deal = gql`
  mutation Deal($userGameId: String!) {
    deal(userGameId: $userGameId) {
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

export default Deal;

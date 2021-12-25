import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';

import 'animate.css';
import Winner from 'assets/winner.svg';

import DealMutation from 'gql/deal';
import CardInterface from 'domains/Card';
import Card from 'components/game/common/Card';
import { ANIMATION_TIME } from 'constants/game';
import CardCount from 'components/game/CardCount';
import startNewGameMutation from 'gql/startNewGame';
import GameResponse from 'domains/Mutation/GameResponse';
import useWindowDimensions from 'hooks/useWindowDimension';
import PlayAgainBtn from 'components/game/common/PlayAgainBtn';
import ActionButtons from 'components/game//common/ActionButtons';
import WinnerInformation from 'components/game//common/WinnerInformation';

const GameController = () => {
  const [startNewGame, initialHandParams] = useMutation(startNewGameMutation);

  const [dealNextHand, dealNextHandsParams] = useMutation(DealMutation);

  const [hasGameStarted, setGameStartStatus] = React.useState<boolean>(false);

  const { data: nextHandData } = dealNextHandsParams;

  const { data: initialHandData } = initialHandParams;

  const [gameData, setGameData] = React.useState<{
    deal: GameResponse;
    startNewGame: GameResponse;
  } | null>(null);

  //   This custom hook is used to get height and width for the Confetti.
  const { height, width } = useWindowDimensions();

  let interval: NodeJS.Timeout | null = null;

  React.useEffect(() => {
    // Auto start a new game on initial mount.
    startGame();
  }, []);

  const resetGame = () => {
    startGame();
  };

  React.useEffect(() => {
    const computedData = nextHandData || initialHandData;

    if (computedData) {
      setGameData(computedData);
    }
  }, [nextHandData, initialHandData]);

  React.useEffect(() => {
    //   If the game has not started do start the timer
    if (!hasGameStarted) {
      if (interval) {
        clearInterval(interval);
      }

      return undefined;
    }

    // If the game has started run a period timer that runs the game
    startTimer();

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [hasGameStarted]);

  const startTimer = () => {
    onNextHandDeal();

    interval = setInterval(() => {
      onNextHandDeal();
    }, ANIMATION_TIME);
  };

  /**
   * Starts the game.
   */
  const startGame = () => {
    (dealNextHandsParams as any).reset();
    setGameStartStatus(false);
    if (interval) {
      clearInterval(interval);
    }
    startNewGame({ variables: { gameId: 1 } });
  };

  /**
   * Starts the game.
   */
  const startDeal = () => {
    if (!hasGameStarted) {
      setGameStartStatus(true);
    }
  };

  if (!gameData) {
    // TODO: Add a fancy skeleton preloader
    return <div>Loading....</div>;
  }

  const dataToUse = gameData.deal || gameData.startNewGame;

  const { gameStatus, cardsDealt } = dataToUse;

  const onNextHandDeal = () => {
    (initialHandParams as any).reset();
    dealNextHand({ variables: { userGameId: gameStatus.userGameId } });
  };

  const hasUserWonTheGame = gameStatus.hasUserWon && gameStatus.isGameCompleted;
  const hasUserLostTheGame = !gameStatus.hasUserWon && gameStatus.isGameCompleted;
  const remainingGeneratedCardsInDeck = gameStatus.cardsInDeck;
  const numberOfWinnerCardShown = gameStatus.winnerCardsDealt;
  const showActionBtn = !(hasUserWonTheGame || hasUserLostTheGame);
  const showPlayAgainBtn = hasUserWonTheGame || hasUserLostTheGame;

  if (showPlayAgainBtn && hasGameStarted) {
    setGameStartStatus(false);
  }

  return (
    <div className="w-full h-screen	overflow-y-scroll md:overflow-hidden	font-courierPrime bg-gradient-to-b from-green-500 to-green-800 p-2 items-center">
      {hasUserWonTheGame && <img src={Winner} alt="img" className="p-2 w-full	z-50" />}

      <CardCount
        remainingGeneratedCardsInDeck={remainingGeneratedCardsInDeck}
        winnerCardShown={numberOfWinnerCardShown}
      />

      <div className="items-center flex flex-wrap justify-center	md:justify-evenly">
        {cardsDealt.map((item: CardInterface, index: number) => (
          <React.Fragment key={`${item.name}-${item.number}`}>
            <Card index={index} isLastBatch={hasUserWonTheGame} item={item} />
          </React.Fragment>
        ))}
      </div>

      {hasUserWonTheGame && <WinnerInformation width={width} height={height} />}
      {hasUserLostTheGame && (
        <div className="text-center text-white font-semibold  md:text-xl md:mt-24">
          <FormattedMessage id="game.lostGame" />
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center	md:fixed md:bottom-0 md:p-16 md:w-full">
        {showActionBtn && <ActionButtons resetGame={resetGame} startGame={() => startDeal()} />}

        {showPlayAgainBtn && <PlayAgainBtn resetGame={resetGame} />}
      </div>
    </div>
  );
};

export default GameController;

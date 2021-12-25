import { FormattedMessage } from 'react-intl';

interface PlayAgainBtnProps {
  resetGame: () => void;
}

const PlayAgainBtn = (props: PlayAgainBtnProps) => {
  const { resetGame } = props;

  return (
    <button
      id="play-again"
      type="button"
      className="text-white border-2 border-white px-7 py-1 mb-5 md:mb-0 rounded-lg font-semibold  text-xl mt-10 md:mt-0 md:m-auto"
      onClick={() => resetGame()}
    >
      <FormattedMessage id="game.playAgain" />
    </button>
  );
};

export default PlayAgainBtn;

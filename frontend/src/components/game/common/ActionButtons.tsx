import { FormattedMessage } from 'react-intl';

interface ActionButtonsProps {
  startGame: () => void;
  resetGame: () => void;
}

const ActionButtons = (props: ActionButtonsProps) => {
  const { startGame, resetGame } = props;

  return (
    <>
      <button
        id="deal-btn"
        type="button"
        className="text-black bg-yellow-400 hover:bg-yellow-500 hover:text-black border-0	rounded-lg text-6xl	px-20 py-3 font-black md:-mr-40	md:ml-auto	mt-10 md:mt-0	uppercase"
        onClick={() => startGame()}
      >
        <FormattedMessage id="game.deal" />
      </button>

      <button
        id="reset-btn"
        type="button"
        className="text-white border-2 border-white px-7 py-1 mb-10 md:mb-0 rounded-lg font-semibold text-xl mt-10 md:mt-0 md:ml-auto"
        onClick={() => resetGame()}
      >
        <FormattedMessage id="game.reset" />
      </button>
    </>
  );
};

export default ActionButtons;

import { FormattedMessage } from 'react-intl';

interface CardCountProps {
  winnerCardShown: number;
  remainingGeneratedCardsInDeck: number;
}

const CardCount = (props: CardCountProps) => {
  const { remainingGeneratedCardsInDeck, winnerCardShown } = props;

  return (
    <div className="flex flex-col	md:flex-row items-center justify-center">
      <div className="bg-black text-white w-40 border border-white text-center font-bold text-xl py-2 px-2 m-5">
        <div id="remaining-card-count">{remainingGeneratedCardsInDeck}</div>
        <div>
          <FormattedMessage id="game.cardsLeft" />
        </div>
      </div>
      <div className="bg-black text-white w-40 border border-white text-center font-bold text-xl py-2 px-2 m-3">
        <div>{winnerCardShown}</div>
        <div>
          <FormattedMessage id="game.acesShown" />
        </div>
      </div>
    </div>
  );
};

export default CardCount;

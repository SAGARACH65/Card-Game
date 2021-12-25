import Confetti from 'react-confetti';
import { FormattedMessage } from 'react-intl';

interface WinnerInformationProps {
  width: number;
  height: number;
}

const WinnerInformation = (props: WinnerInformationProps) => {
  const { width, height } = props;

  return (
    <div>
      <Confetti width={width} height={height} />

      <div className="text-center text-white font-semibold md:mt-40 md:text-xl">
        <FormattedMessage id="game.winner" />
      </div>
    </div>
  );
};

export default WinnerInformation;

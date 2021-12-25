import classnames from 'classnames';

import CardInterface from 'domains/Card';
import CardTypes from 'enums/CardTypes';
import cardTypeToIconMap from 'maps/cardTypeToIconMap';
import cardTypeToColorMap from 'maps/cardTypeToColorMap';
import specialTextToNumberMap from 'maps/specialTextToNumberMap';
import { getRotationClasses, getDelayClass } from 'services/game';

interface CardProps {
  index: number;
  item: CardInterface;
  isLastBatch: boolean;
}

const Card = (props: CardProps) => {
  const { index, item, isLastBatch } = props;
  const { name, number } = item;

  const colorClass = cardTypeToColorMap[name as CardTypes];

  // We only need the rotation when the cards are not in the last batch
  const rotationClasses = !isLastBatch ? getRotationClasses(index) : '';
  const delayClass = getDelayClass(index);

  const cardClassNames = classnames('transform translate-x-1', {
    [colorClass]: true,
    [rotationClasses || '']: true,
  });

  const wrapperClassNames = classnames(
    ' w-32 bg-white h-20 m-2 rounded-2xl h-44  animate__animated animate__bounceInDown ',
    {
      [delayClass]: true,
    }
  );

  const getCardCharacter = (num: string) => specialTextToNumberMap[num] || number;

  const cardImg = cardTypeToIconMap[name as CardTypes];

  return (
    <div className={cardClassNames}>
      <div className={wrapperClassNames}>
        <div className="text-7xl ml-4 mt-3">{getCardCharacter(number.toString())}</div>

        <img src={cardImg} alt="img" className="w-6 ml-6" />
        <img src={cardImg} alt="img" className="w-12 ml-16" />
      </div>
    </div>
  );
};

export default Card;

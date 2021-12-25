import CardTypes from 'enums/CardTypes';

import Heart from 'assets/Heart.svg';
import Spade from 'assets/Spade.svg';
import Clover from 'assets/Clover.svg';
import Diamond from 'assets/Diamond.svg';

const cardTypeToIconMap = {
  [CardTypes.SPADE]: Spade,
  [CardTypes.HEART]: Heart,
  [CardTypes.DIAMOND]: Diamond,
  [CardTypes.CLUB]: Clover,
};

export default cardTypeToIconMap;

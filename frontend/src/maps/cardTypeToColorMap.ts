import CardTypes from 'enums/CardTypes';

const cardTypeToColorMap = {
  [CardTypes.SPADE]: 'text-black',
  [CardTypes.HEART]: 'text-red-500',
  [CardTypes.DIAMOND]: 'text-red-500',
  [CardTypes.CLUB]: 'text-black',
};

export default cardTypeToColorMap;

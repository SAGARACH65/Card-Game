import CardTypes from '../../enums/CardTypes';
import { shuffleArr } from '../../utils/common';

const TEST_ARR = [
  { name: CardTypes.SPADE, number: 1 },
  { name: CardTypes.SPADE, number: 2 },
  { name: CardTypes.SPADE, number: 3 },
  { name: CardTypes.SPADE, number: 4 },
  { name: CardTypes.SPADE, number: 5 },
];

describe('Tests for utils', () => {
  it('Checking if the items in the sorted array are same as that of the original one', () => {
    const shuffledArr = shuffleArr(TEST_ARR);

    expect(shuffledArr.sort()).toEqual(TEST_ARR.sort());
  });
});

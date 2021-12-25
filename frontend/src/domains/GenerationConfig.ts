import CardTypes from 'enums/CardTypes';

export interface Suit {
  name: CardTypes;
  count: number;
}

interface GenerationConfig {
  suitsConfig: Suit[];
}

export default GenerationConfig;

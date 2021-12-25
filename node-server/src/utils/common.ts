/**
 * Shuffles a array in random order
 *
 * @param {any[]} array
 * @returns {any[]}
 */
export const shuffleArr = (array: any[]) => {
  const random = array.map(Math.random);

  return array.sort(function (a, b) {
    return random[array.indexOf(a)] - random[array.indexOf(b)];
  });
};

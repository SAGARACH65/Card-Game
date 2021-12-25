/**
 * Returns the class for a certain index provided.
 *
 * @param {number} index
 * @returns {string}
 */
export const getRotationClasses = (index: number) => {
  switch (index) {
    case 0:
      return 'md:rotate-25 md:mt-0';

    case 1:
      return 'md:rotate-12 md:mt-32';

    case 2:
      return 'md:rotate-0 md:mt-44';

    case 3:
      return 'md:-rotate-12 md:mt-32';

    case 4:
      return 'md:-rotate-25 md:mt-0';

    //  TODO: Need to configure it so that we can handle more indexes if the batch_size increases.

    default:
      return '';
  }
};

/**
 * Returns a delay class based on the count
 *
 * @param {delayCount} number
 * @returns {string}
 */
export const getDelayClass = (delayCount: number) => {
  return `delay-${delayCount}`;
};

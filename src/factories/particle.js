import getRandomNumber from '../utils/get-random-number';
import {
  CircleParticle,
  RectParticle,
  HeartParticle,
} from '../particles';

/**
 * Create a particle based on the given options.
 * @param {object} options
 *   The particle options.
 * @returns {object}
 *   A particle.
 */
export default (options) => {
  const defaults = {
    shape: 'circle',
    size: 10,
    colors: [
      'DodgerBlue',
      'OliveDrab',
      'Gold',
      'pink',
      'SlateBlue',
      'lightblue',
      'Violet',
      'PaleGreen',
      'SteelBlue',
      'SandyBrown',
      'Chocolate',
      'Crimson',
    ],
  }

  Object.assign(defaults, options);

  const { shape, colors, size } = defaults;

  // Get a random color from the array
  const colorIndex = getRandomNumber(0, colors.length, true);
  const color = colors[colorIndex];

  // Generate a particle of the given shape
  if (shape === 'circle') {
    return new CircleParticle({ color, size });
  } if (shape === 'rect') {
    return new RectParticle({ color, size });
  } if (shape === 'heart') {
    return new HeartParticle({ color, size });
  }

  throw Error(`Unkown particle shape: "${shape}"`);
};

import getRandomNumber from '../utils/get-random-number';
import {
  CircleParticle,
  RectParticle,
  HeartParticle,
  ImageParticle,
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
    dropRate: 10,
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
    image: null,
  };

  const opts = Object.assign(defaults, options);

  // Set a random color from the array
  const colorIndex = getRandomNumber(0, opts.colors.length, true);
  opts.color = opts.colors[colorIndex];

  if (opts.shape === 'circle') {
    return new CircleParticle(opts);
  }

  if (opts.shape === 'rect') {
    return new RectParticle(opts);
  }

  if (opts.shape === 'heart') {
    return new HeartParticle(opts);
  }

  if (opts.shape === 'image') {
    return new ImageParticle(opts, opts.image);
  }

  throw Error(`Unkown particle shape: "${opts.shape}"`);
};

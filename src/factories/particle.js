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
export default class ParticleFactory {
  constructor() {
    this.cachedImage = null;
  }

  /**
   * Create an image element from the given source.
   * @param {string} imgSource
   *   The path to the image.
   */
  createImageElement(imgSource) {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', imgSource);
    return imgEl;
  }

  /**
   * Get an image element from a source string.
   * @param {string} imgSource
   *   The path to the image.
   */
  getImageElement(imgSource) {
    if (!this.cachedImage || imgSource !== this.cachedImage.getAttribute('src')) {
      this.cachedImage = this.createImageElement(imgSource);
    }

    return this.cachedImage;
  }

  /**
   * Create a particle.
   * @param {Object} options
   *   The particle options.
   */
  create(options) {
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
      return new ImageParticle(opts, this.getImageElement(opts.image));
    }

    throw Error(`Unkown particle shape: "${opts.shape}"`);
  }
}

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
    this.cachedImages = {};
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
    if (!this.cachedImages[imgSource]) {
      this.cachedImages[imgSource] = this.createImageElement(imgSource);
    }
    return this.cachedImages[imgSource];
  }

  /**
   * Get a random particle from the list of available particles.
   * @param {Object} options
   *   The particle options.
   */
  getRandomParticle(options = {}) {
    const particles = options.particles || [];

    if (particles.length < 1) {
      return {};
    }

    return particles[Math.floor(Math.random() * particles.length)];
  }

  /**
   * Get the particle defaults.
   * @param {Object} options
   *   The particle options.
   */
  getDefaults(options = {}) {
    return {
      type: options.defaultType || 'circle',
      size: options.defaultSize || 10,
      dropRate: options.defaultDropRate || 10,
      colors: options.defaultColors || [
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
      url: null,
    };
  }

  /**
   * Create a particle.
   * @param {Object} options
   *   The particle options.
   */
  create(options) {
    const defaults = this.getDefaults(options);
    const particle = this.getRandomParticle(options);

    const opts = Object.assign(defaults, particle);

    // Set a random color from the array
    const colorIndex = getRandomNumber(0, opts.colors.length - 1, true);
    opts.color = opts.colors[colorIndex];

    if (opts.type === 'circle') {
      return new CircleParticle(opts);
    }

    if (opts.type === 'rect') {
      return new RectParticle(opts);
    }

    if (opts.type === 'heart') {
      return new HeartParticle(opts);
    }

    if (opts.type === 'image') {
      return new ImageParticle(opts, this.getImageElement(opts.url));
    }

    throw Error(`Unknown particle type: "${opts.type}"`);
  }
}

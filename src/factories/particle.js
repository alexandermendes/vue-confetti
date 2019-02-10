import {
  CircleParticle,
  RectParticle,
  HeartParticle,
} from '../particles';

/**
 * Create a particle based on the given options.
 */
export default (options) => {
  const { shape } = options;
  if (shape === 'circle') {
    return new CircleParticle();
  } if (shape === 'rect') {
    return new RectParticle();
  } if (shape === 'heart') {
    return new HeartParticle();
  }
  throw Error(`Unkown particle shape: "${shape}"`);
};

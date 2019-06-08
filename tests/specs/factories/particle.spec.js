import factory from '../../../src/factories/particle';
import getRandomNumber from '../../../src/utils/get-random-number';
import {
  CircleParticle,
  RectParticle,
  HeartParticle,
  ImageParticle,
} from '../../../src/particles';

jest.mock('../../../src/particles');
jest.mock('../../../src/utils/get-random-number');

describe('Particle factory', () => {
  let defaults = null;
  let defaultParticleOpts = null;

  beforeEach(() => {
    defaults = {
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

    getRandomNumber.mockReturnValue(1);

    defaultParticleOpts = { ...defaults, color: defaults.colors[1] };
  });

  it('creates a CircleParticle by default', () => {
    const particle = factory();

    expect(particle).toBeInstanceOf(CircleParticle);
    expect(CircleParticle).toHaveBeenCalledTimes(1);
    expect(CircleParticle).toHaveBeenCalledWith(defaultParticleOpts);
  });

  it('creates a RectParticle if shape is rect', () => {
    const opts = {
      shape: 'rect',
    };
    const particle = factory(opts);

    expect(particle).toBeInstanceOf(RectParticle);
    expect(RectParticle).toHaveBeenCalledTimes(1);
    expect(RectParticle).toHaveBeenCalledWith({ ...defaultParticleOpts, ...opts });
  });

  it('creates a HeartParticle if shape is heart', () => {
    const opts = {
      shape: 'heart',
    };
    const particle = factory(opts);

    expect(particle).toBeInstanceOf(HeartParticle);
    expect(HeartParticle).toHaveBeenCalledTimes(1);
    expect(HeartParticle).toHaveBeenCalledWith({ ...defaultParticleOpts, ...opts });
  });

  it('creates an ImageParticle if shape is image', () => {
    const opts = {
      shape: 'image',
      image: jest.fn(),
    };
    const particle = factory(opts);

    expect(particle).toBeInstanceOf(ImageParticle);
    expect(ImageParticle).toHaveBeenCalledTimes(1);
    expect(ImageParticle).toHaveBeenCalledWith({ ...defaultParticleOpts, ...opts }, opts.image);
  });

  it('throws if an invalid shape is given', () => {
    const opts = {
      shape: 'unknown',
    };

    expect(() => factory(opts)).toThrow(`Unkown particle shape: "${opts.shape}"`);
  });
});

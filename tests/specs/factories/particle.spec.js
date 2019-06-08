import ParticleFactory from '../../../src/factories/particle';
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
  let factory = null;
  let defaults = null;
  let defaultParticleOpts = null;

  beforeEach(() => {
    factory = new ParticleFactory();

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

  describe('create', () => {
    it('creates a CircleParticle by default', () => {
      const particle = factory.create();

      expect(particle).toBeInstanceOf(CircleParticle);
      expect(CircleParticle).toHaveBeenCalledTimes(1);
      expect(CircleParticle).toHaveBeenCalledWith(defaultParticleOpts);
    });

    it('creates a RectParticle if shape is rect', () => {
      const opts = {
        shape: 'rect',
      };
      const particle = factory.create(opts);

      expect(particle).toBeInstanceOf(RectParticle);
      expect(RectParticle).toHaveBeenCalledTimes(1);
      expect(RectParticle).toHaveBeenCalledWith({ ...defaultParticleOpts, ...opts });
    });

    it('creates a HeartParticle if shape is heart', () => {
      const opts = {
        shape: 'heart',
      };
      const particle = factory.create(opts);

      expect(particle).toBeInstanceOf(HeartParticle);
      expect(HeartParticle).toHaveBeenCalledTimes(1);
      expect(HeartParticle).toHaveBeenCalledWith({ ...defaultParticleOpts, ...opts });
    });

    it('creates an ImageParticle if shape is image', () => {
      const opts = {
        shape: 'image',
        image: '/path/to/img.jpg',
      };
      factory.getImageElement = jest.fn(() => 'mock-image');
      const particle = factory.create(opts);

      expect(particle).toBeInstanceOf(ImageParticle);
      expect(ImageParticle).toHaveBeenCalledTimes(1);
      expect(ImageParticle).toHaveBeenCalledWith({ ...defaultParticleOpts, ...opts }, 'mock-image');
    });

    it('throws if an invalid shape is given', () => {
      const opts = {
        shape: 'unknown',
      };

      expect(() => factory.create(opts)).toThrow(`Unkown particle shape: "${opts.shape}"`);
    });
  });

  describe('getImageElement', () => {
    it('returns the cached image if the src is the same', () => {
      const source = '/path/to/img.jpg';
      const cachedImage = document.createElement('img');
      cachedImage.setAttribute('src', source);

      factory.cachedImage = cachedImage;
      factory.createImageElement = jest.fn();

      const image = factory.getImageElement(source);

      expect(image).toEqual(cachedImage);
      expect(factory.createImageElement).not.toHaveBeenCalled();
    });

    it('creates and caches an image if nothing cached', () => {
      const source = '/path/to/img.jpg';

      factory.cachedImage = null;
      factory.createImageElement = jest.fn(() => 'mock-image');

      const image = factory.getImageElement(source);

      expect(image).toEqual('mock-image');
      expect(factory.cachedImage).toEqual('mock-image');
      expect(factory.createImageElement).toHaveBeenCalledWith(source);
    });

    it('creates and caches an image if the src differs', () => {
      const source = '/path/to/img.jpg';
      const cachedImage = document.createElement('img');
      cachedImage.setAttribute('src', '/some/other/img.jpg');

      factory.cachedImage = cachedImage;
      factory.createImageElement = jest.fn(() => 'mock-image');

      const image = factory.getImageElement(source);

      expect(image).toEqual('mock-image');
      expect(factory.cachedImage).toEqual('mock-image');
      expect(factory.createImageElement).toHaveBeenCalledWith(source);
    });
  });

  describe('createImageElement', () => {
    it('creates an image element with the given source', () => {
      const source = '/path/to/img.jpg';
      const image = factory.createImageElement(source);

      expect(image).toBeInstanceOf(HTMLImageElement);
      expect(image.getAttribute('src')).toEqual(source);
    });
  });
});

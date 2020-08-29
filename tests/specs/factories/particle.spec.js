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
      type: 'circle',
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
      url: null,
    };

    getRandomNumber.mockReturnValue(1);

    defaultParticleOpts = { ...defaults, color: defaults.colors[1] };
  });

  describe('getDefaults', () => {
    it('returns the expected defaults', () => {
      expect(factory.getDefaults()).toEqual(defaults);
    });

    it('prefers custom defaults', () => {
      const opts = {
        defaultType: 'foo',
        defaultSize: 42,
        defaultDropRate: 42,
        defaultColors: [
          '#c0ffe',
        ],
      };

      expect(factory.getDefaults(opts)).toEqual({
        type: 'foo',
        dropRate: opts.defaultDropRate,
        size: opts.defaultSize,
        dropRate: opts.defaultDropRate,
        colors: opts.defaultColors,
        url: null,
      });
    });
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
        particles: [
          {
            type: 'rect',
          },
        ],
      };
      const particle = factory.create(opts);

      expect(particle).toBeInstanceOf(RectParticle);
      expect(RectParticle).toHaveBeenCalledTimes(1);
      expect(RectParticle).toHaveBeenCalledWith({
        ...defaultParticleOpts,
        ...opts.particles[0],
      });
    });

    it('creates a HeartParticle if type is heart', () => {
      const opts = {
        particles: [
          {
            type: 'heart',
          },
        ],
      };
      const particle = factory.create(opts);

      expect(particle).toBeInstanceOf(HeartParticle);
      expect(HeartParticle).toHaveBeenCalledTimes(1);
      expect(HeartParticle).toHaveBeenCalledWith({
        ...defaultParticleOpts,
        ...opts.particles[0]
      });
    });

    it('creates an ImageParticle if type is image', () => {
      const opts = {
        particles: [
          {
            type: 'image',
            url: '/path/to/img.jpg',
          },
        ],
      };
      factory.getImageElement = jest.fn(() => 'mock-image');
      const particle = factory.create(opts);

      expect(particle).toBeInstanceOf(ImageParticle);
      expect(ImageParticle).toHaveBeenCalledTimes(1);
      expect(ImageParticle).toHaveBeenCalledWith({
        ...defaultParticleOpts,
        ...opts.particles[0]
      }, 'mock-image');
    });

    it('throws if an invalid type is given', () => {
      const opts = {
        particles: [
          {
            type: 'unknown',
          },
        ],
      };

      expect(() => factory.create(opts)).toThrow('Unknown particle type: "unknown"');
    });

    it('creates multiple particle types', () => {
      factory.getRandomParticle = jest.fn();

      factory.getRandomParticle.mockReturnValueOnce({
        type: 'circle',
      });

      factory.create({});

      factory.getRandomParticle.mockReturnValueOnce({
        type: 'rect',
      });

      factory.create({});

      factory.getRandomParticle.mockReturnValueOnce({
        type: 'heart',
      });

      factory.create({});

      expect(CircleParticle).toHaveBeenCalledTimes(1);
      expect(RectParticle).toHaveBeenCalledTimes(1);
      expect(HeartParticle).toHaveBeenCalledTimes(1);
    });
  });

  describe('getImageElement', () => {
    it('returns the cached image if the src is the same', () => {
      const source = '/path/to/img.jpg';
      const cachedImage = document.createElement('img');
      cachedImage.setAttribute('src', source);

      factory.cachedImages[source] = cachedImage;
      factory.createImageElement = jest.fn();

      const image = factory.getImageElement(source);

      expect(image).toEqual(cachedImage);
      expect(factory.createImageElement).not.toHaveBeenCalled();
    });

    it('creates and caches an image if nothing cached', () => {
      const source = '/path/to/img.jpg';

      factory.cachedImages = {};
      factory.createImageElement = jest.fn(() => 'mock-image');

      const image = factory.getImageElement(source);

      expect(image).toEqual('mock-image');
      expect(factory.cachedImages[source]).toEqual('mock-image');
      expect(factory.createImageElement).toHaveBeenCalledWith(source);
    });

    it('creates and caches an image if the src differs', () => {
      const source = '/path/to/img.jpg';
      const cachedSource = '/some/other/img.jpg';
      const cachedImage = document.createElement('img');
      cachedImage.setAttribute('src', cachedSource);

      factory.cachedImages = { cachedSource: cachedImage };
      factory.createImageElement = jest.fn(() => 'mock-image');

      const image = factory.getImageElement(source);

      expect(image).toEqual('mock-image');
      expect(factory.cachedImages[source]).toEqual('mock-image');
      expect(factory.createImageElement).toHaveBeenCalledWith(source);
    });

    it('caches multiple images', () => {
      const imageA = factory.getImageElement('/img.jpg');
      const imageB = factory.getImageElement('/another-img.jpg');
      const imageC = factory.getImageElement('/img.jpg');
      const imageD = factory.getImageElement('/another-img.jpg');

      expect(imageA).toEqual(imageC);
      expect(imageB).toEqual(imageD);
      expect(imageA).not.toEqual(imageB);
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

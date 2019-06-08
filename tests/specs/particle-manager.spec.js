import ParticleManager from '../../src/particle-manager';

describe('ParticleManager', () => {
  let particleManager = null;
  let mockParticle = null;

  beforeEach(() => {
    mockParticle = {
      setup: jest.fn(() => mockParticle),
      update: jest.fn(),
      pastBottom: jest.fn(() => false),
    };

    particleManager = new ParticleManager();

    particleManager.particleFactory = {
      create: jest.fn(() => mockParticle),
    };
  });

  describe('draw', () => {
    it('draws all items', () => {
      particleManager.items = [
        {
          draw: jest.fn(),
        },
        {
          draw: jest.fn(),
        },
      ];

      particleManager.draw();

      particleManager.items.forEach((item) => {
        expect(item.draw).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('refresh', () => {
    it('kills the current particles', () => {
      particleManager.pool = [
        {},
        {},
      ];
      particleManager.items = [
        {
          kill: jest.fn(),
        },
        {
          kill: jest.fn(),
        },
      ];

      particleManager.refresh();

      expect(particleManager.pool).toEqual([]);
      particleManager.items.forEach((item) => {
        expect(item.kill).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('add', () => {
    it('creates a new particle if nothing in the pool', () => {
      particleManager.add();

      expect(particleManager.particleFactory.create).toHaveBeenCalledTimes(1);
      expect(particleManager.particleFactory.create).toHaveBeenCalledWith(
        particleManager.particleOptions,
      );
      expect(mockParticle.setup).toHaveBeenCalledTimes(1);
      expect(mockParticle.setup).toHaveBeenCalledWith(particleManager.particleOptions);
      expect(particleManager.items).toEqual([mockParticle]);
    });

    it('takes a particle from the pool if present', () => {
      particleManager.pool = [mockParticle];

      particleManager.add();

      expect(particleManager.pool).toEqual([]);
      expect(particleManager.particleFactory.create).not.toHaveBeenCalled();
      expect(particleManager.items).toEqual([mockParticle]);
    });
  });

  describe('update', () => {
    it('updates all particles', () => {
      particleManager.items = [mockParticle, mockParticle];

      particleManager.update();

      expect(mockParticle.update).toHaveBeenCalledTimes(2);
    });

    it('moves particles to the pool if past the bottom', () => {
      mockParticle.pastBottom.mockReturnValue(true);
      particleManager.items = [mockParticle, mockParticle];

      particleManager.update();

      expect(particleManager.items).toEqual([]);
      expect(particleManager.pool).toEqual([mockParticle, mockParticle]);
    });

    it('removes particles if past the bottom and due for removal', () => {
      mockParticle.pastBottom.mockReturnValue(true);
      mockParticle.remove = true;
      particleManager.items = [mockParticle, mockParticle];

      particleManager.update();

      expect(particleManager.items).toEqual([]);
      expect(particleManager.pool).toEqual([]);
    });
  });
});

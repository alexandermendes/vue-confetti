import ParticleManager from '../../src/particle-manager';

describe('ParticleManager', () => {
  it('draws all items', () => {
    const particleManager = new ParticleManager();
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

  it('kills the current particles on refresh', () => {
    const particleManager = new ParticleManager();
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

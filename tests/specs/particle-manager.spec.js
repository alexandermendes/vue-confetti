import ParticleManager from '../../src/particle-manager';

describe('ParticleManager', () => {
  it('kills the current particles on refresh', () => {
    const particleManager = new ParticleManager();
    particleManager.pool = [
      {},
      {},
    ];
    particleManager.items = [
      {},
      {},
    ];
    particleManager.refresh();

    expect(particleManager.pool).toEqual([]);
    expect(particleManager.items).toEqual([
      { kill: true },
      { kill: true },
    ]);
  });
});

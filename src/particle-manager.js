import ParticleFactory from './factories/particle';

/**
 * A particle generation and management service.
 */
export default class ParticleManger {
  /**
   * Initialise.
   * @param {object} particleOptions
   *   The particle options.
   */
  constructor(particleOptions) {
    this.items = [];
    this.pool = [];
    this.particleOptions = particleOptions;
    this.particleFactory = new ParticleFactory();
  }

  /**
   * Update the position of each particle.
   *
   * Moves particles back to the pool if past the bottom and not due for removal.
   */
  update() {
    const oldItems = [];
    const newItems = [];

    this.items.forEach((particle) => {
      particle.update();

      if (particle.pastBottom()) {
        if (!particle.remove) {
          particle.setup(this.particleOptions);
          oldItems.push(particle);
        }
      } else {
        newItems.push(particle);
      }
    });

    this.pool.push(...oldItems);

    this.items = newItems;
  }

  /**
   * Draw the particles currently in view.
   */
  draw() {
    this.items.forEach(item => item.draw());
  }

  /**
   * Add an item to the view.
   */
  add() {
    if (this.pool.length > 0) {
      this.items.push(this.pool.pop().setup(this.particleOptions));
    } else {
      this.items.push(
        this.particleFactory.create(this.particleOptions).setup(this.particleOptions),
      );
    }
  }

  /**
   * Replace particles once they have left the screen.
   */
  refresh() {
    this.items.forEach((item) => {
      item.kill();
    });

    this.pool = [];
  }
}

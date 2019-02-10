import particleFactory from './factories/particle';

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
  }

  /**
   * Move the particle back to the pool if it is past the bottom.
   */
  update() {
    this.items.filter(item => item.update()).forEach((item, index) => {
      const particle = this.items.splice(index - 1, 1)[0];
      particle.setup(this.particleOptions);
      if (!particle.kill) {
        this.pool.push(particle);
      }
    });
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
      this.items.push(particleFactory(this.particleOptions).setup(this.particleOptions));
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

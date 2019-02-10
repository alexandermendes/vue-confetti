import particleFactory from './factories/particle';

/**
 * A particle generation and management service.
 */
export default class ParticleManger {
  /**
   * Initialise.
   * @param {object} opts
   *   The particle options.
   */
  constructor(opts) {
    this.items = [];
    this.pool = [];
    this.opts = opts;
  }

  /**
   * Move the particle back to the pool if it is past the bottom.
   */
  update() {
    this.items.filter(item => item.update()).forEach((item, index) => {
      const particle = this.items.splice(index - 1, 1)[0];
      particle.setup(this.opts);
      this.pool.push(particle);
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
      this.items.push(this.pool.pop().setup(this.opts));
    } else {
      this.items.push(particleFactory(this.opts).setup(this.opts));
    }
  }
}

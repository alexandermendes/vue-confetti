import Particle from './particle';

class Particles {
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
      this.pool.push(this.items.splice(index - 1, 1)[0]);
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
      this.items.push(new Particle().setup(this.opts));
    }
  }
}

export default Particles;

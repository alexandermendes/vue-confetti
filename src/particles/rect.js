import BaseParticle from './base';

/**
 * Class representing a rectangular particle.
 */
export default class RectParticle extends BaseParticle {
  /**
   * Draw the particle.
   */
  draw() {
    super.draw();
    this.ctx.fillRect(0, 0, this.r, this.r / 2);
  }
}
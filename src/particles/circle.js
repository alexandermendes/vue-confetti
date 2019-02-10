import BaseParticle from './base';

/**
 * Class representing a circular particle.
 */
export default class CircleParticle extends BaseParticle {
  /**
   * Draw the particle.
   */
  draw() {
    super.draw();
    this.ctx.arc(0, 0, (this.r / 2), 0, Math.PI * 2, false);
    this.ctx.fill();
  }
}

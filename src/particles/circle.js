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
    this.canvas.ctx.arc(0, 0, (this.particleSize / 2), 0, Math.PI * 2, false);
    this.canvas.ctx.fill();
  }
}

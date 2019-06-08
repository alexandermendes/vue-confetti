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
    this.canvas.ctx.fillRect(0, 0, this.particleSize, this.particleSize / 2);
  }
}

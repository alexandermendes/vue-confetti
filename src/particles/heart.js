import BaseParticle from './base';

/**
 * Class representing a heart-shaped particle.
 */
export default class HeartParticle extends BaseParticle {
  /**
   * Draw the particle.
   */
  draw() {
    super.draw();
    const curveTo = (cp1x, cp1y, cp2x, cp2y, x, y) => {
      this.canvas.ctx.bezierCurveTo(
        cp1x * (this.particleSize / 200),
        cp1y * (this.particleSize / 200),
        cp2x * (this.particleSize / 200),
        cp2y * (this.particleSize / 200),
        x * (this.particleSize / 200),
        y * (this.particleSize / 200),
      );
    };
    this.canvas.ctx.moveTo(37.5 / this.particleSize, 20 / this.particleSize);
    curveTo(75, 37, 70, 25, 50, 25);
    curveTo(20, 25, 20, 62.5, 20, 62.5);
    curveTo(20, 80, 40, 102, 75, 120);
    curveTo(110, 102, 130, 80, 130, 62.5);
    curveTo(130, 62.5, 130, 25, 100, 25);
    curveTo(85, 25, 75, 37, 75, 40);
    this.canvas.ctx.fill();
  }
}

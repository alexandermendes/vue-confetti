import BaseParticle from './base';

/**
 * Class representing an image particle.
 */
export default class ImageParticle extends BaseParticle {
  /**
   * Initialise
   * @param {HTMLImageElement} imgEl
   *  An image element to pass through to ctx.drawImage.
   */
  constructor(opts, imgEl) {
    super(opts);

    this.imgEl = imgEl;
  }

  /**
   * Draw the particle.
   */
  draw() {
    super.draw();
    this.canvas.ctx.drawImage(this.imgEl, 0, 0, this.particleSize, this.particleSize);
  }
}

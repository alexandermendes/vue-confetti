import BaseParticle from './base';

/**
 * Class representing an image particle.
 */
export default class ImageParticle extends BaseParticle {
  /**
   * Initialise
   * @param {Element} element
   *  An img, svg or video element to pass through to crx.drawImage.
   */
  constructor(opts, element) {
    super(opts);

    this.element = element;
  }

  /**
   * Draw the particle.
   */
  draw() {
    super.draw();
    this.canvas.ctx.drawImage(this.element, 0, 0, this.particleSize, this.particleSize);
  }
}

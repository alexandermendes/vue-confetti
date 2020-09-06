import getRandomNumber from '../utils/get-random-number';

/**
 * A particle that can be drawn on a canvas.
 */
export default class BaseParticle {
  /**
   * Initialise.
   * @param {object} options
   *   The particle options.
   * @param {string} options.color
   *   The particle color.
   * @param {number} options.size
   *   The particle size.
   * @param {number} options.dropRate
   *   The speed at which particles fall.
   */
  constructor({
    color = 'blue',
    size = 10,
    dropRate = 10,
  } = {}) {
    this.color = color;
    this.size = size;
    this.dropRate = dropRate;
  }

  /**
   * Setup.
   * @param {options} opts
   *   The particle options.
   */
  setup({
    canvas,
    wind,
    windPosCoef,
    windSpeedMax,
    count,
  }) {
    this.canvas = canvas;
    this.wind = wind;
    this.windPosCoef = windPosCoef;
    this.windSpeedMax = windSpeedMax;
    this.x = getRandomNumber(-35, this.canvas.width + 35);
    this.y = getRandomNumber(-30, -35);
    this.d = getRandomNumber(150) + 10; // density
    this.particleSize = getRandomNumber(this.size, this.size * 2);
    this.tilt = getRandomNumber(10);
    this.tiltAngleIncremental = (
      (getRandomNumber(0, 0.08) + 0.04) * (getRandomNumber() < 0.5 ? -1 : 1)
    );
    this.tiltAngle = 0;
    this.angle = getRandomNumber(Math.PI * 2);
    this.count = count + 1;
    this.remove = false;
    return this;
  }

  /**
   * Update the particle.
   */
  update() {
    this.tiltAngle += (this.tiltAngleIncremental * (
      Math.cos(this.wind + (this.d + this.x + this.y) * this.windPosCoef)
      * 0.2 + 1
    ));
    this.y += (Math.cos(this.angle + this.d) + parseInt(this.dropRate, 10)) / 2;

    this.x += (Math.sin(this.angle) + Math.cos(
      this.wind + (this.d + this.x + this.y) * this.windPosCoef,
    )) * this.windSpeedMax;
    this.y += Math.sin(
      this.wind + (this.d + this.x + this.y) * this.windPosCoef,
    ) * this.windSpeedMax;
    this.tilt = (Math.sin(this.tiltAngle - (this.count / 3))) * 15;
  }

  /**
   * Check if the particle is past the bottom of the canvas;
   */
  pastBottom() {
    return this.y > this.canvas.height;
  }

  /**
   * Draw a particle.
   */
  draw() {
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.beginPath();
    this.canvas.ctx.setTransform(
      Math.cos(this.tiltAngle), // set the x axis to the tilt angle
      Math.sin(this.tiltAngle),
      0,
      1,
      this.x,
      this.y, // set the origin
    );
  }

  /**
   * Kill the particle after it has left the screen.
   */
  kill() {
    this.remove = true;
  }
}

import ParticleManager from './particle-manager';
import Canvas from './canvas';

/**
 * A class to drawing confetti onto a canvas.
 */
export default class Confetti {
  /**
   * Initialise.
   */
  constructor() {
    this.setDefaults();
  }

  /**
   * Initialize default.
   */
  setDefaults() {
    this.canvas = null;
    this.W = 0;
    this.H = 0;
    this.particles = null;
    this.droppedCount = 0;
    this.particlesPerFrame = 1.5;
    this.wind = 0;
    this.windSpeed = 1;
    this.windSpeedMax = 1;
    this.windChange = 0.01;
    this.windPosCoef = 0.002;
    this.maxParticlesPerFrame = 2; // max particles dropped per frame
    this.animationId = null;
  }

  particleOptions(opts) {
    const options = {
      canvas: this.canvas,
      W: this.W,
      H: this.H,
      wind: this.wind,
      windPosCoef: this.windPosCoef,
      windSpeedMax: this.windSpeedMax,
      count: 0,
    };

    Object.assign(options, opts);

    return options;
  }

  /**
   * Create the confetti particles.
   * @param {Object} opts
   *   The particle options.
   */
  createParticles(opts = {}) {
    const particleOpts = this.particleOptions(opts);
    this.particles = new ParticleManager(particleOpts);
  }

  /**
   * Start dropping confetti.
   * @param {Object} opts
   *   The particle options.
   */
  start(opts) {
    if (!this.canvas) {
      this.canvas = new Canvas();
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId); // Cancel any previous loop
    }

    this.createParticles(opts);
    this.canvas.updateDimensions();
    this.particlesPerFrame = this.maxParticlesPerFrame;
    this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
  }

  /**
   * Stop dropping confetti.
   */
  stop() {
    this.particlesPerFrame = 0;
  }

  /**
   * Update the confetti options.
   */
  update(opts) {
    if (this.particles) {
      this.particles.particleOptions = this.particleOptions(opts);
      this.particles.refresh();
    }
  }

  /**
   * Remove confetti.
   */
  remove() {
    this.stop();
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.canvas.destroy();
    this.setDefaults();
  }

  /**
   * Run the main animation loop.
   */
  mainLoop(time) {
    this.canvas.updateDimensions();
    this.canvas.clear();

    this.windSpeed = Math.sin(time / 8000) * this.windSpeedMax;
    this.wind = this.particles.particleOptions.wind += this.windChange; // eslint-disable-line

    while (this.droppedCount < this.particlesPerFrame) {
      this.droppedCount += 1;
      this.particles.add();
    }

    this.droppedCount -= this.particlesPerFrame;
    this.particles.update();
    this.particles.draw();

    // Stop calling if no particles left in view (i.e. it's been stopped)
    if (this.particles.items.length) {
      this.animationId = requestAnimationFrame(this.mainLoop.bind(this));
    }
  }
}

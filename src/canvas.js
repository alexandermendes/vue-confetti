/**
 * Class to generate and interact with an HTML canvas.
 */
export default class Canvas {
  /**
   * Initialise.
   * @param {string} [canvasId]
   *   An optional CSS ID pointing to a canvas to override the default.
   * @param {HTMLCanvasElement} [canvasId]
   *   An optional HTMLCanvasElement to override the default.
   */
  constructor(canvasId, canvasElement) {
    const defaultCanvasId = 'confetti-canvas';

    if (canvasElement) {
      if (canvasElement instanceof HTMLCanvasElement) {
        this.canvas = canvasElement;
      } else {
        throw new Error('Element is not a valid HTMLCanvasElement');
      }
    } else {
      const customCanvas = document.getElementById(canvasId);

      this.isDefault = canvasId === null || typeof canvasId === 'undefined';

      if (!this.isDefault && !customCanvas) {
        throw new Error(`No element found with ID "${canvasId}"`);
      }

      this.canvas = customCanvas || Canvas.createDefaultCanvas(defaultCanvasId);
    }

    if (!(this.canvas instanceof HTMLCanvasElement)) {
      throw new Error(`Element with ID "${defaultCanvasId}" is not a valid HTMLCanvasElement`);
    }

    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * Add a fixed, full-screen canvas to the page.
   * @returns {HTMLCanvasElement}
   *   A full-screen canvas.
   */
  static createDefaultCanvas(id) {
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.position = 'fixed';
    canvas.style.pointerEvents = 'none';
    canvas.style.top = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.id = id;
    document.querySelector('body').appendChild(canvas);
    return canvas;
  }

  /**
   * Get the canvas width.
   * @returns {Number}
   *   The canvas width.
   */
  get width() {
    return this.canvas.width;
  }

  /**
   * Get the canvas height.
   * @returns {Number}
   *   The canvas height.
   */
  get height() {
    return this.canvas.height;
  }

  /**
   * Clear the canvas.
   */
  clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Update the canvas dimensions, if necessary.
   */
  updateDimensions() {
    if (!this.isDefault) {
      return;
    }

    if (this.width !== window.innerWidth || this.height !== window.innerHeight) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }
}

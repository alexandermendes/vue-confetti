/**
 * Create an HTML5 canvas and return the context.
 * @returns {CanvasRenderingContext2D}
 *   The canvas context.
 */
export default () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 400;
  canvas.height = 300;
  return ctx;
};

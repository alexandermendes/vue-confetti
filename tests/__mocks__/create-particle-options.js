/**
 * Create mock particle options.
 * @param {CanvasRenderingContext2D} ctx
 *   A canvas context.
 * @returns {object}
 *   The particle options.
 */
export default (ctx) => {
  return {
    ctx,
    colors: {
      opts: [
        'red',
        'yellow',
        'blue',
      ],
      idx: 0,
      step: 10,
      get color () {
        return this.opts[((this.idx++) / this.step | 0) % this.opts.length]
      },
    },
  };
};

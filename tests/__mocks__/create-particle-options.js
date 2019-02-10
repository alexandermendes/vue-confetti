import Canvas from '../../src/canvas';

/**
 * Create mock particle options.
 * @returns {object}
 *   The particle options.
 */
export default () => {
  return {
    canvas: new Canvas(),
  };
};

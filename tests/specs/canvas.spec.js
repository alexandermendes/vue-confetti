import Canvas from '../../src/canvas';

describe('Canvas', () => {
  let defaultCanvas = null;

  beforeEach(() => {
    defaultCanvas = new Canvas();
  });

  describe('createDefaultCanvas', () => {
    it('creates a canvas with the expected styles', () => {
      const canvas = Canvas.createDefaultCanvas();

      expect(canvas.style._values).toEqual({
        display: 'block',
        position: 'fixed',
        'pointer-events': 'none',
        top: '0px',
        width: '100vw',
        height: '100vh',
      });
    });

    it('creates a canvas with the expected ID', () => {
      const id = 'foobar';
      const canvas = Canvas.createDefaultCanvas(id);

      expect(canvas.id).toEqual(id);
    });

    it('appends the canvas to the document body', () => {
      const canvas = Canvas.createDefaultCanvas();

      expect(canvas.parentElement.tagName).toEqual('BODY');
    });
  });

  describe('width', () => {
    it('returns the canvas width', () => {
      expect(defaultCanvas.width).toEqual(defaultCanvas.canvas.width);
    });
  });

  describe('height', () => {
    it('returns the canvas height', () => {
      expect(defaultCanvas.height).toEqual(defaultCanvas.canvas.height);
    });
  });

  describe('clear', () => {
    it('clears the canvas', () => {
      defaultCanvas.ctx = {
        setTransform: jest.fn(),
        clearRect: jest.fn(),
      };

      defaultCanvas.clear();

      expect(defaultCanvas.ctx.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
      expect(defaultCanvas.ctx.clearRect).toHaveBeenCalledWith(
        0,
        0,
        defaultCanvas.canvas.width,
        defaultCanvas.canvas.height,
      );
    });
  });

  describe('updateDimensions', () => {
    it('updates the width of the canvas to the width of the window', () => {
      const newWidth = defaultCanvas.canvas.width + 10;
      window.innerWidth = newWidth;

      defaultCanvas.updateDimensions();

      expect(defaultCanvas.canvas.width).toEqual(newWidth);
    });

    it('updates the height of the canvas to the height of the window', () => {
      const newHeight = defaultCanvas.canvas.height + 10;
      window.innerHeight = newHeight;

      defaultCanvas.updateDimensions();

      expect(defaultCanvas.canvas.height).toEqual(newHeight);
    });

    it('does not update if the default canvas is not used', () => {
      const { width, height } = defaultCanvas.canvas;
      const newWidth = defaultCanvas.canvas.width + 10;
      const newHeight = defaultCanvas.canvas.height + 10;
      window.innerWidth = newWidth;
      window.innerHeight = newHeight;

      defaultCanvas.isDefault = false;
      defaultCanvas.updateDimensions();

      expect(defaultCanvas.canvas.height).toEqual(height);
      expect(defaultCanvas.canvas.width).toEqual(width);
    });

    it('maintains the width and height if unchanged', () => {
      const { width, height } = defaultCanvas.canvas;

      window.innerWidth = width;
      window.innerHeight = height;
      defaultCanvas.updateDimensions();

      expect(defaultCanvas.canvas.height).toEqual(height);
      expect(defaultCanvas.canvas.width).toEqual(width);
    });
  });
});

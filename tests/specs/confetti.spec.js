import Confetti from '../../src/confetti';

expect.extend({
  toHaveCanvasEvents(canvas) {
    // eslint-disable-next-line no-underscore-dangle
    const hasEvents = canvas.getContext('2d').__getEvents().length > 0;

    return {
      pass: hasEvents,
      message: () => `Expected canvas to${this.isNot ? ' not ' : ' '}have events`,
    };
  },
});

describe('Confetti', () => {
  beforeEach(() => {
    // Mock for a single frame only
    jest.spyOn(window, 'requestAnimationFrame').mockImplementationOnce(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it('is initialised with default settings', () => {
    const confetti = new Confetti();

    expect(confetti).toMatchSnapshot();
  });

  it('does not throw when started without options', () => {
    const confetti = new Confetti();

    expect(() => confetti.start()).not.toThrow();
  });

  describe('start', () => {
    it('accepts a canvas by element reference', () => {
      const confetti = new Confetti();
      const canvasElement = document.createElement('canvas');

      confetti.start({ canvasElement });

      expect(canvasElement).toHaveCanvasEvents();
    });

    it('accepts a canvas by ID', () => {
      const confetti = new Confetti();
      const canvasElement = document.createElement('canvas');

      canvasElement.id = 'my-canvas';
      document.body.appendChild(canvasElement);

      confetti.start({ canvasId: 'my-canvas' });

      expect(canvasElement).toHaveCanvasEvents();
    });

    it('throws if given element is not a canvas', () => {
      const confetti = new Confetti();
      const canvasElement = document.createElement('div');

      expect(() => confetti.start({ canvasElement })).toThrow(
        /.*not a valid HTMLCanvasElement.*/,
      );
    });

    it('throws if given ID is not for a canvas', () => {
      const confetti = new Confetti();
      const canvasElement = document.createElement('div');
      canvasElement.id = 'not-a-canvas';

      expect(() => confetti.start({ canvasId: 'not-a-canvas' })).toThrow(
        /.*not a valid HTMLCanvasElement.*/,
      );
    });

    it('throws if both canvas element and id are given', () => {
      const confetti = new Confetti();
      const canvasElement = document.createElement('canvas');

      expect(() => confetti.start({ canvasId: 'foo', canvasElement })).toThrow(
        /.*mutually exclusive.*/,
      );
    });
  });

  describe('update', () => {
    it('restarts if given a new canvas by element reference', () => {
      const confetti = new Confetti();
      const canvasElementOne = document.createElement('canvas');
      const canvasElementTwo = document.createElement('canvas');

      const spy = jest.spyOn(confetti, 'start');

      confetti.start({ canvasElement: canvasElementOne });
      confetti.update({ canvasElement: canvasElementTwo });

      expect(spy).toHaveBeenCalledWith({ canvasElement: canvasElementTwo });
    });

    it('restarts if given a new canvas by ID', () => {
      const confetti = new Confetti();
      const canvasElementOne = document.createElement('canvas');
      const canvasElementTwo = document.createElement('canvas');

      const spy = jest.spyOn(confetti, 'start');

      canvasElementOne.id = 'my-canvas-one';
      canvasElementTwo.id = 'my-canvas-two';
      document.body.appendChild(canvasElementOne);
      document.body.appendChild(canvasElementTwo);

      confetti.start({ canvasId: 'my-canvas-one' });
      confetti.update({ canvasId: 'my-canvas-two' });

      expect(spy).toHaveBeenCalledWith({ canvasId: 'my-canvas-two' });
    });
  });
});

import Confetti from './confetti';

export { Confetti };

export default {
  install(app, options) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    try {
      app.config.globalProperties.$confetti = new Confetti(options); // Vue 3
    } catch (err) {
      app.prototype.$confetti = new Confetti(options); // Vue 2
    }
  },
};

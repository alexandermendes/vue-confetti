import Confetti from './confetti';

export { Confetti };

export default {
  install(Vue, options) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    Vue.prototype.$confetti = new Confetti(options); // eslint-disable-line no-param-reassign
  },
};

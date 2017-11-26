import Confetti from './confetti'

export default {
  install (Vue) {
    if (this.installed) {
      return
    }
    this.installed = true
    Vue.prototype.$confetti = new Confetti()
  }
}

import App from './App.vue';
import Vue from 'vue';
import VueConfetti from '../src/index';

Vue.use(VueConfetti);

new Vue({
  el: '#app',
  render: h => h(App),
});

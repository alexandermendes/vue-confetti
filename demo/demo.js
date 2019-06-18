import App from './App.vue';
import Vue from 'vue';
import VueConfetti from '../src/index';

import './styles.scss';

Vue.use(VueConfetti);

new Vue({
  el: '#app',
  render: h => h(App),
});

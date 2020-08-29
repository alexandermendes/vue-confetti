import Vue from 'vue';
import App from './App.vue';
import VueConfetti from '../src/index';

import './styles.scss';

Vue.use(VueConfetti);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: (h) => h(App),
});

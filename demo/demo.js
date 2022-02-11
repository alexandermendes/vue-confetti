import { createApp } from 'vue';
import App from './App.vue';
import VueConfetti from '../src/index';

import './styles.scss';

const app = createApp(App);

app.use(VueConfetti);

app.mount('#app');

import Vue from 'vue';
import App from './App.vue';
import './assets/sass/main.sass';
import Layout from './layouts/Default.vue';

Vue.config.productionTip = false;

Vue.component('Layout', Layout);

new Vue({
  render: (h) => h(App),
}).$mount('#app');

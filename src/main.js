import Vue from 'vue';
import App from './App.vue';
import './assets/sass/main.sass';
import Layout from './layouts/Default.vue';

Vue.config.productionTip = false;

Vue.component('Layout', Layout);

Vue.directive('click-outside', {
  bind(el, binding, vnode) {
    document.body.addEventListener('click', (e) => {
      if (el !== e.target && !el.contains(e.target)) {
        setTimeout(() => {
          vnode.context[binding.expression](e);
        }, 10);
      }
    });
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');

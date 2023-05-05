import Vue from 'vue';
import App from './App.vue';
import './assets/sass/main.sass';
import Layout from './layouts/Default.vue';

Vue.config.productionTip = false;

/**
 * as this is the default Layout,
 * so it supposed to be used in all over the application,
 * importing it on every view level will be a bit verbose, so instead
 * it is better to register it globally
 */
Vue.component('Layout', Layout);

/**
 * Vue fancy way to stop event propagation
 */
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

/**
 * this is a global toast for tracking API response,
 * in a real work app this has to be in the store,
 * and updated via axios interceptors,
 * but as this is a simple one page app,
 * we instead depend on the $root state.
 */
new Vue({
  data: {
    showAlert: false,
    alertType: '',
    alertMessage: '',
  },

  methods: {
    toggleAlert({ type, message, timer = 2000 }) {
      this.showAlert = true;
      this.alertType = type;
      this.alertMessage = message;
      setTimeout(() => {
        this.showAlert = false;
      }, timer);
    },
  },
  render: (h) => h(App),
}).$mount('#app');

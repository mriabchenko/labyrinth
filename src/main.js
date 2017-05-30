// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vswipe from 'vswipe'
import VueCarousel from 'vue-carousel'
import resource from 'vue-resource'

Vue.use(Vswipe);
Vue.use(VueCarousel);
Vue.use(resource);

Vue.config.productionTip = false;
Vue.http.options.root = 'http://krokus.info/page';

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});

//scrolltop after opening new page
router.afterEach(function (transition) {
  window.scrollTo(0, 0);
});
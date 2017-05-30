import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Field from './../components/field.vue'
const router = new Router({
	mode: 'history',
	routes: [{path: '/', component: Field}]
});

export default router;
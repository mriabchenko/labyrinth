import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		device: {
			type: 'mobile',
			height: '480',
			width: '320',
			scroll: '0'
		}
	},
	getters: {
		device: state => {
			return state.device;
		},
	},
	mutations: {
		checkDevice: state => {
			let ww = window.innerWidth;
			state.device.width = ww;
			(ww > 1279) ? state.device.type = 'desktop' : state.device.type = 'mobile';
			state.device.height = window.innerHeight;
		},
		checkScroll: state => {
			state.device.scroll = window.pageYOffset;
		}
	}
});
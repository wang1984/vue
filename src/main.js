import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'

import './common/style/index.css'

Vue.use(VueRouter)
Vue.use(VueResource)

let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass: 'active'
})

router.map({
	'/goods': {
		component: goods
	},
	'/seller': {
		component: seller
	},
	'/ratings': {
		component: ratings
	}

})
router.go('/goods');

router.start(app, '#myapp');
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
import header from '@/components/header/header'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

Vue.use(Resource)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

let router = new Router({
	linkActiveClass: 'active',
	routes: [{
		path: '/',
		redirect: '/goods',
		name: 'goods',
		component: goods
	},{
		path: '/goods',
		name: 'goods',
		component: goods
	},{
		path: '/ratings',
		name: 'ratings',
		component: ratings
	},{
		path: '/seller',
		name: 'seller',
		component: seller
	}]
});

export default router;
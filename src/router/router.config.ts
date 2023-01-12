import type { RouteRecordRaw } from 'vue-router'

export const constantRouterMap: Array<RouteRecordRaw> = [
	{
		path: '/',
		name:'Home',
		component: () => import('../views/Home.vue')
	}

]
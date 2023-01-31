import { createRouter, createWebHistory } from "vue-router";
import { RouteNamesEnum } from "@/router/router.types";
import { AppLayoutsEnum } from "@/layouts/layouts.types";
import { loadLayoutMiddleware } from "@/router/middleware/loadLayout.middleware";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: RouteNamesEnum.home,
			component: () => import("@/views/Home.vue"),
			meta: {
				layout: AppLayoutsEnum.login,
			},
		},

		{
			path: "/four",
			name: RouteNamesEnum.four,
			component: () => import("@/views/Home.vue"),
			meta: {
				layout: AppLayoutsEnum.login,
			},
		},
		{
			path: "/five",
			name: RouteNamesEnum.five,
			component: () => import("@/views/Home.vue"),
			meta: {
				layout: AppLayoutsEnum.error,
			},
		},
	],
});

router.beforeEach(loadLayoutMiddleware);

export default router;

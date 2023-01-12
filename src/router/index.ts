import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import { constantRouterMap } from './router.config'


export const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap,
})



export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}


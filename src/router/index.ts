import { App } from 'vue'

import router from './router.config'






export async function setupRouter(app: App) {
  app.use(router);
  await router.isReady();
}

